<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    // console.log('想和我们共同打造世界最大中文互动问答平台吗？\n想让自己的成就在亿万用户面前展现吗？想让世界看得你的光芒吗？\n加入我们，在这里不仅是工作，投入你的时间和热情，滴滴汗水终会汇聚成不平凡的成果。\n期待你的加盟。（投简历地址被我砍了）');
    // console.log("请在邮件中注明%c来自:console", "color:red;font-weight:bold;");
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.el-scrollbar {
  > .el-scrollbar__bar {
    opacity: 1 !important;
  }
}

// // 兼容ios 光标过大
// .el-input__inner{
//   font-size: 12px !important;
//   line-height: 14px !important;
//   height: unset !important;
//   padding-top: 5px !important;
//   padding-bottom: 5px !important;
//   box-sizing: border-box !important;
// }
// =======兼容ios光标过大=========
.el-input{
  height: unset;
  box-sizing: border-box;
}
.el-input .el-input__inner {
  font-size: 12px;
  line-height: 14px;
  height: unset;
  padding-top: 5px;
  padding-bottom: 5px;
  box-sizing: border-box;
}

.el-input--mini .el-input__inner {
  line-height: 14px;
  height: unset;
}
// =======兼容ios光标过大=========
</style>
