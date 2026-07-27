<template>
  <div
    class="foob-container"
    @click="handleClick"
    @touchstart="handleTouch"
    @touchmove="preventTouch"
  >
    <div v-if="isFirstClick" id="welcome-text" class="welcome-text">Click to get Foob</div>

    <!-- Dynamic Foob images -->
    <img
      v-for="foob in foobImages"
      :key="foob.id"
      :src="foobImageSrc"
      :style="{ left: foob.x + 'px', top: foob.y + 'px' }"
      class="foob-image"
      alt="Foob"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface FoobImage {
  id: number
  x: number
  y: number
}

const isFirstClick = ref(true)
const foobImages = ref<FoobImage[]>([])
let foobCounter = 0

// Import foob image
import foobPng from '../../resource/foob.png'
const foobImageSrc = foobPng

const audioFiles = [
  new URL('../../resource/audio/FBK_WAH.mp3', import.meta.url).href,
  new URL('../../resource/audio/Foob-hmm_wakannai.mp3', import.meta.url).href,
  new URL('../../resource/audio/Foob_whatthe.mp3', import.meta.url).href,
  new URL('../../resource/audio/fubukiwhat.mp3', import.meta.url).href,
  new URL('../../resource/audio/Fubuki_-_Yoisho.mp3', import.meta.url).href,
  new URL('../../resource/audio/fubuki_tiktik.mp3', import.meta.url).href,
  new URL('../../resource/audio/Hi friends.mp3', import.meta.url).href,
  new URL('../../resource/audio/Kon.mp3', import.meta.url).href,
  new URL('../../resource/audio/Maruchan_Fubuki_ver.mp3', import.meta.url).href,
  new URL('../../resource/audio/tanomuuu.mp3', import.meta.url).href,
]

const playRandomAudio = () => {
  const randomIndex = Math.floor(Math.random() * audioFiles.length)
  const audio = new Audio(audioFiles[randomIndex])
  audio.volume = 0.5
  audio.play().catch((e) => console.log('Không thể phát âm thanh:', e))
}

const createFoobImage = (x: number, y: number) => {
  const newFoob: FoobImage = {
    id: ++foobCounter,
    x: x - 50, // Center the image
    y: y - 50,
  }
  foobImages.value.push(newFoob)
}

const handleClick = (event: MouseEvent) => {
  event.preventDefault()

  const x = event.clientX
  const y = event.clientY

  if (isFirstClick.value) {
    isFirstClick.value = false
  }

  createFoobImage(x, y)
  playRandomAudio()
}

const handleTouch = (event: TouchEvent) => {
  event.preventDefault()

  const touch = event.touches[0]
  if (!touch) return

  const x = touch.clientX
  const y = touch.clientY

  if (isFirstClick.value) {
    isFirstClick.value = false
  }

  createFoobImage(x, y)
  playRandomAudio()
}

const preventTouch = (event: TouchEvent) => {
  event.preventDefault()
}

onMounted(() => {
  // Preload audio files for better performance
  audioFiles.forEach((audioFile) => {
    const audio = new Audio(audioFile)
    audio.preload = 'auto'
  })
})
</script>

<style scoped>
.foob-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
  cursor: pointer;
  font-family: Arial, sans-serif;
}

.welcome-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  pointer-events: none;
  z-index: 1000;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.foob-image {
  position: absolute;
  width: 100px;
  height: 100px;
  pointer-events: none;
  z-index: 999;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .welcome-text {
    font-size: 2rem;
  }

  .foob-image {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .welcome-text {
    font-size: 1.5rem;
  }

  .foob-image {
    width: 60px;
    height: 60px;
  }
}
</style>
