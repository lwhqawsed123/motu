import request from '@/utils/request'

// 列表
export function list(data) {
  return request({
    url: '/union/incomes/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 导出excel
export function exportAllExcel(data) {
  return request({
    url: '/union/incomes/get_all',
    method: 'GET',
    params: data
  })
}

// 详情
export function get_user_by_id(data) {
  return request({
    url: `/users/users/view/${data}`,
    method: 'GET'
  })
}

// 渠道包下拉框
export function channel(data) {
  return request({
    url: '/operation/channel_parameter_config/ajaxsearch',
    method: 'GET',
    params: data,
    noLoading:true
  })
}

