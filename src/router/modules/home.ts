import type { RouteRecordRaw } from 'vue-router';
import { HomeFilled, UserFilled, List, Lock } from '@element-plus/icons-vue';

export default {
  path: '/',
  name: 'layout',
  component: () => import('@/layout/index.vue'),
  meta: {},
  children: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/home/index.vue'),
      meta: {
        icon: HomeFilled,
        title: '项目介绍',
        isShow: true,
      },
      children: [],
    },
    {
      path: '/role',
      name: 'RolePage',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        icon: List,
        title: '角色管理',
        isShow: true,
      },
      children: [],
    },
    {
      path: '/user',
      name: 'UserPage',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        icon: UserFilled,
        title: '用户管理',
        isShow: true,
      },
      children: [],
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: () => import('@/views/system/auth/index.vue'),
      meta: {
        icon: Lock,
        title: '权限管理',
        isShow: true,
      },
      children: [],
    },
  ],
} as RouteRecordRaw;
