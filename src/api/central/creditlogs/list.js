import request from '@/utils/request'
import Qs from 'qs'

// 列表
export function list(data) {
  return request({
    url: '/users/creditlogs/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 查询
export function get_by_id(data) {
    return request({
      url: `/users/creditlogs/view/${data}`,
      method: 'GET'
    })
  }

// 操作类型下拉框
export function get_diamonds_type() {
  return request({
    url: `/union/diamonds/diamonds_type`,
    method: 'GET',
    noLoading:true
  })
}