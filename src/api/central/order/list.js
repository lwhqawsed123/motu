import request from '@/utils/request'
import Qs from 'qs'

// 列表
export function list(data) {
  return request({
    url: '/order/order/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 查询订单信息
export function get_by_id(data) {
  return request({
    url: `/order/order/view/${data}`,
    method: 'GET'
  })
}

// 查询退款信息
export function get_refund(data) {
  return request({
    url: '/order/refund/edit',
    method: 'GET',
    params: data
  })
}

export function save_edit(data) {
  return request({
    url: '/order/refund/save',
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: Qs.stringify(data)
  })
}

export function user_select(data) {
  return request({
    url: '/users/users/user_select',
    method: 'GET',
    noLoading:true
  })
}