<template>
  <button
    class="filter-form__clear-button"
  >
    {{ content }}
  </button>
</template>

<script>
export default {
  name: 'ClearButton',
  props: { content: { type: String, default: '' } },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars';
@import '../assets/styles/mixins';

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
