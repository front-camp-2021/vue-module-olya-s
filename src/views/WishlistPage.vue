<template>
  <div>
    <div v-if="isProducts">
      <div class="button-wrapper">
        <clear-button
          :content="content"
          @clear="clearWishlist"
        />
      </div>
      <div class="catalog">
        <card
          v-for="product of wishfulProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <h2 v-if="!wishfulProducts.length">
      No Wishful Products
    </h2>
  </div>
</template>

<script>
import Card from "../components/Card";
import ClearButton from "../components/ClearButton";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Wishlist",
  components: { Card, ClearButton },
  setup() {
    const store = useStore();

    const content = "Clear wishlist";
    const wishfulProducts = computed(() =>
      store.getters.allProducts.filter((product) => product.inWishlist)
    );
    const isProducts = computed(() => wishfulProducts.value.length);

    function clearWishlist() {
      store.dispatch("actionClearWishlist");
    }

    return { wishfulProducts, isProducts, content, clearWishlist };
  },
};
</script>

<style lang="scss">
.button-wrapper {
  width: 100%;
  min-width: 310px;
  max-width: 630px;
  margin: 20px 0 20px;

  @media screen and (min-width: 635px) {
    width: calc(50% - 7px);
  }

  @media screen and (min-width: 1200px) {
    width: 30%;
  }
}
.catalog {
  display: grid;
  grid-gap: 15px;
  margin-top: 20px;

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
