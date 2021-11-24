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
    <div v-if="(price && price.selected) || categories.length || brands.length">
      <div class="filter-form__list-wrapper">
        <div class="filters">
          <div v-if="price.selected">
            <double-slider
              :price="price"
              :title="'Price'"
            />
          </div>
          <hr>
          <div v-if="categories.length">
            <filter-group
              :filters="categories"
              :title="'Category'"
            />
          </div>
          <hr>
          <div v-if="brands.length">
            <filter-group
              :filters="brands"
              :title="'Brand'"
            />
          </div>
        </div>
      </div>
      {{ filtrs }}
      <clear-button
        :content="content"
        @click="clearAllFilters"
      />
    </div>
    <div
      v-if="!((price && price.selected) || categories.length || brands.length)"
    >
      No filters to show
    </div>
  </div>
</template>

<script>
import ClearButton from "./ClearButton.vue";
import DoubleSlider from "./DoubleSlider.vue";
import FilterGroup from "./FilterGroup.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "FiltersList",
  components: { DoubleSlider, FilterGroup, ClearButton },
  setup() {
    const store = useStore();

    const price = computed(() => store.getters.price);
    const categories = computed(() => store.getters.categories);
    const brands = computed(() => store.getters.brands);

    const content = "Clear all filters";

    function clearAllFilters() {
      store.dispatch("updateFilters");
    }
    return { price, categories, brands, content, clearAllFilters };
  },
});
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
