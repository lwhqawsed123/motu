<template>
  <!-- 家财凭证管理 -->
  <div class="record">
    <div class="record-conter">
      <el-row :gutter="20" class="record-top" style="margin-left: 0px; margin-right: 0px;">
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="搜索：">
              <el-select
                @change="onSubmit"
                v-model="formInline.type"
                placeholder
                style="width:85px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in searchOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-model.trim="formInline.content"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入ID"
                clearable
                size="mini"
              ></el-input>
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
            <el-form-item label="公会名称：">
              <el-input
                v-model.trim="formInline.name"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入公会名称"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="排序方式：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.order"
                placeholder="默认排序"
                style="width:120px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in unionOrderOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="mini">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                icon="el-icon-plus"
                @click="openOrder('新增公会')"
                size="mini"
              >新增公会</el-button>
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
        <!-- <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        row-key="id"
        @sort-change="sortChange"
        >-->
        <el-table-column prop="id" min-width="50" label="ID"></el-table-column>
        <!-- <el-table-column prop="logo" min-width="80" label="公会LOGO">
          <template slot-scope="scope">
            <img src :alt="scope.row.logo" />
          </template>
        </el-table-column>-->
        <el-table-column prop="name" min-width="50" label="公会名称"></el-table-column>
        <!-- 用户信息 -->
        <el-table-column show-overflow-tooltip min-width="50px">
          <template slot-scope="scope">
            <div class="anchor-info cursor" @click="openDetail(scope.row.user.userid)">
              <div class="profile-box">
                <img :src="scope.row.user.avatar" alt class="profile" />
              </div>
              <br v-if="scope.row.user.status==='3'||scope.row.user.status==='2'" />
              <span style="color:#f56c6c" v-if="scope.row.user.status==='3'">禁言</span>
              <span style="color:#f56c6c" v-else-if="scope.row.user.status==='2'">封号</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip min-width="120px" label="会长">
          <template slot-scope="scope">
            <span class="visitor-info-name" title="会长昵称">{{scope.row.user.nickname}}</span>
            <br />
            <span
              class="gender-men"
              :class="scope.row.user.gender==='1'?'':'gender-women'"
            >{{scope.row.user.age}}</span>
            <span
              class="el-icon-video-camera-solid verify_status"
              title="视频认证"
              v-if="scope.row.user.verify_status==='1'"
            ></span>
            <span title="短ID">{{scope.row.user.username}}</span>
            <br />
            <span title="用户ID">{{scope.row.user.userid}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="loginuser" min-width="80" label="会长手机号"></el-table-column>
        <!-- <el-table-column prop="memo" min-width="80" label="公会公告"></el-table-column> -->
        <el-table-column prop="m_members" min-width="80" label="成员数" sortable="custom"></el-table-column>
        <el-table-column prop="status" min-width="80" label="公会状态">
          <template slot-scope="scope">
            <span>{{scope.row.status==='1'?'正常':'无效'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="jinfen_today" min-width="80" label="今日积分"></el-table-column>
        <el-table-column prop="jinfen_yesterday" min-width="80" label="昨日积分"></el-table-column>
        <el-table-column prop="jinfen_average" min-width="80" label="昨日人均积分">
           <template slot-scope="scope">
            <span>{{sumAverage(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-view"
              size="mini"
              title="查看详情"
              style="margin-bottom: 5px;"
              @click="see(scope.row)"
            ></el-button>
            <el-button
              icon="el-icon-edit"
              type="primary"
              style="margin-bottom:5px"
              plain
              size="mini"
              title="编辑"
              @click="openOrder('编辑公会',scope.row.id)"
            ></el-button>
            <el-button
              icon="el-icon-delete"
              type="danger"
              size="mini"
              title="删除"
              style="margin-bottom: 5px;"
              plain
              @click="deleteById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
        <!-- </el-table> -->
      </my-table>
      <!-- <my-pagination
        v-show="totalNum>0"
        :total="totalNum"
        :page.sync="formInline.pageNum"
        :limit.sync="formInline.pageSize"
        :ext_stat="ext_stat"
        @pagination="getOnlineList"
      />-->
    </div>

    <!-- 修改弹框 -->
    <el-dialog
      @close="resetForm('ruleForm')"
      id="owner-dialog"
      :title="title"
      :visible.sync="dialogVisible"
      width="600px"
      custom-class="common-dialog"
    >
      <el-form
        :rules="rules"
        :model="ownerForm"
        label-width="120px"
        label-position="left"
        ref="ruleForm"
      >
        <el-form-item label="公会名称" prop="name">
          <el-input v-model="ownerForm.name" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="会长手机号" prop="loginuser">
          <el-input v-model="ownerForm.loginuser" maxlength="11" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="会长用户ID" prop="create_userid">
          <el-input v-model="ownerForm.create_userid" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="收款类型" prop="account_type">
          <el-select
            v-model="ownerForm.account_type"
            placeholder="请选择"
            style="width:100%"
            size="mini"
          >
            <el-option
              v-for="(item,index) in accountTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="分成计算方式" prop="commission_method">
          <el-radio-group v-model="ownerForm.commission_method">
            <el-radio
              :label="item.value"
              v-for="(item,index) in commissionMethodOptions"
              :key="index"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="分成(%)" prop="rate" v-if="ownerForm.commission_method==='1'">
          <el-input v-model="ownerForm.rate" maxlength="100"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="公会分成(%)" prop="group_rate" v-if="ownerForm.commission_method==='1'">
          <el-input v-model="ownerForm.group_rate" maxlength="100"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="成员分成(%)" prop="member_rate">
          <el-input v-model="ownerForm.member_rate" maxlength="100"></el-input>
        </el-form-item> -->
        <el-form-item label="收款人" prop="account_name">
          <el-input v-model="ownerForm.account_name" maxlength="100"></el-input>
        </el-form-item>
        <!-- <el-form-item label="开户行" prop="account_branchs">
          <el-input v-model="ownerForm.account_branchs" maxlength="100"></el-input>
        </el-form-item>-->
        <el-form-item
          :label="ownerForm.account_type==='alipay'?'支付宝账号':'微信收款Openid'"
          prop="account_num"
        >
          <el-input v-model="ownerForm.account_num" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="公会状态" prop="status">
          <el-select v-model="ownerForm.status" placeholder="请选择" style="width:100%" size="mini">
            <el-option
              v-for="(item,index) in unionStatusOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公会备注" prop="memo">
          <el-input
            type="textarea"
            v-model="ownerForm.memo"
            maxlength="255"
            row="3"
            resize="none"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="owner-dialog-footer">
        <a href="javascript:;" class="owner-btn btn1" @click="submitForm('ruleForm')">保存</a>
        <a href="javascript:;" class="owner-btn btn2" @click="resetForm('ruleForm')">关闭</a>
      </div>
    </el-dialog>
    <!-- 用户详情组件 -->
    <el-detail v-if="userDetail.userid" :userDetail="userDetail"></el-detail>
  </div>
</template>

<script>
import {
  list,
  get_by_id,
  save_edit,
  delete_by_id,
} from "@/api/organization/unions/list.js";
import { groupsOptions } from "@/api/organization/anchorsAudit/list.js";

import {
  searchOptions,
  unionOrderOptions,
  accountTypeOptions,
  commissionMethodOptions,
  unionStatusOptions,
} from "@/utils/options/organization.js";
export default {
  name: "Unions_list",
  data() {
    return {
      searchOptions,
      unionOrderOptions,
      accountTypeOptions,
      commissionMethodOptions,
      unionStatusOptions,
      // groupOptions: [],
      // 总条数
      totalNum: 0,
      ext_stat: "",
      // 查询数据
      formInline: {
        // groupid:'',
        // 搜索类型 username/userid
        type: "username",
        // 搜索内容 短ID/用户ID
        content: "",
        // 公会名称
        name: "",
        // 排序方式
        // order: "",
        // 排序列
        orderByColumn: "id",
        // 排序方式
        isAsc: "desc",
        // 当前显示条数
        pageSize: 20,
        // 当前显示页数
        pageNum: 1,
      },
      // 表格数据
      tableData: [],
      // 新增/编辑 对话框
      dialogVisible: false,
      title: "标题",
      //====新增/修改=====
      // 表单数据
      ownerForm: {
        name: "",
        loginuser: "",
        create_userid: "",
        account_type: "",
        commission_method: "1",
        rate: "",
        group_rate: "",
        member_rate: "",
        account_name: "",
        account_branchs: "",
        account_num: "",
        status: "",
        memo: "",
      },
      // 表单验证
      rules: {
        // 公会名称
        name: [{ required: true, message: "请输入公会名称", trigger: "blur" }],
        // 会长手机号
        loginuser: [
          { required: true, message: "请输入会长手机号", trigger: "blur" },
          {
            // pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
        ],
        // 用户id
        create_userid: [
          { required: true, message: "请输入用户id", trigger: "blur" },
        ],
      },
      // ====用户详情弹框=====
      userDetail: {
        timestamp: "",
        userid: "",
      },
    };
  },
  created() {
    // 调用 获取列表 方法
    this.getOnlineList();
    // 获取下拉列表 (此页不需要下拉列表)
    // this.getGroupsOptions();
  },
  methods: {
    // 获取公会下拉列表
    getGroupsOptions() {
      groupsOptions().then((xhrData) => {
        if (xhrData.code === 0) {
          this.groupOptions = xhrData.data;
        }
      });
    },
    // 查看
    see(row) {
      const obj = {
        id: row.id,
      };
      this.$emit("changePage", "SEE", obj);
    },
    onSubmit() {
      this.formInline.pageNum=1
      this.getOnlineList();
    },
    // 获取列表
    getOnlineList() {
      let data = JSON.parse(JSON.stringify(this.formInline));
      data.offset = (data.pageNum - 1) * data.pageSize;
      list(data).then((xhrData) => {
        if (xhrData.code === 0) {
          this.tableData = xhrData.data.items;
          this.ext_stat = xhrData.data.ext_stat;
          this.totalNum = +xhrData.data.total_rows;
        }
      });
    },
    // 打开查看详情
    async openOrder(title, id) {
      this.title = title;
      if (title === "新增公会") {
        this.dialogVisible = true;
      } else if (title === "编辑公会") {
        let res = await get_by_id(id);
        if (res && res.code === 0) {
          this.ownerForm = res.data.item;
          this.dialogVisible = true;
        }
      }
    },
    // 提交编辑
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ownerForm));
          if (data.commission_method === "2") {
            data.rate = 0;
            data.member_rate = 0;
          }
          save_edit(data).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.info);
              this.$refs[formName].resetFields();
              this.getOnlineList();
              this.dialogVisible = false;
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
      this.dialogVisible = false;
    },
    // 删除
    deleteById(id) {
      this.$confirm("是否删除当前项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delete_by_id(id).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.info);
          }
        });
      });
    },
    //  打开查看
    openDetail(id) {
      this.userDetail.timestamp = new Date().getTime();
      this.userDetail.userid = id;
    },
    // 计算平均积分
    sumAverage(row){
       // m_members 成员数 jinfen_yesterday 昨日总积分
       let m_members=parseInt(row.m_members)
       let jinfen_yesterday=parseInt(row.jinfen_yesterday)
       if(m_members&&jinfen_yesterday){
         return parseInt(jinfen_yesterday/m_members).toFixed(2)
       }
       return "-"
    }
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
</style>
<style lang="scss">
.chattingRecords .el-dialog__header {
  display: none !important;
}
.chattingRecords .el-dialog__body {
  padding: 2px;
  box-sizing: border-box;
}
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
<style>
</style>