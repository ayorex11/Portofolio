// GET /api/now-playing
// Returns the caller's current (or most recent) Spotify track.
// Keeps the Spotify client secret and refresh token server-side only —
// never expose these to the frontend.

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = process.env

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

// Cached across warm invocations of the same lambda instance.
let cachedAccessToken = null
let cachedAccessTokenExpiresAt = 0

async function getAccessToken() {
  if (cachedAccessToken && Date.now() < cachedAccessTokenExpiresAt) {
    return cachedAccessToken
  }

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`token refresh failed: ${res.status} ${body}`)
  }

  const data = await res.json()
  cachedAccessToken = data.access_token
  cachedAccessTokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000
  return cachedAccessToken
}

function shapeTrack(item, isPlaying) {
  if (!item) return null
  const images = item.album?.images || []
  return {
    isPlaying,
    title: item.name,
    artist: (item.artists || []).map((a) => a.name).join(', '),
    album: item.album?.name || null,
    albumArt: images[1]?.url || images[0]?.url || null,
    songUrl: item.external_urls?.spotify || null,
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    res.status(500).json({ error: 'Missing Spotify credentials in environment variables' })
    return
  }

  try {
    const accessToken = await getAccessToken()
    const authHeader = { Authorization: `Bearer ${accessToken}` }

    const currentRes = await fetch(NOW_PLAYING_URL, { headers: authHeader })

    if (currentRes.status === 200) {
      const current = await currentRes.json()
      if (current && current.item && current.is_playing) {
        res.status(200).json(shapeTrack(current.item, true))
        return
      }
    }

    // Nothing currently playing — fall back to the most recently played track.
    const recentRes = await fetch(RECENTLY_PLAYED_URL, { headers: authHeader })
    if (recentRes.ok) {
      const recent = await recentRes.json()
      const lastItem = recent.items?.[0]?.track
      if (lastItem) {
        res.status(200).json(shapeTrack(lastItem, false))
        return
      }
    }

    res.status(200).json({ isPlaying: false, title: null })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}