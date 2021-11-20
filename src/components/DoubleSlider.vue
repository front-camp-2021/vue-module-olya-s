<template>
  <fieldset class="filters__group">
    <legend>{{ title }}</legend>
    <slider
      v-model="value"
      class="slider"
      :min="minValue"
      :max="maxValue"
      @change="change"
    />
  </fieldset>
</template>

<script>
import Slider from "@vueform/slider";
export default {
  name: "DoubleSlider",
  components: { Slider },
  props: {
    price: { type: Object, default: () => {} },
    title: { type: String, default: "" },
    trigger: Boolean,
  },
  data: function () {
    return {
      prices: this.price,
      minValue: this.price.selected.from,
      maxValue: this.price.selected.to,
      value: [this.price.min, this.price.max],
      initialValue: [this.price.min, this.price.max],
    };
  },
  watch: {
    trigger: function () {
      this.reset();
    },
  },
  methods: {
    change: function () {
      this.$emit("filtering", { title: this.title, value: this.value });
    },
    reset: function () {
      this.value = this.initialValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars";
@import "../assets/styles/mixins";

.filters__group {
  padding: 28px 0 38px;

  legend {
    @include text-format(600);
    margin-bottom: 28px;
  }

  .slider {
    width: 80%;
    margin: 0 auto;
    --slider-connect-bg: #109cf1;
    --slider-tooltip-bg: #fff;
    --slider-tooltip-font-weight: 400;
    --slider-tooltip-color: $text-color;
    --slider-handle-ring-color: #3b82f630;
  }
}
</style>
<style src="@vueform/slider/themes/default.css"></style>
