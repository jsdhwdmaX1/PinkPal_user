// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'

const routers = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'category/:id',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: 'cartlist',
          component: () => import('@/views/CartList/index.vue')
        },
        {
          path: 'checkout',
          component: () => import('@/views/Checkout/index.vue')
        },
        {
          path: 'pay',
          component: () => import('@/views/Pay/index.vue')
        },
        {
          path: 'paycallback',
          component: () => import('@/views/Pay/PayBack.vue')
        },
        {
          path: 'member',
          component: () => import('@/views/Member/index.vue')
        }
      ]
    },
    {
      path: '/login-user',
      component: () => import('@/views/Login-user/index.vue')
    },
    {
      path: '/register-user',
      component: () => import('@/views/Register-user/index.vue')
    },
    // {
    //   path: '/login-store',
    //   component: () => import('@/views/Login-store/index.vue')
    // },
    {
      path: '/register-store',
      component: () => import('@/views/Register-store/index.vue')
    }
  ],
  // 路由滚动行为定制
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

// const router = createRouter({
//   // history: createWebHistory(import.meta.env.BASE_URL), // 这是默认的配置
//   // history: createWebHistory('/test'), // 打包后dist放在了 test 目录下
//   history: createWebHistory(),
//   routers
// })
 
export default routers