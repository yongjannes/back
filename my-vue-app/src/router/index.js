
import { createRouter, createWebHashHistory } from 'vue-router'

//路由规则
const routes = [

    {
        path: '/',
        name: 'main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home',
        children: []
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
     {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router