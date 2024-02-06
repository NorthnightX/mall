import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from 'element-ui';
import login from '../views/login/loginMall.vue';
import mallHome from "../views/home/mallHome.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: mallHome,
    hidden: true,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/loginMall.vue')
  },
  {
    path: '/mall/home',
    name: 'home',
    component: () => import('../views/home/mallHome.vue')
  },
  {
    path: '/mall/search',
    name: 'search',
    component:  () => import("../views/search/searchProduct.vue")
  },
  {
    path: '/mall/lookProduct',
    name: 'lookProduct',
    component:  () => import("../views/look/productMessage.vue")
  },
  {
    path: '/mall/cart',
    name: 'cart',
    component:  () => import("../views/cart/cart.vue")
  },
  {
    path: '/mall/pay',
    name: 'pay',
    component:  () => import("../views/pay/pay.vue")
  },
  {
    path: '/mall/paySuccess',
    name: 'pay',
    component:  () => import("../views/pay/paySuccess.vue")
  },
  {
    path: '/mall/userInfo',
    name: 'userInfo',
    component:  () => import("../views/user/user.vue")
  },
  {
    path: '/mall/payForProduct',
    name: 'userInfo',
    component:  () => import("../views/pay/payForProduct.vue")
  },
  {
    path: '/mall/address',
    name: 'address',
    component:  () => import("../views/user/address.vue")
  },
  {
    path: '/mall/myOrder',
    name: 'myOrder',
    component:  () => import("../views/user/myOrder.vue")
  },
  {
    path: '/mall/browsingHistory',
    name: 'browsingHistory',
    component:  () => import("../views/user/browsingHistory.vue")
  }
]



const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
