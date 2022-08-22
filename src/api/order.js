import request from '@/utils/request'

// 登录接口
export const getOrdersPage = data => {
  return request({
    url: '/orders/page',
    method: 'get',
    params: data,
  })
}
