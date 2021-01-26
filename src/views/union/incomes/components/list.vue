<template>
  <!-- 主播收入分析 -->
  <div class="record">
    <div class="record-conter">
      <el-row :gutter="20" class="record-top" style="margin-left: 0px; margin-right: 0px;">
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
             <el-form-item label="公会：">
             <group-select :formInline="formInline" @onSubmit="onSubmit"></group-select>
            </el-form-item>
            <el-form-item label="日期：">
              <!-- <el-date-picker
                v-model="formInline.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
              ></el-date-picker>-->
              <dateTimePicker
                v-if="formInline.date.startday"
                :date="formInline.date"
                @onSubmit="onSubmit"
                :format="true"
                :width="'150px'"
                type="date"
              ></dateTimePicker>
            </el-form-item>

            <el-form-item label="UID：">
              <el-input
                v-model.trim="formInline.userid"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入主播ID"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机：">
              <el-input
                v-model.trim="formInline.mobile"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入手机号"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="昵称：">
              <el-input
                v-model.trim="formInline.nickname"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入昵称关键字"
                clearable
                size="mini"
                style="min-width:160px"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="mini">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                icon="el-icon-download"
                @click="toExportExcel"
                size="mini"
              >导出EXCEL</el-button>
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
        <el-table-column type="index" min-width="30px" fixed label="编号"></el-table-column>
        <el-table-column prop="group_name" label="公会" show-overflow-tooltip min-width="50px"></el-table-column>
        <!-- 用户信息 -->
        <el-table-column show-overflow-tooltip min-width="50px" label="头像">
          <template slot-scope="scope">
            <info-popover
              v-if="scope.row.userid!=='0'"
              :userid="scope.row.userid"
              :avatar="scope.row.avatar"
              :status="scope.row.status"
            ></info-popover>
            <span v-else-if="scope.row.nickname==='汇总'">{{scope.row.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip min-width="60px" label="昵称/ID">
          <template slot-scope="scope">
            <span
              class="visitor-info-name"
              title="用户昵称"
              v-if="scope.row.userid!=='0'"
            >{{scope.row.nickname}}</span>
            <br v-if="scope.row.userid!=='0'" />
            <span
              class="gender-men"
              :class="scope.row.gender==='1'?'':'gender-women'"
              v-if="scope.row.userid!=='0'"
            >{{scope.row.age}}</span>
            <span
              class="el-icon-video-camera-solid verify_status"
              title="视频认证"
              v-if="scope.row.verify_status==='1'&&scope.row.userid"
            ></span>
            <span title="短ID" v-if="scope.row.userid!=='0'">{{scope.row.username}}</span>
            <br v-if="scope.row.userid!=='0'" />
            <span title="用户ID" v-if="scope.row.userid!=='0'">{{scope.row.userid}}</span>
          </template>
        </el-table-column>
        <!-- 用户信息结束 -->
         <el-table-column
          show-overflow-tooltip
          prop="remark"
          label="备注"
          min-width="50px"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="zs_income"
          label="积分收入"
          min-width="40px"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="msg_income"
          label="消息收入"
          min-width="40px"
        >
          <!-- <template slot="header">
            <span>消息收入</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="cdr_income"
          label="通话收入"
          min-width="40px"
        >
          <!-- <template slot="header">
            <span>通话收入</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="video_income"
          label="视频收入"
          min-width="40px"
        >
          <!-- <template slot="header">
            <span>视频收入</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="gift_income"
          label="礼物收入"
          min-width="40px"
        >
          <!-- <template slot="header">
            <span>礼物收入</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="night_income"
          label="夜间收入"
          min-width="40px"
        >
          <!-- <template slot="header">
            <span>夜间收入</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <!-- <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="online_time"
          label="在线时长"
          min-width="40px"
        >
          <template slot="header">
            <span>在线时长</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template>
        </el-table-column>-->
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="cdr_time"
          label="通话时长"
          min-width="40px"
        >
          <!-- <template slot="header">
            <span>通话时长</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <!-- <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="cdr_num"
          label="通话次数"
          min-width="40px"
        >
          <template slot="header">
            <span>通话次数</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template>
        </el-table-column> -->
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="cdr_valid_num"
          label="有效通话"
          min-width="40px"
        >
          <!-- <template slot="header">
            <span>有效通话</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="cdr_called_num"
          label="被叫次数"
          min-width="40px"
        >
          <!-- <template slot="header">
            <span>被叫次数</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="cdr_called_rate"
          label="接通率"
          min-width="40px"
        >
          <!-- <template slot="header">
            <span>接通率</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <!-- <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="cdr_caller_num"
          label="主叫次数"
          min-width="40px"
        >
          <template slot="header">
            <span>主叫次数</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template>
        </el-table-column>-->
        <!-- <el-table-column
          show-overflow-tooltip
          sortable="custom"
          prop="cdr_caller_rate"
          label="主叫接通率"
          min-width="130px"
        >
          <template slot="header">
            <span>主叫接通率</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template>
        </el-table-column>-->
         <el-table-column label="操作" min-width="160px">
<<<<<<< HEAD
          <template slot="header">
=======
          <!-- <template slot="header">
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
            <span>操作</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
<<<<<<< HEAD
          </template>
=======
          </template> -->
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
          <template slot-scope="scope">
            <el-button
              icon="el-icon-chat-line-round"
              size="mini"
              title="聊天记录"
              @click="openChattingRecords(scope.row)"
              style="margin-bottom:5px"
<<<<<<< HEAD
=======
              v-if="scope.row.id!=='0'"
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
            ></el-button>
            <el-button
              icon="el-icon-sell"
              size="mini"
              title="备注修改"
              @click="openMymember(scope.row.userid)"
              style="margin-bottom:5px"
<<<<<<< HEAD
=======
              v-if="scope.row.id!=='0'"
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-remove"
              plain
              @click="removeBind(scope.row)"
              size="mini"
<<<<<<< HEAD
=======
              v-if="scope.row.id!=='0'"
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
            >解绑</el-button>
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
    <!-- 用户详情组件 -->
    <detail v-if="userDetail.userid" :userDetail="userDetail"></detail>
    <!-- 聊天记录弹框 -->
    <chattingRecords v-if="chattingData.userid" :chattingData="chattingData"></chattingRecords>
<<<<<<< HEAD
=======
    <!-- 备注弹框 -->
    <mymember v-if="mymemberData.id" :mymemberData="mymemberData" @getOnlineList="getOnlineList"></mymember>

>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
  </div>
</template>

<script>
import { get_user_by_id } from "@/api/union/anchors/list.js";
import { list, exportAllExcel } from "@/api/union/incomes/list.js";
import {
  unbind,
} from "@/api/union/anchors/list.js";
import detail from "@/views/common_components/detail/detail.vue";
import infoPopover from "@/views/common_components/infoPopover/infoPopover.vue";
import chattingRecords from "@/views/common_components/chattingRecords/chattingRecords.vue";
<<<<<<< HEAD

=======
import mymember from "@/views/union/anchors/components/mymember.vue";
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
export default {
  components: {
    chattingRecords: chattingRecords,
    mymember,
    detail,
    infoPopover,
    chattingRecords
  },
  data() {
    return {
      // 总条数
      totalNum: 0,
      ext_stat: "",
      // 查询数据
      formInline: {
        groupid: this.$store.state.user.groupInfo.id,
        date: {
          startday: "",
          endday: "",
        }, // 日期
        userid: "",
        mobile: "",
        nickname: "",
        // 排序列
        orderByColumn: "id",
        // 排序方式
        isAsc: "desc",
        // 开始时间
        startday: "",
        //结束时间
        endday: "",
        // 当前显示条数
        pageSize: 20,
        // 当前显示页数
        pageNum: 1,
        // limit 偏移量
        offset: "",
      },
      // 日期禁用项 禁用大于结束日期
      startOptions: {
        disabledDate: false,
      },
      // 日期禁用项 禁用小于开始日期
      endOptions: {
        disabledDate: false,
      },
      // 表格数据
      tableData: [],
      // 导出表格的数据
      exportTable: [],
      // ====用户详情弹框=====
      userDetail: {
        timestamp: "",
        userid: "",
      },
<<<<<<< HEAD
      // ====聊天记录=====
=======
       // ====聊天记录=====
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
      chattingData: {
        timestamp: "",
        userid: "",
      },
<<<<<<< HEAD
=======
      // 备注弹框数据
      mymemberData: {},
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
    };
  },
  created() {
    // 获取默认开始时间和结束时间
    this.formInline.date.startday = this.getDateNow()[0];
    this.formInline.date.endday = this.getDateNow()[1];
    // 调用 获取在线委托列表 方法
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
    //  打开查看用户信息
    openDetail(id) {
      this.userDetail.timestamp = new Date().getTime();
      this.userDetail.userid = id;
    },
     // 打开聊天记录弹框
    openChattingRecords(row) {
      this.chattingData.timestamp = new Date().getTime();
      this.chattingData.userid = row.userid;
      this.chattingData.username = row.username;
    },
<<<<<<< HEAD
=======
     // 打开主播分成
    openMymember(id) {
      this.mymemberData = {
        timestamp: new Date().getTime(),
        id: id,
      };
    },
     // 解绑主播
    removeBind(row) {
      this.$confirm("是否解绑该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = {
          groupid: this.$store.state.user.groupInfo.id,
          userid: row.userid,
        };
        unbind(data).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.info);
            this.getOnlineList();
          }
        });
      }).catch(()=>{
        return false
      })
    },
