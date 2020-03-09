<template>
  <div class="Character text-center" :class="{ 'opacity-50': !ui }">
    <CharView
      @click="$emit('click')"
      :character="character"
      :info="characterInfo"
      :ui="ui"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import CharView from '@/components/CharView.vue'

export default {
  name: 'Character',
  components: {
    CharView,
  },
  props: {
    char: {
      type: String,
      default: '',
    },
    ui: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (!this.char) {
      this.$router.push({ name: 'index', params: { reset: true } })
      return
    }

    if (this.character.length > 1) {
      this.$router.push({
        name: 'home',
        params: { character: this.character[0] },
      })
    } else if (this.character.length == 0 || !this.isHanZi) {
      this.$router.push({ name: 'index', params: { reset: true } })
    }
  },
  computed: {
    character() {
      return this.char ? this.char : ''
    },
    isHanZi() {
      const code = this.character.charCodeAt(0)
      return code >= 0x4e00 && code <= 0x9fff
    },
    characterInfo() {
      return this.isHanZi
        ? this.$store.getters.getCharaterEntry(this.character)
        : ''
    },
  },
}
</script>
<style scoped>
.Character {
  transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
