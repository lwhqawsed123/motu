<template>
  <!-- 家财凭证管理 -->
  <div class="record">
    <div class="record-conter">
      <el-row :gutter="20" class="record-top" style="margin-left: 0px; margin-right: 0px;">
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="注册日期：">
              <dateTimePicker
                v-if="formInline.date.startday"
                :date="formInline.date"
                @onSubmit="onSubmit"
              ></dateTimePicker>
            </el-form-item>
            <el-form-item label="审核状态：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.status"
                placeholder="请选择"
                size="mini"
                style="width:85px"
              >
                <el-option
                  v-for="(item,index) in gstatusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="公会：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.groupid"
                placeholder="请选择"
                size="mini"
                style="width:85px"
              >
                <el-option
                  v-for="(item,index) in groupOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="用户ID：">
              <el-input
                v-model.trim="formInline.userid"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入用户ID"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="短ID：">
              <el-input
                v-model.trim="formInline.username"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入短ID"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="mini">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <my-table
        :tableData="tableData"
        :formInline="formInline"
        :totalNum="totalNum"
        :ext_stat="ext_stat"
        :row-key="'id'"
        @getOnlineList="getOnlineList"
      >
        <el-table-column type="index" min-width="50" label="编号"></el-table-column>

        <!-- 用户信息 -->
        <el-table-column min-width="70px">
          <template slot="header">
            <span>头像</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div class="anchor-info cursor" @click="openDetail(scope.row.userid)">
              <div class="profile-box">
                <img :src="scope.row.avatar" alt class="profile" />
              </div>
              <br v-if="scope.row.status==='3'||scope.row.status==='2'" />
              <span style="color:#f56c6c" v-if="scope.row.status==='3'">禁言</span>
              <span style="color:#f56c6c" v-else-if="scope.row.status==='2'">封号</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="昵称/ID">
          <template slot-scope="scope">
            <span class="visitor-info-name" title="用户昵称">{{scope.row.nickname}}</span>
            <br />
            <span
              class="gender-men"
              :class="scope.row.gender==='1'?'':'gender-women'"
            >{{scope.row.age}}</span>
            <span
              class="el-icon-video-camera-solid verify_status"
              title="视频认证"
              v-if="scope.row.verify_status==='1'"
            ></span>
            <span title="短ID">{{scope.row.username}}</span>
            <br />
            <span title="用户ID">{{scope.row.userid}}</span>
          </template>
        </el-table-column>
        <!-- 用户信息结束 -->
        <el-table-column prop="realname" min-width="50" label="真实姓名"></el-table-column>
        <el-table-column prop="idcard" min-width="110" label="身份证号"></el-table-column>
        <el-table-column min-width="120" label="身份证照片">
          <template slot-scope="scope">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.positive"
              fit="contain"
              :preview-src-list="[scope.row.positive,scope.row.back]"
            ></el-image>
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.back"
              fit="contain"
              :preview-src-list="[scope.row.positive,scope.row.back]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="审核">
          <template slot="header">
            <span>审核</span>
            <el-tooltip class="item" effect="dark" :content="content" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              title="通过"
              plain
              style="margin-bottom:5px"
              @click="auditById(scope.row.id,1)"
            >通过</el-button>
            <el-button
              type="danger"
              size="mini"
              title="不通过"
              plain
              @click="auditById(scope.row.id,2)"
            >不通过</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" min-width="80" label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status ==='1'&&scope.row.verify_status==='0'" style="color:#66b1ff">审核中</span>
            <span v-else-if="scope.row.status ==='0'&&scope.row.verify_status==='1'" style="color:#f56c6c">未通过</span>
            <span v-else-if="scope.row.status ==='1'&&scope.row.verify_status==='1'" style="color:#67c23a">已认证</span>
            <span v-else>{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="group_status" min-width="80" label="直播状态">
          <template slot-scope="scope">
            <span v-if="scope.row.show_hot==='0'">最新</span>
            <span v-else-if="scope.row.show_hot==='1'">最热</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="操作">
          <template slot="header">
            <span>操作</span>
            <el-tooltip class="item" effect="dark" :content="content" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              title="查看详情"
              icon="el-icon-view"
              plain
              style="margin-bottom:5px"
              @click="openView(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              title="删除"
              plain
              @click="deleteById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </my-table>
    </div>
    <!-- 用户详情组件 -->
    <el-detail v-if="userDetail.userid" :userDetail="userDetail"></el-detail>
    <!-- 详情弹框 -->
    <el-dialog
      id="creditlogs-dialog"
      title="查看详情"
      :visible.sync="orderDetail.orderDialog"
      width="600px"
      custom-class="common-dialog"
    >
      <table class="table table-striped table-bordered table-hover view-userinfo">
        <tbody>
          <tr v-for="(item,index) in orderDetail.columns" :key="index">
            <td width="30%" v-if="item.name!=='status'&&item.name!=='verify_status'">{{item.label}}</td>
            <td width="70%" v-if="item.name!=='status'&&item.name!=='verify_status'">
              <!-- <span v-if="item.name==='show_hot'">
                <span v-if="orderDetail.orderForm[item.name]==='0'">最新</span>
                <span v-else-if="orderDetail.orderForm[item.name]==='1'">最热</span>
                <span v-else>未知</span>
              </span>-->
              <el-image
                v-if="item.name==='positive'||item.name==='back'"
                style="max-width: 400px"
                :src="baseImageUrl+orderDetail.orderForm[item.name]"
                fit="contain"
                :preview-src-list="[baseImageUrl+orderDetail.orderForm.positive,baseImageUrl+orderDetail.orderForm.back]"
              ></el-image>
              <span
                v-else-if="item.name==='dateline'"
              >{{parseTime(orderDetail.orderForm[item.name])}}</span>
              <span v-else>{{orderDetail.orderForm[item.name]}}</span>
            </td>
          </tr>
          <tr>
            <td width="30%">认证状态</td>
            <td width="70%">
              <!-- 认证状态 -->
              <span
                v-if="orderDetail.orderForm.status==='1'&&orderDetail.orderForm.verify_status==='1'"
              >已认证</span>
              <span
                v-else-if="orderDetail.orderForm.status==='1'&&orderDetail.orderForm.verify_status==='0'"
              >审核中</span>
              <span
                v-else-if="orderDetail.orderForm.status==='0'&&orderDetail.orderForm.verify_status==='1'"
              >未通过</span>
              <span v-else>未知状态</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="footer">
        <el-button @click="orderDetail.orderDialog=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  list,
  statusEdit,
  get_by_id,
  delete_by_id,
} from "@/api/organization/userVerify/list.js";
import { gstatusOptions, baseImageUrl } from "@/utils/options/common";
export default {
  data() {
    return {
      gstatusOptions,
      baseImageUrl,
      // 总条数
      totalNum: 0,
      ext_stat: "",
      groupOptions: [],
      content: "修改审核状态",
      // 查询数据
      formInline: {
        date: {
          startday: "",
          endday: "",
        }, // 日期
        status: "",
        userid: "",
        username: "",
        offset: 0,
        // 当前显示条数
        pageSize: 20,
        // 当前显示页数
        pageNum: 1,
      },
      // 表格数据
      tableData: [],
      // ====用户详情弹框=====
      userDetail: {
        timestamp: "",
        userid: "",
      },
      orderDetail: {
        orderForm: {},
        columns: {},
        orderDialog: false,
        tableColumns: [
          "id",
          "userid",
          "realname",
          "idcard",
          "show_hot",
          "disabled",
          "dateline",
          "positive",
          "back",
          "status",
        ],
      },
    };
  },
  created() {
    // 获取默认开始时间和结束时间
    this.formInline.date.startday = this.getDateNow()[0];
    this.formInline.date.endday = this.getDateNow()[1];
    // 调用 获取列表 方法
    this.getOnlineList();
  },

  methods: {
    onSubmit() {
      this.formInline.pageNum=1
      this.getOnlineList();
    },
    // 获取列表
    getOnlineList() {
      let data = JSON.parse(JSON.stringify(this.formInline));
      data.startday = data.date.startday;
      data.endday = data.date.endday;
      data.offset = (data.pageNum - 1) * data.pageSize;
      delete data.date;
      list(data).then((xhrData) => {
        if (xhrData.code === 0) {
          this.tableData = xhrData.data.items;
          this.ext_stat = xhrData.data.ext_stat;
          this.totalNum = +xhrData.data.total_rows;
        }
      });
    },
    // 根据id单个审核
    auditById(id, status) {
      this.$confirm("此操作将修改审核状态，是否确定？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: id,
            audit: status,
          };
          statusEdit(data).then((res) => {
            if (res.code === 0) {
              this.$message.success({
                message: "修改成功",
              });
              this.getOnlineList();
            }
          });
        })
        .catch(function () {});
    },
    //  打开查看
    openDetail(id) {
      this.userDetail.timestamp = new Date().getTime();
      this.userDetail.userid = id;
    },
    // 打开查看详情
    async openView(id) {
      let res = await get_by_id(id);
      if (res && res.code === 0) {
        this.orderDetail.orderForm = res.data.item;
        this.orderDetail.columns = res.data.columns;
        this.orderDetail.orderDialog = true;
      }
    },
    deleteById(id) {
      this.$confirm("此操作将删除用户头像，是否确定？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delete_by_id(id).then((res) => {
            if (res.code === 0) {
              this.$message.success({
                message: "删除成功",
              });
              this.getOnlineList();
            }
          });
        })
        .catch(function () {});
    },
  },
};
</script>
<style>
/* 修改对话框整体 */
.el-dialog {
  border-radius: 5px;
}
/* 修改对话框中间部分 */
.el-dialog__body {
  padding-bottom: 0;
}
/* 修改对话框头部 */
.el-dialog__header {
  background-color: #e6e8eb;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
/* 修改对话框底部 */
.el-dialog__footer {
  padding: 10px;
  background-color: #e6e8eb;
}
/* 修改对话框标题 */
.el-dialog__title {
  font-size: 20px;
  font-weight: bold;
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/scss/list.scss";
@import "@/assets/styles/scss/table.scss";
</style>
<style lang="scss">
.record {
  .el-date-editor--daterange.el-input__inner {
    width: 220px;
  }
  .record-top {
    .el-form-item__label {
      padding: 0;
    }
  }
}
</style>