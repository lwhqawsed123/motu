import request from '@/utils/request'
// 列表
export function list(data) {
  return request({
    url: '/union/diamonds/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 详情
export function get_by_id(data) {
    return request({
      url: `/union/diamonds/view/${data}`,
      method: 'GET'
    })
  }