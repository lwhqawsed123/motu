<template>
  <!-- 主播获利监控 -->
  <div class="record">
    <div class="record-conter">
      <el-row :gutter="20" class="record-top" style="margin-left: 0px; margin-right: 0px;">
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
             <el-form-item label="公会：">
             <group-select :formInline="formInline" @onSubmit="onSubmit"></group-select>
            </el-form-item>
            <el-form-item label="日期：">
              <dateTimePicker
                v-if="formInline.date.startday"
                :date="formInline.date"
                @onSubmit="onSubmit"
              ></dateTimePicker>
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
        <!-- <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        row-key="id"
        @sort-change="sortChange"
        >-->
        <el-table-column type="index" min-width="50" label="编号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="group_name" label="公会" min-width="100px"></el-table-column>
        <!-- 用户信息 -->
        <el-table-column label="头像" show-overflow-tooltip min-width="60px">
          <!-- <template slot="header">
            <span>头像</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
          <template slot-scope="scope">
           <info-popover v-if="scope.row.userid" :userid="scope.row.userid" :avatar="scope.row.avatar" :status="scope.row.status"></info-popover>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip min-width="120px" label="昵称/ID">
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
        <el-table-column
          prop="incomes"
          sortable="custom"
          show-overflow-tooltip
          min-width="120px"
          label="获得贝壳"
        ></el-table-column>
        <el-table-column
          prop="income_users"
          sortable="custom"
          show-overflow-tooltip
          min-width="120px"
          label="贡献用户数"
        ></el-table-column>
        <el-table-column
          prop="income_avg"
          sortable="custom"
          show-overflow-tooltip
          min-width="120px"
          label="平均贡献"
        ></el-table-column>
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
    <el-detail v-if="userDetail.userid" :userDetail="userDetail"></el-detail>
  </div>
</template>

<script>
import { list } from "@/api/union/incomeSupervise/list.js";
import infoPopover from "@/views/common_components/infoPopover/infoPopover.vue";
export default {
  name: "record",
  components:{
    infoPopover
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
    };
  },
  created() {
    // 获取默认开始时间和结束时间
    this.formInline.date.startday = this.getDateNow()[0];
    this.formInline.date.endday = this.getDateNow()[1];
    // 调用 获取在线委托列表 方法
    this.getOnlineList();
    // 获取物业公司列表
    // this.getAllCompany();
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
    //  打开查看
    openDetail(id) {
      this.userDetail.timestamp = new Date().getTime();
      this.userDetail.userid = id;
    },
  },
};
</script>
<style>

</style>
<style lang="scss" scoped>
@import "@/assets/styles/scss/list.scss";
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