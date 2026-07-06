<template>
  <section id="skills" class="wrap sticky-section">
    <div class="sticky-col">
      <div class="tag">// tech stack</div>
      <h2 class="h2">Where dev meets <span class="grad-text">defense</span></h2>
      <p class="desc">A unique combination of development skills and security knowledge.</p>
    </div>
    <div class="stack-col" ref="stackRef">
      <div class="stack-card rings-card">
        <div class="ring-item" v-for="r in rings" :key="r.label">
          <svg class="ring-svg" viewBox="0 0 120 120">
            <circle class="ring-bg" cx="60" cy="60" r="50" />
            <circle
              class="ring-fill"
              cx="60"
              cy="60"
              r="50"
              :style="{ strokeDashoffset: ringOffset(r.progress) }"
            />
          </svg>
          <div class="ring-center">
            <span class="ring-pct">{{ r.progress }}%</span>
            <span class="ring-name">{{ r.label }}</span>
          </div>
        </div>
      </div>

      <div class="stack-card" v-for="group in toolGroups" :key="group.title">
        <i :class="group.icon"></i>
        <h4>{{ group.title }}</h4>
        <div class="tool-cloud">
          <span class="pill" v-for="chip in group.chips" :key="chip">{{ chip }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const circumference = 2 * Math.PI * 50

function ringOffset(pct) {
  return circumference - (pct / 100) * circumference
}

const rings = [
  { label: 'Python & Django', progress: 90 },
  { label: 'API dev', progress: 85 },
  { label: 'Vue.js', progress: 80 },
  { label: 'Security', progress: 75 },
]

const toolGroups = [
  {
    icon: 'fas fa-code',
    title: 'Languages & frameworks',
    chips: ['Python', 'Django', 'Django REST', 'Vue.js', 'JavaScript', 'HTML/CSS'],
  },
  {
    icon: 'fas fa-tools',
    title: 'Tools & platforms',
    chips: ['Git & GitHub', 'REST APIs', 'OWASP', 'NIST', 'Wireshark', 'Burp Suite'],
  },
  {
    icon: 'fas fa-brain',
    title: 'Specialisations',
    chips: ['AI/ML integration', 'PDF processing', 'Auth systems', 'Threat detection'],
  },
]

const stackRef = ref(null)
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('active', entry.isIntersecting))
    },
    { threshold: 0.4, rootMargin: '-15% 0px -15% 0px' }
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
.stack-card > i {
  font-size: 20px;
  color: var(--cyan);
  display: block;
  margin-bottom: 12px;
}
.stack-card h4 {
  font-family: var(--font-display);
  font-size: 18px;
  margin: 0 0 14px;
}
.tool-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rings-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.ring-item {
  position: relative;
  width: 100%;
  max-width: 130px;
  margin: 0 auto;
}
.ring-svg {
  width: 100%;
  transform: rotate(-90deg);
}
.ring-bg,
.ring-fill {
  fill: none;
  stroke-width: 8;
}
.ring-bg {
  stroke: rgba(255, 255, 255, 0.08);
}
.ring-fill {
  stroke: var(--cyan);
  stroke-linecap: round;
  stroke-dasharray: 314.159;
  stroke-dashoffset: 314.159;
  transition: stroke-dashoffset 1.4s ease;
}
.ring-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.ring-pct {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
}
.ring-name {
  font-size: 10px;
  color: var(--text-2);
  max-width: 80px;
}

@media (max-width: 820px) {
  .sticky-section {
    grid-template-columns: 1fr;
  }
  .sticky-col {
    position: static;
  }
}
@media (max-width: 480px) {
  .rings-card {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
