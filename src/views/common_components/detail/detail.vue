<template>
  <div>
    <!-- 用户详情弹框 -->
    <el-dialog
      id="detail-dialog"
      width="865px"
      :visible.sync="detailDialog"
      title="用户详情"
      custom-class="users-detail"
    >
      <detail
        :form="detailForm"
        :columns="columns"
        @closeDialog="closeDialog"
        @refresh="refreshDetail"
        @openBanned="openBanned"
        @changeDetail="changeDetail"
      ></detail>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-close-notification"
          @click="changeDetail('删除昵称')"
        >昵称违规</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-close-notification"
          @click="changeDetail('删除签名')"
        >签名违规</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-close-notification"
          @click="openBanned('封设备')"
        >封设备</el-button>
        <el-button
          size="mini"
          type="warning"
          icon="el-icon-close-notification"
          @click="changeDetail('解禁')"
          v-if="detailForm.status==='2'"
        >解禁</el-button>
        <el-button
          size="mini"
          type="warning"
          icon="el-icon-close-notification"
          @click="openBanned('封号')"
          v-else
        >封号</el-button>
        <el-button
          size="mini"
          type="info"
          icon="el-icon-close-notification"
          @click="changeDetail('恢复')"
          v-if="detailForm.status==='3'"
        >恢复</el-button>
        <el-button
          size="mini"
          type="info"
          icon="el-icon-close-notification"
          @click="openBanned('注销账户')"
          v-else
        >注销账户</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-close-notification"
          :disabled="detailForm.freeze_jifen?true:false"
          @click="changeDetail('解冻')"
          v-if="detailForm.freeze_jifen"
        >解冻</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-close-notification"
          :disabled="detailForm.freeze_jifen?true:false"
          @click="openBanned('冻结贝壳')"
          v-else
        >冻结贝壳</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-close-notification"
          @click="changeDetail('解除禁言')"
          v-if="detailForm.freeze_action"
        >解除禁言</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-close-notification"
          @click="openBanned('禁言')"
          v-else
        >禁言</el-button>
        <el-button @click="closeDialog(false)">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 封禁用户设备/封禁账号/冻结贝壳/禁言弹框 -->
    <el-dialog
      id="banned-dialog"
      width="865px"
      :visible.sync="bannedDialog"
      :title="`确定${bannedTitle}吗?`"
      custom-class="common-dialog"
      @close="bannedFormClose('bannedForm')"
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
        <el-form-item label="新密码" prop="pwd" v-if="!bannedTime.length&&!bannedOptinos.length">
          <el-input
            max-length="200"
            v-model="bannedForm.pwd"
            @keyup.enter.native="submitBannned('bannedForm')"
          ></el-input>
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
  get_user_by_id,
  channel,
  delete_nickname,
  delete_sign,
  freeze_device,
  freeze_user,
  freeze_jifen,
  freeze_action,
  unreg_user,
  reset_password,
  unfreeze_user,
  unfreeze_jifen,
  unfreeze_action,
  refresh_nimtoken
} from "@/api/central/users/list.js";
import {
  freezeDeviceOptions, // 封禁设备
  freezeUserOptions, // 封号
  freezeJifenOptions, // 冻结贝壳
  freezeActionOptions, // 禁言原因
  freezeActionTimeOptions, // 禁言时间
  unionfreezeActionTimeOptions,
  unregUserOptions // 注销账户
} from "@/utils/options/banned.js";
import detail from "./components/detail.vue";
export default {
  name: "",
  props: ["userDetail"],
  watch: {
    userDetail: {
      handler: function(val, oldVal) {
        if (val.userid) {
          this.getDetailById(val.userid, true);
        }
      },
      deep: true
    }
  },
  data() {
    return {
      // 用户详情
      detailForm: {},
      columns: {},
      // 渠道包列表
      channelOptions: [],
      // 用户详情弹框
      detailDialog: false,
      // ===封禁弹框===
      bannedDialog: false,
      // 封禁多选框配置(用于组件传参)默认为空
      bannedOptinos: [],
      // 禁言时间
      bannedTime: [],
      // 封禁用户
      bannedForm: {
        checkList: [],
        checkListTime: [],
        pwd: ""
      },
      // 确定按钮文字
      bannedText: "确定",
      // 封禁标题
      bannedTitle: "",
      bannedRules: {
        // 封禁理由
        checkList: [
          { required: true, message: "请选择封禁理由", trigger: "change" }
        ],
        // 封禁时间
        checkListTime: [
          { required: true, message: "请选择禁言时间", trigger: "change" }
        ],
        // 密码
        pwd: [{ required: true, message: "请输入新密码", trigger: "blur" }]
      }
    };
  },

  components: {
    detail
  },

  computed: {},

  beforeMount() {},
  created() {
    this.getChannelList();
    if (this.userDetail&&this.userDetail.userid) {
      this.getDetailById(this.userDetail.userid, true);
    }
  },
  mounted() {},

  methods: {
    // 根据id获取用户详情
    async getDetailById(id, open) {
      /*
       * @params open  布尔值  判断是否需要打开详情弹框
       */
      let res = await get_user_by_id(id);
      if (res.code === 0) {
        this.detailForm = res.data.item;
        this.columns = res.data.columns;
        this.detailForm.client_name = this.checkChannel(
          this.detailForm.client_id
        );
        this.detailForm.lastlogin_client_name = this.checkChannel(
          this.detailForm.cur_client_id
        );
        if (open) {
          this.$nextTick(() => {
            this.detailDialog = true;
          });
        }
      }
    },
    // 筛选渠道包
    checkChannel(client_id) {
      let channelOptions = this.channelOptions.filter(item => {
        return item.value === client_id;
      });
      if (channelOptions.length) {
        return channelOptions[0].label;
      } else {
        return "";
      }
    },
    // 获取渠道包列表
    getChannelList() {
      channel().then(xhrData => {
        if (xhrData.code === 0) {
          this.channelOptions = xhrData.data;
        }
      });
    },
    // 删除昵称/签名/解封/解禁/解冻/解除禁言
    changeDetail(title) {
      this.$confirm(`确定${title}吗？`, "提示", {
        confirmButtonText: title,
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let userid = this.detailForm.userid;
          if (title === "删除昵称") {
            this.deleteNickname(userid);
          } else if (title === "删除签名") {
            this.deleteSign(userid);
          } else if (title === "解禁") {
            this.unfreezeUser(userid);
          } else if (title === "恢复") {
            this.unfreezeUser(userid);
          } else if (title === "解冻") {
            this.unfreezeJifen(userid);
          } else if (title === "解除禁言") {
            this.unfreezeAction(userid);
          } else {
            return false;
          }
        })
        .catch(function() {});
    },
    // 删除昵称请求
    deleteNickname(id) {
      delete_nickname(id).then(res => {
        if (res.code === 0) {
          this.$message.success({
            message: "删除成功!"
          });
          this.getDetailById(id);
        }
      });
    },
    // 删除签名请求
    deleteSign(id) {
      delete_sign(id).then(res => {
        if (res.code === 0) {
          this.$message.success({
            message: "删除成功!"
          });
          this.getDetailById(id);
        }
      });
    },
    // 重置表单
    resetForm(res, id, clear) {
      if (res.code === 0) {
        this.$message.success({
          message: "操作成功!"
        });
        // 如果clear存在 则需要清除表单
        if (clear) {
          this.bannedFormClose("bannedForm");
        }
        this.getDetailById(id);
      }
    },
    // 封设备请求
    freezeDevice(data) {
      freeze_device(data).then(res => {
        this.resetForm(res, data.id, true);
      });
    },
    // 封号请求
    freezeUser(data) {
      freeze_user(data).then(res => {
        this.resetForm(res, data.id, true);
      });
    },
    // 冻结贝壳请求
    freezeJifen(data) {
      freeze_jifen(data).then(res => {
        this.resetForm(res, data.id, true);
      });
    },
    // 禁言请求
    freezeAction(data) {
      freeze_action(data).then(res => {
        this.resetForm(res, data.id, true);
      });
    },
    // 注销用户请求
    unregUser(data) {
      unreg_user(data).then(res => {
        this.resetForm(res, data.id, true);
      });
    },
    // 重置密码请求
    resetPassword(data) {
      reset_password(data).then(res => {
        this.resetForm(res, data.id, true);
      });
    },
    // 解除/恢复
    unfreezeUser(data) {
      unfreeze_user(data).then(res => {
        this.resetForm(res, data);
      });
    },
    // 解冻贝壳
    unfreezeJifen(data) {
      unfreeze_jifen(data).then(res => {
        this.resetForm(res, data);
      });
    },
    // 解除禁言
    unfreezeAction(data) {
      unfreeze_action(data).then(res => {
        this.resetForm(res, data);
      });
    },
    // 打开封禁弹框
    openBanned(title) {
      if (title === "封设备") {
        this.bannedOptinos = freezeDeviceOptions;
      } else if (title === "封号") {
        this.bannedOptinos = freezeUserOptions;
      } else if (title === "冻结贝壳") {
        this.bannedOptinos = freezeJifenOptions;
      } else if (title === "禁言") {
        this.bannedOptinos = freezeActionOptions;
        this.bannedTime = unionfreezeActionTimeOptions;
      } else if (title === "重置密码") {
        this.bannedOptinos = [];
        this.bannedTime = [];
      } else if (title === "注销账户") {
        this.bannedOptinos = unregUserOptions;
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
      this.bannedForm.pwd = "";
    },
    // 提交封禁申请
    submitBannned(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = [
            ...this.bannedForm.checkListTime,
            ...this.bannedForm.checkList
          ];
          let data = {
            id: this.detailForm.userid,
            data: {
              reason: arr.join(",")
            }
          };
          if (this.bannedText === "封设备") {
            this.freezeDevice(data);
          } else if (this.bannedText === "封号") {
            this.freezeUser(data);
          } else if (this.bannedText === "冻结贝壳") {
            this.freezeJifen(data);
          } else if (this.bannedText === "禁言") {
            this.freezeAction(data);
          } else if (this.bannedText === "注销账户") {
            this.unregUser(data);
          } else if (this.bannedText === "重置密码") {
            delete data.data.reason;
            data.data.pwd = this.bannedForm.pwd;
            this.resetPassword(data);
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    },
    // 子组件关闭窗口
    closeDialog(params) {
      this.detailDialog = false;
    },
    // 子组件重置弹框
    refreshDetail(params) {
      this.getDetailById(params);
    }
  }
};
</script>
<style lang='' scoped>
</style>