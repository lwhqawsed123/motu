<template>
  <!-- 家财凭证管理 -->
  <div class="record">
    <div class="record-conter">
      <el-row :gutter="20" class="record-top" style="margin-left: 0px; margin-right: 0px;">
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="注册日期：">
              <!-- <el-date-picker
                v-model="formInline.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00','23:59:59']"
                :clearable="false"
                size="mini"
                style="width:330px"
                @change="onSubmit"
              ></el-date-picker>-->
              <dateTimePicker
                v-if="formInline.date.startday"
                :date="formInline.date"
                @onSubmit="onSubmit"
              ></dateTimePicker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="mini">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="warning"
                plain
                icon="el-icon-d-arrow-left"
                @click="back"
                size="mini"
              >返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        row-key="id"
      >
        <el-table-column prop="id" min-width="50" label="ID"></el-table-column>
        <el-table-column show-overflow-tooltip min-width="80px" label="封面">
          <template slot-scope="scope">
            <div class="anchor-info cursor">
              <div class="profile-box" style="margin-bottom:3px">
                <img :src="baseImageUrl+scope.row.pic" alt class="profile" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip min-width="120px" prop="listname" label="直播间主题">
          <template slot-scope="scope">{{scope.row.listname?scope.row.listname:'无标题'}}</template>
        </el-table-column>
        <el-table-column prop="giftnum_taday" label="本场收到礼物数"></el-table-column>
        <el-table-column prop="jifen" label="本场贝壳收益"></el-table-column>
        <el-table-column prop="xingguang" label="本场星光值收益"></el-table-column>
        <el-table-column prop="follownum" label="本场新增粉丝"></el-table-column>
        <el-table-column prop="timelong" label="本场有效直播时长"></el-table-column>
        <el-table-column prop="usernum" label="本场累计有效观众"></el-table-column>
        <el-table-column prop="usernum" label="被分享次数"></el-table-column>
      </el-table>
      <my-pagination
        v-show="totalNum>0"
        :total="totalNum"
        :page.sync="formInline.pageNum"
        :limit.sync="formInline.pageSize"
        :ext_stat="ext_stat"
        @pagination="getOnlineList"
      />
    </div>
  </div>
</template>

<script>
import { list } from "@/api/organization/unions/see.js";
import { baseImageUrl } from "@/utils/options/common.js";
import { preMonthToToday } from "@/utils/common";
export default {
  name: "Unions_see",
  props: ["obj"],
  data() {
    return {
      // 总条数
      totalNum: 0,
      ext_stat: "",
      // 查询数据
      formInline: {
        date: {
          startday: "",
          endday: "",
        }, // 日期
        // 排序列
        // orderByColumn: "id",
        // 排序方式
        // isAsc: "desc",
        // 当前显示条数
        pageSize: 20,
        // 当前显示页数
        pageNum: 1,
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
    };
  },
  created() {
    // 获取默认开始时间和结束时间
    this.formInline.date.startday = preMonthToToday()[0];
    this.formInline.date.endday = preMonthToToday()[1];
    // 调用 获取列表 方法
    this.getOnlineList();
  },
  methods: {
    // 查看
    back() {
      const obj = {
        id: this.obj.id,
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