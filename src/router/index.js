import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Cities from '@/components/city/Cities'
import CityCreate from '@/components/city/CityCreate'

Vue.use(Router)

export default new Router({
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
      path: '/cities/create',
      name: 'CityCreate',
      component: CityCreate
    }
  ]
})
