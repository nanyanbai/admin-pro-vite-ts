<template>
  <div>
    <button @click="setCount">点击+1</button>
    <p>{{ count }}</p>
    <hr />
    <div class="mb">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>

    <div class="mb">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </div>

    <div class="mb">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </div>

    <div>
      <!-- <icon-ep-add-location /> -->
      <!-- <icon-ep-apple /> -->
      <h3>element-plus(ep)集合</h3>
      <IconEpCircleCheck />
      <IconEpCircleCheckFilled />
      <IconEpCircleClose />
      <IconEpCircleCloseFilled />
      <IconEpApple />

      <br />
      <h3>icon-形式的写法 更明确 有语法提示</h3>
      <icon-ep-circle-check />
      <icon-ep-circle-check-filled />
      <icon-ep-circle-close />
      <icon-ep-circle-close-filled />
      <icon-ep-apple />
      <!-- <el-icon :size="20" :color="'red'">
      <Edit />
    </el-icon> -->
      <h3>pixelarticons集合</h3>
      <icon-pixelarticons-notes />
      <icon-pixelarticons-notes-delete />
      <icon-pixelarticons-notes-multiple />
      <icon-pixelarticons-notes-plus />
    </div>
    <div>
      <!-- <h3>ep集合写法</h3>
    <el-button :icon="IconEpCircleCheck" circle />
    <el-button type="primary" :icon="IconEpCircleCheckFilled" circle />
    <el-button type="success" :icon="IconEpCircleClose" circle />
    <el-button type="info" :icon="IconEpCircleCloseFilled" circle />
    <el-button type="warning" :icon="IconEpApple" circle />
    <el-button type="danger" :icon="IconEpApple" circle /> -->
      <!-- <br /> -->
      <el-button :icon="Search" circle />
      <el-button type="primary" :icon="Edit" circle />
      <el-button type="success" :icon="Check" circle />
      <el-button type="info" :icon="Message" circle />
      <el-button type="warning" :icon="Star" circle />
      <el-button type="danger" :icon="Delete" circle />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Check, Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue';

const count = ref(0);

const setCount = () => {
  count.value++;
};
</script>

<style lang="less" scoped>
.mb-4 {
  margin-bottom: 10px;
}
</style>
