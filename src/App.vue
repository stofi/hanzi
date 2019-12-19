<template>
  <div
    id="app"
    class="p-2 py-4 w-screen flex flex-col overflow-y-auto items-center"
  >
    <div class="w-full max-w-xl">
      <router-view />
    </div>
    <div id="nav" class="text-center mt-auto text-xs">
      <router-link :to="{ name: 'index', params: { reset: true } }"
        >Home</router-link
      >
      |
      <router-link :to="{ name: 'about' }">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },
  watch: {
    $route: function() {
      document.title = 'Hanzi Dictionary'
    },
  },
}
</script>

<style>
body {
  @apply bg-gray-900;
  @apply text-gray-100;
}
#app {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  @apply font-light;
}
@media screen and (min-width: 768px) {
  html {
    font-size: 24px;
  }
}
</style>
