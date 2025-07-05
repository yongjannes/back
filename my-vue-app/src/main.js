import { createApp } from 'vue'
import '@/assets/less/index.less'
import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import { pinia } from './stores'


const app = createApp(App)

app.use(router).use(pinia).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}