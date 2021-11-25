<template>
  <div class="card-in-cart">
    <div class="purchase">
      <div class="purchase__image">
        <img
          :src="product.images[0]"
          alt="product"
        >
      </div>
      <div class="purchase__body">
        <h4 class="purchase__title">
          {{ product.title }}
        </h4>
        <p class="purchase__text">
          {{ product.text }}
        </p>
      </div>
      <div class="purchase__amount">
        <span class="purchase__price">Price: {{ product.price }}</span>
        <div class="purchase__count">
          <button
            :disabled="!product.quantity"
            @click="minusOne"
          >
            -
          </button>
          <button disabled>
            {{ product.quantity }}
          </button>
          <button @click="plusOne">
            +
          </button>
        </div>
        <span class="purchase__total">Total: {{ total }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "CartItem",
  props: { product: { type: Object, default: () => {} } },
  setup(props) {
    const store = useStore();

    const total = computed(() => props.product.price * props.product.quantity);

    function minusOne() {
      store.dispatch("actionUpdateCartlist", {
        id: props.product.id,
        data: -1,
      });
    }

    function plusOne() {
      store.dispatch("actionUpdateCartlist", { id: props.product.id, data: 1 });
    }

    return { total, minusOne, plusOne };
  },
};
</script>

<style lang="scss">
@import "../assets/styles/vars";

.purchase {
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 150px 1fr 135px;
  font-weight: 400;
  background: #ffffff;
  box-shadow: $box-shadow;
  border-radius: 8px;

  &__image {
    padding: 10px;

    img {
      height: 100px;
    }
  }

  &__body {
    padding: 10px;
  }

  &__amount {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__count button {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 3px;
    width: 30px;
    height: 30px;
    margin-right: 5px;

    &[disabled] {
      border: 1px solid rgba(0, 0, 0, 0.3);
    }

    &:not([disabled]):hover {
      cursor: pointer;
      box-shadow: $box-shadow-hover;
    }
  }
}
</style>
