<template>
  <div class="Character text-center">
    <CharView>{{ character }}</CharView>
    <div class="italic text-xl mb-4">{{ pinyin }}</div>
    <div class="pt-2 text-xs">{{ definition }}</div>
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
  },
  beforeMount() {
    if (!this.char) {
      this.$router.push('/')
      return
    }

    if (this.character.length > 1) {
      this.$router.push('/' + this.character[0])
    } else if (this.character.length == 0 || !this.isHanZi) {
      this.$router.push('/')
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
    pinyin() {
      return this.characterInfo ? this.characterInfo.pinyin.join(' ') : ''
    },
    definition() {
      return this.characterInfo ? this.characterInfo.definition : ''
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
