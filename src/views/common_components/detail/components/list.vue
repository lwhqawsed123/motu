<template>
  <div>
    <el-table ref="multipleTable" :data="data" tooltip-effect="dark" style="width: 100%">
      <el-table-column show-overflow-tooltip min-width="120px">
        <template slot="header">
          <span>性别/昵称/年龄</span>
          <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
            <i class="el-icon-question icon-color"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <div class="anchor-info cursor">
            <div class="profile-box">
              <img :src="scope.row.avatar" alt class="profile" />
            </div>
            <div class="anchor-name">
              <span class="visitor-info-name">
                <span class="iconfont icon-nan icon-gender-men" v-if="scope.row.gender==='1'"></span>
                <span class="iconfont icon-nv icon-gender-women" v-else></span>
                {{scope.row.nickname}}
                <el-tag size="mini" effect="plain" v-if="scope.row.gender==='1'">{{scope.row.age}}</el-tag>
                <el-tag size="mini" effect="plain" type="danger" v-else>{{scope.row.age}}</el-tag>
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" min-width="80" label="ID"></el-table-column>
      <el-table-column min-width="170" label="平台/版本/终端">
        <template slot="header">
          <span>平台/版本/终端</span>
          <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
            <i class="el-icon-question icon-color"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{scope.row.platform}}</span>
          <br v-if="scope.row.version" />
          <span v-if="scope.row.version">{{scope.row.version+"("+scope.row.build+")"}}</span>
          <br />
          <span>{{scope.row.branchs}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="130" label="包名/渠道">
        <template slot="header">
          <span>包名/渠道</span>
          <el-tooltip class="item" effect="dark" content="提示文字" placement="top">
            <i class="el-icon-question icon-color"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{scope.row.client_id}}</span>
          <br />
          <span>{{scope.row.client_id}}</span>
          <br />
          <span>{{scope.row.channel}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="registertime"
        label="注册时间"
        min-width="130"
      >
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.registertime)}}</span>
          <br />
          <span>{{scope.row.registerip}}</span>
          <br />
          <span>{{scope.row.location_registerip}}</span>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="lastlogintime"
        label="最近登陆"
        min-width="130"
      >
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.lastlogintime)}}</span>
          <br />
          <span>{{scope.row.lastloginip}}</span>
          <br />
          <span>{{scope.row.location_lastloginip}}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==='1'">正常</span>
          <span v-else-if="scope.row.status==='2'">禁用</span>
          <span v-else>{{scope.row.status}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["data"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.anchor-info {
    text-align: center;
    padding-top: 3px;

    .profile-box {
      margin: 0 auto;
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 5px;

      .profile {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }

      .profile-status {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #ffffff;
        background-color: #dcdcdc;
        position: absolute;
        top: -3px;
        right: -3px;
        box-sizing: border-box;
      }

      .outline {
        background-color: #9acd32;
      }
    }

    .anchor-name {
      display: flex;
      justify-content: center;

      .icon-gender-men {
        color: #9acd32;
      }

      .icon-gender-women {
        color: #eead97;
      }

      .visitor-info-name {
        color: #fe0b0e;
        display: inline-block;
        word-break: break-all;
        text-align: center;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        // display: -webkit-box;
        /*自适应盒子*/
        -webkit-line-clamp: 1;
        /*此处为1行,如果是两行就改成2*/
        -webkit-box-orient: vertical;
      }

      .maikefeng {
        color: #ff69b4;
      }

      .is-not-liveing {
        color: #cccccc;
      }
    }
  }
</style>