<template>
  <div class="game-modal">
    <div class="game-container">
      <div class="game-header">
        <h2><i class="fas fa-bug"></i> Snake challenge</h2>
        <button class="game-close" @click="$emit('close')"><i class="fas fa-times"></i></button>
      </div>
      <div class="snake-stats">
        <div class="stat-box"><span>Score</span><b>{{ score }}</b></div>
        <div class="stat-box"><span>High score</span><b>{{ highScore }}</b></div>
        <div class="stat-box"><span>Speed</span><b>{{ speedLabel }}</b></div>
      </div>
      <div class="snake-area">
        <canvas ref="canvasRef" width="360" height="360"></canvas>
        <div class="overlay" v-if="!running">
          <div class="overlay-content">
            <h3>{{ overlayTitle }}</h3>
            <p>Use arrow keys or WASD to control the snake.</p>
            <button class="btn btn-primary" @click="startGame"><i class="fas fa-play"></i> Start game</button>
          </div>
        </div>
      </div>
      <div class="snake-controls">
        <select class="control-select" v-model="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="extreme">Extreme</option>
        </select>
        <button class="control-btn" @click="aiMode = !aiMode">
          <i class="fas fa-robot"></i> AI: {{ aiMode ? 'ON' : 'OFF' }}
        </button>
        <button class="control-btn" @click="paused = !paused" v-if="running">
          <i :class="paused ? 'fas fa-play' : 'fas fa-pause'"></i> {{ paused ? 'Resume' : 'Pause' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'

defineEmits(['close'])

const GRID = 18
const CELL = 20

const canvasRef = ref(null)
const score = ref(0)
const highScore = ref(0)
const running = ref(false)
const paused = ref(false)
const difficulty = ref('medium')
const aiMode = ref(false)
const overlayTitle = ref('Ready to play?')

const speeds = { easy: 180, medium: 130, hard: 90, extreme: 60 }
const speedLabel = computed(() => ({ easy: '1x', medium: '1.5x', hard: '2x', extreme: '3x' }[difficulty.value]))

let ctx
let snake = []
let dir = { x: 1, y: 0 }
let nextDir = { x: 1, y: 0 }
let food = { x: 5, y: 5 }
let loopId

function randomFood() {
  let pos
  do {
    pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y))
  return pos
}

function resetState() {
  snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }]
  dir = { x: 1, y: 0 }
  nextDir = { x: 1, y: 0 }
  food = randomFood()
  score.value = 0
  paused.value = false
}

function startGame() {
  resetState()
  running.value = true
  clearInterval(loopId)
  loopId = setInterval(tick, speeds[difficulty.value])
}

function endGame(message) {
  running.value = false
  overlayTitle.value = message
  clearInterval(loopId)
  if (score.value > highScore.value) highScore.value = score.value
}

function tick() {
  if (paused.value) return

  if (aiMode.value) {
    nextDir = computeAiDirection()
  }
  dir = nextDir

  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y }

  if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
    return endGame('You crashed!')
  }
  if (snake.some((s) => s.x === head.x && s.y === head.y)) {
    return endGame('You crashed!')
  }

  snake.unshift(head)
  if (head.x === food.x && head.y === food.y) {
    score.value += 10
    food = randomFood()
  } else {
    snake.pop()
  }

  draw()
}

function computeAiDirection() {
  const head = snake[0]
  const options = [
    { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
  ].filter((d) => !(d.x === -dir.x && d.y === -dir.y))

  let best = dir
  let bestDist = Infinity
  for (const o of options) {
    const nx = head.x + o.x
    const ny = head.y + o.y
    if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID) continue
    if (snake.some((s) => s.x === nx && s.y === ny)) continue
    const dist = Math.abs(food.x - nx) + Math.abs(food.y - ny)
    if (dist < bestDist) {
      bestDist = dist
      best = o
    }
  }
  return best
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, GRID * CELL, GRID * CELL)
  ctx.fillStyle = 'rgba(255,255,255,0.02)'
  ctx.fillRect(0, 0, GRID * CELL, GRID * CELL)

  ctx.fillStyle = '#7b61ff'
  ctx.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6)

  snake.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? '#00d4ff' : 'rgba(0,212,255,0.55)'
    ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2)
  })
}

function handleKey(e) {
  const map = {
    ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
  }
  const d = map[e.key]
  if (!d || aiMode.value) return
  if (d.x === -dir.x && d.y === -dir.y) return
  nextDir = d
}

let touchStart = null
function handleTouchStart(e) {
  touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY }
}
function handleTouchEnd(e) {
  if (!touchStart || aiMode.value) return
  const dx = e.changedTouches[0].clientX - touchStart.x
  const dy = e.changedTouches[0].clientY - touchStart.y
  if (Math.abs(dx) > Math.abs(dy)) {
    nextDir = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 }
  } else {
    nextDir = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 }
  }
}

watch(difficulty, () => {
  if (running.value) {
    clearInterval(loopId)
    loopId = setInterval(tick, speeds[difficulty.value])
  }
})

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  resetState()
  draw()
  window.addEventListener('keydown', handleKey)
  canvasRef.value.addEventListener('touchstart', handleTouchStart)
  canvasRef.value.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  clearInterval(loopId)
  window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
.game-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(5, 6, 10, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.game-container {
  background: var(--bg-1);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 420px;
}
.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.game-header h2 {
  font-family: var(--font-display);
  font-size: 18px;
  margin: 0;
}
.game-close {
  background: none;
  border: none;
  color: var(--text-2);
  font-size: 18px;
}
.snake-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-2);
}
.stat-box b {
  font-size: 18px;
  color: var(--text-1);
  font-family: var(--font-display);
}
.snake-area {
  position: relative;
  margin-bottom: 18px;
}
canvas {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 14px;
  border: 1px solid var(--border-glass);
  background: #0b0d14;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 9, 13, 0.85);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay-content {
  text-align: center;
  padding: 20px;
}
.overlay-content h3 {
  font-family: var(--font-display);
  margin: 0 0 8px;
}
.overlay-content p {
  color: var(--text-2);
  font-size: 13px;
  margin: 0 0 18px;
}
.snake-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.control-select,
.control-btn {
  background: var(--glass);
  border: 1px solid var(--border-glass);
  color: var(--text-1);
  padding: 9px 14px;
  border-radius: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
}
</style>
