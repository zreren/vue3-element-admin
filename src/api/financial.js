import request from '@/utils/request'

// 查询日志

export const getCashablePageInfo = data => {
  return request({
    url: '/financeList/getCashablePageInfo',
    method: 'get',
    params: data,
  })
}
export const getRechargePageInfo = data => {
  return request({
    url: '/financeList/getRechargePageInfo',
    method: 'get',
    params: data,
  })
}
export const getConfigPage = () => {
  return request({
    url: '/decoration/type',
    method: 'get',
  })
}
// export const deleteMerchant = data => {
//     return request({
//       url: '/user',
//       method: 'DELETE',
//       params:data,
//     })
//   }
