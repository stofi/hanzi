<template>
  <div class="flex mt-4 justify-center">
    <input
      type="text"
      placeholder="搜索"
      class="w-24 rounded-sm bg-gray-700 px-1 outline-none mr-px text-center"
      v-model="character"
      @keydown.enter="search"
    />
    <button :disabled="disabled" class="Button py-0 ml-px" @click="search">
      <span :class="{ 'opacity-50': disabled }" class="px-1">
        search
      </span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      character: '',
    }
  },
  computed: {
    disabled() {
      return !this.character || this.character == this.$route.params.character
    },
  },
  methods: {
    search() {
      if (this.disabled) return

      this.$router.push({
        name: 'home',
        params: { character: this.character },
      })
    },
  },
}
</script>

<style></style>
