<template>
  <div class="unions-detail">
    <div class="unions-detail-left">
      <div class="unions-user-detail-box">
        <div class>
          <img :src="userForm.avatar" alt="头像" class="unions-user-avatar" />
        </div>
        <div class="unions-user-detail">
          <span>{{form.name}}</span>
          <br />
          <span>公会会长: {{userForm.nickname}}</span>
          <br />
          <span>ID: {{form.create_userid}}</span>
        </div>
      </div>
    </div>
    <div class="unions-detail-right">
      <table class="table table-striped table-bordered table-hover view-userinfo" v-if="tableData.length">
        <tbody>
          <tr v-for="(item,index) in tableData" :key="index">
            <td v-for="(td,tdIndex) in item" :key="tdIndex">{{td}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  get_detail_by_id,
  get_group_data,
} from "@/api/organization/unions/see.js";
import { get_anchor_by_id } from "@/api/union/anchors/list.js";
export default {
  name: "",
  props: ["id"],
  data() {
    return {
      form: {},
      userForm: {},
      tableData: [
        ["1", "1", "1", "1"],
        ["2", "2", "2", "2"],
        ["3", "3", "3", "3"],
      ],
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  created() {
    // 获取公会信息
    this.getDetail();
    // 获取公会统计数据
    // this.getGroupData()
  },

  methods: {
    // 获取公会会长信息
    getDetail() {
      get_detail_by_id(this.id).then((res) => {
        if (res.code === 0) {
          this.form = res.data.item;
          this.getUser(res.data.item.create_userid);
        }
      });
    },
    // 获取用户详情
    getUser(userid) {
      get_anchor_by_id(userid).then((res) => {
        if (res.code === 0) {
          this.userForm = res.data;
        }
      });
    },
    // 获取公会统计数据
    getGroupData() {
      get_group_data(this.id).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
    },
  },

  watch: {},
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/scss/unions-detail.scss";
@import "@/assets/styles/scss/table.scss";
</style>