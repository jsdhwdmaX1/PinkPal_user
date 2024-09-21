<script setup>
import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

const bannerList = ref([])

const getBanner = async () => {
  const res = await getBannerAPI()
  console.log(res)
  bannerList.value = res.data.data
  console.log(bannerList.value)
}

onMounted(() => getBanner())
</script>

<template>
  <div class="home-banner">
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.home-banner {
  width: 990px;
  height: 500px;
  position: absolute;
  left: 250px;
  top: 0;
  z-index: 98;
  background-color:  #e1f3d8;

  img {
    position: relative;
    top: 50px;
    width: 100%;
    height: 400px;
  }
}
</style>