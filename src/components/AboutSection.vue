<template>
  <section id="about" class="about wrap">
    <div class="tag">// about me</div>
    <div class="about-grid">
      <div class="image-col">
        <div class="image-frame">
          <img src="/ayo.jpeg" alt="Ayomide Adewale" />
        </div>
        <div class="badge">
          <span class="badge-num">4+</span>
          <span class="badge-text">years<br />experience</span>
        </div>
      </div>
      <div class="text-col">
        <h2 class="h2">Who <span class="grad-text">I am</span></h2>
        <p class="lead">
          A <strong>full-stack developer</strong> and <strong>security-minded engineer</strong>
          based in Lagos, Nigeria. I combine development excellence with security awareness to
          build applications that are functional, beautiful, and resilient.
        </p>
        <p class="body-text">
          My journey started with a passion for solving real problems through code. Along the way
          I developed a deep understanding of security principles — now everything I build has
          that layer baked in from the start. Graduating with First Class Honours in Cyber
          Security from <strong>Caleb University</strong> in 2026, and currently building
          <strong>SocraSeek</strong>, my own AI EdTech platform serving 100+ active users.
        </p>
        <div class="tags">
          <span class="pill" v-for="t in techTags" :key="t">{{ t }}</span>
        </div>
        <div class="socials">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
            :aria-label="s.label"
            class="social-btn"
          >
            <i :class="s.icon"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const techTags = ['Python', 'Django', 'Vue.js', 'REST APIs', 'AI/ML', 'OWASP']
const socials = [
  { label: 'LinkedIn', icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/ayomide-adewale-b0899922b/' },
  { label: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/ayorex11' },
  { label: 'YouTube', icon: 'fab fa-youtube', href: 'https://www.youtube.com/@Adewale-Ayomide' },
  { label: 'Medium', icon: 'fab fa-medium', href: 'https://medium.com/@adewalemaxwell11' },
]
</script>

<style scoped>
.about {
  padding: 100px 24px;
}
.about-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 60px;
  align-items: center;
}
.image-col {
  position: relative;
}
.image-frame {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border-glass);
  background: var(--glass);
}
.image-frame img {
  width: 100%;
  display: block;
  filter: saturate(0.9) contrast(1.05);
}
.badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: var(--glass-strong);
  border: 1px solid var(--border-glass-strong);
  backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.badge-num {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--cyan);
}
.badge-text {
  font-size: 9px;
  color: var(--text-2);
  text-align: center;
  line-height: 1.3;
}
.h2 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 20px;
}
.lead {
  font-size: 17px;
  line-height: 1.7;
  margin-bottom: 16px;
}
.body-text {
  color: var(--text-2);
  font-size: 15px;
  line-height: 1.75;
  margin-bottom: 26px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
}
.socials {
  display: flex;
  gap: 12px;
}
.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--glass);
  border: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-1);
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}
.social-btn:hover {
  border-color: var(--cyan);
  color: var(--cyan);
}

@media (max-width: 820px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .image-col {
    max-width: 280px;
    margin: 0 auto;
  }
}
</style>
