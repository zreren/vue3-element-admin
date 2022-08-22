import request from '@/utils/request'

// 查询用户
export const getUsersPage = data => {
  return request({
    url: '/user/page',
    method: 'get',
    params: data,
  })
}

export const deleteUser = data => {
  return request({
    url: '/user',
    method: 'DELETE',
    params: data,
  })
}
