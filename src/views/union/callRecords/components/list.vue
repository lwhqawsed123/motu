<template>
  <!-- 家财凭证管理 -->
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
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00','23:59:59']"
                size="mini"
                :clearable="false"
                style="width:330px"
                @change="onSubmit"
              ></el-date-picker>-->
              <dateTimePicker
                v-if="formInline.date.startday"
                :date="formInline.date"
                @onSubmit="onSubmit"
              ></dateTimePicker>
            </el-form-item>
            <!-- 主叫 -->
            <el-form-item label="主叫：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.f_gender"
                placeholder="性别"
                style="width:85px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in gengerOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.caller_platform"
                placeholder="平台"
                style="width:85px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in platformOptions1"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-model.trim="formInline.f_username"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入短ID"
                clearable
                size="mini"
                maxlength="200"
              ></el-input>
            </el-form-item>
            <!-- 被叫 -->
            <el-form-item label="被叫：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.t_gender"
                placeholder="性别"
                style="width:85px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in gengerOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.called_platform"
                placeholder="平台"
                style="width:85px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in platformOptions1"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-model.trim="formInline.t_username"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="请输入短ID"
                clearable
                size="mini"
                maxlength="200"
              ></el-input>
            </el-form-item>
            <el-form-item label="通话状态：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.status"
                placeholder="不限"
                size="mini"
                style="width:120px"
              >
                <el-option
                  v-for="(item,index) in callStatusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收费类型：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.charge_type"
                placeholder="不限"
                size="mini"
                style="width:120px"
              >
                <el-option
                  v-for="(item,index) in chargeTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="挂断原因：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.hangup"
                placeholder="不限"
                style="width:120px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in hangupOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="呼叫类型：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.type"
                placeholder="不限"
                style="width:120px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in callTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="费率：">
              <el-select
                @change="onSubmit"
                clearable
                v-model="formInline.feerate"
                placeholder="不限"
                style="width:120px"
                size="mini"
              >
                <el-option
                  v-for="(item,index) in feerateOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="通话时长：">
              <el-input
                v-model.trim="formInline.duration1"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="最少(秒)"
                clearable
                size="mini"
                style="width:90px"
              ></el-input>
              <span>-</span>
              <el-input
                v-model.trim="formInline.duration2"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="最多(秒)"
                clearable
                size="mini"
                style="width:90px"
              ></el-input>
            </el-form-item>
            <el-form-item label="金币：">
              <el-input
                v-model.trim="formInline.gold2"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="最少"
                clearable
                size="mini"
                style="width:80px"
              ></el-input>
              <span>-</span>
              <el-input
                v-model.trim="formInline.gold1"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="最多"
                clearable
                size="mini"
                style="width:80px"
              ></el-input>
            </el-form-item>
            <el-form-item label="积分：">
              <el-input
                v-model.trim="formInline.jifen1"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="最少"
                clearable
                size="mini"
                style="width:80px"
              ></el-input>
              <span>-</span>
              <el-input
                v-model.trim="formInline.jifen2"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="最多"
                clearable
                size="mini"
                style="width:80px"
              ></el-input>
            </el-form-item>
            <el-form-item label="话单ID：">
              <el-input
                v-model.trim="formInline.channelId"
                @keyup.enter.native="onSubmit"
                @clear="onSubmit"
                placeholder="话单ID"
                clearable
                size="mini"
                style="width:120px"
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
        :row-key="'channelId'"
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
        <el-table-column type="index" min-width="30px" label="编号"></el-table-column>
        <!-- 主叫信息 -->
        <!-- 用户信息 -->
        <el-table-column label="主叫"  min-width="50px">
          <!-- <template slot="header">
            <span>主叫</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
          <template slot-scope="scope">
            <info-popover :userid="scope.row.caller_userid" :avatar="scope.row.f_avatar"></info-popover>
          </template>
        </el-table-column>
        <el-table-column  min-width="100px" label="昵称/ID">
          <template slot-scope="scope">
            <span class="visitor-info-name" title="用户昵称">{{scope.row.f_nickname}}</span>
            <br />
            <span
              class="gender-men"
              :class="scope.row.caller_gender==='1'?'':'gender-women'"
            >{{scope.row.f_age}}</span>
            <span
              class="el-icon-video-camera-solid verify_status"
              title="视频认证"
              v-if="scope.row.f_verify_status==='1'"
            ></span>
            <span title="短ID">{{scope.row.f_username}}</span>
            <br />
            <span title="用户ID">{{scope.row.caller_userid}}</span>
          </template>
        </el-table-column>
        <!-- 用户信息结束 -->
        <!-- 被叫用户信息 -->
        <el-table-column label="被叫"  min-width="60px">
          <!-- <template slot="header">
            <span>被叫</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template> -->
          <template slot-scope="scope">
            <info-popover :userid="scope.row.called_userid" :avatar="scope.row.t_avatar"></info-popover>
          </template>
        </el-table-column>
        <el-table-column  min-width="100px" label="昵称/ID">
          <template slot-scope="scope">
            <span class="visitor-info-name" title="用户昵称">{{scope.row.t_nickname}}</span>
            <br />
            <span
              class="gender-men"
              :class="scope.row.called_gender==='1'?'':'gender-women'"
            >{{scope.row.t_age}}</span>
            <span
              class="el-icon-video-camera-solid verify_status"
              title="视频认证"
              v-if="scope.row.t_verify_status==='1'"
            ></span>
            <span title="短ID">{{scope.row.t_username}}</span>
            <br />
            <span title="用户ID">{{scope.row.called_userid}}</span>
          </template>
        </el-table-column>
        <!-- 用户信息结束 -->

        <el-table-column  prop="charge_type" min-width="60px" label="收费类型">
          <!-- <template slot="header">
            <span>收费类型</span>
            <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
              <i class="el-icon-question icon-color"></i>
            </el-tooltip>
          </template>-->
          <template slot-scope="scope">
            <!-- 左箭头右箭头 -->
            <!-- <span class="el-icon-right icon-size icon-right-color" v-if="1"></span>
            <span class="el-icon-back icon-size" v-else></span>-->
            {{myFilter(scope.row.charge_type,chargeTypeOptions)}}
          </template>
        </el-table-column>
        <el-table-column  prop="status" min-width="60px" label="话单状态">
           <template slot="header">
            <span>话单状态</span>
            <br>
            <span>挂断原因</span>
          </template>
          <template
            slot-scope="scope"
          >
          <span>{{myFilter(scope.row.status,callStatusOptions)}}</span>
          <br>
          <span>{{myFilter(scope.row.hangup,hangupOptions)}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column  prop="hangup" min-width="60px" label="挂断原因">
          <template
            slot-scope="scope"
          ></template>
        </el-table-column> -->
        <el-table-column  prop="ring_duration" min-width="40px" label="响铃"></el-table-column>
        <el-table-column  prop="duration" min-width="40px" label="通话"></el-table-column>
        <el-table-column  prop="feerate" min-width="50px" label="费率"></el-table-column>
        <el-table-column  prop="gold" min-width="50px" label="金币"></el-table-column>
        <el-table-column  prop="jifen" min-width="50px" label="积分"></el-table-column>
        <!-- <el-table-column  label="截图">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-picture"
              type="primary"
              plain
              size="mini"
              title="截图"
              v-if="scope.row.duration > 0"
              @click="openPicture(scope.row)"
            ></el-button>
          </template>
        </el-table-column>-->
        <el-table-column  prop="channelId" min-width="50px" label="话单ID" ></el-table-column>
        <el-table-column  min-width="65px" label="时间">
          <template slot-scope="scope">{{parseTime(scope.row.dateline)}}</template>
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-view"
              size="mini"
              title="查看详情"
              @click="openOrder(scope.row.id)"
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
    <!-- 用户详情组件 -->
    <detail v-if="userDetail.userid" :userDetail="userDetail"></detail>
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
          <tr v-for="(item,index) in orderDetail.tableColumns" :key="index">
            <td width="30%">{{orderDetail.columns[item]?orderDetail.columns[item].label:''}}</td>
            <td width="70%">
              <span v-if="item==='dateline'">{{parseTime(orderDetail.orderForm[item])}}</span>
              <span v-else>{{orderDetail.orderForm[item]}}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="footer">
        <el-button @click="orderDetail.orderDialog=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 截图弹框 -->
    <el-dialog
      title="查看详情"
      :visible.sync="pictureDetail.pictureDialog"
      width="670px"
      custom-class="picture-box-dialog"
    >
      <div class="picture-box">
        <div class="picture-item" v-for="(item,index) in pictureDetail.items" :key="index">
          <div class="picture-title">
            <div class="picture-user">
              <span
                class="picture-user-id cursor"
                @click="openDetail(item.userid)"
              >{{item.username}}</span>
              <span
                class="picture-user-nickname cursor"
                @click="openDetail(item.userid)"
              >{{item.nickname}}-</span>
            </div>
            <div class="picture-dateline">
              <span>{{parseTime(item.dateline)}}</span>
            </div>
          </div>
          <div class="picture-image-box">
            <el-image
              style="width: 100%; height: 100%"
              :src="baseImageUrl+item.screenshot"
              :previewSrcList="pictureDetail.previewSrcList"
              fit="contain"
            ></el-image>
          </div>
          <div class="picture-pass">
            <span>{{item.suggestion}}</span>
            <span>{{item.rate}}</span>
          </div>
        </div>
        <!-- <el-pagination
          @current-change="pictureHandleCurrentChange"
          :current-page="pictureDetail.pageNum"
          :page-size="pictureDetail.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pictureDetail.totalNum"
          class="picture-pagination"
        ></el-pagination>-->
        <my-pagination
          v-show="pictureDetail.totalNum>0"
          :total="pictureDetail.totalNum"
          :page.sync="pictureDetail.pageNum"
          :limit.sync="pictureDetail.pageSize"
          :ext_stat="pictureDetail.ext_stat"
          @pagination="getPicture"
        />
      </div>
      <div slot="footer">
        <el-button @click="pictureDetail.pictureDialog=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  list,
  get_by_id,
  get_picture_by_id,
} from "@/api/union/callRecords/list.js";
import {
  gengerOptions,
  platformOptions1,
  baseImageUrl,
} from "@/utils/options/common.js";
import {
  chargeTypeOptions,
  callStatusOptions,
  hangupOptions,
  callTypeOptions,
  feerateOptions,
} from "@/utils/options/callRecords.js";
import chattingRecords from "./chattingRecords.vue";
import detail from "@/views/common_components/detail/detail.vue";
import infoPopover from "@/views/common_components/infoPopover/infoPopover.vue";
export default {
  name: "record",
  components: {
    chattingRecords,
    detail,
    infoPopover
  },
  data() {
    return {
      gengerOptions,
      platformOptions1,
      chargeTypeOptions,
      callStatusOptions,
      hangupOptions,
      callTypeOptions,
      feerateOptions,
      baseImageUrl,
      // 总条数
      totalNum: 0,
      // 分页统计
      ext_stat: "",
      // 查询数据
      formInline: {
        groupid: this.$store.state.user.groupInfo.id,
        date: {
          startday: "",
          endday: "",
        }, // 日期
        f_gender: "",
        caller_platform: "",
        f_username: "",
        t_gender: "",
        called_platform: "",
        t_username: "",
        status: "",
        charge_type: "",
        hangup: "",
        type: "",
        feerate: "",
        duration1: "",
        duration2: "",
        gold2: "",
        gold1: "",
        jifen1: "",
        jifen2: "",
        channelId: "",
        // 排序列
        // orderByColumn: "id",
        // 排序方式
        // isAsc: "desc",
        // 当前显示条数
        pageSize: 20,
        // 当前显示页数
        pageNum: 1,
      },
      // 表格数据
      tableData: [],
      // 查看详情弹框
      orderDetail: {
        orderForm: {},
        columns: {},
        orderDialog: false,
        tableColumns: [
          "id",
          "caller_userid",
          "called_userid",
          "duration",
          "channelId",
          "members",
          "status",
          "hangup",
          "charge_type",
          "type",
          "caller_platform",
          "called_platform",
          "dateline",
        ],
      },
      // ====用户详情弹框=====
      userDetail: {
        timestamp: "",
        userid: "",
      },
      // ======截图=======
      pictureDetail: {
        channelId: "",
        items: [],
        previewSrcList: [],
        pictureDialog: false,
        pageSize: 20,
        pageNum: 1,
        offset: 0,
        totalNum: 0,
        ext_stat: "",
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
  watch: {
    $route: {
      handler: function (route) {
        // 获取路由跳转的参数
        this.formInline.f_username = route.params.username;
        if (route.params.groupid) {
          console.log(route.params.groupid);
          this.formInline.groupid = route.params.groupid;
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 查看
    see(row) {
      const obj = {
        id: row.id,
        orderNo: row.orderNo,
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
    },
    // 查看截图分页
    pictureHandleCurrentChange(val) {
      // 改变默认的页数
      this.formInline.pageNum = val;
      // 切换页码时，要获取每页显示的条数
      this.getPicture();
    },
    // 打开查看详情
    async openOrder(id) {
      let res = await get_by_id(id);
      if (res && res.code === 0) {
        this.orderDetail.orderForm = res.data.item;
        this.orderDetail.columns = res.data.columns;
        this.orderDetail.orderDialog = true;
      }
    },
    // 查看截图
    openPicture(row) {
      this.pictureDetail.channelId = row.channelId;
      this.$nextTick(() => {
        this.pictureDetail.pictureDialog = true;
      });
      this.getPicture();
    },
    // 获取截图列表
    getPicture() {
      let data = {
        quicksearch: 1,
        channelid: this.pictureDetail.channelId,
        offset: (this.pictureDetail.pageNum - 1) * this.pictureDetail.pageSize,
      };
      get_picture_by_id(data).then((res) => {
        if (res && res.code === 0) {
          this.pictureDetail.items = res.data.items;
          this.pictureDetail.ext_stat = res.data.ext_stat;
          this.pictureDetail.totalNum = +res.data.total_rows;
          this.pictureDetail.previewSrcList = res.data.items.map((item) => {
            return this.baseImageUrl + item.screenshot;
          });
        }
      });
    },
    //  打开查看用户信息
    openDetail(id) {
      this.userDetail.timestamp = new Date().getTime();
      this.userDetail.userid = id;
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
@import "@/assets/styles/scss/table.scss";
@import "@/assets/styles/scss/pictures.scss";
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
.picture-box-dialog {
  max-width: 100%;
}
</style>