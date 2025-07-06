import { createApp } from 'vue'
import '@/assets/less/index.less'
import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import { pinia } from './stores'
import '@/api/mock'
import api from '@/api/api'


const app = createApp(App)

app.config.globalProperties.$api = api

app.use(router).use(pinia).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}