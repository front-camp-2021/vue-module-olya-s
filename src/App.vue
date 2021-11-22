<template>
  <div id="app">
    <main-header :purchase-count="purchaseCount" />
    <breadcrumbs />
    <main-container @cart="setCart" />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import Breadcrumbs from './components/Breadcrumbs.vue';
import MainContainer from './components/MainContainer.vue';

// const products = [
//   {
//     id: "0y9ksratv6akr9kjkav",
//     images: [
//       "https://content2.rozetka.com.ua/goods/images/big_tile/178060660.jpg",
//       "https://content1.rozetka.com.ua/goods/images/big_tile/178060662.jpg",
//     ],
//     title: "Ноутбук Acer Aspire 7 A715-75G-51ZW (NH.Q88EU.00P) Charcoal Black",
//     rating: 2.42,
//     price: 22999,
//     category: "laptops",
//     brand: "acer",
//   },
//   {
//     id: "cvr29caokhhkr9kjkav",
//     images: [
//       "https://content1.rozetka.com.ua/goods/images/big_tile/25101152.jpg",
//       "https://content1.rozetka.com.ua/goods/images/big_tile/25101161.jpg",
//     ],
//     title:
//       "Ноутбук Acer Nitro 5 AN515-55-56WH (NH.Q7PEU.00L) Obsidian Black Суперцена!!!",
//     rating: 0.53,
//     price: 28999,
//     category: "laptops",
//     brand: "acer",
//   },
//   {
//     id: "n03aecr0qrokr9kjkav",
//     images: [
//       "https://content1.rozetka.com.ua/goods/images/big_tile/191836868.jpg",
//       "https://content.rozetka.com.ua/goods/images/big_tile/191836880.jpg",
//     ],
//     title: "Ноутбук Asus VivoBook 15 X513EA-BQ409 (90NB0SG4-M05090) Black",
//     rating: 3.83,
//     price: 22000,
//     category: "laptops",
//     brand: "asus",
//   },
//   {
//     id: "7m3ixctumiwkr9kjkav",
//     images: [
//       "https://content.rozetka.com.ua/goods/images/big_tile/192276490.jpg",
//       "https://content1.rozetka.com.ua/goods/images/big_tile/192276498.jpg",
//     ],
//     title: "Ноутбук Asus Laptop M515UA-BQ387 (90NB0U11-M05340) Slate Grey",
//     rating: 2.97,
//     price: 21000,
//     category: "laptops",
//     brand: "asus",
//   },
//   {
//     id: "ypyszmjg7okr9kjkav",
//     images: [
//       "https://content1.rozetka.com.ua/goods/images/big_tile/172755042.jpg",
//     ],
//     title:
//       "Ноутбук Asus ZenBook UX425EA-BM295 (90NB0SM1-M07340) Pine Grey + фирменный чехол",
//     rating: 2.63,
//     price: 27000,
//     category: "laptops",
//     brand: "asus",
//   },
//   {
//     id: "wx7ch9y9dvnkr9kjkav",
//     images: [
//       "https://content1.rozetka.com.ua/goods/images/big_tile/180781181.jpg",
//       "https://content2.rozetka.com.ua/goods/images/big_tile/180781173.jpg",
//     ],
//     title:
//       "Ноутбук Asus ROG Strix G15 G513QE-HN029 (90NR05I2-M00950) Eclipse Gray",
//     rating: 2.65,
//     price: 36500,
//     category: "laptops",
//     brand: "asus",
//   },
//   {
//     id: "8lxdgefbn0hkr9kjkav",
//     images: [
//       "https://content1.rozetka.com.ua/goods/images/big_tile/171121266.jpg",
//     ],
//     title: "Ноутбук Dell Vostro 15 3500 (N3001VN3500UA03_2201_UBU) Black",
//     rating: 1.02,
//     price: 17000,
//     category: "laptops",
//     brand: "dell",
//   },
//   {
//     id: "ur7ngd675jckr9kjkav",
//     images: [
//       "https://content2.rozetka.com.ua/goods/images/big_tile/163134380.jpg",
//       "https://content.rozetka.com.ua/goods/images/big_tile/163134233.jpg",
//     ],
//     title: "Ноутбук Dell Vostro 14 3400 (N4011VN3400EMEA01_i5XeW) Accent Black",
//     rating: 4.93,
//     price: 25999,
//     category: "laptops",
//     brand: "dell",
//   },
//   {
//     id: "0p2cm6tmha3kr9kjkav",
//     images: [
//       "https://content.rozetka.com.ua/goods/images/big_tile/167648554.jpg",
//       "https://content2.rozetka.com.ua/goods/images/big_tile/167648555.jpg",
//     ],
//     title: "Ноутбук Dell Vostro 15 3501 (N6503VN3501EMEA01_2105_UBU) Black",
//     rating: 4.79,
//     price: 16500,
//     category: "laptops",
//     brand: "dell",
//   },
//   {
//     id: "cjcqnurj2tkkr9kjkav",
//     images: [
//       "https://content1.rozetka.com.ua/goods/images/big_tile/173835446.jpg",
//     ],
//     title: "Ноутбук Dell Latitude 7300 (N034L730013EMEA_U) Black",
//     rating: 4.45,
//     price: 18500,
//     category: "laptops",
//     brand: "dell",
//   },
// ];
// const price = {
//   min: 5000,
//   max: 60000,
//   selected: {
//     from: 50,
//     to: 100000,
//   },
// };
// const categories = [
//   "Monitors",
//   "Laptops",
//   "Video cards",
//   "Gaming keyboards",
//   "Computer mouse",
//   "SSD",
//   "Sound cards",
//   "RAM",
// ];
// const brands = [
//   "Asus",
//   "Acer",
//   "Apple",
//   "Dell",
//   "Dynamode",
//   "Gigabyte",
//   "Kingston",
//   "Lenovo",
//   "Logitech",
//   "MSI",
//   "BenQ",
//   "A4Tech",
// ];

export default {
  name: 'App',
  components: {
    MainHeader,
    Breadcrumbs,
    MainContainer,
  },
  data() {
    return {
      purchaseCount: 0,
    };
  },
  methods: {
    setCart(data) {
      this.purchaseCount = data;
    },
  },
};
</script>

<style lang="scss">
@import './assets/styles/vars';
@import './assets/styles/mixins';
@import './assets/styles/main';
</style>
