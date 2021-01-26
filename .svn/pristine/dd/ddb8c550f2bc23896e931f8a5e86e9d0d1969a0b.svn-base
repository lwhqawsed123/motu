<template>
  <el-dialog @close="resetForm('form')" title="绑定主播到公会" :visible.sync="dialog" width="500px" custom-class="common-dialog">
    <el-form
      :rules="rules"
      :model="form"
      label-width="80px"
      label-position="right"
      ref="form"
      :close-on-click-modal="false"
    >
      <el-form-item label="主播手机" prop="mobile">
        <el-input v-model="form.mobile" maxlength="11" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code"></el-form-item>
    </el-form>
    <div slot="footer" class="owner-dialog-footer">
      <el-button @click="resetForm('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getmymember } from "@/api/union/anchors/list.js";
export default {
  name: "",
  props: ["id"],
  data() {
    return {
      dialog: false,
      form: {},
      rules: []
    };
  },
  created() {
    this.getInfo(this.id);
  },
  methods: {
    getInfo(id) {
      getmymember(id).then(res => {
        if (res.code === 0) {
          this.form = res.data;
        }
      });
    },
    submitForm(formName){

    },
    resetForm(formName){

    },

  },

  watch: {
    id: {
      handler: function(val, oldVal) {
        if (val) {
          this.getInfo(val);
        }
      }
    }
  }
};
</script>
<style lang='' scoped>
</style>