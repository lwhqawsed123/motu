<template>
  <!-- <div :class="{'hidden':hidden}" class="pagination-container"> -->
  <div class="pagination-container" :class="{'position':onTop}">
    <p class="ext_stat" v-if="ext_stat">{{ext_stat.substr(1)}}</p>
    <el-pagination
      :background="background"
      :current-page="page"
      :page-size.sync="limit"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
      @current-change="handleCurrentChange"
      :class="hasclass"
    >
      <span>
        <span class="pagination-total">{{'共 '+total +' 条'}}</span>
        <el-button name="prev" type="info" plain @click="handlePrev('prev')"
        v-if="!noPrev">前一天</el-button>
        <el-button
          name="next"
          type="info"
          style="margin-right:10px"
          plain
          @click="handlePrev('next')"
          v-if="!noPrev"
        >后一天</el-button>
      </span>
    </el-pagination>
  </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "mypagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      // default: "slot,total,prev,pager,next,jumper",
      default: "slot,prev,pager,next,jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    ext_stat: {
      // 插槽
      type: String,
      default: null,
    },
    date: {
      // 插槽
      type: Object,
      default: function () {
        return {};
      },
    },
    // 是否绝对定位
    onTop: {
      type: Boolean,
      default: false,
    },
    hasclass: {
      // 插槽
      type: String,
      default: "",
    },
    // 是否不显示前一天后一天,默认显示 false ,如果不显示 true
    noPrev:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("update:page", val); // 修改父组件传递的page值
      this.$emit("pagination", { page: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handlePrev(value) {
      // 设置前一天/后一天
      this.prevDate(this.date, value);
      this.$emit("pagination");
    },
  },
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  /* padding: 32px 16px; */
  position: absolute;
  bottom: 30px;
  left: 20px;
  right: 0;
  padding-top: 10px;
}
.ext_stat {
  display: block;
  width: 100%;
  /* white-space: pre-wrap; */
  word-break: break-all;
  font-size: 13px;
  color: #606266;
  font-weight: normal;
}
.pagination-container.hidden {
  display: none;
}
.pagination-container.position {
  position: relative;
  bottom: unset;
  left: unset;
  right: unset;
  margin: 5px 0;
  padding: 5px 0 5px 20px;
  background-color: #faf9f9;
}
.pagination-container {
  overflow: hidden;
}
</style>
<style lang="scss">
.pagination-container {
  .el-pagination {
  overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    padding-left: 45px;
    padding-right: 5px;
    position: relative;
    .el-pagination__total,
.btn-prev,
.el-pager,
.btn-next,
.el-pagination__jump{
   margin-top: 2px;
    margin-bottom: 2px;
}
  }
  .pagination-total{
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    box-sizing: border-box;
    margin-right: 10px;
    font-weight: normal;
    color: #606266;
    position: absolute;
    left: 0;
    top: 3px;
  }
  
}
</style>
