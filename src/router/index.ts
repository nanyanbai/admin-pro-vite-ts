import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置路由
// const routes: RouteRecordRaw[] = [{
//     path: '/',
//     name: 'Home',
//     component: () => import('@/views/home/index.vue'),
//     meta: {},
//     children: [],
// }];

const noStatusPage: string[] = ['/login', '/about'];

// 公共路由
const commonRoutes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/common/About.vue'),
    meta: {},
  },
  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/common/NotFund.vue'),
  },
];

// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
  eager: true,
});
const routes: Array<RouteRecordRaw> = [];

// 将路由添加到数组
Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

// 将公共路由添加到数组中
routes.push(...commonRoutes);

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由前置守卫
router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  if (window.sessionStorage.getItem('userInfo') || noStatusPage.includes(_to.path)) {
    next();
  } else {
    next('/login');
  }
});

// 路由后置守卫
router.afterEach((_to) => {
  NProgress.done();
});

// 导出路由实例
export default router;
