<template>
  <div class="header">
    <div class="flex-center">
      <span @click="$emit('handle-collapse')">
        <icon-ep-expand v-if="isCollapse" />
        <icon-ep-fold v-else />
      </span>
    </div>
    <div class="flex-grow"></div>
    <div class="flex-center m05 color-dark-black">
      <el-dropdown @command="onHandleCommand">
        <span class="el-dropdown-link">
          <icon-ep-user />
          <span class="ml05">{{ userStore.username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="about">关于系统</el-dropdown-item>
            <el-dropdown-item command="modify" disabled>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="flex-center color-dark-black setting" @click="onHandleSetting"><icon-ep-setting /></div>
    <el-drawer v-model="drawer2" :show-close="false" size="300">
      <template #header>
        <h3 class="setting-header">项目配置</h3>
      </template>
      <template #default>
        <div>
          <el-radio v-model="radio1" value="Option 1" size="large"> Option 1 </el-radio>
          <el-radio v-model="radio1" value="Option 2" size="large"> Option 2 </el-radio>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['handle-collapse']);

const router = useRouter();
const userStore = useUserStore();
const drawer2 = ref(false);
const radio1 = ref('Option 1');

const onHandleSetting = () => {
  drawer2.value = true;
};

function cancelClick() {
  drawer2.value = false;
}

function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false;
    })
    .catch(() => {
      // catch error
    });
}

const onHandleCommand = (command: string) => {
  if (command === 'logout') {
    sessionStorage.removeItem('userInfo');
    router.push('/login');
    ElMessage({ message: '退出成功！', type: 'success' });
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  // padding: 0 15px;
  width: 100%;
  height: 60px;
}

.setting {
  cursor: pointer;
}

.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--yk-color-dark-black);
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--yk-color-dark-black);
  display: flex;
  align-items: center;
}
</style>
