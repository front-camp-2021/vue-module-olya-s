<template>
  <div id="app">
    <breadcrumbs />
    <main-container />
    <pagination />
  </div>
</template>

<script>
import Breadcrumbs from "../components/Breadcrumbs.vue";
import MainContainer from "../components/MainContainer.vue";
import Pagination from "../components/Pagination.vue";

export default {
  name: "ProductsPage",
  components: {
    Breadcrumbs,
    MainContainer,
    Pagination,
  },
};
</script>

<style lang="scss">
@import "../assets/styles/vars";
@import "../assets/styles/mixins";
@import "../assets/styles/main";
</style>
