import { createStore } from 'vuex';
import products from './modules/products';
import filters from './modules/filters';
import pages from './modules/pages';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    filters,
    pages
  },
});
