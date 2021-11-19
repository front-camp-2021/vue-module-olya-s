<template>
  <slider
    v-model="value"
    class="slider"
  />
</template>

<script>
import Slider from "@vueform/slider";
export default {
  name: "VueSlider",
  components: { Slider },
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
