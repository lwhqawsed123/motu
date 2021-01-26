import Vue from 'vue'
import axios from 'axios'
import { Notification, MessageBox, Loading, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Router from 'vue-router'


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers['Accept'] = 'application/json, text/plain, */*'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: '/api',
  // 超时
  // timeout: 3000
  // timeout: 100000
})
let loading = null
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['TokenBearer'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (!config.noLoading) {
      loading = Loading.service({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)"
      })
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
  if (loading !== null) {
    loading.close()
    loading = null
  }
  if (res.headers['content-disposition'] && res.headers['content-disposition'].indexOf('attachment') !== -1) {
    const disposition = res.headers['content-disposition'];
    let fileName = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length);
    // iso8859-1的字符转换成中文
    fileName = decodeURI(escape(fileName))
    // 去掉双引号
    fileName = fileName.replace(/\"/g, "");

    let data = {
      fileName,
      data: res.data
    }

    return data
  }
  // if (res.config.loading) {
  //   setTimeout(() => {
  //     loading.close()
  //     loading = ''
  //   }, 500);
  // }
  const code = res.data.code
  if (code === 301) {
    MessageBox.confirm(
      '登录状态已过期，您可以继续留在该页面，或者重新登录',
      '系统提示',
      {
        confirmButtonText: '重新登录',
        type: 'warning'
      }
    ).then(() => {
      store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
  } else if (code === 302) {
    MessageBox.confirm(
      '您没有权限访问，您可以继续留在该页面，或者重新登录',
      '系统提示',
      {
        confirmButtonText: '重新登录',
        type: 'warning'
      }
    ).then(() => {
      store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
  } else if (code === 303) {
    Router.push({ path: '/' })
    return res.data
  }
  else if (code !== 0) {
    if (res.request.responseURL && res.request.responseURL.indexOf('/user/passwd') !== -1) {
      return res.data
    }
    Notification.error({
      title: res.data.info
    })
    return Promise.reject('error')
  }
  else {
    return res.data
  }
},
  error => {
<<<<<<< HEAD
    if (loading !== null) {
      loading.close()
      loading = null
    }
=======
    // if (error.config.loading) {
    //   setTimeout(() => {
    //     loading.close()
    //     loading = ''
    //   }, 500);
    // }
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
    //  1.判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      // console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
      Notification.error({
        title: '请求超时'
      })
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
