<template>
  <div>
    <search />
    <section>
      <h2 class="visually-hidden">
        Products catalog
      </h2>
      <div v-if="products && products.length">
        <div class="catalog">
          <card
            v-for="product of products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
      <div v-if="!(products && products.length)">
        No products found
      </div>
    </section>
  </div>
</template>

<script>
import Search from "./Search.vue";
import Card from "./Card.vue";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "CardList",
  components: { Search, Card },
  props: {
    products: { type: Array, default: () => [] },
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars";

.catalog {
  display: grid;
  grid-gap: 15px;

  @media screen and (min-width: 320px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media screen and (min-width: 720px) {
    grid-gap: 20px;
  }

  @media screen and (min-width: 1200px) {
    grid-gap: 28px;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
