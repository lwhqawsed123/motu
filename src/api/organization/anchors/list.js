import request from '@/utils/request'
import Qs from 'qs'

// 列表
export function list(data) {
  return request({
    url: '/organization/anchors/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 修改主播星级
export function update_nice(data) {
  return request({
      url: `/live/group_details/update_nice`,
      method: 'get',
      params: data
  })
}