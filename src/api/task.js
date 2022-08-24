import request from '@/utils/request'

// 登录接口
export const getTaskPage = data => {
  return request({
    url: '/task',
    method: 'get',
    params: data,
  })
}

export const putStatus = data => {
  return request({
    url: '/task',
    method: 'put',
    data,
  })
}

export const addTask = data => {
  return request({
    url: '/task',
    method: 'post',
    data,
  })
}
