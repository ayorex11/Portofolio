<template>
  <div v-if="enabled" class="cursor-dot" :style="{ left: x + 'px', top: y + 'px' }"></div>
  <div
    v-if="enabled"
    class="cursor-ring"
    :class="{ hover: isHovering }"
    :style="{ left: x + 'px', top: y + 'px' }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const enabled = ref(false)
const x = ref(-100)
const y = ref(-100)
const isHovering = ref(false)

function handleMove(e) {
  x.value = e.clientX
  y.value = e.clientY
  const target = e.target
  isHovering.value = !!(target.closest && target.closest('a, button, .stack-card'))
}

onMounted(() => {
  enabled.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (enabled.value) {
    window.addEventListener('mousemove', handleMove)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMove)
})
</script>

<style scoped>
.cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cyan);
  z-index: 200;
  pointer-events: none;
  transform: translate(-50%, -50%);
}
.cursor-ring {
  position: fixed;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border-glass);
  z-index: 200;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, border-color 0.2s;
}
.cursor-ring.hover {
  width: 48px;
  height: 48px;
  border-color: var(--cyan);
}
</style>
