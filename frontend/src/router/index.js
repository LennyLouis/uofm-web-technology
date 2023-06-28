import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue'),
      children: [{
        path: '/imageGallery',
        name: 'imageGallery',
        component: () => import('../components/ImageGallery.vue'),
      }]
    }
  ]
})

export default router
