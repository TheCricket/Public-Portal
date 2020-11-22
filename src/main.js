import Vue from 'vue'
import App from './App.vue'
import Admin from './components/Admin.vue'
import GuestComplaints from './components/GuestComplaints'
import VueRouter from 'vue-router'
import AddGuestModal from './components/AddGuestModal'
import Stats from './components/Stats'

Vue.config.productionTip = false

export const EventBus = new Vue();

Vue.use(VueRouter)

const routes = [
  { path: '/', component: GuestComplaints},
  { path: '/complaints', component: GuestComplaints},
  { path: '/admin', component: Admin },
  { path: '/complaints/add-guest', component: AddGuestModal },
  { path: '/stats', component: Stats},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// Now the app has started!

new Vue({
  render: h => h(App),
  router
}).$mount('#app')