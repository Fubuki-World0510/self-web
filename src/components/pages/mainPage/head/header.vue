<template>
  <header class="l-header">
    <nav class="nav bd-grid">
      <div class="nav__menu" id="nav-menu">
        <ul class="nav__list">
          <li class="nav__item">
            <a href="#home" class="nav__link" :class="{ active: activeSection === 'home' }">
              Home
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('home')

const handleScroll = () => {
  const sections = document.querySelectorAll('section[id]')
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const element = current as HTMLElement
    const sectionHeight = element.offsetHeight
    const sectionTop = element.offsetTop - 50
    const sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (sectionId) {
        activeSection.value = sectionId
      }
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped></style>
