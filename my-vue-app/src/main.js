import { createApp } from 'vue'
import '@/assets/less/index.less'
import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { useAllDataStore } from '@/stores'
import { pinia } from './stores'
import '@/api/mock'
import api from '@/api/api'


const app = createApp(App)

app.config.globalProperties.$api = api

app.use(router).use(pinia).mount('#app')
//这个动态路由的方法必须要在use(pinia)之后使用，因为这样才可以获取到pinia对象
//必须在use(router)之前使用，因为如果是刷新，useuse(router)后执行完会直接跳转路由，所以需要在他之前执行动态路由方法
const store = useAllDataStore()
store.addMenu(router, "refresh")

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}