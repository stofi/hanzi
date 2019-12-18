<template>
  <div class="Character text-center">
    <CharView>{{ character }}</CharView>
    <div class="italic">{{ getPinyin }}</div>
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
  beforeMount() {
    if (!this.$route.params.character) {
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
      let char = this.$route.params.character
      return char ? char : ''
    },
    isHanZi() {
      const code = this.character.charCodeAt(0)
      return code >= 0x4e00 && code <= 0x9fff
    },
  },
  asyncComputed: {
    async getPinyin() {
      return this.isHanZi
        ? await this.$axios
            .get('https://helloacm.com/api/pinyin/?cached&s=' + this.character)
            .then(r => r.data.result[0])
            .catch(() => '')
        : ''
    },
  },
}
</script>
