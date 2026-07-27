<template>
  <div>
    <h2 style="display: flex; justify-content: center; align-items: center; height: 100vh;">GET RICK ROLL LOL</h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(() => {
    window.location.assign('https://www.youtube.com/watch?v=aYsgsSo1aow')
  }, 500)
})
</script>
