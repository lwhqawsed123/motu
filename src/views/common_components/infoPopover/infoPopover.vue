<template>
<div>
  <el-popover
    placement="right"
    trigger="click"
    @show="getAnchorDetail(userid)"
    @hide="anchorDetailLoading=false"
  >
    <anchor-message :anchorDetail="anchorDetail" :loading="anchorDetailLoading"></anchor-message>
    <div class="anchor-info cursor" slot="reference">
      <div class="profile-box">
        <img :src="avatar" alt class="profile" />
      </div>
      <br v-if="status==='3'||status==='2'" />
      <span style="color:#f56c6c" v-if="status==='3'">禁言</span>
      <span style="color:#f56c6c" v-else-if="status==='2'">封号</span>
    </div>
  </el-popover>
  </div>
</template>

<script>
import {
  get_anchor_by_id
} from "@/api/union/anchors/list.js";
import anchorMessage from "@/views/common_components/anchorMessage/anchorMessage.vue";
export default {
  name: "",
  props: ["userid","avatar","status"],
  data() {
    return {
        anchorDetail:{},
        anchorDetailLoading:false
    };
  },

  components: {
    anchorMessage
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
      // 获取当前主播详细信息
    getAnchorDetail(id) {
      this.anchorDetailLoading=true
      get_anchor_by_id(id).then((res) => {
        if (res && res.code === 0) {
          this.anchorDetail = res.data;
          this.anchorDetailLoading=false
        }
      }).catch(err=>{
        this.anchorDetailLoading=false
      })
    },
  },

  watch: {},
};
</script>
<style lang='scss' scoped>
@import '@/assets/styles/scss/infoPopover.scss'
</style>