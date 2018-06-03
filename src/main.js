// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import vSelect from 'vue-select'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// font-awesome stuff
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/minus'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/trash-alt'
import Icon from 'vue-awesome/components/Icon'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.component('v-select', vSelect)
Vue.component('icon', Icon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
