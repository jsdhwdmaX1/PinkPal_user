<script setup>
// import { getUserOrder } from '@/apis/order'
import { onMounted, ref } from 'vue'
// tab列表
const tabTypes = [
  { name: "all", label: "全部订单" },
  { name: "deliver", label: "待发货" },
  { name: "receive", label: "待收货" },
]
// 获取订单列表
const orderList = ref([])
const total = ref(0)
const params = ref({
  orderState: 0,
  page: 1,
  pageSize: 2
})
const getOrderList = async () => {
  const res = await getUserOrder(params.value)
  orderList.value = res.result.items
  total.value = res.result.counts/500
}

onMounted(() => getOrderList())

// tab切换
const tabChange = (type) => {
  console.log(type)
  params.value.orderState = type
  getOrderList()
}

// 页数切换
const pageChange = (page) => {
  console.log(page)
  params.value.page = page
  getOrderList()
}


const fomartPayState = (payState) => {
  const stateMap = {
    2: '待发货',
    3: '待收货',
  }
  return stateMap[payState]
}
</script>

<template>

    <div class="article">
      <!-- 三级路由的挂载点 -->
      <div class="order-container">
        <h3 style="font-size: 32px; padding-bottom: 6px; font-weight: normal;">我的订单</h3>
        <el-tabs @tab-change="tabChange">
          <!-- tab切换 -->
          <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />

          <div class="main-container">
            <div class="holder-container" v-if="orderList.length === 0">
              <el-empty description="暂无订单数据" />
            </div>
            <div v-else>
              <!-- 订单列表 -->
              <div class="order-item" v-for="order in orderList" :key="order.id">
                <div class="head">
                  <span>下单时间：{{ order.createTime }}</span>
                  <span>订单编号：{{ order.id }}</span>
                </div>
                <div class="body">
                  <div class="column goods">
                    <ul>
                      <li v-for="item in order.skus" :key="item.id">
                        <a class="image" href="javascript:;">
                          <img :src="item.image" alt="" />
                        </a>
                        <div class="info">
                          <p class="name ellipsis-2">
                            {{ item.name }}
                          </p>
                          <p class="attr ellipsis">
                            <span>{{ item.attrsText }}</span>
                          </p>
                        </div>
                        <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
                        <div class="count">x{{ item.quantity }}</div>
                      </li>
                    </ul>
                  </div>
                  <div class="column action">
                    <el-button v-if="order.orderState === 2" type="primary" size="small">
                      催发货
                    </el-button>
                    <el-button v-if="order.orderState === 3" type="primary" size="small">
                      确认收货
                    </el-button>
                  </div>
                </div>
              </div>
              <!-- 分页 -->
              <div class="pagination-container">
                <el-pagination :total="total" @current-change="pageChange" :page-size="params.pageSize" background
                  layout="prev, pager, next" />
              </div>
            </div>
          </div>

        </el-tabs>
      </div>
    </div>

</template>

<style scoped lang="scss">

  .article {
    width: 1000px;
    margin: 0 auto;
  }

.order-container {
    background-color: #fff;
    margin-top: 20px;
    padding: 10px 20px;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 500px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      >p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: $xtxColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
</style>