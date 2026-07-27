<template>
  <div class="loading-container" :class="{ 'fade-in': showScene2, 'fade-out': showScene3 }">
    <!-- Scene 2: Loading Screen -->
    <div v-if="showScene2" class="loading-screen">
      <!-- Special Week Image -->
      <div class="spe-container">
        <img :src="mamboImage" alt="Mambo" class="spe-image" />
      </div>

      <!-- Horseshoes (U) -->
      <div class="horseshoes-container">
        <div
          v-for="(horseshoe, index) in horseshoes"
          :key="index"
          class="horseshoe"
          :style="horseshoe.style"
        >
          <svg
            :width="horseshoe.size"
            :height="horseshoe.size"
            viewBox="0 0 31 33"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.8352 27.0796C28.1482 26.4785 26.8315 25.9632 27.5757 24.8469C32.9573 17.0895 30.6959 4.69487 21.1636 1.48887C19.3316 0.830498 17.3851 0.515624 15.4671 0.515624C13.5492 0.515624 11.5741 0.859124 9.77068 1.48887C0.209768 4.7235 -2.02302 17.1181 3.35857 24.8469C4.10284 25.9346 2.78606 26.4785 2.09905 27.0796C1.64105 27.4517 1.58379 28.0815 1.95593 28.5109C2.75744 29.4269 3.58758 30.3429 4.41772 31.2302C4.81847 31.7169 5.44823 31.5737 5.87762 31.2302C7.91002 29.8849 9.91381 28.5395 11.9462 27.1941C12.1752 27.051 12.3183 26.8506 12.3756 26.593C12.4615 26.2209 12.3756 25.906 12.0607 25.6484C11.1733 24.8182 10.4863 23.8736 9.97106 22.7572C8.85466 20.2382 8.53978 16.8891 9.39855 14.2556C10.2859 11.4217 12.7764 9.876 15.4671 9.876C18.1579 9.876 20.6484 11.4217 21.5357 14.2556C22.3659 16.8891 22.0796 20.2382 20.9632 22.7572C20.448 23.845 19.761 24.8182 18.8736 25.6484C18.5873 25.906 18.4728 26.2209 18.5587 26.593C18.616 26.8506 18.7591 27.051 18.9881 27.1941C21.0205 28.5395 23.0243 29.8849 25.0567 31.2302C25.4861 31.5737 26.1158 31.6882 26.5166 31.2302C27.3467 30.3142 28.1482 29.4269 28.9784 28.5109C29.3791 28.0815 29.2933 27.4517 28.8352 27.0796Z"
              :fill="horseshoe.color"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import mambo1 from './../../../assets/img/uma/mambo1_opt.png'
import mambo2 from './../../../assets/img/uma/mambo2_opt.png'
import mambo3 from './../../../assets/img/uma/mambo3_opt.png'

const mamboImages = [mambo1, mambo2, mambo3]
const mamboImage = ref(mamboImages[Math.floor(Math.random() * mamboImages.length)])

const emit = defineEmits(['loadingComplete'])

const showScene2 = ref(false)
const showScene3 = ref(false)
const horseshoes = ref([])
const animationFrameId = ref(null)
const isFirstLoad = ref(true)

// Generate random color with 60% opacity
const getRandomColor = () => {
  const colors = [
    '#FF1493', // Deep Pink
    '#FF69B4', // Hot Pink
    '#FF6347', // Tomato
    '#FF4500', // Orange Red
    '#FFD700', // Gold
    '#FFFF00', // Yellow
    '#ADFF2F', // Green Yellow
    '#00FF7F', // Spring Green
    '#00FFFF', // Cyan
    '#1E90FF', // Dodger Blue
    '#9370DB', // Medium Purple
    '#FF20FF', // Magenta
  ]
  const color = colors[Math.floor(Math.random() * colors.length)]
  // Convert hex to rgba with 60% opacity
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  return `rgba(${r}, ${g}, ${b}, 0.6)`
}

