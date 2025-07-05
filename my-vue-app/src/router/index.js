
import { createRouter, createWebHashHistory } from 'vue-router'

//路由规则
const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/Main.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router