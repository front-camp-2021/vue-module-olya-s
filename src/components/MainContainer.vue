<template>
  <div>
    <div class="container">
      <filters-list />
      <cards-list :products="filteredProducts" />
    </div>
  </div>
</template>

<script>
import CardsList from "./CardsList.vue";
import FiltersList from "./FiltersList.vue";
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainComponent",
  components: {
    FiltersList,
    CardsList,
  },
  setup() {
    const store = useStore();

    const pageSize = store.getters.pageSize;
    const currentPage = computed(() => store.getters.currentPage);
    const searchFilter = computed(() => store.getters.searchFilter);
    const filteredPrice = computed(() => store.getters.filteredPrice);
    const checkedCategories = computed(() => store.getters.checkedCategories);
    const checkedBrands = computed(() => store.getters.checkedBrands);

    const allProducts = computed(() => store.getters.allProducts);
    const wishlistCount = computed(() => store.getters.wishlistCount);

    const filteredProducts = computed(() => filteringProducts());
    const productsToShow = computed(() => getProductsToShow());
    const productsCount = computed(() => filteredProducts.value.length);

    watch([currentPage], filteringProducts);

    function filteringProducts() {
      const products = allProducts.value;
      const price = filteredPrice.value;
      const category = checkedCategories.value;
      const brand = checkedBrands.value;
      const search = searchFilter.value;
      if (!allProducts) {
        return [];
      }
      let categoryProducts = [];
      let brandProducts = [];
      let filteredProducts = [];
      if (!category.length && !brand.length) {
        filteredProducts = products.slice();
      } else {
        if (category.length) {
          categoryProducts = products.filter((prod) =>
            category.find(
              (title) =>
                title.toLowerCase() === prod.category.split("_").join(" ")
            )
          );
        }
        if (brand.length) {
          brandProducts = products.filter((prod) =>
            brand.find(
              (title) => title.toLowerCase() === prod.brand.split("_").join(" ")
            )
          );
        }
        if (categoryProducts.length && brandProducts.length) {
          filteredProducts = categoryProducts.filter((prodCategory) => {
            const products = brandProducts.filter((prodBrand) => {
              return prodCategory.id === prodBrand.id;
            });
            return products.length;
          });
        } else if (categoryProducts.length && !brand.length) {
          filteredProducts = categoryProducts.slice();
        } else if (brandProducts.length && !category.length) {
          filteredProducts = brandProducts.slice();
        }
      }
      if (!!search) {
        filteredProducts = filteredProducts.filter((prod) =>
          prod.title.toLowerCase().includes(search)
        );
      }
      if (price.length) {
        filteredProducts = filteredProducts.filter(
          (prod) => prod.price >= price[0] && prod.price <= price[1]
        );
      }
      const totalPages = Math.ceil(filteredProducts.length / pageSize);

      let result = filteredProducts.slice();
      result = result.splice(currentPage.value * pageSize - pageSize, pageSize);

      store.dispatch("updateTotalPages", totalPages);
      store.dispatch("actionUpdateProductsCount", filteredProducts.length);

      return result;
    }

    function getProductsToShow() {
      return result;
    }

    return {
      allProducts,
      filteredProducts,
      productsCount,
      productsToShow,
    };
  },
});
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
