<template>
  <div>
    <search
      :trigger="trigger"
      :wishful-products="wishfulProductsNumber"
      :results="productsCount"
      @filtering="setFilter"
    />
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
            @wishlist="setWishlist"
            @cart="setCart"
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

export default {
  name: "CardList",
  components: { Search, Card },
  props: {
    trigger: Boolean,
    products: { type: Array, default: () => [] },
    productsCount: { type: Number, default: 0 },
  },
  computed: {
    wishfulProductsNumber() {
      return this.products.filter((product) => product.inWishlist).length;
    },
  },
  methods: {
    setWishlist: function (data) {
      this.$emit("wishlist", data);
    },
    setCart: function (data) {
      this.$emit("cart", data);
    },
    setFilter: function (data) {
      this.$emit("filtering", data);
    },
  },
};
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
