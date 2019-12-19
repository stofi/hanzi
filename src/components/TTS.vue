<template>
  <div class="flex">
    <button class="Button h-4 w-4 relative" @click="speak">
      <unicon
        class="unicone absolute text-xs top-0 left-0"
        name="volume"
        fill="white"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    locale: {
      type: String,
      default: 'zh-CN',
    },
  },
  data() {
    return {
      utterance: null,
      intervalId: null,
      synth: window.speechSynthesis,
    }
  },
  asyncComputed: {
    voices() {
      const vm = this
      return new Promise(resolve => {
        vm.id = setInterval(() => {
          if (vm.synth.getVoices().length !== 0) {
            resolve(vm.synth.getVoices())
            clearInterval(vm.id)
          }
        }, 10)
      })
    },
  },
  watch: {
    text() {
      this.getUtterance()
    },
    voices() {
      this.getUtterance()
    },
  },
  methods: {
    getVoice(locale) {
      const voices = this.voices.filter(({ lang }) => lang === locale)
      if (voices.length >= 1) {
        const defaults = voices.filter(({ default: d }) => d)
        const local = voices.filter(({ localService }) => localService)

        return defaults.length != 0
          ? defaults[0]
          : local.length != 0
          ? local
          : null
      }

      return null
    },
    getUtterance() {
      this.synth.cancel()
      this.utterance = new SpeechSynthesisUtterance(this.text)
      this.utterance.voice = this.getVoice(this.locale)
      this.utterance.lang = this.locale
    },
    speak() {
      if (!this.utterance) return
      this.synth.cancel()
      this.synth.speak(this.utterance)
    },
  },
}
</script>
<style scoped>
.unicone {
  transform-origin: 20% 20%;
  transform: scale(0.5);
}
@media screen and (min-width: 768px) {
  .unicone {
    transform-origin: center;
    transform: scale(0.8);
  }
}
</style>
