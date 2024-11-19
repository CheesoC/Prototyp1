import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TasksView from '@/views/TasksView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import TaskView from '@/views/TaskView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import ProgressView from '@/views/ProgressView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
    },

    {
      path: '/tasks/:id(\\d+)', //'/jobs/:id(\\d+)' für nur Zahlen als ID
      name: 'task',
      component: TaskView,
    },

    {
      path: '/progress',
      name: 'progress',
      component: ProgressView,
    },

    {
      path: '/about',
      name: 'about',
      component: AboutUsView,
    },

    {
      path: '/:catchALL(.*)',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

export default router
