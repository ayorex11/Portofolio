<template>
  <div class="game-menu" v-if="menuOpen">
    <button class="game-menu-item" @click="openGame('tictactoe')">
      <i class="fas fa-th"></i><span>Tic-Tac-Toe</span>
    </button>
    <button class="game-menu-item" @click="openGame('snake')">
      <i class="fas fa-bug"></i><span>Snake</span>
    </button>
  </div>
  <button class="game-button" @click="menuOpen = !menuOpen" title="Play games">
    <i class="fas fa-gamepad"></i>
  </button>

  <TicTacToeModal v-if="activeGame === 'tictactoe'" @close="activeGame = null" />
  <SnakeModal v-if="activeGame === 'snake'" @close="activeGame = null" />
</template>

<script setup>
import { ref } from 'vue'
import TicTacToeModal from './TicTacToeModal.vue'
import SnakeModal from './SnakeModal.vue'

const menuOpen = ref(false)
const activeGame = ref(null)

function openGame(name) {
  activeGame.value = name
  menuOpen.value = false
}
</script>

<style scoped>
.game-button {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(120deg, var(--cyan), var(--violet));
  border: none;
  color: #050810;
  font-size: 20px;
  z-index: 40;
  box-shadow: 0 8px 24px rgba(0, 212, 255, 0.25);
}
.game-menu {
  position: fixed;
  bottom: 96px;
  right: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 40;
}
.game-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--glass-strong);
  border: 1px solid var(--border-glass);
  backdrop-filter: blur(14px);
  color: var(--text-1);
  padding: 10px 16px;
  border-radius: 12px;
  font-family: var(--font-mono);
  font-size: 13px;
  white-space: nowrap;
}
.game-menu-item i {
  color: var(--cyan);
}
</style>
