<template>
  <a v-if="track" class="np-bar" :class="{ live: track.isPlaying, entered }" :href="track.songUrl || 'https://open.spotify.com'" target="_blank" rel="noopener">
    <div class="np-art">
      <img v-if="track.albumArt" :src="track.albumArt" :alt="track.album || track.title" />
      <i v-else class="fab fa-spotify"></i>
      <div class="np-eq" v-if="track.isPlaying"><span></span><span></span><span></span></div>
    </div>

    <div class="np-info">
      <div class="np-label">{{ track.isPlaying ? 'now playing' : 'last played' }}</div>
      <div class="np-title-row" ref="titleRowRef">
        <span class="np-title" :class="{ marquee: overflowing }" ref="titleRef">
          {{ track.title }} <span class="np-dash">—</span> {{ track.artist }}
        </span>
      </div>
    </div>

    <i class="fab fa-spotify np-badge"></i>
  </a>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick, watch } from 'vue'

const API_URL = import.meta.env.VITE_NOWPLAYING_API_URL
const POLL_MS = 20000

const track = ref(null)
const entered = ref(false)
const overflowing = ref(false)
const titleRef = ref(null)
const titleRowRef = ref(null)

let timer = null

async function fetchNowPlaying() {
  if (!API_URL) return
  try {
    const res = await fetch(API_URL, { cache: 'no-store' })
    if (!res.ok) throw new Error('bad response')
    const data = await res.json()
    if (!data || (!data.title && !data.isPlaying)) {
      track.value = null
      return
    }
    track.value = data
    if (!entered.value) {
      entered.value = true
    }
  } catch (e) {
    // Fail silently — widget just stays hidden if it was never shown,
    // or holds the last known track if it was.
  }
}

function checkOverflow() {
  nextTick(() => {
    if (titleRef.value && titleRowRef.value) {
      overflowing.value = titleRef.value.scrollWidth > titleRowRef.value.clientWidth
    }
  })
}

watch(track, checkOverflow)

onMounted(() => {
  if (!API_URL) return
  fetchNowPlaying()
  timer = setInterval(fetchNowPlaying, POLL_MS)
  window.addEventListener('resize', checkOverflow)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('resize', checkOverflow)
})
</script>

<style scoped>
.np-bar {
  position: fixed;
  left: 24px;
  bottom: 28px;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 250px;
  max-width: calc(100vw - 48px);
  padding: 10px 14px 10px 10px;
  background: var(--glass-strong);
  border: 1px solid var(--border-glass);
  border-radius: 14px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  text-decoration: none;
  color: var(--text-1);
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s;
}
.np-bar.entered {
  opacity: 1;
  transform: translateY(0);
}
.np-bar.live {
  border-color: rgba(29, 185, 84, 0.35);
}

.np-art {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.np-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.np-art i.fa-spotify {
  color: var(--text-2);
  font-size: 16px;
}
.np-eq {
  position: absolute;
  bottom: 3px;
  right: 3px;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 10px;
  padding: 2px 3px;
  background: rgba(5, 8, 16, 0.55);
  border-radius: 3px;
}
.np-eq span {
  width: 2px;
  background: #1db954;
  animation: eq 0.9s ease-in-out infinite;
}
.np-eq span:nth-child(1) {
  height: 40%;
  animation-delay: -0.6s;
}
.np-eq span:nth-child(2) {
  height: 90%;
  animation-delay: -0.3s;
}
.np-eq span:nth-child(3) {
  height: 60%;
  animation-delay: 0s;
}
@keyframes eq {
  0%,
  100% {
    height: 25%;
  }
  50% {
    height: 100%;
  }
}

.np-info {
  min-width: 0;
  flex: 1;
}
.np-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--text-2);
  margin-bottom: 3px;
}
.np-bar.live .np-label {
  color: #1db954;
}
.np-title-row {
  overflow: hidden;
  white-space: nowrap;
  mask-image: linear-gradient(90deg, #000 88%, transparent);
}
.np-title {
  display: inline-block;
  font-size: 13px;
  color: var(--text-1);
}
.np-dash {
  color: var(--text-2);
}
.np-title.marquee {
  padding-right: 40px;
  animation: marquee 8s linear infinite;
  animation-delay: 1.2s;
}
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  85% {
    transform: translateX(calc(-100% + 130px));
  }
  100% {
    transform: translateX(calc(-100% + 130px));
  }
}

.np-badge {
  flex-shrink: 0;
  font-size: 15px;
  color: var(--text-2);
}
.np-bar.live .np-badge {
  color: #1db954;
}

@media (max-width: 720px) {
  .np-bar {
    left: 16px;
    bottom: 16px;
    width: 210px;
    padding: 8px 12px 8px 8px;
  }
}
</style>