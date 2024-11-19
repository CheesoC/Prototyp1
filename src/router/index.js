import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TopicsView from '@/views/TopicsView.vue'
import LevelView from '@/views/LevelView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import TopicView from '@/views/TopicView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import ProgressView from '@/views/ProgressView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    {
      path: '/topics',
      name: 'topics',
      component: TopicsView,
    },

    {
      path: '/topics/:id(\\d+)', //'/jobs/:id(\\d+)' für nur Zahlen als ID
      name: 'topic',
      component: TopicView,
    },

    {
      path: '/topics/:topicId/level/:levelId', //'/jobs/:id(\\d+)' für nur Zahlen als ID
      name: 'level',
      component: LevelView,
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
