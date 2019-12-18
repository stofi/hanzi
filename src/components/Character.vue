<template>
  <div class="text-center self-center">
    <CharView :character="character" :info="characterInfo" />
    <Search />
  </div>
</template>

<script>
// @ is an alias to /src
import CharView from '@/components/CharView.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'Character',
  components: {
    CharView,
    Search,
  },
  props: {
    char: {
      type: String,
      default: '',
    },
  },
  mounted() {
    if (!this.char) {
      this.$router.push('/')
      return
    }

    if (this.character.length > 1) {
      this.$router.push('/' + this.character[0])
    } else if (this.character.length == 0 || !this.isHanZi) {
      this.$router.push({ name: 'home', params: { character: '' } })
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
  },
  asyncComputed: {
    async characterInfo() {
      return this.isHanZi
        ? await this.$axios
            .get(`https://hanzi-42c5c.firebaseio.com/${this.character}.json`)
            .then(r => r.data)
            .catch(() => null)
        : ''
    },
  },
}
</script>
