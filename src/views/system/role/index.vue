<template>
  <div class="page-wapper">
    <div class="list-header">
      <el-form :inline="true" :model="formParams">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formParams.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="formParams.role" placeholder="请选择角色" clearable style="width: 200px">
            <el-option v-for="item in roleList" :key="item.role" :label="item.roleName" :value="item.role"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-body">
      <div class="list-body-header">
        <div class="list-body-header-left">
          <div class="list-body-header-left-title">项目列表</div>
        </div>
        <div class="list-body-header-right">
          <!-- <el-button type="primary">Primary</el-button> -->
        </div>
      </div>
      <div class="list-body-content">
        <el-table :data="dataList" border style="width: 100%">
          <el-table-column prop="id" label="用户编号" width="180" />
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="roles" label="角色">
            <template #default="scope">
              <el-space wrap>
                <el-tag v-for="v in scope.row.roles" :key="v" type="primary">{{ v }}</el-tag>
              </el-space>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="updateTime" label="更新时间" />
          <el-table-column prop="role" label="操作">
            <template #default="scope">
              <el-button v-if="scope.row.roles.includes('admin')" type="primary" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="list-body-footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div> -->
    </div>
    <div class="list-footer">copyright@2025/02/16 from enthalpy.</div>
  </div>
</template>

<script lang="ts" setup>
import { getUserList } from '@/api/user';
import { getRoleList } from '@/api/role';
import type { IUser } from '@/api/user/types';
import type { IFormParams, IRoleItem } from '@/api/role/types';

const dataList = ref<IUser[]>([]);
const roleList = ref<IRoleItem[]>([]);
const formParams = reactive<IFormParams>({
  username: '',
  role: '',
});

const fetchUserList = async () => {
  const res = await getUserList();
  dataList.value = res;
};

const fetchRoleList = async () => {
  const res = await getRoleList();
  roleList.value = res;
};

onMounted(() => {
  fetchUserList();
  fetchRoleList();
});

const handleSearch = () => {
  // fetchUserList();
  let res: IUser[] = [];
  if (formParams.username || formParams.role) {
    if (formParams.username) {
      res = dataList.value.filter((item) => item.username.indexOf(formParams.username) !== -1);
    }
    if (formParams.role) {
      res = dataList.value.filter((item) => item.roles.includes(formParams.role));
    }
    if (formParams.username && formParams.role) {
      res = dataList.value.filter(
        (item) => item.username.indexOf(formParams.username) !== -1 && item.roles.includes(formParams.role),
      );
    }
  } else {
    // res = dataList.value;
    fetchUserList();
  }
  // if (res.length) {
  dataList.value = res;
  // }
};

const handleReset = () => {
  formParams.username = '';
  formParams.role = '';
  fetchUserList();
};
</script>
