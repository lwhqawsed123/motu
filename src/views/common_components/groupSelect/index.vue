<template>
  <el-select
    @change="change"
    clearable
    v-model="formInline.groupid"
    placeholder="请选择"
    size="mini"
    style="width:150px"
  >
    <el-option
      v-for="(item,index) in $store.state.group.groupOptions"
      :key="index"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
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
    }
  },
  data() {
    return {
    };
  },

  methods: {
    change() {
      this.$emit("onSubmit");
    },
  },

  watch: {},
};
</script>
<style lang="scss">
</style>