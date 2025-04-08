<template>
  <div class="login">
    <div class="login-form">
      <h1 class="login-title">企业中后台管理系统</h1>
      <ElForm ref="formRef" :model="userInfo" :rules="rules" center class="login-info">
        <ElFormItem prop="username">
          <ElInput v-model="userInfo.username" :prefix-icon="User" placeholder="请输入用户名" />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="userInfo.password"
            type="password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            @keydown="onhandleEnter($event as KeyboardEvent)"
          />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" style="width: 100%" @click="login(formRef)">登录</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user';
import { User, Lock } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';

const router = useRouter();
const userStore = useUserStore();

interface RuleForm {
  username: string;
  password: string;
}

const formRef = ref<FormInstance>();

const userInfo = reactive<RuleForm>({
  username: '',
  password: '',
});

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      userStore
        .storeUserLogin({
          username: userInfo.username,
          password: userInfo.password,
        })
        .then(() => {
          router.push('/');
        });
    } else {
      console.log('error submit', fields);
    }
  });
};

const onhandleEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    login(formRef.value);
  }
};
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  background: var(--yk-backgroud-color);
  .login-form {
    display: flex;
    width: 300px;
    text-align: center;
    flex-direction: column;
    .login-title {
      font-size: 24px;
      font-weight: 600;
      margin: 10px 0;
    }
    .login-info {
      height: max-content;
    }
  }
}
</style>
