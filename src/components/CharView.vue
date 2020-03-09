<template>
  <div>
    <div class="relative">
      <button
        @click="$emit('click')"
        class="font-light focus:outline-none text-char leading-tight text-white"
      >
        {{ character }}
      </button>
      <TTS
        v-show="ui"
        class="absolute pt-4 top-0 right-0"
        v-if="ttsSupported"
        :text="character"
      />
      <div
        v-show="ui"
        v-if="radical"
        class="text-xs absolute pt-4 top-0 left-0"
      >
        <router-link
          class="Button"
          :to="{ name: 'home', params: { character: radical } }"
          >{{ radical }}
        </router-link>
      </div>
    </div>
    <div v-show="ui">
      <div class="italic text-xl mb-4">{{ pinyin }}</div>
      <div class="my-4 text-xs">{{ definition }}</div>
      <div class="text-xs my-8">
        <router-link
          v-for="char in other"
          :key="char"
          class="Button mx-px w-5 text-center inline-block"
          :to="{ name: 'home', params: { character: char } }"
          >{{ char }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TTS from '@/components/TTS.vue'

export default {
  name: 'CharView',
  components: {
    TTS,
  },
  props: {
    ui: {
      type: Boolean,
      default: false,
    },
    character: {
      type: String,
      default: '',
    },
    info: {
      type: Object,
      default: () => false,
    },
  },
  computed: {
    ttsSupported() {
      return !!window.speechSynthesis
    },
    pinyin() {
      return this.info ? this.info.pinyin.join(' ') : ''
    },
    definition() {
      return this.info ? this.info.definition : ''
    },
    radical() {
      return this.info && this.info.radical ? this.info.radical : ''
    },
    other() {
      return this.info ? this.getChars() : []
    },
  },
  methods: {
    getChars() {
      let related = ''
      related += this.info.definition
      related += this.info.decomposition
      related +=
        this.info.etymology && this.info.etymology.hint
          ? this.info.etymology.hint
          : ''
      const matches = related.split('').filter(character => {
        const code = character.charCodeAt(0)
        return code >= 0x4e00 && code <= 0x9fff
      })
      return [...new Set(matches)]
    },
  },
}
</script>
