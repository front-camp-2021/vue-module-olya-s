<template>
  <form class="search">
    <div class="search__results">
      <p>{{ results }} results found</p>
      <!-- <a routerLink="/wishlist"> -->
      <button class="search__button-like">
        <img
          :src="wishlistIcon"
          alt="see wishlist"
        >
      </button>
      <!-- </a> -->
    </div>
    <label
      for="search-input"
      hidden
    >Search</label>
    <input
      id="search-input"
      v-model="value"
      class="search__input"
      type="text"
      placeholder="Search"
      @input="debouncedOnInput()"
    >
    <img
      class="search__image"
      src="../assets/images/search.svg"
      alt="search icon"
    >
  </form>
</template>

<script>
const debounce = (callback) => {
  let timeout;
  return function (argument) {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 1500, argument);
  };
};
export default {
  name: "Search",
  props: {
    trigger: Boolean,
    wishfulProducts: { type: Number, default: 0 },
    results: { type: Number, default: 0 },
  },
  data: function () {
    return {
      value: "",
      setSearch: debounce(() => {
        this.$emit("filtering", { title: "Search", value: this.value });
      }),
    };
  },
  computed: {
    wishlistIcon() {
      if (!this.wishfulProducts) {
        return require("../assets/images/like.svg");
      } else {
        return require("../assets/images/like_2.svg");
      }
    },
  },
  watch: {
    trigger: function () {
      this.reset();
    },
  },
  methods: {
    debouncedOnInput() {
      this.setSearch(null);
    },
    reset() {
      this.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars";

.search {
  position: relative;
  margin-bottom: 20px;

  @media screen and (min-width: 720px) {
    margin-bottom: 20px;
  }

  @media screen and (min-width: 1200px) {
    margin-bottom: 28px;
  }

  &__results {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__button-like {
    width: 45px;
    height: 40px;
    border: none;
    align-self: baseline;
    border-radius: $border-radius;
    background: $bg-primary;

    &:hover {
      cursor: pointer;
      box-shadow: $box-shadow-hover;
    }
  }

  &__input {
    width: 100%;
    margin-top: 20px;
    padding: 15px 25px;
    font-size: 1.2rem;
    border: none;
    box-shadow: $box-shadow;
    border-radius: $border-radius;

    &:hover {
      box-shadow: $box-shadow-hover;
    }

    @media screen and (min-width: 1200px) {
      margin-top: 20px;
    }
  }

  &__image {
    position: absolute;
    right: 15px;
    bottom: 17px;
  }
}
</style>
