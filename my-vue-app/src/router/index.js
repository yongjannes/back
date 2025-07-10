
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
            },
            {
                path: 'mall',
                name: 'mall',
                component: () => import('@/views/Mall.vue')
            },
            {
                path: 'page1',
                name: 'page1',
                component: () => import('@/views/Page1.vue')
            },
            {
                path: 'page2',
                name: 'page2',
                component: () => import('@/views/Page2.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router