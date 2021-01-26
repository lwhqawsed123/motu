import request from '@/utils/request'

// 列表
export function list(data) {
    return request({
        url: '/live/user_verify/ajaxsearch',
        method: 'GET',
        params: data
    })
}

// 修改审核状态
export function statusEdit(data) {
    return request({
        url: '/live/user_verify/audit',
        method: 'GET',
        params:data
    })
}

// 详情
export function get_by_id(data) {
    return request({
      url: `/live/user_verify/view/${data}`,
      method: 'GET'
    })
  }

  // 删除
export function delete_by_id(data) {
    return request({
      url: `/live/user_verify/delete/${data}`,
      method: 'GET'
    })
  }