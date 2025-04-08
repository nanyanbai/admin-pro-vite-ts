import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

// 创建pinia实例
const pinia = createPinia();
// 使用持久化插件
pinia.use(piniaPluginPersistedState);
// 导出pinia
export default pinia;
