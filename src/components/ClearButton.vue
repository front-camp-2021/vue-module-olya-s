<template>
  <button
    class="filter-form__clear-button"
    @click="onClick"
  >
    {{ content }}
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClearButton",
  props: { content: { type: String, default: "" } },
  emits: ["clear"],
  setup(props, { emit }) {
    function onClick() {
      emit("clear");
    }
    return { onClick };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars";
@import "../assets/styles/mixins";

.filter-form__clear-button {
  width: 100%;
  padding: 17px;
  text-transform: uppercase;
  border: none;
  color: $white;
  background: $bg-primary;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  @include text-format(400, 1rem);

  &:hover {
    cursor: pointer;
    box-shadow: $box-shadow-hover;
  }
}
</style>
