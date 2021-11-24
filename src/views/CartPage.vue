<template>
  <div>
    <div v-if="totalAmount">
      <div class="button-wrapper">
        <clear-button
          :content="content"
          @clear="clearCart"
        />
      </div>
      <div class="cart">
        <cart-item
          v-for="product of cartlist"
          :key="product.id"
          :product="product"
          @count="countTotalPrice"
        />
      </div>
      <div>Total: {{ totalAmount }}</div>
    </div>
    <h2 v-if="!totalAmount">
      No products in cart
    </h2>
  </div>
</template>

<script>
import CartItem from "../components/CartItem";
import ClearButton from "../components/ClearButton";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "CartPage",
  components: { CartItem, ClearButton },
  setup() {
    const store = useStore();

    const content = "Clear cart";
    const cartlist = computed(() =>
      store.getters.allProducts.filter((product) => product.quantity)
    );

    const totalAmount = computed(() =>
      cartlist.value.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      )
    );

    function countTotalPrice(price) {
      totalAmount += price;
    }

    function clearCart() {
      store.dispatch("actionClearCart");
    }

    return { cartlist, totalAmount, countTotalPrice, clearCart, content };
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
.cart {
  display: grid;
  width: 100%;
  grid-gap: 15px;
}
</style>
