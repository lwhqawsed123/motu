import { get_user_by_id, channel } from "@/api/union/anchors/list.js";


const user_detail = {
  state: {
    detailOptions: {
      detailForm: {},
      columns: {}
    },
    channelOptions:[]
  },

  mutations: {
    SET_FORM: (state, data) => {
      state.detailOptions.detailForm = data
    },
    SET_COLUMNS: (state, columns) => {
      state.detailOptions.columns = columns
    },
    SET_CHANNEL:(state,data)=>{
      state.channelOptions=data
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {

          setToken(res.data.ci_session)
          commit('SET_TOKEN', res.data.ci_session)
          let cookie = 'a%3A4%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%22c2aec9d2a7fd6069302468ae6acc2d2b%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A14%3A%22121.35.100.100%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A21%3A%22PostmanRuntime%2F7.22.0%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1593428436%3B%7D1f2e21e84020f6e612ad0d316975f021'
          // setToken(cookie)
          // commit('SET_TOKEN', cookie)
          // console.log('设置了cookie');

          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户详情
    Get_detail_info({ commit }, userid) {
      return new Promise((resolve, reject) => {
        get_user_by_id(userid).then(res => {
          let {item,columns}=res.data
          commit('SET_FORM', item)
          commit('SET_COLUMNS', columns)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

     // 获取渠道包列表
     Get_channel({ commit }) {
      return new Promise((resolve, reject) => {
        channel(userid).then(res => {
          let {item,columns}=res.data
          item.client_name=this.checkChannel(item.client_id)
          item.lastlogin_client_name=this.checkChannel(item.cur_client_id)
          commit('SET_FORM', item)
          commit('SET_COLUMNS', columns)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    
  }
}

// 筛选渠道包
function checkChannel(client_id) {
  let channelOptions = this.channelOptions.filter(item => {
    return item.client_id === client_id;
  });
  if (channelOptions.length) {
    return channelOptions[0].client_name;
  } else {
    return "";
  }
},

export default user_detail
