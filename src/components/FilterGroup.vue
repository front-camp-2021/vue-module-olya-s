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
export default {
  name: "FilterGroup",
  props: {
    filters: { type: Array, default: () => {} },
    title: { type: String, default: "" },
    trigger: Boolean,
  },
  data: function () {
    return { checkedNames: [] };
  },
  watch: {
    trigger: function () {
      this.reset();
    },
  },
  methods: {
    change: function () {
      this.$emit("filtering", {
        title: this.title,
        value: this.checkedNames,
      });
    },
    reset: function () {
      this.checkedNames = [];
    },
  },
};
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
