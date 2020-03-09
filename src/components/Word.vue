<template>
  <div class="self-center flex flex-col justify-center items-center my-4">
    <div class="text-2xl font-normal">
      {{ Chinese }}
    </div>
    <div class="italic text-xl">{{ Pinyin }}</div>
    <div class="my-2 text-xs">{{ Definition }}</div>
  </div>
</template>

<script>
export default {
  props: {
    Chinese: { type: String, default: '' },
    Pinyin: { type: String, default: '' },
    Part: { type: String, default: '' },
    Definition: { type: String, default: '' },
    'Sentence 1 - Chinese': { type: String, default: '' },
    'Sentence 1 - Pinyin': { type: String, default: '' },
    'Sentence 1 - English': { type: String, default: '' },
    'Sentence 2 - Chinese': { type: String, default: '' },
    'Sentence 2 - Pinyin': { type: String, default: '' },
    'Sentence 2 - English': { type: String, default: '' },
  },
  computed: {
    sentences() {
      return [this.sentence(1), this.sentence(2)]
    },
  },
  methods: {
    sentence(i) {
      const key = `Sentence ${i} -`
      return {
        chinese: this[`${key} Chinese`],
        pinyin: this[`${key} Pinyin`],
        english: this[`${key} English`],
      }
    },
  },
}
</script>

<style></style>
