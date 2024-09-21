<script setup>
import HomePanel from './HomePanel.vue'
import { findNewAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

// 获取数据
const newList = ref([])
const goodsSearchForm = ref({
  id: null,
  name: null,
  createTime: null,
  storeId: null,
  categoryId: null
})
const {id,
  name,
  createTime,
  storeId,
  categoryId}=goodsSearchForm.value
const getNewList = async () => {
  const res = await findNewAPI({id,
    name,
    createTime,
    storeId,
    categoryId})
  newList.value = res.data.data
}

// 跳转支付
// 携带订单id以及回调地址跳转到支付地址（get）
// 支付地址
const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const backURL = 'http://127.0.0.1:5173'
const redirectUrl = encodeURIComponent(backURL)
const payUrl = `${baseURL}pay/aliPay?orderId=${newList.value.id}&redirect=${redirectUrl}`

const pay = (id)=>{
  console.log(id);
  // router.replace('payUrl')
}

onMounted(() => getNewList())

</script>

<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <ul class="goods-list">
      <li v-for="item in newList" :key="item.id">
<!--        <RouterLink :to="`/detail/${item.id}`">-->
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">
            &yen;{{ item.price }}
            <a href="https://excashier-sandbox.dl.alipaydev.com/standard/auth.htm?payOrderId=0cfa254284dc422eb084d89c3a20c852.00">
            <el-button @click="pay(item.id)" type="success" plain style="font-size: 16px;">购买</el-button>
            </a>
          </p>
<!--        </RouterLink>-->
      </li>
    </ul>
  </HomePanel>
  <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  //justify-content: space-between;
  //height: 406px;
  flex-wrap: wrap;

  li {
    width: 304px;
    height: 406px;
    margin: 20px 3px;

    background:  #e1f3d8;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>