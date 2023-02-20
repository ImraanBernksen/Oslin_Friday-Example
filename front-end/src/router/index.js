import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
  
    component: () => import('../views/AboutView.vue')
  },
  {
    path:"/login",
    name: "LoginView",
    component: () => import("../views/LoginView.vue")

  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue")
  },
  {
    path: "/cars",
    name: "CarsView",
    component: () => import("../views/CarsView.vue"),
  },
  {
    path: "/car/:id",
    name: "CarView",
    component: () => import("../views/CarView.vue"),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
