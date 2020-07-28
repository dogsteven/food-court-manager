import Vue from 'vue'
import VueRouter from 'vue-router'
import Vendor from '../views/Vendor'
import VendorDetail from '../views/Vendor/vendor-detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/vendor',
    name: 'VendorView',
    component: Vendor
  },
  {
    path: '/vendor-detail/:id',
    name: 'VendorDetailView',
    component: VendorDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
