import request from '@/utils/request'

// 查询用户
export const getMerchantPage = data => {
  return request({
    url: '/merchant',
    method: 'get',
    params: data,
  })
}

export const deleteMerchant = data => {
  return request({
    url: '/user',
    method: 'DELETE',
    params: data,
  })
}
