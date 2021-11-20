<template>
  <div class="filter-form">
    <h3 class="filter-form__title">
      Filters
      <button
        class="filter-form__button"
        type="text"
      >
        &lt;&lt;
      </button>
    </h3>
    <div class="filter-form__list-wrapper">
      <div class="filters">
        <div v-if="price">
          <double-slider
            :price="price"
            :title="'Price'"
            :trigger="trigger"
            @filtering="setFilter"
          />
        </div>
        <hr>
        <div v-if="categories">
          <filter-group
            :filters="categories"
            :title="'Category'"
            :trigger="trigger"
            @filtering="setFilter"
          />
        </div>
        <hr>
        <div v-if="brands">
          <filter-group
            :filters="brands"
            :title="'Brand'"
            :trigger="trigger"
            @filtering="setFilter"
          />
        </div>
      </div>
      <div v-if="!(price || categories || brands)">
        No Filters to show
      </div>
    </div>
    <clear-button
      :content="content"
      @click="clearAllFilters"
    />
  </div>
</template>

<script>
import ClearButton from "./ClearButton.vue";
import DoubleSlider from "./DoubleSlider.vue";
import FilterGroup from "./FilterGroup.vue";

export default {
  name: "FiltersList",
  components: { DoubleSlider, FilterGroup, ClearButton },
  props: {
    price: { type: Object, default: () => {} },
    categories: { type: Array, default: () => [] },
    brands: { type: Array, default: () => [] },
  },
  data: function () {
    return { content: "Clear all filters", trigger: false };
  },
  methods: {
    clearAllFilters: function () {
      this.trigger = !this.trigger;
      this.$emit("filtering");
    },
    setFilter: function (data) {
      this.$emit("filtering", data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars";
@import "../assets/styles/mixins";

.filter-form {
  display: none;

  @media screen and (min-width: 720px) {
    display: flex;
    flex-direction: column;
    max-width: 375px;

    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include text-format(400, 1.5rem);
    }

    &__button {
      width: 40px;
      height: 40px;
      background: #fff;
      border: none;
      border-radius: $border-radius;
      box-shadow: $box-shadow;
    }

    &__list-wrapper {
      flex-grow: 1;
      max-width: 560px;
      background: $white;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 20px 15px 15px;
      border-radius: $border-radius;
      box-shadow: $box-shadow;

      @media screen and (min-width: 1200px) {
        padding: 30px 20px 45px;
        margin-top: 20px;
      }
    }

    hr {
      margin-bottom: 28px;
    }
  }
}
</style>
