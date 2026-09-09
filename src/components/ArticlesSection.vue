<template>
  <section id="writing" class="wrap writing-section">
    <div class="tag">// technical writing</div>
    <h2 class="h2">Labs solved, <span class="grad-text">write-ups shared</span></h2>
    <p class="desc">Walkthroughs of blue-team labs and other technical deep-dives, posted on Medium.</p>

    <div v-if="loading" class="fetch-status">
      <span class="cursor-blink">&gt;</span> fetching_latest_posts...
    </div>

    <div v-else class="article-grid" ref="gridRef">
      <a v-for="a in articles" :key="a.link" class="article-card" :href="a.link" target="_blank" rel="noopener">
        <div class="card-top">
          <i class="fab fa-medium"></i>
          <span v-if="a.date" class="pill date-pill">{{ a.date }}</span>
        </div>
        <h4>{{ a.title }}</h4>
        <p v-if="a.excerpt">{{ a.excerpt }}</p>
        <span class="link-line">read on medium <i class="fas fa-arrow-up-right-from-square"></i></span>
      </a>
    </div>

    <a class="all-posts" href="https://medium.com/@adewalemaxwell11" target="_blank" rel="noopener">
      view all posts on medium <i class="fas fa-arrow-right"></i>
    </a>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const MEDIUM_USERNAME = 'adewalemaxwell11'
const FEED_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  `https://medium.com/feed/@${MEDIUM_USERNAME}`
)}`

const fallbackArticles = [
  {
    title: 'DANABOT: The Tale of A DDoS Attack',
    link: 'https://medium.com/@adewalemaxwell11',
    excerpt: 'A blue-team walkthrough breaking down a DanaBot-driven DDoS incident.',
  },
  {
    title: "CyberDefender's Insider Lab using FTK Imager",
    link: 'https://medium.com/@adewalemaxwell11',
    excerpt: 'Investigating an insider-threat scenario with FTK Imager, step by step.',
  },
  {
    title: "CyberDefenders' 3CX Supply Chain Lab",
    link: 'https://medium.com/@adewalemaxwell11',
    excerpt: 'Analysing the 3CX supply-chain compromise from a defender\u2019s perspective.',
  },
  {
    title: 'The Price of Convenience: When Extensions Go Rogue',
    link: 'https://medium.com/@adewalemaxwell11',
    excerpt: 'Unpacking "FakeGPT," a malicious browser extension, in a hands-on lab.',
  },
  {
    title: 'GrabThePhisher',
    link: 'https://medium.com/@adewalemaxwell11',
    excerpt: 'Working through a phishing investigation lab end to end.',
  },
]

const articles = ref(fallbackArticles)
const loading = ref(true)
const gridRef = ref(null)
let observer

function stripHtml(html) {
  const el = document.createElement('div')
  el.innerHTML = html || ''
  return (el.textContent || el.innerText || '').trim()
}

function truncate(text, max = 130) {
  if (text.length <= max) return text
  return text.slice(0, max).replace(/\s+\S*$/, '') + '\u2026'
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

async function loadArticles() {
  try {
    const res = await fetch(FEED_URL)
    if (!res.ok) throw new Error('feed request failed')
    const data = await res.json()
    if (data.status === 'ok' && Array.isArray(data.items) && data.items.length) {
      articles.value = data.items.slice(0, 6).map((item) => ({
        title: item.title,
        link: item.link,
        date: formatDate(item.pubDate),
        excerpt: truncate(stripHtml(item.description), 130),
      }))
    }
  } catch (e) {
    // Keep the fallback list — the section never ends up empty.
  } finally {
    loading.value = false
    observeCards()
  }
}

function observeCards() {
  requestAnimationFrame(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.target.classList.toggle('active', entry.isIntersecting))
      },
      { threshold: 0.2, rootMargin: '-5% 0px -5% 0px' }
    )
    gridRef.value?.querySelectorAll('.article-card').forEach((el) => observer.observe(el))
  })
}

onMounted(loadArticles)
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.writing-section {
  padding: 80px 24px;
}
.h2 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 16px;
  max-width: 420px;
}
.desc {
  color: var(--text-2);
  font-size: 15px;
  line-height: 1.7;
  max-width: 460px;
  margin-bottom: 40px;
}

.fetch-status {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-2);
  padding: 20px 0;
}
.cursor-blink {
  animation: blink 1.1s step-end infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.article-card {
  background: var(--glass);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 24px 26px;
  text-decoration: none;
  color: var(--text-1);
  display: flex;
  flex-direction: column;
  opacity: 0.4;
  transform: translateY(16px);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.article-card.active {
  opacity: 1;
  transform: translateY(0);
  border-color: var(--border-glass-strong);
}
.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.card-top i {
  font-size: 18px;
  color: var(--text-1);
}
.date-pill {
  color: var(--text-2);
}
.article-card h4 {
  font-family: var(--font-display);
  font-size: 16px;
  line-height: 1.4;
  margin: 0 0 10px;
}
.article-card p {
  color: var(--text-2);
  font-size: 13px;
  line-height: 1.6;
  margin: 0 0 16px;
  flex: 1;
}
.link-line {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--cyan);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.all-posts {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 34px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.all-posts:hover {
  color: var(--text-1);
}

@media (max-width: 900px) {
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 620px) {
  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>