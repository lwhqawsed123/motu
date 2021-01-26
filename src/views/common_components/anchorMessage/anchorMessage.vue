<template>
  <div class="hover-anchor-info" v-loading="loading">
    <div class="hover-anchor-info-left">
      <div class="anchor-info-id">
        <span>ID:{{anchorDetail.userid}}</span>
        <span class="iconfont icon-ios" v-if="anchorDetail.platform==='ios'"></span>
        <span class="iconfont icon-anzhuo" v-else></span>
      </div>
      <div class="anchor-info-name">
        <span class="iconfont icon-nan icon-gender-men" v-if="anchorDetail.gender==='1'"></span>
        <span class="iconfont icon-nan icon-gender-women" v-else></span>
        <span class="visitor-info-name">{{anchorDetail.nickname}}</span>
        <!-- <span class="iconfont icon-maikefeng maikefeng"></span> -->
        <span class="anchor-info-username">[{{anchorDetail.username}}]</span>
      </div>
      <div class="anchor-info-information">
        <span class="anchor-info-age">{{anchorDetail.age}}岁</span>
        <span>|</span>
        <span class="anchor-info-level">LV{{anchorDetail.charm_level}}</span>
        <span>|</span>
        <span class="anchor-info-address">{{anchorDetail.location_lastloginip}}</span>
      </div>
      <div class="anchor-info-picture-box">
        <img :src="anchorDetail.avatar" alt class="picture" />
      </div>
      <div class="anchor-info-detail-buttons">
        <div class="anchor-info-detail-buttons-first">
          <div
            class="link-button to-call-records cursor"
            @click="navigateTo('union/callRecords',anchorDetail.username)"
          >通话记录</div>
          <div
            class="link-button to-diamonds cursor"
            @click="navigateTo('union/diamonds',anchorDetail.username)"
          >积分流水</div>
        </div>
        <div class="anchor-info-detail-buttons-first buttons-second">
          <div class="link-button to-call-records cursor" @click="openBanned('封号')">封号</div>
          <div class="link-button to-diamonds cursor" @click="unFreezeUser(anchorDetail.userid)">解封</div>
        </div>
      </div>
    </div>
    <div class="hover-anchor-info-right">
      <el-form :model="anchorDetail" label-width="80px" label-position="right" ref="ruleForm">
        <el-form-item label="公会备注" prop="remark">
          <span class="el-form-item__content">{{anchorDetail.group_memo}}</span>
        </el-form-item>
        <!-- <el-form-item label="手机号" prop="mobile">
                      <span class="form-item-content">{{anchorDetail.mobile}}</span>
        </el-form-item>-->
        <el-form-item label="魅力值" prop="charm">
          <span class="form-item-content">{{anchorDetail.charm}}</span>
        </el-form-item>
        <el-form-item label="积分余额" prop="diamonds">
          <span class="form-item-content">{{anchorDetail.diamonds}}</span>
        </el-form-item>
        <el-form-item label="注册" prop="createdTime">
          <span class="form-item-content">{{anchorDetail.registertime}}</span>
        </el-form-item>
        <el-form-item label="登陆" prop="loginTime">
          <span class="form-item-content">{{anchorDetail.lastlogintime}}</span>
        </el-form-item>
        <el-form-item label="会员到期" prop="expirationTime">
          <span class="form-item-content">{{anchorDetail.user_vip_time}}</span>
        </el-form-item>
      </el-form>
    </div>
    <!-- 封禁用户设备/封禁账号/冻结积分/禁言弹框 -->
    <el-dialog
      id="banned-dialog"
      width="865px"
      :visible.sync="bannedDialog"
      :title="`确定${bannedTitle}吗?`"
      custom-class="common-dialog"
      @close="bannedFormClose('bannedForm')"
      append-to-body
    >
      <el-form
        :rules="bannedRules"
        :model="bannedForm"
        label-position="top"
        ref="bannedForm"
        @submit.native.prevent
      >
        <el-form-item label="封禁理由" prop="checkList" v-if="bannedOptinos.length">
          <el-checkbox-group v-model="bannedForm.checkList">
            <el-checkbox
              style="display:block;"
              :value="item.label"
              :label="item.label"
              v-for="item in bannedOptinos"
              :key="item.value"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="封禁时间" prop="checkListTime" v-if="bannedTime.length">
          <el-checkbox-group v-model="bannedForm.checkListTime" :max="1">
            <el-checkbox
              style="display:block;"
              :label="item.value"
              v-for="item in bannedTime"
              :key="item.value"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bannedFormClose('bannedForm')">取 消</el-button>
        <el-button type="danger" @click="submitBannned('bannedForm')">{{bannedText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  freezeUserOptions, // 封号
} from "@/utils/options/banned.js";
import {
  groupleader_freeze_user,
  groupleader_unfreeze_user,
} from "@/api/central/users/list.js";
export default {
  name: "anchorMessage",
  props: {
    anchorDetail: {
      type: Object,
      default: function () {
        return {};
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      freezeUserOptions, // 封号选项
      // ===封禁弹框===
      bannedDialog: false,
      // 确定按钮文字
      bannedText: "确定",
      // 封禁标题
      bannedTitle: "",
      // 禁言时间
      bannedTime: [],
      // 封禁多选框配置(用于组件传参)默认为空
      bannedOptinos: [],
      // 封禁用户
      bannedForm: {
        checkList: [],
        checkListTime: [],
        pwd: "",
      },

      bannedRules: {
        // 封禁理由
        checkList: [
          { required: true, message: "请选择封禁理由", trigger: "change" },
        ],
        // 封禁时间
        checkListTime: [
          { required: true, message: "请选择禁言时间", trigger: "change" },
        ],
        // 密码
        pwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},
  created() {},
  methods: {
    // 打开封禁弹框
    openBanned(title) {
      console.log(title);
      if (title === "封号") {
        this.bannedOptinos = freezeUserOptions;
      } else {
        return false;
      }
      this.bannedDialog = true;
      this.bannedText = title;
      this.bannedTitle = title;
    },
    // 关闭封禁弹框
    bannedFormClose(formName) {
      this.bannedText = "确定";
      this.bannedTitle = "";
      this.bannedOptinos = [];
      this.bannedTime = [];
      this.bannedDialog = false;
      this.$refs[formName].resetFields();
      this.bannedForm.checkList = [];
      this.bannedForm.checkListTime = [];
    },
    // 提交封禁申请
    submitBannned(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let arr = [
            ...this.bannedForm.checkListTime,
            ...this.bannedForm.checkList,
          ];
          let data = {
            id: this.anchorDetail.userid,
            data: {
              reason: arr.join(","),
            },
          };
          if (this.bannedText === "封号") {
            this.freezeUser(data);
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    },

    // 封号请求
    freezeUser(data) {
      groupleader_freeze_user(data).then((res) => {
        if (res.code === 0) {
          this.$message.success({
            message: "操作成功!",
          });
        }
      });
    },
    // 解封请求
    unFreezeUser(id) {
      groupleader_unfreeze_user(id).then((res) => {
        if (res.code === 0) {
          this.$message.success({
            message: "解封成功!",
          });
        }
      });
    },
    // 千位符分隔
    format(num) {
      if (!num) {
        return 0;
      }
      num = num + ""; //数字转字符串
      var str = ""; //字符串累加
      for (var i = num.length - 1, j = 1; i >= 0; i--, j++) {
        if (j % 3 == 0 && i != 0) {
          //每隔三位加逗号，过滤正好在第一个数字的情况
          str += num[i] + ","; //加千分位逗号
          continue;
        }
        str += num[i]; //倒着累加数字
      }
      return str.split("").reverse().join(""); //字符串=>数组=>反转=>字符串
    },
    // 导航跳转
    navigateTo(name, id) {
      this.$router.push({ name: name, params: { username: id } });
    },
  },

  watch: {},
};
</script>
<style lang='scss' scoped>
.hover-anchor-info {
  display: flex;
  color: #515a6e;
  font-size: 12px;
  line-height: 18px;

  .cursor {
    cursor: pointer;
  }

  .hover-anchor-info-left {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 183px;

    .anchor-info-id {
    }

    .anchor-info-picture-box {
      width: 128px;
      height: 128px;
      border-radius: 64px;
      overflow: hidden;
      margin: 5px auto;

      .picture {
        width: 100%;
        height: 100%;
        border-radius: 64px;
      }
    }

    .anchor-info-name {
      font-size: 12px;

      .icon-gender-men {
        color: #9acd32;
      }

      .icon-gender-women {
        color: #eead97;
      }

      .maikefeng {
        color: #ff69b4;
      }

      .visitor-info-name {
        color: #fe0b0e;
      }

      .anchor-info-username {
      }
    }

    .anchor-info-detail-buttons {
      margin: 0 auto;

      .link-button {
        width: 62px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        border: 1px solid #dcdee2;
        box-sizing: border-box;
        border-radius: 3px;
        &:nth-child(2n){
          margin-left: 3px;
        }
        &:hover {
          background-color: #efefef;
        }
      }

      .anchor-info-detail-buttons-first {
        display: flex;

        .to-diamonds {
        }
      }
      .buttons-second {
        margin-top: 2px;
        color: #ffffff;
        .link-button {
          background-color: #ffba00;
          border-color: #ffba00;
          &:hover {
            background-color: #ffc833;
          }
        }
      }
    }
  }

  .hover-anchor-info-right {
    width: 212px;
    .form-item-content {
      display: inline-block;
      text-align: left;
    }
  }
}
</style>
<style lang="scss">
  .hover-anchor-info-right{
    .el-form-item__label{
      font-weight: normal;
      line-height: 18px;
    }
    .el-form-item__content {
      line-height: 18px;
    }
  }
</style>