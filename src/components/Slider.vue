<template>
  <div class="margin-auto w-0 flex-grow-0 self-center">
    <div
      data-rail
      ref="rail"
      class="Slider__Rail flex justify-start items-start flex-grow-1"
    >
      <slot name="default" v-bind="{ active, move }"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      active: 0,
      // itemSize: 1,
    }
  },
  mounted() {
    this.transform()
  },
  computed: {
    size() {
      return this.$refs.rail.scrollWidth
    },
    itemSize() {
      return this.size / this.length
    },
    translate() {
      return (this.active + 0.5) * this.itemSize
    },
  },
  methods: {
    transform() {
      this.$refs.rail.style.transform = `translateX(${-this.translate}px)`
    },
    next() {
      this.move(++this.active)
    },
    prev() {
      this.move(--this.active)
    },
    move(toIndex) {
      this.active = (this.length + toIndex) % this.length
      this.transform()
    },
  },
}
</script>

<style scoped>
.Slider__Rail {
  transition: transform 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}
</style>
