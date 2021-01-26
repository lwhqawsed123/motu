<template>
  <div class="my-date-picker">
    <el-date-picker
      v-model="datepick.startday"
      :type="type"
      value-format="yyyy-MM-dd HH:mm:ss"
      :default-time="'00:00:00'"
      style="width:190px"
      :clearable="false"
      size="mini"
      placeholder="开始时间"
      popper-class="picker-popper-class"
      :editable="false"
      @change="dateChange"
    ></el-date-picker>
    <el-date-picker
      v-model="datepick.endday"
      :type="type"
      value-format="yyyy-MM-dd HH:mm:ss"
      :default-time="'23:59:59'"
      style="width:190px"
      :clearable="false"
      size="mini"
      placeholder="结束时间"
      popper-class="picker-popper-class"
      :editable="false"
      @change="dateChange"
    ></el-date-picker>
    <!-- :picker-options="endOptions" -->
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    date: {
      type: Object,
      default: function () {
        return {};
      },
    },
    type:{
      type: String,
      default: "datetime",
    }
  },
  data() {
    return {
      datepick: this.date,
      // 日期禁用项 禁用大于结束日期
      startOptions: {
        disabledDate: false,
      },
      // 日期禁用项 禁用小于开始日期
      endOptions: {
        disabledDate: false,
      },
    };
  },

  components: {},

  computed: {},

  beforeMount() {},
  created() {
    // this.endOptions = {
    //   disabledDate: date => {
    //     if (!this.datepick.startday) {
    //       return false;
    //     } else if (
    //       new Date(date).getTime() ===
    //       new Date(this.datepick.startday).getTime()
    //     ) {
    //       return false;
    //     }
    //     return date.getTime() < new Date(this.datepick.startday).getTime();
    //   }
    // };
    // this.startOptions = {
    //   disabledDate: date => {
    //     if (!this.datepick.endday) {
    //       return false;
    //     } else if (
    //       new Date(date).getTime() === new Date(this.datepick.endday).getTime()
    //     ) {
    //       return false;
    //     }
    //     return date.getTime() > new Date(this.datepick.endday).getTime();
    //   }
    // };
  },
  mounted() {},

  methods: {
    dateChange() {
      this.$emit("onSubmit");
    },
  },

  watch: {
    // ["datepick.startday"](val) {
    //   this.endOptions = {
    //     disabledDate(date) {
    //       if (!val) {
    //         return false;
    //       } else if (new Date(date).getTime() === new Date(val).getTime()) {
    //         return false;
    //       }
    //       return date.getTime() < new Date(val).getTime();
    //     }
    //   };
    // },
    // ["datepick.endday"](val) {
    //   this.startOptions = {
    //     disabledDate(date) {
    //       if (!val) {
    //         return false;
    //       } else if (new Date(date).getTime() === new Date(val).getTime()) {
    //         return false;
    //       }
    //       return date.getTime() > new Date(val).getTime();
    //     }
    //   };
    // }
  },
};
</script>
<style lang="scss">
.picker-popper-class {
  .el-picker-panel__icon-btn {
    &:nth-child(1) {
      font-size: 16px;
    }
    &:nth-child(5) {
      font-size: 16px;
    }
    &:nth-child(2) {
      margin-left: 10px;
      font-size: 16px;
    }
    &:nth-child(6) {
      margin-right: 10px;
      font-size: 16px;
    }
  }
}
</style>