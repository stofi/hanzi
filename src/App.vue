<template>
  <div
    id="app"
    class="p-2 w-screen h-screen flex flex-col overflow-y-auto items-center"
  >
    <div class="w-full max-w-xl md:max-w-3xl md:text-3xl">
      <router-view />
    </div>
    <div id="nav" class="text-center mt-auto">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-gray-800;
  @apply text-white;
}
</style>
