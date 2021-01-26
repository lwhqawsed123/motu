import request from '@/utils/request'
import Qs from 'qs'

// 聊天记录列表
export function list(data) {
  return request({
    url: '/cdr/msg/groupajaxsearch',
    method: 'GET',
    params: data,
    noLoading:true
  })
}
