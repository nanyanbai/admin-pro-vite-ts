<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <Menu :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <Header :isCollapse="isCollapse" @handle-collapse="handleCollapse" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';

const isCollapse = ref(false);

const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>
