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
import { defineComponent, computed, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "DoubleSlider",
  components: { Slider },
  props: {
    price: { type: Object, default: () => {} },
    title: { type: String, default: "" },
  },
  setup(props) {
    const store = useStore();

    const minValue = props.price.selected.from;
    const maxValue = props.price.selected.to;
    const value = ref([props.price.min, props.price.max]);

    function change() {
      store.dispatch("updateFilters", { title: props.title, value });
    }
    return {
      minValue,
      maxValue,
      value,
      change,
    };
  },
});
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
