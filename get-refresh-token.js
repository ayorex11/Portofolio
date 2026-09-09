// Run this ONCE, locally, to get a Spotify refresh token.
// Not part of the deployed site — delete it (or leave it) once you have the token.

import 'dotenv/config'
import http from 'node:http'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = 'http://127.0.0.1:8888/callback'
const SCOPE = 'user-read-currently-playing user-read-recently-played'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your .env first.')
  process.exit(1)
}

const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
  })

console.log('\nOpen this URL in your browser and approve access:\n')
console.log(authUrl + '\n')

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) {
    res.end('ok')
    return
  }

  const url = new URL(req.url, REDIRECT_URI)
  const code = url.searchParams.get('code')

  if (!code) {
    res.end('No code received — check the terminal and try again.')
    return
  }

  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    })

    const data = await tokenRes.json()

    if (data.refresh_token) {
      console.log('\nSuccess! Your refresh token:\n')
      console.log(data.refresh_token)
      console.log('\nSave this as SPOTIFY_REFRESH_TOKEN in Vercel env vars.\n')
      res.end('Done — check your terminal for the refresh token. You can close this tab.')
    } else {
      console.error('\nNo refresh token in response:', data)
      res.end('Something went wrong — check the terminal.')
    }
  } catch (err) {
    console.error(err)
    res.end('Error exchanging code — check the terminal.')
  } finally {
    setTimeout(() => server.close(), 500)
  }
})

server.listen(8888, () => console.log('Waiting for the redirect on http://127.0.0.1:8888 ...'))