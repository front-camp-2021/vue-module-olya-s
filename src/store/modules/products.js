import axios from "axios";

export default {
  state: {
    products: [],
    productsCount: 0
  },
  mutations: {
    updateProducts(state, products){
      state.products = products.map(product => 
        ({ ...product, inWishlist: false, quantity: 0 })
      );
    },
    updateQuantity(state, id){
      state.products = state.products.map(product =>
        product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
      )
    },
    updateWishlist(state, id){
      state.products = state.products.map(product =>
        product.id === id
        ? { ...product, inWishlist: !product.inWishlist }
        : product
      )      
    },
    updateProductsCount(state, value){
      state.productsCount = value;
    }
  },
  actions: {
    async actionGetProducts(ctx){
      const result = await axios.get('http://localhost:3001/products');
      const products = result.data;

      ctx.commit('updateProducts', products);
    },
    actionUpdateProductsCount(ctx, payload){
      ctx.commit('updateProductsCount', payload);
    }
  },
  getters: {
    allProducts(state){
      return state.products;
    },
    purchaseCount(state){
      const result = state.products.reduce((sum, product) => (sum + product.quantity), 0);
      return result;
    },
    wishlistCount(state){
      return state.products.filter(product => product.inWishlist).length;
    },
    productsCount(state){
      return state.productsCount;
    }
  },
}