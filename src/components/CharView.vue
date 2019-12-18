<template>
  <div>
    <div class="relative">
      <div class="text-char leading-tight text-white">
        {{ character }}
      </div>
      <TTS
        class="absolute pt-4 top-0 right-0"
        v-if="ttsSupported"
        :text="character"
      />
      <div v-if="radical" class="text-xs absolute pt-4 top-0 left-0">
        <router-link class="Button" :to="`/${radical}`"
          >{{ radical }}
        </router-link>
      </div>
    </div>
    <div class="italic text-xl mb-4">{{ pinyin }}</div>
    <div class="pt-2 text-xs">{{ definition }}</div>
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
    character: {
      type: String,
      default: '',
    },
    info: {
      type: Object,
      default: () => ({
        pinyin: [],
        definition: '',
        radical: null,
      }),
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
  },
}
</script>
