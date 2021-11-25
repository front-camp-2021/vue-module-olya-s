<template>
  <div id="app">
    <main-header :purchase-count="purchaseCount" />
    <router-view />
  </div>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    MainHeader,
  },
  setup() {
    const store = useStore();

    store.dispatch("actionGetProducts");
    store.dispatch("actionGetPrice");
    store.dispatch("actionGetCategories");
    store.dispatch("actionGetBrands");
  },
};
</script>

<style lang="scss">
@import "./assets/styles/vars";
@import "./assets/styles/mixins";
@import "./assets/styles/main";
</style>
