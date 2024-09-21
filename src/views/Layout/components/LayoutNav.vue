<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const confirm = () => {
  console.log('用户要退出登录了')
  // 退出登录业务逻辑实现
  // 1.清除用户信息 触发action
  userStore.clearUserInfo()
  // 2.跳转到登录页

}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模版渲染 区分登录状态和非登录状态 -->

        <!-- 适配思路: 登录时显示第一块 非登录时显示第二块  是否有token -->
        <template v-if="userStore.userInfo?.token">
          <RouterLink to="/member" style="padding: 0 10px;"><a href="javascript:;"><el-button type="success" plain>
            <i class=" iconfont icon-user"></i>{{ userStore.userInfo.username }}
          </el-button></a></RouterLink>

          <li>
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;"><el-button type="success">退出登录</el-button></a>
              </template>
            </el-popconfirm>
          </li>
          
          <RouterLink to="/member"><li><a href="javascript:;">
            <el-button type="success">我的订单</el-button>
          </a></li></RouterLink>

          <RouterLink to="/register-store"><li><a href="javascript:;">
            <el-button type="success">加入我们</el-button>
          </a></li></RouterLink>

        </template>
        <template v-else>
          <!-- <a href="javascript:;" @click="$router.push('/login-user')" style="padding: 0 10px;">  -->
          <a href="/login-user"  style="padding: 0 10px;"> 
            <el-button type="success">请先登录</el-button>
          </a>
          
          <li><a href="/register-store">
            <el-button type="success">加入我们</el-button>
          </a></li>
          
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background:   #e1f3d8;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 10px;
        color:  #529b2e;
        line-height: 1;
        display: inline-block;
        border-left: 2px solid  #529b2e;
        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        border-left: none;
      }
    }
  }
}
</style>