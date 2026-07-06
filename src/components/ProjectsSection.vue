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

@media (max-width: 820px) {
  .sticky-section {
    grid-template-columns: 1fr;
  }
  .sticky-col {
    position: static;
  }
}
</style>
