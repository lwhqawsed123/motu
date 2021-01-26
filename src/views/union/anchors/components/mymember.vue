<template>
  <el-dialog @close="resetForm('form')" title="修改信息" :visible.sync="dialog" width="500px" custom-class="common-dialog">
    <el-form
      :rules="rules"
      :model="form"
      label-width="120px"
      label-position="right"
      ref="form"
      :close-on-click-modal="false"
    >
      <!-- <el-form-item prop="group_rate">
        <span slot="label">
          <span>公会分成(%)</span>
          <el-popover
            placement="top-start"
            width="100px"
            trigger="hover"
            content="公会分成必须为0-99的整数,且公会分成与成员分成合计必须为100"
          >
            <span slot="reference" class="el-icon-question" style="cursor:pointer "></span>
          </el-popover>
        </span>
        <el-input v-model.number="form.group_rate" maxlength="10" @change="group_rateChange"></el-input>
      </el-form-item> -->
      <!-- <el-form-item prop="member_rate">
        <span slot="label">
          <span>成员分成(%)</span>
          <el-popover
            placement="top-start"
            width="100px"
            trigger="hover"
            content="成员分成必须为0-99的整数,且公会分成与成员分成合计必须为100"
          >
            <span slot="reference" class="el-icon-question" style="cursor:pointer "></span>
          </el-popover>
        </span>
        <el-input v-model.number="form.member_rate" maxlength="10" @change="member_rateChange"></el-input>
      </el-form-item> -->
      <el-form-item label="自主提现" prop="withdraw_enable">
        <el-checkbox v-model="form.withdraw_enable" true-label="1" false-label="0">允许</el-checkbox>
      </el-form-item>
      <el-form-item label="公会备注" prop="memo">
        <el-input
          type="textarea"
          v-model="form.memo"
          maxlength="255"
          row="3"
          resize="none"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="owner-dialog-footer">
      <el-button @click="resetForm('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getmymember, updatemymember } from "@/api/union/anchors/list.js";
export default {
  name: "",
  props: ["mymemberData"],
  data() {
    const reg = /^(?:[1-9]?\d|100)$/;
    const group_rate_validate = (rule, value, callback) => {
      if (value===''||value===undefined||value===null) {
        callback(new Error("公会分成不能为空"));
      }
      if (!reg.test(value)) {
        callback(new Error("必须为0-99之间的整数"));
      } else if (+value + +this.form.member_rate !== 100) {
        callback(new Error("公会分成 + 成员分成 合计必须为100"));
      } else {
        callback();
      }
    };
    const member_rate_validate = (rule, value, callback) => {
      if (value===''||value===undefined||value===null) {
        callback(new Error("公会分成不能为空"));
      }
      if (!reg.test(value)) {
        callback(new Error("必须为0-99之间的整数"));
      } else if (+value + +this.form.group_rate !== 100) {
        callback(new Error("公会分成 + 成员分成 合计必须为100"));
      } else {
        callback();
      }
    };
    return {
      dialog: false,
      form: {
        userid: "",
        group_rate: "",
        member_rate: "",
        withdraw_enable: "",
        memo: ""
      },
      rules: {
        group_rate: [
          { required: true, validator: group_rate_validate, trigger: "blur" }
        ],
        member_rate: [
          { required: true, validator: member_rate_validate, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getInfo(this.mymemberData.id);
  },
  watch: {
    mymemberData: {
      handler: function(val, oldVal) {
        if (val.id) {
          this.getInfo(val.id);
        }
      },
      deep: true
    }
  },
  methods: {
    getInfo(id) {
      let data = {
        userid: id
      };
      getmymember(data).then(res => {
        if (res.code === 0) {
          this.form = res.data;

          this.dialog = true;
        }
      });
    },
    // 提交编辑
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            userid: this.form.userid,
            group_rate: this.form.group_rate,
            member_rate: this.form.member_rate,
            withdraw_enable: this.form.withdraw_enable,
            memo: this.form.memo
          };

          console.log(data);
          // return false;
          updatemymember(data).then(res => {
            if (res.code === 0) {
              this.$message.success(res.info);
              this.$refs[formName].resetFields();
              // this.getOnlineList();
              this.$emit("getOnlineList");
              this.dialog = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialog = false;
    },
    group_rateChange(val) {
       if (val) {
          this.form.member_rate = (10000 - +val * 100) / 100;
        } else {
          this.form.member_rate = 100;
        }
    },
    member_rateChange(val) {
       if (val) {
          this.form.group_rate = (10000 - +val * 100) / 100;
        } else {
          this.form.group_rate = 100;
        }
    }
  }
};
</script>
<style lang='' scoped>
</style>