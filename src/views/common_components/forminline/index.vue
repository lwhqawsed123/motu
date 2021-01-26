<template>
  <el-row :gutter="20" class="record-top" style="margin-left: 0px; margin-right: 0px;">
    <el-col :span="24">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item :label="item.label" v-for="(item,index) in formList.fromItem" :key="index">
          <el-select
            @change="submit"
            v-model="formInline[item.value]"
            :placeholder="item.placeholder||'请选择'"
            :clearable="item.clearable===false?false:true"
            :style="item.style||'width:120px'"
            :size="item.size||size"
            v-if="item.type==='select'"
          >
            <el-option
              v-for="(optionItem,optionItemIndex) in item.options"
              :key="optionItemIndex"
              :label="optionItem.label"
              :value="optionItem.value"
            ></el-option>
          </el-select>
          <el-input
            v-model.trim="formInline[item.value]"
            @keyup.enter.native="submit"
            @clear="submit"
            :placeholder="item.placeholder||''"
            :clearable="item.clearable===false?false:true"
            :style="item.style||'width:80px'"
            :size="item.size||size"
            v-if="item.type==='input'"
          ></el-input>
          <dateTimePicker
            v-if="item.type==='dateTimePicker'"
            :date="formInline[item.value]"
            @submit="submit"
          ></dateTimePicker>
        </el-form-item>
        <el-form-item v-for="(item1) in formList.buttons" :key="item1.type">
          <el-button
            :type="item1.type||'primary'"
            :icon="item1.icon||'el-icon-search'"
            @click="parentEvent(item1.event)||submit"
            :size="item1.size||size"
          >
            {{item1.value||'查询'}}
            <span :class="item1.iconRight" v-if="item1.iconRight"></span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "",
  props: {
    formInline: {
      type: Object,
      default: function() {
        return {};
      }
    },
    formList: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      size: "mini"
    };
  },

  methods: {
    submit() {
        console.log(123);
      this.$emit("onSubmit");
    },
    parentEvent(eventName) {
      this.$emit(eventName);
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.record-top {
      margin-left: 0;
      margin-right: 0;
      min-height: 60px;
      padding-bottom: 10px;
      border-bottom: 1px solid #d6d6d6;

      .el-form--inline .el-form-item {
        margin-top: 10px;
        margin-bottom: 0;

        .el-input {
          width: 140px;
        }
      }
    }
</style>