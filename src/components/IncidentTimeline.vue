<template>
  <section id="incident-log" class="wrap incident-section">
    <div class="tag">// incident response</div>
    <h2 class="h2">When things <span class="grad-text">break</span>, I fix them</h2>
    <p class="desc">A real production incident — detected, diagnosed, and resolved.</p>

    <div class="incident-card" ref="cardRef">
      <div class="incident-header">
        <span class="mono-label">INCIDENT_LOG // RESOLVED</span>
        <span class="resolved-badge">
          <span class="badge-dot"></span>
          RESOLVED
        </span>
      </div>

      <ol class="timeline">
        <li v-for="(step, i) in steps" :key="step.time" class="timeline-step">
          <div class="node-col">
            <span class="node" :class="step.status"></span>
            <span v-if="i < steps.length - 1" class="node-line"></span>
          </div>
          <div class="step-body">
            <div class="step-head">
              <span class="step-time">{{ step.time }}</span>
              <span class="step-dash">—</span>
              <span class="step-title">{{ step.title }}</span>
            </div>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </li>
      </ol>

      <div class="incident-footer">
        <span class="mono-label">ID: {{ incidentId }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const incidentId = 'INC-0924-A'

const steps = [
  {
    time: '14:02:11',
    title: 'Outage Detected',
    desc: 'Service health check failing, 502 errors on API endpoints.',
    status: 'critical',
  },
  {
    time: '14:04:38',
    title: 'Investigating',
    desc: 'Reviewing deploy logs, checking Render dashboard status.',
    status: 'warning',
  },
  {
    time: '14:11:52',
    title: 'Root Cause Identified',
    desc: 'Build memory limit exceeded during deploy.',
    status: 'warning',
  },
  {
    time: '14:19:07',
    title: 'Service Restored',
    desc: 'Redeployed with adjusted build config, health checks passing.',
    status: 'resolved',
  },
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
.incident-section {
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

.incident-card {
  max-width: 640px;
  background: var(--glass);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  opacity: 0.35;
  transform: translateY(20px) scale(0.98);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
}
.incident-card.active {
  opacity: 1;
  transform: translateY(0) scale(1);
  border-color: var(--border-glass-strong);
}

.incident-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  border-bottom: 1px solid var(--border-glass);
}
.mono-label {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--text-1);
}
.resolved-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #3ddc84;
  border: 1px solid rgba(61, 220, 132, 0.4);
  border-radius: 6px;
  padding: 4px 10px;
}
.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3ddc84;
  box-shadow: 0 0 6px #3ddc84;
}

.timeline {
  list-style: none;
  margin: 0;
  padding: 24px 28px 8px;
}
.timeline-step {
  display: flex;
  gap: 16px;
}
.node-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 3px;
}
.node {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid;
  background: var(--bg-1);
  flex-shrink: 0;
}
.node.critical {
  border-color: #ff5c5c;
  box-shadow: 0 0 8px rgba(255, 92, 92, 0.4);
}
.node.warning {
  border-color: #f5b942;
  box-shadow: 0 0 8px rgba(245, 185, 66, 0.4);
}
.node.resolved {
  border-color: #3ddc84;
  box-shadow: 0 0 8px rgba(61, 220, 132, 0.4);
}
.node-line {
  width: 1px;
  flex: 1;
  min-height: 34px;
  background: var(--border-glass-strong);
  margin: 4px 0;
}
.step-body {
  padding-bottom: 26px;
}
.step-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}
.step-time {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-2);
}
.step-dash {
  color: var(--text-2);
}
.step-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  color: var(--text-1);
}
.step-desc {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.6;
  margin: 0;
}

.incident-footer {
  display: flex;
  align-items: center;
  padding: 16px 28px;
  border-top: 1px solid var(--border-glass);
}
.incident-footer .mono-label {
  color: var(--text-2);
}

@media (max-width: 560px) {
  .incident-header,
  .timeline,
  .incident-footer {
    padding-left: 18px;
    padding-right: 18px;
  }
}
</style>