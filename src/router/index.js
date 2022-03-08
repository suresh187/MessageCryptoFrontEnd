import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddNewMessage from '../views/AddNewMessage.vue'
import LogInView from '../views/LogInView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '/addNewMessage',
    name: AddNewMessage,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AddNewMessage.vue')
    component:AddNewMessage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
