<template>
  <div class="page-wapper">
    <div class="list-header">
      <el-form :inline="true" :model="formParams">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="formParams.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model="formParams.desc" placeholder="请输入项目描述" />
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
          <el-button type="primary">Primary</el-button>
        </div>
      </div>
      <div class="list-body-content">
        <el-table :data="dataList" border style="width: 100%">
          <el-table-column prop="name" label="项目名称" width="180" />
          <el-table-column prop="desc" label="项目描述" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="updateTime" label="更新时间" />
        </el-table>
      </div>
      <div class="list-body-footer">
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
      </div>
    </div>
    <div class="list-footer">copyright@2025/02/16 from enthalpy.</div>
  </div>
  <!-- <TlButton /> -->
</template>
<script lang="ts" setup>
// import TlButton from './components/TlButton.vue';
import { getProjectList } from '@/api/project/index';
import type { ComponentSize } from 'element-plus';

interface IData {
  name: string;
  desc: string;
  status: string;
  createTime: string;
  updateTime: string;
}

let data = ref<IData[]>([]);

const size = ref<ComponentSize>('default');
const disabled = ref(false);
const background = ref(true);
const currentPage = ref(1);
const pageSize = ref(5);

const formParams = reactive({
  name: '',
  desc: '',
  currentPage: 1,
  pageSize: 5,
});

const fetchData = () => {
  getProjectList().then((res) => {
    data.value = res;
  });
};

const dataList = computed(() => {
  return data.value.slice(
    (formParams.currentPage - 1) * formParams.pageSize,
    formParams.currentPage * formParams.pageSize,
  );
});

const handleSizeChange = (val: number) => {
  // console.log(`${val} items per page`);
  formParams.pageSize = val;
};

const handleCurrentChange = (val: number) => {
  // console.log(`current page: ${val}`);
  formParams.currentPage = val;
};

const handleSearch = () => {
  // console.log(formParams);
  let filterData: IData[] = [];
  if (formParams.name || formParams.desc) {
    if (formParams.name) {
      formParams.name = formParams.name.trim();
      filterData = data.value.filter((item) => {
        return item.name.indexOf(formParams.name) !== -1;
      });
    }
    if (formParams.desc) {
      formParams.desc = formParams.desc.trim();
      filterData = data.value.filter((item) => {
        return item.desc.indexOf(formParams.desc) !== -1;
      });
    }
    data.value = filterData;
  } else {
    fetchData();
    formParams.currentPage = 1;
  }
};

const handleReset = () => {
  formParams.name = '';
  formParams.desc = '';
  formParams.currentPage = 1;
  formParams.pageSize = 5;
};

onMounted(() => {
  fetchData();
});
</script>
