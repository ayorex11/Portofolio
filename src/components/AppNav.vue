<template>
  <nav class="g-nav" :class="{ scrolled }">
    <div class="wrap nav-inner">
      <a href="#home" class="g-logo">&lt;Ayo<span>/</span>&gt;</a>
      <ul class="g-links" :class="{ open: menuOpen }">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" @click="menuOpen = false">{{ link.label }}</a>
        </li>
      </ul>
      <button class="mobile-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const scrolled = ref(false)

const links = [
  { href: '#home', label: 'home' },
  { href: '#about', label: 'about' },
  { href: '#services', label: 'services' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#contact', label: 'contact' },
]

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.g-nav {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(8, 9, 13, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, background 0.3s;
}
.g-nav.scrolled {
  background: rgba(8, 9, 13, 0.85);
  border-bottom-color: var(--border-glass);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
}
.g-logo {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  color: var(--text-1);
  text-decoration: none;
}
.g-logo span {
  color: var(--cyan);
}
.g-links {
  display: flex;
  gap: 28px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.g-links a {
  color: var(--text-2);
  text-decoration: none;
  font-size: 13px;
  font-family: var(--font-mono);
  transition: color 0.2s;
}
.g-links a:hover {
  color: var(--text-1);
}
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-1);
  font-size: 20px;
}

@media (max-width: 720px) {
  .mobile-toggle {
    display: block;
  }
  .g-links {
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(8, 9, 13, 0.97);
    backdrop-filter: blur(16px);
    padding: 24px;
    gap: 20px;
    border-bottom: 1px solid var(--border-glass);
    transform: translateY(-120%);
    transition: transform 0.3s ease;
  }
  .g-links.open {
    transform: translateY(0);
  }
  .g-links a {
    font-size: 15px;
  }
}
</style>
