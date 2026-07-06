<template>
  <div class="game-modal">
    <div class="game-container">
      <div class="game-header">
        <h2><i class="fas fa-th"></i> Tic-Tac-Toe</h2>
        <button class="game-close" @click="$emit('close')"><i class="fas fa-times"></i></button>
      </div>
      <div class="game-info">
        <div class="player-info"><span>You</span><span class="symbol">X</span></div>
        <div class="game-status">{{ statusText }}</div>
        <div class="player-info"><span>AI bot</span><span class="symbol ai">O</span></div>
      </div>
      <div class="game-board">
        <div
          v-for="(cell, i) in board"
          :key="i"
          class="game-cell"
          :class="{ filled: cell }"
          @click="playerMove(i)"
        >
          {{ cell }}
        </div>
      </div>
      <div class="game-controls">
        <button class="btn btn-primary" @click="resetBoard"><i class="fas fa-redo"></i> New game</button>
        <div class="game-score">
          <div class="score-item"><span>Wins</span><b>{{ score.wins }}</b></div>
          <div class="score-item"><span>Draws</span><b>{{ score.draws }}</b></div>
          <div class="score-item"><span>Losses</span><b>{{ score.losses }}</b></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

defineEmits(['close'])

const board = ref(Array(9).fill(null))
const gameOver = ref(false)
const score = reactive({ wins: 0, draws: 0, losses: 0 })
const statusText = ref('Your turn')

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function checkWinner(b) {
  for (const [a, c, d] of lines) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]
  }
  return b.every((cell) => cell) ? 'draw' : null
}

function playerMove(i) {
  if (gameOver.value || board.value[i]) return
  board.value[i] = 'X'
  const result = checkWinner(board.value)
  if (result) return finishGame(result)
  statusText.value = 'AI thinking...'
  setTimeout(aiMove, 350)
}

function aiMove() {
  const best = minimax(board.value, 'O').index
  board.value[best] = 'O'
  const result = checkWinner(board.value)
  if (result) return finishGame(result)
  statusText.value = 'Your turn'
}

function finishGame(result) {
  gameOver.value = true
  if (result === 'draw') {
    statusText.value = "It's a draw"
    score.draws++
  } else if (result === 'X') {
    statusText.value = 'You win!'
    score.wins++
  } else {
    statusText.value = 'AI wins'
    score.losses++
  }
}

function minimax(b, player) {
  const avail = b.map((v, i) => (v ? null : i)).filter((v) => v !== null)
  const winner = checkWinner(b)
  if (winner === 'O') return { score: 10 }
  if (winner === 'X') return { score: -10 }
  if (winner === 'draw') return { score: 0 }

  const moves = []
  for (const i of avail) {
    const newBoard = b.slice()
    newBoard[i] = player
    const result = minimax(newBoard, player === 'O' ? 'X' : 'O')
    moves.push({ index: i, score: result.score })
  }

  if (player === 'O') {
    return moves.reduce((best, m) => (m.score > best.score ? m : best))
  }
  return moves.reduce((best, m) => (m.score < best.score ? m : best))
}

function resetBoard() {
  board.value = Array(9).fill(null)
  gameOver.value = false
  statusText.value = 'Your turn'
}
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
  max-width: 380px;
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
.game-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-2);
}
.player-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.symbol {
  font-size: 20px;
  font-weight: 700;
  color: var(--cyan);
}
.symbol.ai {
  color: var(--violet);
}
.game-status {
  font-size: 13px;
  color: var(--text-1);
}
.game-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 24px;
}
.game-cell {
  aspect-ratio: 1;
  background: var(--glass);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--cyan);
}
.game-cell:not(.filled):hover {
  border-color: var(--cyan);
}
.game-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
.game-score {
  display: flex;
  gap: 20px;
}
.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  color: var(--text-2);
  font-family: var(--font-mono);
}
.score-item b {
  font-size: 16px;
  color: var(--text-1);
  font-family: var(--font-display);
}
</style>
