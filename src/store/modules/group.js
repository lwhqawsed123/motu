import {
  groupsOptions,
} from "@/api/organization/unions/list.js";
const group = {
  state: {
    groupOptions: []
  },

  mutations: {
    SET_GROUP: (state, group) => {
      state.groupOptions = group
    }
  },

  actions: {
    // 登录
    async Get_group_options({ commit }) {
      let res = await groupsOptions()
      if (res&&res.code === 0) {
        commit('SET_GROUP', res.data)
      }
    }
  }
}

export default group
