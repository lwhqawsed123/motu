<template>
  <!-- 视频认证 -->
  <div class="record">
    <div class="record-conter">
      <el-row :gutter="20" class="record-top" style="margin-left: 0px; margin-right: 0px;">
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="时间：">
              <dateTimePicker
                v-if="formInline.date.startday"
                :date="formInline.date"
                @onSubmit="onSubmit"
              ></dateTimePicker>
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
            </el-form-item> -->
            <el-form-item label="性别：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.gender"
                placeholder="请选择"
                size="mini"
                style="width:85px"
              >
                <el-option
                  v-for="(item,index) in gengerOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.type"
                placeholder="全部"
                size="mini"
                style="width:85px"
              >
                <el-option
                  v-for="(item,index) in videoTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
                  v-for="(item,index) in statusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主播ID：">
              <el-input
                v-model.trim="formInline.username"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入主播ID"
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
      <my-pagination
        :total="totalNum"
        :page.sync="formInline.pageNum"
        :limit.sync="formInline.pageSize"
        @pagination="getOnlineList"
        :date="formInline.date"
        :onTop="true"
      />
      <!-- 视频表格 -->
      <div class="video-table">
        <el-card class="video-item" v-for="(item,index) in tableData" :key="index">
          <div class="video-box cursor">
            <video :src="item.verify_url" width="100%" height="100%" controls></video>
          </div>
          <div style="padding: 5px">
            <div class="user-info">
              <div class="user-avatar cursor" @click="openDetail(item.userid)">
                <el-image :src="item.avatar" fit="contain" style="width: 100%; height: 100%"></el-image>
              </div>
              <div class="user-message">
                <span>{{item.username}}</span>
                <span>{{item.branchs}}</span>
                <br />
                <span>{{item.nickname}}</span>
                <span>{{"("+item.province+item.city+")"}}</span>
                <br />
                <span
                  class="gender-men"
                  :class="item.gender==='1'?'':'gender-women'"
                  style="margin-right:5px"
                >{{item.age}}</span>
                <!-- <span class="text-button" @click="audit_gender(item.userid)">性别不符</span> -->
                <span class="text-button" @click="audit_avatar(item.userid)">头像不符</span>
              </div>
            </div>
            <div class="user-star">
              <span>当前：</span>
              <span class="star-text has-star" v-if="item.verify_status==='1'&&item.nice==='3'">5星</span>
              <span
                class="star-text has-star"
                v-else-if="item.verify_status==='1'&&item.nice==='2'"
              >4星</span>
              <span
                class="star-text has-star"
                v-else-if="item.verify_status==='1'&&item.nice==='1'"
              >3星</span>
              <span
                class="star-text has-star"
                v-else-if="item.verify_status==='1'&&item.nice==='-1'"
              >0星</span>
              <span class="star-text has-star" v-else-if="item.verify_status==='1'">2星</span>
              <span class="star-text" v-else-if="item.verify_status==='2'">审核中</span>
              <span class="star-text" v-else-if="item.verify_status==='3'">忽略</span>
              <span class="star-text" v-else>未通过</span>
              <el-checkbox
                v-model="item.isself"
                true-label="1"
                false-label="0"
                @change="audit_isself(item)"
              >是本人</el-checkbox>
              <el-checkbox
                v-model="item.top"
                true-label="2"
                false-label="0"
                @change="audit_istop(item)"
              >置顶</el-checkbox>
            </div>
            <div class="user-star">
              <span>操作：</span>
              <!-- <span class="text-button" @click="audit_star(item.id,3)">5星</span> -->
              <!-- <span class="text-button" @click="audit_star(item.id,2)">4星</span> -->
              <!-- <span class="text-button" @click="audit_star(item.id,1)">3星</span> -->
              <!-- <span class="text-button" @click="audit_star(item.id)">2星</span> -->
              <span class="text-button" @click="audit_star(item.id)">通过</span>
              <!-- <span class="text-button" @click="audit_star(item.id,-1)">0星</span> -->
              <span class="text-button" @click="set_refuse(item.id)">不通过</span>
              <span class="text-button" @click="set_delay(item.id)">忽略</span>
            </div>
            <div class="user-star">
              <span>同设备：</span>
              <span class="udid_count" @click="openQuickSearch(1,item,'登陆设备')">{{item.udid_count}}人</span>
              <span>接通率：</span>
              <span>{{item.asr?item.asr:"暂无"}}</span>
              <span>ACD：</span>
              <span>{{item.acd}}</span>
            </div>
            <div class="user-star">
              <span>时间：</span>
              <span>{{parseTime(item.dateline)}}</span>
              <span>审核人：</span>
              <span>{{item.operator}}</span>
            </div>
          </div>
        </el-card>
      </div>
      <my-pagination
        :total="totalNum"
        :page.sync="formInline.pageNum"
        :limit.sync="formInline.pageSize"
        @pagination="getOnlineList"
        :date="formInline.date"
      />
    </div>
    <!-- 用户详情组件 -->
    <el-detail v-if="userDetail.userid" :userDetail="userDetail"></el-detail>
    <el-dialog
      title="快速查询"
      :visible.sync="quickSearch.quickSearchDialog"
      append-to-body
      custom-class="quickSearch-dialog"
      width="900px"
    >
      <div class="quickSearch-content">
        <listTable :data="quickSearch.tableData"></listTable>
        <my-pagination
          v-show="quickSearch.total>0"
          :total="quickSearch.total"
          :page.sync="quickSearch.pageNum"
          :limit.sync="quickSearch.pageSize"
          @pagination="quickSearchList"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  list,
  quickList,
  groupsOptions,
  updata_gender,
  avatar_discrepancy,
  isself,
  istop,
  acceptedSatr,
  refuse,
  delay,
} from "@/api/organization/videoVerify/list.js";
import { gengerOptions } from "@/utils/options/common.js";
import listTable from "@/views/common_components/detail/components/list";
import {
  videoTypeOptions,
  statusOptions,
} from "@/utils/options/videoVerify.js";
export default {
  components: {
    listTable,
  },
  data() {
    return {
      gengerOptions,
      videoTypeOptions,
      statusOptions,
      // 总条数
      totalNum: 0,
      groupOptions: [],
      // 查询数据
      formInline: {
        // groupid: "",
        date: {
          startday: "",
          endday: "",
        }, // 日期
        gender: "",
        type: "",
        status: "",
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
      // 快速查询
      quickSearch: {
        quickSearchDialog: false,
        quickSearch: "",
        device_type: "",
        hardsn: "",
        tableData: [],
        pageNum: 1,
        pageSize: 20,
        offset: 0,
        total: 0,
        ext_stat: "",
      },
    };
  },
  created() {
    // 获取默认开始时间和结束时间
    this.formInline.date.startday = this.getDateNow()[0];
    this.formInline.date.endday = this.getDateNow()[1];
    // 调用 获取在线委托列表 方法
    this.getOnlineList();
    // 获取下拉列表
    this.getGroupsOptions();
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
          this.totalNum = +xhrData.data.total_rows;
        }
      });
    },
    // 获取公会下拉列表
    getGroupsOptions() {
      groupsOptions().then((xhrData) => {
        if (xhrData.code === 0) {
          this.groupOptions = xhrData.data;
        }
      });
    },

    // 根据id单个审核
    auditById(id, status) {
      this.$confirm("此操作将修改主播审核状态，是否确定？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: id,
            audit: status,
          };
          gstatusEdit(data).then((res) => {
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
    // 审核性别
    audit_gender(id) {
      let data = {
        userid: id,
      };
      updata_gender(data).then((res) => {
        if (res && res.code === 0) {
          this.$message.success({
            message: res.info || "设置成功",
          });
          this.getOnlineList();
        }
      });
    },
    // 审核头像
    audit_avatar(id) {
      let data = {
        userid: id,
      };
      avatar_discrepancy(data).then((res) => {
        if (res && res.code === 0) {
          this.$message.success({
            message: res.info || "设置成功",
          });
          this.getOnlineList();
        }
      });
    },
    // 是否本人
    audit_isself(item) {
      let data = {
        userid: item.userid,
        isself: item.isself,
      };
      isself(data).then((res) => {
        if (res && res.code === 0) {
          this.$message.success({
            message: res.info || "设置成功",
          });
          this.getOnlineList();
        }
      });
    },
    // 是否本人
    audit_istop(item) {
      let data = {
        userid: item.userid,
        top: item.top,
      };
      istop(data).then((res) => {
        if (res && res.code === 0) {
          this.$message.success({
            message: res.info || "设置成功",
          });
          this.getOnlineList();
        }
      });
    },
    // 评星级
    audit_star(id, nice) {
      let data = {
        id: id,
      };
      data.data = nice
        ? {
            nice: nice,
          }
        : {};
      acceptedSatr(data).then((res) => {
        if (res && res.code === 0) {
          this.$message.success({
            message: res.info || "设置成功",
          });
          this.getOnlineList();
        }
      });
    },
    // 不通过
    set_refuse(id) {
      refuse(id).then((res) => {
        if (res && res.code === 0) {
          this.$message.success({
            message: res.info || "设置成功",
          });
          this.getOnlineList();
        }
      });
    },
    // 忽略
    set_delay(id) {
      delay(id).then((res) => {
        if (res && res.code === 0) {
          this.$message.success({
            message: res.info || "设置成功",
          });
          this.getOnlineList();
        }
      });
    },
    // ========快速查询==========
    openQuickSearch(num, form, title) {
      this.quickSearch.quicksearch = num;
      this.quickSearch.device_type = form.device_type;
      this.quickSearch.hardsn = form.hardsn;
      this.quickSearch.udid = form.udid;
      this.quickSearchList(title);
      this.quickSearch.quickSearchDialog = true;
    },
    quickSearchList(title) {
      let data = {
        quicksearch: this.quickSearch.quicksearch,
        offset: (this.quickSearch.pageNum - 1) * this.quickSearch.pageSize,
      };
      if (title === "登陆设备") {
        data.udid = this.quickSearch.udid;
      } else if (title === "注册设备") {
        data.device_type = this.quickSearch.device_type;
        data.hardsn = this.quickSearch.hardsn;
      }
      quickList(data).then((res) => {
        if (res.code === 0) {
          this.quickSearch.tableData = res.data.items;
          this.quickSearch.ext_stat = res.data.ext_stat;
          this.quickSearch.total = +res.data.total_rows;
        }
      });
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.quickSearch.pageNum = val;
      // 切换页码时，要获取每页显示的条数
      this.quickSearchList();
    },
  },
};
</script>
<style>
</style>
<style lang="scss" scoped>
@import "@/assets/styles/scss/list.scss";
@import "@/assets/styles/scss/video_verify.scss";
</style>
<style lang="scss">
.video-table .video-item {
  border: none;
  .el-card__body {
    padding: 0;
    border: none;
  }
}
</style>