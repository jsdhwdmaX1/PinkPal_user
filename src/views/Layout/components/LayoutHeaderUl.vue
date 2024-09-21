<script setup>
import { useCategoryStore } from '@/stores/categoryStore'
const categoryStore = useCategoryStore()
</script>


<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/"><el-button type="success" size="large" plain style="font-size: 16px;">首页</el-button></RouterLink>
    </li>
    <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
      <RouterLink active-class="active" :to="`/category/${item.id}`">
        <el-button type="success" size="large" plain style="font-size: 16px;">{{ item.name }}</el-button>
      </RouterLink>
    </li>
  </ul>
</template>


<style lang="scss">
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 20px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 20px;
    width: 60px;
    text-align: center;

    a {
      line-height: 42px;
      height: 42px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>