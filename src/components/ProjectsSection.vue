<template>
  <section id="projects" class="wrap sticky-section">
    <div class="sticky-col">
      <div class="tag">// selected work</div>
      <h2 class="h2">Projects that <span class="grad-text">carry weight</span></h2>
      <p class="desc">Real-world applications built from the ground up.</p>
    </div>
    <div class="stack-col" ref="stackRef">
      <a
        v-for="p in projects"
        :key="p.title"
        class="stack-card"
        :class="{ featured: p.featured }"
        :href="p.link"
        target="_blank"
        rel="noopener"
      >
        <div class="card-top">
          <i :class="p.icon"></i>
          <span v-if="p.badge" class="pill badge">{{ p.badge }}</span>
        </div>
        <h4>{{ p.title }}</h4>
        <p>{{ p.desc }}</p>

        <!-- ERD diagram visual (HallPass) -->
        <div v-if="p.visual === 'erd'" class="visual-box erd-box">
          <svg viewBox="0 0 460 160" class="erd-svg">
            <line x1="80" y1="80" x2="230" y2="80" class="erd-line" />
            <line x1="80" y1="40" x2="230" y2="40" class="erd-line" />
            <line x1="80" y1="120" x2="230" y2="120" class="erd-line" />
            <line x1="290" y1="80" x2="380" y2="80" class="erd-line" />
            <rect x="20" y="55" width="90" height="50" rx="6" class="erd-node" />
            <text x="65" y="85" class="erd-label">STUDENT</text>
            <rect x="200" y="55" width="90" height="50" rx="6" class="erd-node" />
            <text x="245" y="85" class="erd-label">ROOM</text>
            <rect x="360" y="55" width="90" height="50" rx="6" class="erd-node" />
            <text x="405" y="85" class="erd-label">PAYMENT</text>
            <text x="150" y="72" class="erd-rel">1:N</text>
            <text x="330" y="72" class="erd-rel">1:N</text>
          </svg>
          <div class="api-row">
            <span class="method-badge get">GET</span>
            <span class="endpoint">/api/v1/allocations/</span>
            <span class="api-status"></span>
          </div>
        </div>

        <!-- Risk curve chart visual (ScenarioForge) -->
        <div v-else-if="p.visual === 'chart'" class="visual-box chart-box">
          <svg viewBox="0 0 460 160" class="chart-svg">
            <line x1="40" y1="10" x2="40" y2="140" class="chart-axis" />
            <line x1="40" y1="140" x2="450" y2="140" class="chart-axis" />
            <path
              d="M40,20 C120,25 160,60 220,95 C280,125 340,138 450,140"
              class="chart-line"
              fill="none"
            />
            <path
              d="M40,20 C120,25 160,60 220,95 C280,125 340,138 450,140 L450,140 L40,140 Z"
              class="chart-fill"
            />
          </svg>
          <div class="chart-meta">
            <span>risk_model: FAIR</span>
            <span>simulations: 10,000</span>
            <span>output: loss_distribution</span>
          </div>
        </div>

        <div class="tool-cloud">
          <span class="pill" v-for="chip in p.tech" :key="chip">{{ chip }}</span>
        </div>
        <span class="link-line">{{ p.linkLabel }} <i class="fas fa-arrow-up-right-from-square"></i></span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const projects = [
  {
    icon: 'fas fa-brain',
    badge: 'Featured',
    title: 'SocraSeek AI learning platform',
    desc: 'Full-stack AI application that helps students summarize PDFs, generate audio summaries, and create interactive quizzes for enhanced learning retention.',
    tech: ['Vue', 'AI/ML', 'Full-stack', 'PDF processing'],
    link: 'https://www.socraseek.com/',
    linkLabel: 'View live app',
    featured: true,
  },
  {
    icon: 'fas fa-chart-line',
    badge: 'Final year project',
    title: 'ScenarioForge',
    desc: 'Web application enabling organisations to manage third-party vendors and simulate cyberattacks using parameterised inputs, generating quantified financial risk figures based on the FAIR framework.',
    tech: ['Django', 'Vue 3', 'FAIR framework', 'PostgreSQL'],
    link: 'https://www.scenarioforge.xyz/',
    linkLabel: 'View live app',
    featured: true,
    visual: 'chart',
  },
  {
    icon: 'fas fa-bed',
    badge: 'Buildathon',
    title: 'HallPass',
    desc: 'Full-stack hostel allocation system with Paystack payment integration and QR-coded receipts, built for a Smart Campus Buildathon.',
    tech: ['Vue 3', 'Pinia', 'DRF', 'PostgreSQL', 'Paystack'],
    link: 'https://github.com/ayorex11/hallpassfrontend',
    linkLabel: 'View on GitHub',
    featured: true,
    visual: 'erd',
  },
  {
    icon: 'fas fa-network-wired',
    title: 'PCAP file analyzer',
    desc: 'Advanced network traffic analysis tool that generates comprehensive analysis on PCAP files for security auditing and threat detection.',
    tech: ['Python', 'Network analysis', 'Security'],
    link: 'https://github.com/ayorex11/pcap-analyzer',
    linkLabel: 'View on GitHub',
  },
  {
    icon: 'fas fa-utensils',
    title: 'TheLifeStation digital menu',
    desc: 'Interactive digital menu platform for a Lekki-based restaurant, providing seamless browsing experience for customers to explore items and categories.',
    tech: ['Django', 'Full-stack', 'UI/UX'],
    link: 'https://thelifestation.pythonanywhere.com/menu/thelifestation-restaurant/',
    linkLabel: 'View live menu',
  },
  {
    icon: 'fas fa-code',
    title: 'EkoPages API',
    desc: 'Secure, scalable API architecture for an educational platform focused on SDGs, with comprehensive security controls and authentication.',
    tech: ['Django', 'REST API', 'Security'],
    link: 'https://ekopages.com/',
    linkLabel: 'View project',
  },
  {
    icon: 'fas fa-envelope',
    title: 'Email threat analyzer',
    desc: 'Advanced email analysis system to detect phishing attempts and malicious content with automated threat intelligence integration.',
    tech: ['Python', 'OSINT', 'Threat intel'],
    link: 'https://github.com/ayorex11/email-analysis',
    linkLabel: 'View on GitHub',
  },
  {
    icon: 'fas fa-shield-virus',
    title: 'Malware scanner',
    desc: 'Automated vulnerability assessment tool that scans systems for malware based on file hash analysis and behavioral patterns.',
    tech: ['Python', 'Hash analysis', 'Security'],
    link: 'https://github.com/ayorex11/malware-scanner',
    linkLabel: 'View on GitHub',
  },
  {
    icon: 'fas fa-cloud',
    title: 'Weather API',
    desc: 'Django REST framework implementation with proper authentication, rate limiting, and comprehensive API documentation.',
    tech: ['Django', 'REST API', 'Docs'],
    link: 'https://github.com/ayorex11/weatherAPP',
    linkLabel: 'View on GitHub',
  },
]

