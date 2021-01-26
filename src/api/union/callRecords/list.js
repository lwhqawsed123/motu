import request from '@/utils/request'

// 列表
export function list(data) {
  return request({
    url: '/union/callRecords/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 详情
export function get_by_id(data) {
  return request({
    url: `/cdr/call/view/${data}`,
    method: 'GET'
  })
}

// 获取截图
export function get_picture_by_id(data) {
  return request({
    url: `/cdr/screenshot/ajaxsearch`,
    method: 'GET',
    params: data
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

