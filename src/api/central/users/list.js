import request from '@/utils/request'
import Qs from 'qs'

// 列表
export function list(data) {
  return request({
    url: '/users/users/ajaxsearch',
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
// 删除昵称
export function delete_nickname(data) {
  return request({
    url: `/users/users/delete_nickname/${data}`,
    method: 'GET'
  })
}
// 删除签名
export function delete_sign(data) {
  return request({
    url: `/users/users/delete_sign/${data}`,
    method: 'GET'
  })
}
// 封设备
export function freeze_device(data) {
  return request({
    url: `/users/users/freeze_device/${data.id}`,
    method: 'GET',
    params: data.data
  })
}
// 封号
export function freeze_user(data) {
  return request({
    url: `/users/users/freeze_user/${data.id}`,
    method: 'GET',
    params: data.data
  })
}
// 冻结积分
export function freeze_jifen(data) {
  return request({
    url: `/users/users/freeze_jifen/${data.id}`,
    method: 'GET',
    params: data.data
  })
}
// 禁言
export function freeze_action(data) {
  return request({
    url: `/users/users/freeze_action/${data.id}`,
    method: 'GET',
    params: data.data
  })
}
// 重置Token
export function refresh_nimtoken(data) {
  return request({
    url: `/users/users/refreshnimtoken/${data}`,
    method: 'GET'
  })
}

// 注销用户
export function unreg_user(data) {
  return request({
    url: `/users/users/unreg_user/${data.id}`,
    method: 'GET',
    params: data.data
  })
}

// 重置密码
export function reset_password(data) {
  return request({
    url: `/users/users/resetpassword/${data.id}`,
    method: 'GET',
    params: data.data
  })
}

// 解禁/恢复
export function unfreeze_user(data) {
  return request({
    url: `/users/users/unfreeze_user/${data}`,
    method: 'GET'
  })
}

// 解冻
export function unfreeze_jifen(data) {
  return request({
    url: `/users/users/unfreeze_jifen/${data}`,
    method: 'GET'
  })
}

// 解除禁言
export function unfreeze_action(data) {
  return request({
    url: `/users/users/unfreeze_action/${data}`,
    method: 'GET'
  })
}

// 公会会长封号
export function groupleader_freeze_user(data) {
  return request({
    url: `/users/users/groupleader_freeze_user/${data.id}`,
    method: 'GET',
    params: data.data
  })
}

// 公会会长解禁/恢复
export function groupleader_unfreeze_user(data) {
  return request({
    url: `/users/users/groupleader_unfreeze_user/${data}`,
    method: 'GET'
  })
}

// 获取编辑弹框 数据
export function get_for_edit(data) {
  return request({
    url: `/users/users/edit/${data}`,
    method: 'GET'
  })
}

// 提交编辑
export function save_edit(data) {
  return request({
    url: '/users/users/save',
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: Qs.stringify(data)
  })
}


// 渠道包下拉框
export function channel(data) {
  return request({
    url: '/users/users/user_select',
    method: 'GET',
    params: data,
    noLoading:true
  })
}