const stackRef = ref(null)
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('active', entry.isIntersecting))
    },
    { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' }
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
  display: block;
  text-decoration: none;
  color: var(--text-1);
}
.stack-card.active {
  opacity: 1;
  transform: translateY(0) scale(1);
  border-color: var(--border-glass-strong);
}
.stack-card.featured {
  border-color: rgba(123, 97, 255, 0.35);
}
.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.card-top i {
  font-size: 20px;
  color: var(--cyan);
}
.badge {
  color: var(--violet);
  border-color: rgba(123, 97, 255, 0.35);
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
  margin: 0 0 14px;
}
.tool-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.link-line {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--cyan);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.visual-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 16px;
}
.erd-svg,
.chart-svg {
  width: 100%;
  height: auto;
  display: block;
}
.erd-node {
  fill: rgba(0, 212, 255, 0.05);
  stroke: var(--border-glass-strong);
  stroke-width: 1;
}
.erd-label {
  fill: var(--text-1);
  font-family: var(--font-mono);
  font-size: 11px;
  text-anchor: middle;
  dominant-baseline: middle;
}
.erd-line {
  stroke: rgba(0, 212, 255, 0.3);
  stroke-width: 1;
}
.erd-rel {
  fill: var(--text-2);
  font-family: var(--font-mono);
  font-size: 9px;
  text-anchor: middle;
}
.api-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-glass);
  font-family: var(--font-mono);
  font-size: 12px;
}
.method-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
}
.method-badge.get {
  background: rgba(61, 220, 132, 0.12);
  color: #3ddc84;
}
.endpoint {
  color: var(--text-2);
}
.api-status {
  margin-left: auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3ddc84;
  box-shadow: 0 0 6px #3ddc84;
}

.chart-axis {
  stroke: var(--border-glass);
  stroke-width: 1;
}
.chart-line {
  stroke: var(--cyan);
  stroke-width: 2;
}
.chart-fill {
  fill: url(#none);
  fill: rgba(0, 212, 255, 0.08);
  stroke: none;
}
.chart-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border-glass);
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-2);
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