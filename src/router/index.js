import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Cities from '@/components/city/Cities'
import CityCreate from '@/components/city/CityCreate'
import Regions from '@/components/region/Regions'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/cities',
      name: 'Cities',
      component: Cities
    },
    {
      path: '/regions',
      name: 'Regions',
      component: Regions
    }
  ]
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