>>>>>>> 592e8c094b026f8899f6f43740f0f3c426955fa1
    // 点击导出按钮
    toExportExcel() {
      this.$confirm("确定下载主播收入分析吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = JSON.parse(JSON.stringify(this.formInline));
          data.startday = data.date.startday;
          data.endday = data.date.endday;
          delete data.date;
          exportAllExcel(data).then((xhrData) => {
            let {data,code}=xhrData
            if (code === 0&&typeof data==='object') {
              data.forEach((item) => {
                item.gender = item.gender === "1" ? "男" : "女";
              });
              this.exportTable = data;
              setTimeout(() => {
                this.exportExcel();
              }, 0);
            }else{
              this.$message.error("没有可导出的数据")
            }
          });
        })
        .catch(() => {});
    },
    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/Excel/Export2Excel"); //注意这个Export2Excel路径
        // const tHeader = ["序号", "昵称", "姓名"]; // 上面设置Excel的表格第一行的标题
        const tHeader = [
          "用户ID",
          "用户昵称",
          "性别",
          "年龄",
          "备注",
          "积分收入",
          "消息收入",
          "通话收入",
          "视频收入",
          "礼物收入",
          "夜间收入",
          "在线时长",
          "通话时长",
          "有效通话",
          "被叫次数",
          "接通率"
        ]; // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "userid",
          "nickname",
          "gender",
          "age",
          "remark",
          "zs_income",
          "msg_income",
          "cdr_income",
          "video_income",
          "gift_income",
          "night_income",
          "online_time",
          "cdr_time",
          "cdr_valid_num",
          "cdr_called_num",
          "cdr_called_rate"
        ]; // 上面的index、nickName、name是tableData里对象的属性key值
        // const list = this.tableData; //把要导出的数据tableData存到list
        const data = this.formatJson(filterVal, this.exportTable);
        export_json_to_excel(tHeader, data, "列表excel"); //最后一个是表名字
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>
<style>
/* 修改变更按钮 */
/* .el-button--primary {
  background-color: #ef8200 !important;
  border: 1px solid #ce7000;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
} */
/* 修改关闭按钮 */
/* .el-button--default {
  background-color: #f1f2f3;
  border: 1px solid #cacbcc;
  font-size: 14px;
  font-weight: bold;
} */
/* 修改变更鼠标经过 */
/* .el-button--primary:hover {
  border: 1px solid #ce7000;
} */
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