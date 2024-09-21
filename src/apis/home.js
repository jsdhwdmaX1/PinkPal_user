import service from '@/utils/http'
import request from "@/utils/http";


// 获取banner

export function getBannerAPI () {
  // 默认为1 商品为2
  return service({
    url: '/get-banner',
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
// export const findNewAPI = () => {
//   return httpInstance({
//     url: '/home/new'
//   })
// }

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot'
  })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
// export const findNewAPI = () => {
//   return httpInstance({
//     url: '/home/goods'
//   })
// }

export const findNewAPI = ( {id, name, createTime, storeId, categoryId}) => {
  return request({
    url: '/search-goodsAll',
    method: 'POST',
    data:{
      id,
      name,
      createTime,
      storeId,
      categoryId
    }
  })
}

