import axios from "axios";

export default {
  state: {
    price: {},
    categories: [],
    brands: [],
    searchFilter: '',
    filteredPrice: [],
    checkedCategories: [],
    checkedBrands: [],
  },
  mutations: {
    updatePrice(state, price) {
      state.price = price;
    },
    updateCategories(state, categories) {
      state.categories = categories;
    },
    updateBrands(state, brands) {
      state.brands = brands;
    },
    setFilters(state, data) {
      if (!data) {
        state.searchFilter = '';
        state.filteredPrice = [state.price.selected.from, state.price.selected.to];
        state.checkedCategories = [];
        state.checkedBrands = [];
        return;
      }
      const { title, value } = data;
      if (title === 'Search') {
        state.searchFilter = value;
      }
      if (title === 'Price') {
        state.filteredPrice = value;
      }
      if (title === 'Category') {
        state.checkedCategories = value;
      }
      if (title === 'Brand') {
        state.checkedBrands = value;
      }
    }
  },
  actions: {
    async actionGetPrice(ctx) {
      try {
        const res = await axios.get('http://localhost:3001/price');
        const price = res.data;

        ctx.commit('updatePrice', price);
      }
      catch (e) {
        console.error(e);
      }
    },
    async actionGetCategories(ctx) {
      try {
        const res = await axios.get('http://localhost:3001/categories');
        const categories = res.data;

        ctx.commit('updateCategories', categories);
      }
      catch (e) {
        console.error(e);
      }
    },
    async actionGetBrands(ctx) {
      try {
        const res = await axios.get('http://localhost:3001/brands');
        const brands = res.data;

        ctx.commit('updateBrands', brands);
      }
      catch (e) {
        console.error(e);
      }
    },
    updateFilters(ctx, payload) {
      ctx.commit('setFilters', payload);
      ctx.commit('changePage', 1);
    },
  },
  getters: {
    price(state) {
      return state.price;
    },
    categories(state) {
      return state.categories;
    },
    brands(state) {
      return state.brands;
    },
    searchFilter(state) {
      return state.searchFilter;
    },
    filteredPrice(state) {
      return state.filteredPrice;
    },
    checkedCategories(state) {
      return state.checkedCategories;
    },
    checkedBrands(state) {
      return state.checkedBrands;
    },
    trigger(state){
      return state.filter;
    }
  },
}