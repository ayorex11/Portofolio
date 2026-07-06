<template>
  <section id="home" class="hero">
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="wrap hero-inner">
      <div class="tag">full-stack &amp; security engineer — lagos, ng</div>
      <h1 class="h1">Building <span class="grad-text">secure</span> digital experiences</h1>
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
    <div class="scroll-hint">
      <span>scroll</span>
      <div class="line"></div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 60px 0;
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
.hero-inner {
  position: relative;
  z-index: 2;
}
.h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 52px;
  line-height: 1.1;
  margin: 0 0 22px;
  max-width: 680px;
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
.scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
}
.line {
  width: 1px;
  height: 26px;
  background: linear-gradient(var(--cyan), transparent);
  animation: pulse 1.6s ease infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 720px) {
  .h1 {
    font-size: 34px;
  }
  .stats {
    gap: 24px;
  }
}
</style>
