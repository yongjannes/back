
import { createRouter, createWebHashHistory } from 'vue-router'

//路由规则
const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home.vue'),
            },
            //添加用户管理
            {
                path: 'user',
                name: 'user',
                component: () => import('@/views/User.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router