// Generate random horseshoes
const generateHorseshoes = () => {
  const horseshoeArray = []

  for (let i = 0; i < 30; i++) {
    const size = Math.random() * 50 + 20 // 20-70px (30% max size)
    const horseshoe = {
      id: i,
      size: size,
      x: isFirstLoad.value ? Math.random() * window.innerWidth : getSpawnPosition().x,
      y: isFirstLoad.value ? Math.random() * window.innerHeight : getSpawnPosition().y,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 0.5 + 0.2, // Slow rotation speed
      moveSpeed: Math.random() * 0.3 + 0.1, // Slow movement speed
      color: getRandomColor(), // Random color
      style: {},
    }

    updateHorseshoeStyle(horseshoe)
    horseshoeArray.push(horseshoe)
  }

  horseshoes.value = horseshoeArray
  isFirstLoad.value = false
}

// Get spawn position (from edges for repeat spawns)
const getSpawnPosition = () => {
  const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
  let x, y

  switch (side) {
    case 0: // top
      x = Math.random() * window.innerWidth
      y = -50
      break
    case 1: // right
      x = window.innerWidth + 50
      y = Math.random() * window.innerHeight
      break
    case 2: // bottom
      x = Math.random() * window.innerWidth
      y = window.innerHeight + 50
      break
    case 3: // left
      x = -50
      y = Math.random() * window.innerHeight
      break
  }

  return { x, y }
}

// Update horseshoe style
const updateHorseshoeStyle = (horseshoe) => {
  horseshoe.style = {
    position: 'absolute',
    left: `${horseshoe.x}px`,
    top: `${horseshoe.y}px`,
    transform: `rotate(${horseshoe.rotation}deg)`,
    transition: 'none',
    pointerEvents: 'none',
  }
}

// Animate horseshoes
const animateHorseshoes = () => {
  horseshoes.value.forEach((horseshoe, index) => {
    // Update rotation
    horseshoe.rotation += horseshoe.rotationSpeed

    // Update position (diagonal movement from bottom-left to top-right)
    horseshoe.x += horseshoe.moveSpeed * 0.7 // horizontal component
    horseshoe.y -= horseshoe.moveSpeed * 0.7 // vertical component (upward)

    // Check if horseshoe is out of bounds and respawn
    if (horseshoe.x > window.innerWidth + 50 || horseshoe.y < -50) {
      const newPos = getSpawnPosition()
      horseshoe.x = newPos.x
      horseshoe.y = newPos.y
      horseshoe.color = getRandomColor() // New random color on respawn
    }

    updateHorseshoeStyle(horseshoe)
  })

  animationFrameId.value = requestAnimationFrame(animateHorseshoes)
}

// Start loading sequence
const startLoading = () => {
  // Scene 1: Delay 3s then fade in
  setTimeout(() => {
    showScene2.value = true
    generateHorseshoes()
    animateHorseshoes()
  }, 1000)

  // Scene 2 duration: 10s
  setTimeout(() => {
    // Emit event to show main-page 1s before loading screen disappears
    emit('loadingComplete')

    // Wait 1s then start Scene 3: Fade out (1s)
    setTimeout(() => {
      showScene3.value = true

      // Clean up animation and hide completely after fade out
      setTimeout(() => {
        if (animationFrameId.value) {
          cancelAnimationFrame(animationFrameId.value)
        }
        showScene2.value = false // Hide completely after fade out
      }, 1000) // Changed back to 1000ms to match transition time
    }, 1000) // 1s delay before fade out starts
  }, 3000)
}

onMounted(() => {
  startLoading()
})

onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
})
</script>

<style lang="css" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.3s ease-in-out,
    visibility 0s linear 0.3s;
  z-index: 9999;
  overflow: hidden;
}

.loading-container.fade-in {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition:
    opacity 0.3s ease-in-out,
    visibility 0s linear 0s;
}

.loading-container.fade-out {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 300ms ease-in-out,
    visibility 0s linear 1s;
}

.loading-screen {
  position: relative;
  width: 100%;
  height: 100%;
}

.spe-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.spe-image {
  max-width: 55vw;
  max-height: 55vh;
  object-fit: contain;
}

.horseshoes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.horseshoe {
  position: absolute;
  will-change: transform;
}

.horseshoe svg {
  display: block;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}
</style>
