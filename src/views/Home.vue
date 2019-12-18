<template>
  <div class="home flex flex-col">
    <div v-if="!characterPage" class="text-center text-sm text-gray-500">
      hanzi of the day:
    </div>
    <Character :char="char" />
  </div>
</template>

<script>
// @ is an alias to /src
import Character from '@/components/Character'

export default {
  name: 'home',
  components: {
    Character,
  },
  data() {
    return {
      char: '我',
    }
  },
  methods: {
    getChar() {
      let char = this.$route.params.character

      this.char = this.characterPage && this.isHanZi(char) ? char : this.char
      document.title = 'Hanzi: ' + this.char
    },
    isHanZi(character) {
      const code = character.charCodeAt(0)
      return code >= 0x4e00 && code <= 0x9fff
    },
  },
  beforeMount() {
    this.getChar()
  },
  computed: {
    characterPage() {
      return !!this.$route.params.character
    },
  },
  watch: {
    $route() {
      this.getChar()
    },
  },
}
</script>
