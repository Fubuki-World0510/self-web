<template>
  <main class="l-main">
    <section class="home bd-grid" id="home">
      <div class="home__data">
        <h1 class="home__title">Hi! I'm <span class="home__title-color">Nam Insider</span></h1>
        <p class="home__subtitle">
          I'm a Mobile Security Engineer and back-end developer with Java and TypeScript
        </p>
      </div>
    </section>

    <div class="home__social">
      <a
        v-for="social in socialLinks"
        :key="social.name"
        :href="social.url"
        class="home__social-icon"
        :title="social.name"
      >
        <i :class="social.icon"></i>
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface SocialLink {
  name: string
  url: string
  icon: string
}

const socialLinks = ref<SocialLink[]>([
  {
    name: 'Discord',
    url: 'https://discord.com/users/755007858294259734',
    icon: 'bx bxl-discord',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/rielnaminsider',
    icon: 'bx bxl-facebook',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/FoobAB0510',
    icon: 'bx bxl-github',
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com/user/fbkworld/',
    icon: 'bx bxl-reddit',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/is_realfox',
    icon: 'bx bxl-twitter',
  },
])

onMounted(() => {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const homeData = document.querySelector('.home__data')

  if (homeData) observer.observe(homeData)
})
</script>

<style scoped>
@font-face {
  font-family: 'KGBlankSpaceSketch';
  src: url('../../../assets/fonts/KGBlankSpaceSketch.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.home__title {
  font-family: 'KGBlankSpaceSketch', 'Architects Daughter', cursive, sans-serif;
  font-weight: normal;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
}

.home__social-icon {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s ease-out;
}

.home__social-icon:nth-child(1) {
  transition-delay: 0.1s;
}
.home__social-icon:nth-child(2) {
  transition-delay: 0.2s;
}
.home__social-icon:nth-child(3) {
  transition-delay: 0.3s;
}
.home__social-icon:nth-child(4) {
  transition-delay: 0.4s;
}
.home__social-icon:nth-child(5) {
  transition-delay: 0.5s;
}
</style>
