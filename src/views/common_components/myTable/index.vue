<template>
  <div>
    <my-pagination
      :total="totalNum"
      :page.sync="formInline.pageNum"
      :limit.sync="formInline.pageSize"
      :ext_stat="ext_stat"
      @pagination="pagination"
      :date="formInline.date"
      :onTop="true"
      :hasclass="'pagination-class'"
      :noPrev="noPrev"
    />
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :ref="tableRef"
      :row-key="row_key"
      :stripe="stripe"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <slot></slot>
    </el-table>
    <my-pagination
      :total="totalNum"
      :page.sync="formInline.pageNum"
      :limit.sync="formInline.pageSize"
      @pagination="pagination"
      :date="formInline.date"
      :onTop="true"
      :noPrev="noPrev"
    />
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    formInline: {
      type: Object,
      default: function () {
        return {};
      },
    },
    tableRef: {
      // 插槽
      type: String,
      default: "table",
    },
    ext_stat: {
      // 插槽
      type: String,
      default: "",
    },
    row_key: {
      type: String,
    },
    stripe: {
      // 表格行是否为斑马纹
      type: Boolean,
      default: false,
    },
    totalNum: {
      required: true,
      type: Number,
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    getOnlineList: {
      type: Function,
      default: function () {},
    },
    noPrev:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {};
  },
  methods: {
    pagination() {
      this.$emit("getOnlineList");
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    // 表格排序方式变化
    sortChange({ column, prop, order }) {
      // prop : 字段名; order : 排序方式
      if (order) {
        this.formInline.orderByColumn = prop;
      } else {
        this.formInline.orderByColumn = "id";
      }
      let orderBy = "desc";
      if (order === "ascending") {
        orderBy = "asc";
      }
      this.formInline.isAsc = orderBy;
      this.pagination();
    },
    // 清除多选
    handClearSelection() {
      this.$refs[this.tableRef].clearSelection();
    },
  },
};
</script>
<style lang='' scoped>
</style>