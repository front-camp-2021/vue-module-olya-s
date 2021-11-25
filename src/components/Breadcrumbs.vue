<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <a href="/">
        <img
          src="../assets/images/home.svg"
          alt="Home"
        >
      </a>
    </li>
    <li class="breadcrumbs__item">
      <a href="/ecommerce">eCommerce</a>
    </li>
    <li class="breadcrumbs__item breadcrumbs__item_current">
      Electronics
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Breadcrumbs",
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars";

.breadcrumbs {
  margin: 10px 0;

  @media screen and (min-width: 720px) {
    margin: 15px 0;
  }

  @media screen and (min-width: 1200px) {
    margin: 20px 0;
  }

  &__item {
    display: inline-block;

    &::after {
      content: ">>";
      display: inline-block;
      width: 25px;
      text-align: center;

      @media screen and (min-width: 720px) {
        width: 40px;
      }
    }

    &:last-child::after {
      content: "";
      display: none;
    }

    a {
      color: $primary-color;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
