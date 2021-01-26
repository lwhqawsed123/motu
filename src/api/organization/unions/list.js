import request from '@/utils/request'
import Qs from 'qs'

// 列表
export function list(data) {
  return request({
    url: '/live/group/ajaxsearch',
    method: 'GET',
    params: data
  })
}

// 查询
export function get_by_id(data) {
    return request({
      url: `/live/group/edit/${data}`,
      method: 'GET'
    })
  }
  

// 新增/编辑
export function save_edit(data) {
  return request({
    url: `/live/group/save`,
    method: 'POST',
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    },
    data:Qs.stringify(data)
  })
}

// 删除
export function delete_by_id(data) {
  return request({
      url: `/live/group/delete//${data}`,
      method: 'GET'
  })
}

// 公会下拉列表
export function groupsOptions() {
  return request({
      url: '/live/group/getgrouplist',
      method: 'GET',
      noLoading:true
  })
}