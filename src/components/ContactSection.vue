<template>
  <section id="contact" class="wrap contact">
    <div class="tag">// get in touch</div>
    <h2 class="h2">Let's <span class="grad-text">connect</span></h2>
    <p class="desc">
      I'm always open to discussing new projects, research collaborations, or opportunities.
    </p>

    <div class="contact-grid">
      <div class="info-col">
        <div class="info-item" v-for="item in info" :key="item.label">
          <div class="icon"><i :class="item.icon"></i></div>
          <div>
            <h4>{{ item.label }}</h4>
            <p>{{ item.value }}</p>
          </div>
        </div>
        <div class="availability"><span class="dot"></span> Available for freelance work</div>
      </div>

      <form class="form-card" @submit.prevent="submitForm">
        <div class="form-row">
          <div class="field">
            <label>Your name</label>
            <input type="text" v-model="form.name" placeholder="John Doe" required />
          </div>
          <div class="field">
            <label>Your email</label>
            <input type="email" v-model="form.email" placeholder="john@example.com" required />
          </div>
        </div>
        <div class="field">
          <label>Subject</label>
          <input type="text" v-model="form.subject" placeholder="Project collaboration" required />
        </div>
        <div class="field">
          <label>Message</label>
          <textarea v-model="form.message" rows="5" placeholder="Tell me about your project..." required></textarea>
        </div>
        <button class="btn btn-primary full-width" type="submit" :disabled="status === 'sending'">
          <span>{{ buttonLabel }}</span>
          <i :class="buttonIcon"></i>
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/adewalemaxwell11@gmail.com'

const info = [
  { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Lagos, Nigeria' },
  { icon: 'fas fa-envelope', label: 'Email', value: 'adewalemaxwell11@gmail.com' },
  { icon: 'fas fa-phone', label: 'Phone', value: '+234 913 657 0199' },
]

const form = reactive({ name: '', email: '', subject: '', message: '' })
const status = ref('idle')

const buttonLabel = computed(() => {
  if (status.value === 'sending') return 'Sending...'
  if (status.value === 'sent') return 'Sent!'
  if (status.value === 'error') return 'Failed — try email'
  return 'Send message'
})
const buttonIcon = computed(() => {
  if (status.value === 'sending') return 'fas fa-spinner fa-spin'
  if (status.value === 'sent') return 'fas fa-check'
  if (status.value === 'error') return 'fas fa-exclamation-triangle'
  return 'fas fa-paper-plane'
})

async function submitForm() {
  status.value = 'sending'
  try {
    const body = new FormData()
    body.append('name', form.name)
    body.append('email', form.email)
    body.append('subject', form.subject)
    body.append('message', form.message)

    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    })
    if (!res.ok) throw new Error('failed')
    status.value = 'sent'
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch (e) {
    status.value = 'error'
  } finally {
    setTimeout(() => (status.value = 'idle'), 3500)
  }
}
</script>

<style scoped>
.contact {
  padding: 90px 24px 100px;
}
.h2 {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 16px;
}
.desc {
  color: var(--text-2);
  font-size: 15px;
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 50px;
}
.contact-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 50px;
}
.info-item {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
}
.icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--glass);
  border: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cyan);
  flex-shrink: 0;
}
.info-item h4 {
  font-family: var(--font-display);
  font-size: 14px;
  margin: 0 0 4px;
  color: var(--text-2);
  font-weight: 500;
}
.info-item p {
  margin: 0;
  font-size: 15px;
}
.availability {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-2);
  margin-top: 10px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3ddc84;
  box-shadow: 0 0 8px #3ddc84;
}

.form-card {
  background: var(--glass);
  border: 1px solid var(--border-glass);
  border-radius: 18px;
  padding: 30px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.field {
  margin-bottom: 18px;
}
.field label {
  display: block;
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--text-2);
  margin-bottom: 8px;
}
.field input,
.field textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-glass);
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--text-1);
  font-family: var(--font-body);
  font-size: 14px;
  resize: vertical;
}
.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--cyan);
}
.full-width {
  width: 100%;
  justify-content: center;
}

@media (max-width: 820px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
