<template>
  <div id="app">
    <LoadingScreen @loadingComplete="handleLoadingComplete" />
    <div class="main-page" :class="{ show: showMainPage }">
      <Header />
      <Body />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from './head/header.vue'
import Body from './body/body.vue'
import Footer from './foot/foot.vue'
import LoadingScreen from './LoadingScreen/main.vue'

const showMainPage = ref(false)

const handleLoadingComplete = () => {
  showMainPage.value = true
}
</script>
