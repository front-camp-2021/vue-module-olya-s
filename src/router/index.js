import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '../views/ProductsPage.vue';
import CartPage from '../views/CartPage.vue';
import WishlistPage from '../views/WishlistPage.vue';
import ProductPage from '../views/ProductPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/products',
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: ProductsPage
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage
  },
  {
    path: '/wishlist',
    name: 'WishlistPage',
    component: WishlistPage
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/:pathMatch(.*)*',
    component:()=>import(/* webpackChunkName: "not-found" */ "../views/NotFoundPage")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
