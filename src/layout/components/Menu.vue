<template>
  <h5 class="logo-box" :style="isCollapse ? 'width: 63.33px;' : ''">
    <img :src="logo" alt="logo.png" />
    <span v-if="!isCollapse">Admin Pro</span>
  </h5>
  <el-menu :default-active="activeMenu" router class="el-menu-vertical-demo" :collapse="isCollapse">
    <template v-for="menu in menus" :key="menu.path">
      <el-menu-item v-if="!menu.children || menu.children.length === 0" :index="menu.path">
        <template #title>
          <!-- 展示图标 -->
          <el-icon>
            <component :is="menu.meta?.icon" />
          </el-icon>
          <!-- 展示标题 -->
          <span>{{ menu.meta?.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-else :index="menu.path">
        <template #title>
          <!-- 展示图标 -->
          <el-icon>
            <component :is="menu.meta?.icon" />
          </el-icon>
          <!-- 展示标题 -->
          <span>{{ menu.meta?.title }}</span>
        </template>
        <template v-for="child in menu.children" :key="child.path">
          <el-menu-item :index="child.path">
            <template #title>
              <!-- 展示子菜单图标 -->
              <el-icon>
                <component :is="child.meta?.icon" />
              </el-icon>
              <!-- 展示子菜单标题 -->
              <span>{{ child.meta?.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import logo from '@/assets/images/logo.png';

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['handle-open', 'handle-close']);

const router = useRouter();
const route = useRoute();
const activeMenu = ref(route.path);

const menus = router.getRoutes().filter((route) => {
  return route.meta.isShow;
});
</script>

<style lang="less" scoped>
.logo-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 15px;
  img {
    width: 32px;
    height: 32px;
  }

  span {
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
