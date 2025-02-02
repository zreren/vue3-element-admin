import request from '@/utils/request'

// 查询日志
export const getLogPage = data => {
  return request({
    url: '/logs/page',
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
export const getRecruitment = data => {
  return request({
    url: '/recruitment/page',
    method: 'get',
    params: data,
  })
}
