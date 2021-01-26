import request from '@/utils/request'
import { Header } from 'element-ui'
import Qs from 'qs'

// 登录方法
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get',
    noLoading:true
  })
}

// 获取用户所属公会信息
export function getGroup() {
  return request({
    url: '/live/group_details/mygroupinfo',
    method: 'get',
    noLoading:true
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}

// 获取短信验证码
export function get_verifycode(data) {
  return request({
    url: '/auth/get_verifycode',
    method: 'get',
    params:data
  })
}

// 登录方法
export function mobilelogin(data) {
  return request({
    url: '/auth/mobilelogin',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}