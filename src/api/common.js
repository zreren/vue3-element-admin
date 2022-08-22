import request from '@/utils/request'

// 查询日志
export const getLogPage = data => {
  return request({
    url: '/logs/page',
    method: 'get',
    params: data,
  })
}

// export const deleteMerchant = data => {
//     return request({
//       url: '/user',
//       method: 'DELETE',
//       params:data,
//     })
//   }
