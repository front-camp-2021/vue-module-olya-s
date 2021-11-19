<template>
  <div class="card">
    <div @click="goTo()">
      <div class="card__image">
        <img
          :src="product.images[0]"
          alt="product"
        >
      </div>
      <div class="card__body">
        <div>
          <span :class="product.rating ? 'card__rating' : 'visually-hidden'">
            {{ rating }}
            <img
              src="../assets/images/star.svg"
              alt="star icon"
            >
          </span>
          <span class="card__price">{{ price }}</span>
        </div>
        <h4 class="card__title">
          {{ title }}
        </h4>
      </div>
    </div>
    <div class="card__footer">
      <button
        class="card__button card__button_wishlist"
        @click="addToWishlist()"
      >
        <img
          :src="wishlistIcon"
          alt="wish"
        >
        Wishlist
      </button>
      <button
        class="card__button card__button_cart"
        @click="addToCart()"
      >
        <img
          src="../assets/images/shopping-bag.svg"
          alt="add to cart"
        >
        Add to cart {{ quantityCounter }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    product: { type: Object, default: () => {} },
  },

  data: function () {
    let { id, title, rating, price, inWishlist, quantity } = this.product;
    return { id, title, rating, price, inWishlist, quantity };
  },

  computed: {
    wishlistIcon() {
      if (!this.inWishlist) {
        return require("../assets/images/heart.svg");
      } else {
        return require(`../assets/images/heart_2.svg`);
      }
    },
    quantityCounter() {
      if (this.quantity) {
        return ` (${this.quantity})`;
      }
      return "";
    },
  },

  methods: {
    goTo: function () {
      console.log("GOTO");
    },
    addToWishlist: function () {
      this.inWishlist = !this.inWishlist;
    },
    addToCart: function () {
      this.quantity++;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/styles/vars";
@import "../assets/styles/mixins";

.card {
  display: grid;
  align-items: end;
  width: 100%;
  min-width: 300px;
  height: 100%;
  @include text-format(400, 0.9rem);
  background: $white;
  box-shadow: $box-shadow;
  border-radius: $border-radius;

  a {
    color: inherit;
  }

  &:hover {
    cursor: pointer;
  }

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 337px;

    img {
      max-width: 70%;
      max-height: 70%;
    }
  }

  &__body {
    padding: 0 24px 24px;

    div {
      height: 30px;
      clear: both;
    }
  }

  &__title {
    margin-top: 16px;
    @include text-format(400, 1.2rem);
  }

  &__rating {
    float: left;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50px;
    height: 33px;
    padding: 6px 5px;
    @include text-format(400, 0.9rem);
    background: $bg-primary;
    color: $white;
    border-radius: 3px;
  }

  &__price {
    float: right;
    @include text-format(400, 1rem);
  }

  &__footer {
    display: flex;
    height: 45px;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    border: none;
    @include text-format(600, 0.9rem);
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      box-shadow: $box-shadow-hover;
    }

    &_wishlist {
      background: $bg-secondary;
      border-bottom-left-radius: $border-radius;

      img {
        margin-right: 9px;
      }
    }

    &_cart {
      background: $bg-primary;
      color: $white;
      border-bottom-right-radius: $border-radius;

      img {
        margin-right: 12px;
      }
    }
  }
}
</style>
