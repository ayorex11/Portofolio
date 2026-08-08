<template>
  <section id="verified-proof" class="wrap proof-section">
    <div class="tag">// verified_proof</div>
    <h2 class="h2">Not just claims — <span class="grad-text">receipts</span></h2>
    <p class="desc">Live systems, real credentials, active contributions. Everything below is checkable.</p>

    <div class="proof-card" ref="cardRef">
      <div class="proof-row github-row">
        <div class="row-label">
          <span class="status-dot"></span>
          <span class="mono-label">GITHUB_ACTIVITY</span>
        </div>
        <a
          class="gh-graph-link"
          href="https://github.com/ayorex11"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            class="gh-graph"
            src="https://ghchart.rshah.org/00d4ff/ayorex11"
            alt="Ayo's GitHub contribution graph"
            loading="lazy"
          />
        </a>
      </div>

      <div class="proof-divider"></div>

      <div class="proof-row">
        <div class="row-label">
          <span class="mono-label">LIVE_DEPLOYMENTS</span>
        </div>
        <div class="live-links">
          <a
            v-for="link in liveLinks"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="live-link"
          >
            <span class="live-dot"></span>
            <span>{{ link.label }}</span>
            <span class="live-arrow">→</span>
          </a>
        </div>
      </div>

      <div class="proof-divider"></div>

      <div class="proof-row credentials-row">
        <div class="row-label">
          <span class="mono-label">CREDENTIALS</span>
        </div>
        <div class="credentials-list">
          <div class="credential">
            <i class="fas fa-graduation-cap"></i>
            <span>BSc Cybersecurity — Caleb University</span>
          </div>
          <div class="credential">
            <i class="fas fa-users"></i>
            <span>GDG Instructor — Caleb University</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const liveLinks = [
  { label: 'scenarioforge.xyz', url: 'https://scenarioforge.xyz' },
  { label: 'socraseek.com', url: 'https://www.socraseek.com/' },
  { label: 'csc405.vercel.app', url: 'https://csc405.vercel.app' },
]

const cardRef = ref(null)
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('active', entry.isIntersecting))
    },
    { threshold: 0.2, rootMargin: '-10% 0px -10% 0px' }
  )
  if (cardRef.value) observer.observe(cardRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.proof-section {
  padding: 80px 24px;
}
.h2 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 12px;
  max-width: 480px;
}
.desc {
  color: var(--text-2);
  font-size: 15px;
  line-height: 1.7;
  max-width: 460px;
  margin-bottom: 40px;
}

.proof-card {
  background: var(--glass);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 8px 0;
  opacity: 0.35;
  transform: translateY(20px) scale(0.98);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.proof-card.active {
  opacity: 1;
  transform: translateY(0) scale(1);
  border-color: var(--border-glass-strong);
}

.proof-row {
  padding: 24px 28px;
}
.proof-divider {
  height: 1px;
  background: var(--border-glass);
  margin: 0 28px;
}

.row-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.mono-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--text-2);
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 8px var(--cyan);
}

.gh-graph-link {
  display: block;
  line-height: 0;
}
.gh-graph {
  width: 100%;
  height: auto;
  filter: brightness(0.9) saturate(1.1);
  border-radius: 6px;
}

.live-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.live-link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-1);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  padding: 10px 14px;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.live-link:hover {
  border-color: var(--border-glass-strong);
  background: rgba(0, 212, 255, 0.06);
}
.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3ddc84;
  flex-shrink: 0;
}
.live-arrow {
  margin-left: auto;
  color: var(--cyan);
}

.credentials-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.credential {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-1);
}
.credential i {
  color: var(--violet);
  width: 16px;
  text-align: center;
  flex-shrink: 0;
}

@media (max-width: 560px) {
  .proof-row {
    padding: 20px 18px;
  }
  .proof-divider {
    margin: 0 18px;
  }
}
</style>