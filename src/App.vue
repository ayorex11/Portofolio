<template>
  <CustomCursor />
  <AppNav />
  <main>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </main>
  <AppFooter />
  <GameLauncher />
</template>

<script setup>
import CustomCursor from './components/CustomCursor.vue'
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import GameLauncher from './components/GameLauncher.vue'
</script>
