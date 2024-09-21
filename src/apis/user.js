// 封装所有和用户相关的接口函数
import request from '@/utils/http'

export const loginAPI = ( { username , password }) => {

  return request({
    url: '/login-user',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export const registerAPI = ({ username, password }) => {
  return request({
    url: '/register',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}