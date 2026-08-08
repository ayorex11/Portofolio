<template>
  <section id="home" class="hero">
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="wrap hero-grid">
      <div class="hero-inner">
        <div class="tag">full-stack &amp; security engineer — lagos, ng</div>
        <h1 class="h1">Building <span class="grad-text">scalable Python backends</span>, hardened against modern threat vectors</h1>
        <p class="sub">
          Full-stack developer and cybersecurity specialist crafting fast, resilient web
          applications with Vue, Django, and applied security thinking.
        </p>
        <div class="ctas">
          <a class="btn btn-primary" href="#projects"><i class="fas fa-arrow-right"></i> view work</a>
          <a
            class="btn btn-secondary"
            href="https://drive.google.com/drive/folders/1NcPpXLt8Mx8waYrS5o4mPcOyMfmCjBWJ"
            target="_blank"
            rel="noopener"
          >
            <i class="fas fa-download"></i> download cv
          </a>
        </div>
        <div class="stats">
          <div class="stat"><b>4+</b><span>years exp.</span></div>
          <div class="stat"><b>10+</b><span>projects</span></div>
          <div class="stat"><b>100+</b><span>active users</span></div>
        </div>
      </div>

      <div class="status-panel">
        <div class="status-head">
          <span class="mono-label">SYS_STATUS // LIVE</span>
          <span class="status-dots"><span></span><span></span><span></span></span>
        </div>
        <ul class="status-list">
          <li v-for="s in statusItems" :key="s.label">
            <span class="s-dot" :class="s.color"></span>
            <span class="s-label">{{ s.label }}:</span>
            <span class="s-value" :class="s.color">{{ s.value }}</span>
          </li>
        </ul>
        <div class="status-prompt">&gt; <span class="cursor-blink">_</span></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const statusItems = [
  { label: 'Django Server', value: 'Operational', color: 'green' },
  { label: 'API Gateway Latency', value: '42ms', color: 'cyan' },
  { label: 'Deployment: Render', value: 'Active', color: 'green' },
]
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 140px 0 100px;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}
.orb-a {
  width: 420px;
  height: 420px;
  background: var(--cyan);
  opacity: 0.12;
  top: -100px;
  left: -120px;
}
.orb-b {
  width: 380px;
  height: 380px;
  background: var(--violet);
  opacity: 0.14;
  top: 120px;
  right: -140px;
}
.hero-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;
}
.h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 46px;
  line-height: 1.15;
  margin: 0 0 22px;
}
.sub {
  color: var(--text-2);
  font-size: 16px;
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 34px;
}
.ctas {
  display: flex;
  gap: 14px;
  margin-bottom: 44px;
  flex-wrap: wrap;
}
.stats {
  display: flex;
  gap: 36px;
}
.stat b {
  font-family: var(--font-display);
  font-size: 24px;
  display: block;
}
.stat span {
  color: var(--text-2);
  font-size: 12px;
  font-family: var(--font-mono);
}

.status-panel {
  background: var(--glass);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 22px 24px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}
.status-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-glass);
}
.mono-label {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--text-1);
}
.status-dots {
  display: flex;
  gap: 5px;
}
.status-dots span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-2);
  opacity: 0.5;
}
.status-list {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.status-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 13px;
}
.s-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.s-dot.green {
  background: #3ddc84;
  box-shadow: 0 0 6px #3ddc84;
}
.s-dot.cyan {
  background: var(--cyan);
  box-shadow: 0 0 6px var(--cyan);
}
.s-label {
  color: var(--text-2);
}
.s-value {
  margin-left: auto;
}
.s-value.green {
  color: #3ddc84;
}
.s-value.cyan {
  color: var(--cyan);
}
.status-prompt {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-2);
}
.cursor-blink {
  animation: blink 1.1s step-end infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 720px) {
  .h1 {
    font-size: 32px;
  }
  .stats {
    gap: 24px;
  }
}
</style>