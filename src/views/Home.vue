<template>
  <div class="home flex flex-col overflow-x-hidden">
    <div v-if="!characterPage" class="text-center text-sm text-gray-500">
      hanzi of the day:
    </div>
    <div class="self-center">
      {{ this.char }}
    </div>
    <slider :length="characters.length">
      <template #default="{active, move}">
        <Character
          v-for="(char, index) in characters"
          :ui="active == index"
          :char="char"
          :key="char"
          @click="move(index)"
        />
      </template>
    </slider>
    <word v-if="wordInfo" v-bind="wordInfo"></word>
    <Search class="my-4" />
  </div>
</template>

<script>
// @ is an alias to /src
import Character from '@/components/Character'
import Search from '@/components/Search'
import Slider from '@/components/Slider'
import Word from '@/components/Word'

export default {
  name: 'home',
  components: {
    Character,
    Search,
    Slider,
    Word,
  },
  data() {
    return {
      default: '我',
      char: '',
    }
  },
  methods: {
    getChar() {
      let char = this.$route.params.character
      this.char = char
        .split('')
        .filter(this.isHanZi)
        .join('')
    },
    isHanZi(character) {
      const code = character.charCodeAt(0)
      return code >= 0x4e00 && code <= 0x9fff
    },
  },
  beforeMount() {
    if (!this.$route.params.character) {
      this.char = this.default
    } else {
      this.getChar()
    }
    document.title = 'Hanzi: ' + this.char
  },
  computed: {
    characters() {
      return this.char.split('')
    },
    characterPage() {
      return !this.$route.params.reset
    },
    wordInfo() {
      return this.$store.getters.getWordEntry(this.char)
    },
  },
  watch: {
    $route() {
      this.getChar()
    },
  },
}
</script>
