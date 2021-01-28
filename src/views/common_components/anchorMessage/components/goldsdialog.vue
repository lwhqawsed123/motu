<template>
  <el-dialog
    id="golds-dialog"
    width="600px"
    :visible.sync="dialog"
    title="金币"
    custom-class="common-dialog"
    @close="resetForm('form')"
    append-to-body
  >
    <el-form
      :rules="rules"
      :model="form"
      label-position="left"
      ref="form"
      @submit.native.prevent
    >
      <el-form-item label="金币池余额">
        {{ gold_pool_total }}
      </el-form-item>
      <el-form-item label="用户余额">
        {{ user.gold }}
      </el-form-item>
      <el-form-item label="修改金币" prop="number">
        <el-input-number
          size="small"
          v-model.number="form.number"
          @change="handleChange"
          :min="0"
          :max="999999999"
          :precision="0"
          :step="1"
          placeholder="金币数量"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          resize="none"
          :rows="2"
          v-model="form.memo"
          maxlength="200"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.stop="resetForm('form')">取 消</el-button>
      <el-button type="danger" @click.stop="submitForm('form')"
        >修 改</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import {
  get_group_gold_pool,
  update_gold_pool_reduce,
} from "@/api/union/anchors/list.js";
export default {
  props: ["user"],
  data() {
    return {
      dialog: false,
      form: {
        group_id: "", // 公会id
        to_userid: "", // 用户id
        number: 0, // 金币数量
        memo: "", // 备注
      },
      gold_pool_total: 0,
      rules: {
        // 金币数量
        number: [{ required: true, message: "请输入金币", trigger: "blur" }],
      },
    };
  },
  methods: {
    open() {
      let data = {
        group_id: this.$store.state.user.groupInfo.id,
      };
      get_group_gold_pool(data).then((res) => {
        let { code, gold_pool_total } = res;
        if (res && code === 0) {
          this.gold_pool_total = gold_pool_total;
          this.dialog = true;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialog = false;
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            number: this.form.number,
            memo: this.form.memo,
          };
          console.log(this.$store.state.user.groupInfo);
          if (
            !this.$store.state.user.groupInfo ||
            !this.$store.state.user.groupInfo.id
          ) {
            this.$message.error("当前登陆用户没有创建公会,请先创建公会!");
            return false;
          }
          data.group_id = this.$store.state.user.groupInfo.id;
          data.to_userid = this.user.userid;
          update_gold_pool_reduce(data).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.info);
              this.$refs[formName].resetFields();
              this.dialog = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 增减金币
    handleChange() {},
  },
};
</script>

<style scoped>
.el-input-number--small {
  line-height: 24px;
}
</style>