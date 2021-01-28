<template>
  <el-dialog
    @close="resetForm('bindForm')"
    title="添加成员"
    :visible.sync="dialog"
    width="500px"
    custom-class="common-dialog"
  >
    <table class="table table-striped table-bordered table-hover view-userinfo">
      <tbody>
        <tr v-for="(item, index) in tableColumns" :key="index">
          <td width="30%">
            {{ columns[item] ? columns[item].label : "" }}
          </td>
          <td width="70%">
            <img class="user-avatar" :src="user[item]" alt="" v-if="item==='avatar'&&user[item]">
            <span v-else-if="item === 'gender'">{{user[item]==1?"男":"女" }}</span>
            <span v-else>{{ user[item] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <el-form
      :rules="rules"
      :model="form"
      label-width="150px"
      label-position="right"
      ref="bindForm"
      :close-on-click-modal="false"
      @submit.native.prevent

    >
      <el-form-item label="验证码" prop="code">
        <el-row>
          <el-col :span="10" style="margin-right: 10px">
            <el-input
              v-model="form.code"
              maxlength="10"
              placeholder="请输入验证码"
            ></el-input>
          </el-col>

          <el-col :span="10">
            <el-button
              type="success"
              style="width: 100%"
              size="mini"
              :disabled="time !== 0"
              @click="getCode('bindForm')"
            >
              <span>获取验证码</span>
              <span v-if="time">{{ time }}s</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button @click="submitForm('bindForm')">绑 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  get_user_by_phone_or_id,
  get_verifycode,
  bind_to_union
} from "@/api/union/anchors/list.js";
export default {
  name: "",
  props: ["userid"],
  data() {
    return {
      tableColumns: [
        "nickname",
        "avatar",
        "username",
        "userid",
        "gender",
      ],
      columns:{
       
         nickname:{
          label:"用户名",
        },
         avatar:{
          label:"头像",
        },
         username:{
          label:"短id",
        },
         userid:{
          label:"长id",
        },
         gender:{
          label:"性别",
        },
      },
      user: {
        id:1,
        nickname: "用户名", //用户名
        avatar: "", //     头像
        username: "123456", //短id
        userid: "0000123456", //     长id
        gender: 1, //   性别 1男2女
      },
      dialog: false,
      // 主播绑定到公会
      // 短信计时
      time: 0,
      form: {
        groupid: "",
        mobile: "",
        code: "",
      },
      rules: {
        // 验证码
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    getInfo(id) {
      let data = {
        userid: this.userid.trim(),
      };
      get_user_by_phone_or_id(data).then((res) => {
          console.log(res)

        if (res.code === 0) {
          this.user = res;
          this.dialog = true;
        }
      });
    },
    openbind() {
      this.getInfo()
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            code:this.form.code
          }
          console.log(this.$store.state.user.groupInfo)
          if (
            !this.$store.state.user.groupInfo ||
            !this.$store.state.user.groupInfo.id
          ) {
            this.$message.error("当前登陆用户没有创建公会,请先创建公会!");
            return false;
          }
          data.groupid = this.$store.state.user.groupInfo.id;
          data.mobile=this.user.userid
          bind_to_union(data).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.info);
              this.$refs[formName].resetFields();
              this.dialog = false;
              this.$emit("getOnlineList")
            }
          });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialog = false;
    },
    // 获取短信验证码
    getCode(formName) {
      if (this.time) {
        return false;
      }
        if (this.user.userid) {
          let data = {
            mobile: this.user.userid,
          };
          get_verifycode(data).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.info);
              this.time = 30;
              this.interval = setInterval(() => {
                if (this.time > 0) {
                  this.time--;
                } else {
                  clearInterval(this.interval);
                }
              }, 1000);
            }
          });
        }
    },
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/scss/table.scss";
.user-avatar{
  width: 60px;
  height: 60px;
  border-radius: 4px;
}
</style>