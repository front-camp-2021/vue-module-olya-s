<template>
  <form class="search">
    <div class="search__results">
      <p>{{ results }} results found</p>
      <router-link to="/wishlist">
        <button class="search__button-like">
          <img
            :src="wishlistIcon"
            alt="see wishlist"
          >
        </button>
      </router-link>
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
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";

const debounce = (callback) => {
  let timeout;
  return function (argument) {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 1500, argument);
  };
};
export default defineComponent({
  name: "Search",
  props: {
    trigger: Boolean,
  },
  setup() {
    const store = useStore();

    const value = ref("");
    const setSearch = debounce(() => {
      store.dispatch("actionUpdateFilters", { title: "Search", value });
    });
    const wishlistIcon = computed(() => {
      if (!store.getters.wishlistCount) {
        return require("../assets/images/like.svg");
      } else {
        return require("../assets/images/like_2.svg");
      }
    });
    const results = computed(() => store.getters.productsCount);

    function debouncedOnInput() {
      setSearch(null);
    }

    return { value, wishlistIcon, debouncedOnInput, results };
  },
});
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
