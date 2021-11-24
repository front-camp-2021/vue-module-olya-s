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
    updateCartlist(state, payload){
      state.products=state.products.map(product=>
        product.id === payload.id
        ? { ...product, quantity: product.quantity + payload.data }
        : product
        );
    },
    updateProductsCount(state, value){
      state.productsCount = value;
    },
    clearWishlist(state){
      state.products = state.products.map(product =>
        ({ ...product, inWishlist: false }));
    },
    clearCart(state){
      state.products = state.products.map(product =>
        ({ ...product, quantity: 0 }));
    }
  },
  actions: {
    async actionGetProducts(ctx){
      const result = await axios.get('http://localhost:3001/products');
      const products = result.data;

      ctx.commit('updateProducts', products);
    },
    actionUpdateCartlist(ctx, payload){
      ctx.commit('updateCartlist', payload);
    },
    actionUpdateProductsCount(ctx, payload){
      ctx.commit('updateProductsCount', payload);
    },
    actionClearWishlist(ctx){
      ctx.commit('clearWishlist');
    },
    actionClearCart(ctx){
      ctx.commit('clearCart');
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