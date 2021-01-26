import request from '@/utils/request'
import Qs from 'qs'

// 列表
export function list(data) {
  return request({
    url: '/cdr/msg/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 查询
export function get_by_id(data) {
  return request({
    url: `/cdr/msg/view/${data}`,
    method: 'GET'
  })
}

// 撤回消息
export function withdraw_by_id(data) {
  return request({
    url: `/cdr/msg/withdraw/${data.id}`,
    method: 'GET',
    params: data.data,
  })
}

//批量撤回消息
export function withdraw_all_by_ids(data) {
  return request({
    url: `/cdr/msg/allwithdraw`,
    method: 'GET',
    params: data,
  })
}

// 删除消息
export function delete_by_id(data) {
  return request({
    url: `/cdr/msg/delete/${data}`,
    method: 'GET'
  })
}