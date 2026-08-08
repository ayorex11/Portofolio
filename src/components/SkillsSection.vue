<template>
  <section id="skills" class="wrap skills-section">
    <div class="tag">// tech stack</div>
    <h2 class="h2">Where dev meets <span class="grad-text">defense</span></h2>
    <p class="desc">Sys_scan_complete // core_competencies_mapped</p>

    <div class="bento" ref="bentoRef">
      <div class="bento-box box-wide">
        <div class="box-head">
          <span class="box-index cyan-dot">// 01 DEFENSIVE_ENGINEERING</span>
        </div>
        <h4>Defensive Engineering</h4>
        <div class="chip-row">
          <span class="pill chip" v-for="c in defensiveEngineering" :key="c">{{ c }}</span>
        </div>
      </div>

      <div class="bento-box">
        <div class="box-head">
          <span class="box-index">// 02 RISK_THREAT_MODELING</span>
        </div>
        <h4>Risk &amp; Threat Modeling</h4>
        <ul class="check-list">
          <li v-for="c in riskThreatModeling" :key="c"><i class="fas fa-check"></i>{{ c }}</li>
        </ul>
      </div>

      <div class="bento-box">
        <div class="box-head">
          <span class="box-index">// 03 DEPLOYMENT_OPS</span>
        </div>
        <h4>Deployment &amp; Ops</h4>
        <ul class="check-list">
          <li v-for="c in deploymentOps" :key="c"><i class="fas fa-chevron-right"></i>{{ c }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const defensiveEngineering = ['Django', 'Django REST Framework', 'PostgreSQL', 'Redis']
const riskThreatModeling = ['FAIR Framework', 'Monte Carlo Simulation', 'OWASP Top 10', 'Quantitative Risk Analysis']
const deploymentOps = ['Render', 'Supabase', 'CI/CD', 'Incident Response']

const bentoRef = ref(null)
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('active', entry.isIntersecting))
    },
    { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
  )
  bentoRef.value?.querySelectorAll('.bento-box').forEach((el) => observer.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.skills-section {
  padding: 80px 24px;
}
.h2 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 12px;
  max-width: 420px;
}
.desc {
  color: var(--text-2);
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
  margin-bottom: 40px;
}

.bento {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}
.box-wide {
  grid-row: 1 / span 2;
}
.bento-box {
  background: var(--glass);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 26px 28px;
  opacity: 0.35;
  transform: translateY(20px) scale(0.98);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.bento-box.active {
  opacity: 1;
  transform: translateY(0) scale(1);
  border-color: var(--border-glass-strong);
}
.box-head {
  margin-bottom: 14px;
}
.box-index {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--text-2);
}
.box-index.cyan-dot {
  color: var(--cyan);
}
.box-index.cyan-dot::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  margin-right: 8px;
  box-shadow: 0 0 6px var(--cyan);
}
.bento-box h4 {
  font-family: var(--font-display);
  font-size: 20px;
  margin: 0 0 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-glass);
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.check-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.check-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-1);
}
.check-list li i {
  color: var(--cyan);
  font-size: 11px;
  width: 12px;
  flex-shrink: 0;
}

@media (max-width: 820px) {
  .bento {
    grid-template-columns: 1fr;
  }
  .box-wide {
    grid-row: auto;
  }
}
</style>