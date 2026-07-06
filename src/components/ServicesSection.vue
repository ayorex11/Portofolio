<template>
  <section id="services" class="wrap sticky-section">
    <div class="sticky-col">
      <div class="tag">// what I do</div>
      <h2 class="h2">My <span class="grad-text">services</span></h2>
      <p class="desc">Professional web development from concept to deployment, with security built in.</p>
    </div>
    <div class="stack-col" ref="stackRef">
      <div class="stack-card" v-for="(s, i) in services" :key="s.title">
        <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
        <i :class="s.icon"></i>
        <h4>{{ s.title }}</h4>
        <p>{{ s.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const services = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Full-stack development',
    desc: 'Building scalable web applications and APIs using Vue, Django, and modern frameworks with focus on performance and user experience.',
  },
  {
    icon: 'fas fa-project-diagram',
    title: 'API architecture',
    desc: 'Designing and implementing RESTful APIs with comprehensive documentation, authentication, rate limiting, and iron-clad security controls.',
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Secure applications',
    desc: 'Integrating security best practices into the development lifecycle — from architecture to deployment, OWASP-aligned by default.',
  },
  {
    icon: 'fas fa-brain',
    title: 'AI integration',
    desc: 'Embedding AI and ML capabilities into web products — from PDF summarisation and audio generation to quiz engines and intelligent search.',
  },
]

const stackRef = ref(null)
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('active', entry.isIntersecting))
    },
    { threshold: 0.5, rootMargin: '-15% 0px -15% 0px' }
  )
  stackRef.value?.querySelectorAll('.stack-card').forEach((el) => observer.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.sticky-section {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 50px;
  padding: 80px 24px;
}
.sticky-col {
  position: sticky;
  top: 100px;
  align-self: start;
  height: fit-content;
}
.h2 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 16px;
  max-width: 360px;
}
.desc {
  color: var(--text-2);
  font-size: 15px;
  line-height: 1.7;
  max-width: 340px;
}
.stack-col {
  display: flex;
  flex-direction: column;
  gap: 26px;
}
.stack-card {
  background: var(--glass);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 26px 28px;
  opacity: 0.35;
  transform: translateY(20px) scale(0.98);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.stack-card.active {
  opacity: 1;
  transform: translateY(0) scale(1);
  border-color: var(--border-glass-strong);
}
.stack-card i {
  font-size: 20px;
  color: var(--cyan);
  display: block;
  margin-bottom: 12px;
}
.idx {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--cyan);
  display: block;
  margin-bottom: 10px;
}
.stack-card h4 {
  font-family: var(--font-display);
  font-size: 18px;
  margin: 0 0 8px;
}
.stack-card p {
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 820px) {
  .sticky-section {
    grid-template-columns: 1fr;
  }
  .sticky-col {
    position: static;
  }
}
</style>
