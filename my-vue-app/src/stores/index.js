import { createPinia } from 'pinia';
import { useAllDataStore } from './aside';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建 Pinia 实例
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate)

// 统一导出
export { pinia, useAllDataStore };