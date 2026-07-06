<template>
  <footer class="wrap footer">
    <div class="g-logo">&lt;Ayo<span>/</span>&gt;</div>
    <p>Built with passion in Lagos &nbsp;·&nbsp; <i class="far fa-copyright"></i> 2026 Ayomide Adewale</p>
    <div class="links">
      <a href="https://www.linkedin.com/in/ayomide-adewale-b0899922b/" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
      <a href="https://github.com/ayorex11" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>
      <a href="https://medium.com/@adewalemaxwell11" target="_blank" rel="noopener"><i class="fab fa-medium"></i></a>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  padding: 40px 24px;
  text-align: center;
  border-top: 1px solid var(--border-glass);
}
.g-logo {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
}
.g-logo span {
  color: var(--cyan);
}
.footer p {
  color: var(--text-2);
  font-size: 13px;
  margin: 0 0 16px;
}
.links {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.links a {
  color: var(--text-2);
  text-decoration: none;
  font-size: 16px;
}
.links a:hover {
  color: var(--cyan);
}
</style>
