import { createRouter, createWebHistory } from 'vue-router';
import AuthService from '@/services/AuthService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'homePage',
          component: () => import('../components/HomePage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../components/Profile.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/imageGallery',
          name: 'imageGallery',
          component: () => import('../components/ImageGallery.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('../components/Account.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/addImage',
          name: 'addImage',
          component: () => import('../components/AddImageURL.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/myImages',
          name: 'myImages',
          component: () => import('../components/MyImages.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/uploadFiles',
          name: 'uploadFiles',
          component: () => import('../components/UploadFiles.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page
    if (!AuthService.isLoggedIn()) {
      next({
        name: 'login',
      })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
