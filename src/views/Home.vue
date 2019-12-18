<template>
  <div class="home">
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
  beforeMount() {
    let char = this.$route.params.character
    this.char = this.characterPage ? char : this.char
    document.title = 'Hanzi: ' + this.char
  },
  computed: {
    characterPage() {
      return !!this.$route.params.character
    },
  },
}
</script>
