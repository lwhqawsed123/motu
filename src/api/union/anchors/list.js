import request from '@/utils/request'
import Qs from 'qs'
// 列表
export function list(data) {
  return request({
    url: '/union/unionAnchors/ajaxsearch',
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

// 主播详情
export function get_anchor_by_id(data) {
  return request({
    url: `/users/users/userinfo?userid=${data}`,
    method: 'GET',
    noLoading:true
  })
}

// 根据手机号或用户ID查询用户信息
export function get_user_by_phone_or_id(data) {
  return request({
    url: `/live/group_details/get_user`,
    method: 'GET',
    params:data
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

// 用户好友列表
export function userFriends(data) {
  return request({
    url: `/cdr/msg/msg_users?userid=${data}`,
    method: 'GET',
    noLoading:true
  })
}

// 获取验证码
export function get_verifycode(data) {
  return request({
    url: `/live/group_details/get_verifycode`,
    method: 'GET',
    params:data
  })
}

// 主播绑定到公会
export function bind_to_union(data) {
  return request({
      url: `/live/group_details/bind`,
      method: 'POST',
      headers: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      data: Qs.stringify(data)
  })
}

// 主播解除绑定
export function unbind(data) {
  return request({
    url: `/live/group_details/unbind`,
    method: 'GET',
    params:data
  })
}

// 获取主播分成信息
export function getmymember(data) {
  return request({
    url: `/live/group_details/getmymember`,
    method: 'GET',
    params:data
  })
}
// 修改主播分成信息
export function updatemymember(data) {
  return request({
      url: `/live/group_details/updatemymember`,
      method: 'POST',
      headers: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      data: Qs.stringify(data)
  })
}

// 修改主播星级
export function updatemymember_nice(data) {
  return request({
      url: `/live/group_details/updatemymember_nice`,
      method: 'get',
      params: data
  })
}

// 获取家族金币池余额
export function get_group_gold_pool(data) {
  return request({
    url: `/live/group_details/group_gold_pool`,
    method: 'GET',
    params: data
  })
}

// 修改主播金币
export function update_gold_pool_reduce(data) {
  return request({
      url: `/live/group_details/gold_pool_reduce`,
      method: 'POST',
      headers: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      data: Qs.stringify(data)
  })
}