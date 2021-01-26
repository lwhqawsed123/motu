<template>
  <el-container class="chatting-records">
    <div class="anchor-info">
      <div class="profile-box cursor">
        <span class="profile-status" v-if="1"></span>
        <span class="profile-status outline" v-else></span>
        <img src="@/assets/image/profile.jpg" alt class="profile" />
      </div>
    </div>
    <el-aside width="250px" style="background-color: #e7e7e7" class="chatting-aside">
      <el-row>
        <el-col class="visitor" ref="visitor">
          <el-row
            class="visitor-item cursor"
            :class="item===1?'active':''"
            v-for="(item,index) in tableData"
            :key="index"
            @click="checkChatting"
          >
            <el-col class="visitor-info-box">
              <div class="profile-box">
                <span class="profile-status" v-if="1"></span>
                <span class="profile-status outline" v-else></span>
                <img src="@/assets/image/profile.jpg" alt class="profile" />
              </div>
              <div class="visitor-info">
                <div class="visitor-info-header">
                  <span class="iconfont icon-nan icon-gender-men" v-if="1"></span>
                  <span class="iconfont icon-nan icon-gender-women" v-else></span>
                  <span class="visitor-info-name">刘翔</span>
                  <span class="chatting-created-time">10:44</span>
                </div>
                <div class="visitor-info-content">[语音]</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-aside>

    <el-container class="chat-window">
      <el-header style="text-align: right; font-size: 10px" class="chat-window-header">
        <span class="iconfont icon-guding icon-font-size icon-top-right"></span>
        <span class="iconfont icon-minimum icon-font-size icon-top-right"></span>
        <span class="iconfont icon-fangkuang icon-font-size icon-top-right"></span>
        <span class="iconfont icon-cha icon-font-size icon-close-button cursor" @click="close"></span>
        <span class="visitor-nickname">刘翔</span>
      </el-header>

      <el-main class="chat-window-content" ref="chatting-main">
        <div ref="chatting-content">
          <div class="loadmore cursor" @click="loadMore">{{loadText}}</div>
          <div class="chatt-records-item-box" v-for="(item,index) in chattingRecords" :key="index">
            <div class="chatting-time" v-if="item.showTime">{{item.createdTime}}</div>
            <div
              class="chatt-records-item"
              :class="item.anchor?'anchor-chatt-records':'visitor-chatt-records'"
            >
              <div class="profile-box">
                <img src="@/assets/image/profile.jpg" alt class="profile" />
              </div>
              <div class="chatt-records-message">
                <span class="triangle-before"></span>
                <span>{{item.text}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer class="chat-window-footer">
        <div class="chat-window-footer-top">
          <div class="chat-window-top-left">
            <span class="iconfont icon-biaoqing icon-font-size icon-top-right"></span>
            <span class="iconfont icon-wenjianjia icon-font-size icon-top-right"></span>
            <span class="iconfont icon-jianqie icon-font-size icon-top-right"></span>
            <span class="iconfont icon-liaotianjilu icon-font-size"></span>
          </div>
          <div class="chat-window-top-right">
            <span class="iconfont icon-weibiaoti- icon-font-size icon-top-right"></span>
            <span class="iconfont icon-video_icon icon-font-size"></span>
          </div>
        </div>
        <div class="chat-window-footer-content"></div>
        <div class="chat-window-footer-bottom">
          <div class="chat-window-bottom-buttons">
            <span>发送(Enter)</span>
            <span class="bottom-button-line"></span>
            <span class="bottom-button">
              跳过
              <span class="iconfont icon-xiayishou_huaban icon-font-size"></span>
            </span>
          </div>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "",
  props: ["id"],
  data() {
    return {
      tableData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      intervalTime: 0,
      scrollHeight: 0,
      chattingRecords: [],
      resData: [
        {
          id: 1,
          user: {},
          anchor: true,
          visitor: false,
          text: "这是一个寂寞的天",
          createdTime: "2020-06-20 12:50:01"
        },
        {
          id: 2,
          user: {},
          anchor: false,
          visitor: true,
          text: "下着有些伤心的雨",
          createdTime: "2020-06-20 12:51:01"
        },
        {
          id: 3,
          user: {},
          anchor: true,
          visitor: false,
          text: "下着有些伤心的雨",
          createdTime: "2020-06-20 12:57:01"
        },
        {
          id: 4,
          user: {},
          anchor: true,
          visitor: false,
          text: "下着有些伤心的雨",
          createdTime: "2020-06-20 12:57:50"
        },
        {
          id: 5,
          user: {},
          anchor: true,
          visitor: false,
          text: "下着有些伤心的雨",
          createdTime: "2020-06-20 12:58:10"
        },
        {
          id: 6,
          user: {},
          anchor: true,
          visitor: false,
          text: "下着有些伤心的雨",
          createdTime: "2020-06-20 12:57:01"
        },
        {
          id: 7,
          user: {},
          anchor: true,
          visitor: false,
          text: "下着有些伤心的雨",
          createdTime: "2020-06-20 12:57:50"
        },
        {
          id: 8,
          user: {},
          anchor: true,
          visitor: false,
          text: "下着有些伤心的雨",
          createdTime: "2020-06-20 12:58:10"
        }
      ],
      loadText: "点击查看更多",
      time: null
    };
  },

  components: {},

  computed: {},

  beforeMount() {},
  created() {
    // visitor
    this.getList();
  },
  mounted() {
    this.$nextTick(() => {
      // 页面渲染完成后的回调
      this.$refs["chatting-main"].$el.scrollTop = 9999999;
      let chattingContent = this.$refs["chatting-content"];
      this.scrollHeight = chattingContent.scrollHeight;
      // console.log(this.$refs["chatting-content"].scrollHeight);
      // console.log(this.$refs["chatting-content"]);
    });
    const container = this.$refs["chatting-main"].$el;
    container.addEventListener("scroll", e => {
      this.pullDownRefresh(e);
    });
  },

  methods: {
    checkChatting() {},
    // 下拉加载更多
    loadMore() {
      let timeNow = new Date().getTime();
      if (timeNow - this.intervalTime <= 2000) {
        return false;
      }
      this.intervalTime = timeNow;
      this.getList();
    },
    // 保持更新数据时,滚动条保持不动
    scrollTo() {
      let chattingContent = this.$refs["chatting-content"];
      let scrollHeight = chattingContent.scrollHeight - this.scrollHeight;
      this.$refs["chatting-main"].$el.scrollTo(0, scrollHeight);
      this.scrollHeight = chattingContent.scrollHeight;
    },
    // 从后端请求新的聊天记录
    getList() {
      // axios请求
      let resData = this.resData;
      let newArray = JSON.parse(JSON.stringify(this.resData));
      // let newArray= resData.map(item => {
      //   let flag=true
      //   this.chattingRecords.forEach(list => {
      //     if(item.id===list.id){
      //       flag=false
      //     }
      //   });
      //   if(flag){
      //     return item
      //   }
      // });
      // console.log(newArray);
      newArray.forEach((item, index) => {
        item.showTime = true;
        let prevTime = 0;
        let thisTime = new Date(item.createdTime).getTime();
        if (index !== 0) {
          prevTime = new Date(newArray[index - 1].createdTime).getTime();
        }
        if (prevTime && thisTime - prevTime < 60 * 5 * 1000) {
          item.showTime = false;
        }
      });
      setTimeout(() => {
        this.chattingRecords.unshift(...newArray);
        clearTimeout(this.time);
        this.time = null;

        this.loadText = "点击查看更多";
        if (this.scrollHeight) {
          this.$nextTick(() => {
            this.scrollTo();
          });
        }
      });

      // console.log(this.$refs["chatting-content"].offsetHeight);
    },
    // 下拉更新
    pullDownRefresh(e) {
      //这里的2秒钟定时是为了避免滑动频繁，节流
      if (this.time) {
        return;
      }
      if (this.chattingRecords.length >= 50) {
        this.loadText = "没有更多数据了";
        return;
      }
      this.loadText = "加载中...";
      this.time = setTimeout(() => {
        console.log("正在更新");

        //滑到顶部时触发下次数据加载
        if (e.target.scrollTop == 0) {
          //将scrollTop置为10以便下次滑到顶部
          e.target.scrollTop = 10;
          //加载数据
          this.getList();
          //这里的定时是为了在列表渲染之后才使用scrollTo。
          // setTimeout(() => {
          //   e.target.scrollTo(0, this.scrollHeight - 30); //-30是为了露出最新加载的一行数据
          // }, 100);
        }
      }, 2000);
    },
    // 关闭窗口
    close() {
      console.log(123);

      this.$emit("closeDialog", false);
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/scss/chattingRecords.scss";
</style>