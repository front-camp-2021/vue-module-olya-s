export default {
  state: {
    currentPage: 1,
    totalPages: 0,
    pageSize: 6,
    viewPages: 9,
  },
  mutations: {
    changePage(state, page){
      state.currentPage = page;
    },
    totalPages(state, value){
      state.totalPages = value;
    }
  },
  actions: {
    updateCurrentPage(ctx, payload){
      ctx.commit('changePage', payload);
    },
    updateTotalPages(ctx, payload){
      ctx.commit('totalPages', payload);
    }
  },
  getters: {
    currentPage(state){
      return state.currentPage;
    },
    totalPages(state){
      return state.totalPages;
    },
    pageSize(state){
      return state.pageSize;
    },
    viewPages(state){
      return state.viewPages;
    },
  }
}