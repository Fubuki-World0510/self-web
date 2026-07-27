<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style>
@import url('./components/pages/mainPage/mainPageStyles.css');
@import url('https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.main-page {
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0s linear 0.2s;
  pointer-events: none;
  background-color: #fef6f0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
}

.main-page.show {
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.5s ease-in-out,
    visibility 0s linear 0s;
  pointer-events: auto;
}
</style>
