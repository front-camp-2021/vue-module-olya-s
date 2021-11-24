<template>
  <div>
    <card
      v-if="product"
      :product="product"
    />
    <p v-else>
      Product not found
    </p>
  </div>
</template>

<script>
import Card from "../components/Card";
import { useStore } from "vuex";
import { computed } from "vue";
import router from "../router";

export default {
  name: "ProductPage",
  components: { Card },
  setup() {
    const store = useStore();

    const id = router.currentRoute.value.params.id;
    const product = computed(() =>
      store.getters.allProducts.find((product) => product.id === id)
    );

    return { product };
  },
};
</script>

<style></style>
