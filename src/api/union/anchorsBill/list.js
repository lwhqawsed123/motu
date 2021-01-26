import request from '@/utils/request'
import Qs from 'qs'
// 列表
export function list(data) {
  return request({
    url: '/union/anchorsBill/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 导出列表
export function export_excel(data) {
  return request({
    url: '/union/anchorsBill/export_excel',
    method: 'GET',
    params: data,
    responseType: 'blob'
  })
}