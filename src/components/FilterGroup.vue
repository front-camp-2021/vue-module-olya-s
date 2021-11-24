<template>
  <fieldset class="filters__group">
    <legend>{{ title }}</legend>
    <ul>
      <li
        v-for="(filter, index) of filters"
        :key="index"
      >
        <div class="filters__option filters__option_checkbox">
          <div>
            <input
              :id="filter"
              v-model="checkedNames"
              class="checkbox"
              type="checkbox"
              :value="filter"
              @change="change"
            >
            <label :for="filter">{{ filter }}</label>
          </div>
          <span class="filters__count" />
        </div>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "FilterGroup",
  props: {
    filters: { type: Array, default: () => {} },
    title: { type: String, default: "" },
  },
  setup(props) {
    const store = useStore();

    const checkedNames = ref([]);
    const allProducts = store.getters.allProducts;

    function change() {
      store.dispatch("actionUpdateFilters", {
        title: props.title,
        value: checkedNames,
        products: allProducts,
      });
    }
    return { checkedNames, change };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/mixins";

.filters__group {
  padding-bottom: 28px;

  legend {
    @include text-format(600);
    margin-bottom: 28px;
  }

  .filters__option {
    input {
      opacity: 0;

      &:hover {
        cursor: pointer;
      }

      &:checked + label::before {
        background: #6f64f8;
      }
    }

    label {
      display: inline;

      &:hover {
        cursor: pointer;
      }

      &::before {
        content: "";
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-left: -15px;
        margin-right: 10px;
        border: 1px solid #979797;
      }
    }

    &_checkbox {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      label::before {
        border-radius: 3px;
      }
    }
  }
}
</style>
