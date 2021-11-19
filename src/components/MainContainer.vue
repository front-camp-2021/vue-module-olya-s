<template>
  <div class="container">
    <filters-list
      :price="price"
      :categories="categories"
      :brands="brands"
    />
    <cards-list :products="products" />
  </div>
</template>

<script>
import CardsList from "./CardsList.vue";
import FiltersList from "./FiltersList.vue";

export default {
  name: "MainContainer",
  components: { FiltersList, CardsList },
  props: {
    price: { type: Object, default: () => {} },
    categories: { type: Array, default: () => [] },
    brands: { type: Array, default: () => [] },
    products: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 320px) {
    grid-gap: 15px;
  }

  @media screen and (min-width: 720px) {
    grid-gap: 20px;
    grid-template-columns: 1fr 2fr;
  }

  @media screen and (min-width: 1200px) {
    grid-gap: 28px;
    grid-template-columns: 1fr 3fr;
  }
}
</style>
