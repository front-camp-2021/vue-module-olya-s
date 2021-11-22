<template>
  <div>
    <div class="container">
      <filters-list
        :price="price"
        :categories="categories"
        :brands="brands"
        @filtering="setFilters"
      />
      <cards-list
        :trigger="trigger"
        :products-count="productsCount"
        :products="productsToView"
        @wishlist="setWishlist"
        @cart="setCart"
        @filtering="setFilters"
      />
    </div>
    <pagination
      :page-size="pageSize"
      :total-pages="totalPages"
      @changePage="changeCurrentPage"
    />
  </div>
</template>

<script>
import axios from 'axios';
import CardsList from './CardsList.vue';
import FiltersList from './FiltersList.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'MainContainer',
  components: { FiltersList, CardsList, Pagination },
  data() {
    return {
      products: [],
      price: {},
      categories: [],
      brands: [],
      allProducts:
        this.products &&
        this.products.map((product) => ({
          ...product,
          inWishlist: false,
          quantity: 0,
        })),
      trigger: false,
      search: '',
      filteredPrice: {},
      checkedCategories: [],
      checkedBrands: [],
      currentPage: 1,
      pageSize: 6,
    };
  },
  computed: {
    filteredProducts: function () {
      return this.getFilteredProducts();
    },
    productsToView: function () {
      return (
        this.filteredProducts &&
        this.filteredProducts
          .slice()
          .splice(
            this.currentPage * this.pageSize - this.pageSize,
            this.pageSize
          )
      );
    },
    productsCount: function () {
      return this.filteredProducts.length;
    },
    totalPages: function () {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },
  },
  mounted() {
    try {
      axios
        .get('http://localhost:3001/products')
        .then((res) => (this.allProducts = res.data));
      axios
        .get('http://localhost:3001/price')
        .then((res) => (this.price = res.data));
      axios
        .get('http://localhost:3001/categories')
        .then((res) => (this.categories = res.data));
      axios
        .get('http://localhost:3001/brands')
        .then((res) => (this.brands = res.data));
    } catch (e) {
      throw new Error(e);
    }
  },
  methods: {
    setWishlist: function (data) {
      const product = this.allProducts.find((product) => product.id === data);
      product.inWishlist = !product.inWishlist;
    },
    setCart: function (data) {
      this.allProducts.find((product) => product.id === data).quantity++;
      const purchaseCount = this.allProducts.reduce(
        (sum, product) => product.quantity + sum,
        0
      );
      this.$emit('cart', purchaseCount);
    },
    setFilters: function (data) {
      if (!data) {
        this.trigger = !this.trigger;
        this.search = '';
        this.filteredPrice = {};
        this.checkedCategories = [];
        this.checkedBrands = [];
        return;
      }
      const { title, value } = data;
      if (title === 'Search') {
        this.search = value;
      }
      if (title === 'Price') {
        this.filteredPrice = value;
      }
      if (title === 'Category') {
        this.checkedCategories = value;
      }
      if (title === 'Brand') {
        this.checkedBrands = value;
      }
    },
    getFilteredProducts: function () {
      if (!this.allProducts) {
        return [];
      }
      const products = this.allProducts;
      let result = [];
      let categoryProducts = [];
      let brandProducts = [];
      let filteredProducts = [];
      if (!this.checkedCategories.length && !this.checkedBrands.length) {
        filteredProducts = products.slice();
      } else {
        if (this.checkedCategories.length) {
          categoryProducts = products.filter((prod) =>
            this.checkedCategories.find(
              (title) =>
                title.toLowerCase() === prod.category.split('_').join(' ')
            )
          );
        }
        if (this.checkedBrands.length) {
          brandProducts = products.filter((prod) =>
            this.checkedBrands.find(
              (title) => title.toLowerCase() === prod.brand.split('_').join(' ')
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
        } else if (categoryProducts.length && !this.checkedBrands.length) {
          filteredProducts = categoryProducts.slice();
        } else if (brandProducts.length && !this.checkedCategories.length) {
          filteredProducts = brandProducts.slice();
        }
      }
      if (!!this.search) {
        filteredProducts = filteredProducts.filter((prod) =>
          prod.title.toLowerCase().includes(this.search)
        );
      }
      if (this.filteredPrice.length) {
        filteredProducts = filteredProducts.filter(
          (prod) =>
            prod.price >= this.filteredPrice[0] &&
            prod.price <= this.filteredPrice[1]
        );
      }
      return filteredProducts;
    },
    changeCurrentPage: function (data) {
      this.currentPage = data;
    },
  },
};
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
