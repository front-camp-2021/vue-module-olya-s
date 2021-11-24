<template>
  <header class="header">
    <!-- <a routerLink="/products" class="header__logo-link" (click)="onClick()"> -->
    <a class="header__logo-link">
      <img
        class="header__image"
        src="../assets/images/logo.svg"
        alt="shop logo"
      >
      <h1 class="header__title">Online Store</h1>
    </a>
    <!-- <a routerLink="/cart" class="header__cart-image"> -->
    <a class="header__cart-image">
      <div
        v-if="purchaseCount"
        class="header__purchase-count"
      >
        {{ purchaseCount }}
      </div>
      <img
        src="../assets/images/shopping-cart.svg"
        alt="add to cart"
      >
    </a>
  </header>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "MainHeader",
  setup() {
    const store = useStore();
    const purchaseCount = computed(() => store.getters.purchaseCount);
    return { purchaseCount };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars";
@import "../assets/styles/mixins";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media screen and (min-width: 1200px) {
    margin-bottom: 20px;
  }

  &__logo-link {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }

  &__image {
    width: 65px;

    &:hover {
      cursor: pointer;
    }
  }

  &__title {
    @include text-format(600, 2rem);
    color: $primary-color;

    @media screen and (min-width: 720px) {
      @include text-format(600, 3rem);
    }
  }

  &__cart-image {
    position: relative;

    &:hover {
      cursor: pointer;
    }
  }

  &__purchase-count {
    position: absolute;
    top: 3px;
    right: 15px;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $primary-color;
    font-size: 0.6rem;
    font-weight: bold;
    border: 1px solid $primary-color;
    background: #fff;
    border-radius: 50%;
    z-index: 1000;
  }
}
</style>
