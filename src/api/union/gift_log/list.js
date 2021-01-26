import request from '@/utils/request'
import Qs from 'qs'

// 列表
export function list(data) {
  return request({
    url: '/union/anchorsGift_log/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 详情
export function get_by_id(data) {
  return request({
    url: `/order/gift_log/view/${data}`,
    method: 'GET'
  })
}