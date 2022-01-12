<template>
  <div class="mc">
    <div class="left-nav">
      <router-link to="/usercenter/take/dynamic" class="nav-main-lan"
        >订阅管理</router-link
      >
      <router-link to="/usercenter/take/dynamic" class="nav-lan nav-lan-active"
        >订阅动态&nbsp;&nbsp;></router-link
      >
      <router-link to="/usercenter/take/condition" class="nav-lan"
        >订阅条件</router-link
      >
      <router-link to="/usercenter/take/new" class="nav-lan"
        >新增订阅</router-link
      >
      <div style="margin-top: 20px; padding: 0 20px; font-weight: 400">
        关注药智数据服务号
        <p style="color: #868ea3">随时随地掌握最新动态</p>
      </div>
      <img
        width="96"
        height="96"
        style="margin: 10px 0 0 18px"
        src="../../../../../static/imgs/wechart/code.png"
        alt=""
      />
    </div>
    <!--  -->
    <div class="right-view">
      <div class="section">
        <div class="head">
          <div class="title">
            <i class="iconfont">&#xe757;</i><span>订阅动态</span>
          </div>
        </div>
        <div class="sec-view" v-if="data.history && data.history.length > 0">

        </div>

        <div class="all-none" v-else>
          <img class="all-none-pic" src="/static/imgs/usercenter/nodata/none22.png">
          <div class="all-none-msg">
            <span>暂无订阅动态</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: {},
    };
  },
  computed: {
    ...mapState({
      accesstoken: (state) => state.UserCenter.accesstoken,
    }),
  },
  methods: {
    handleAxios() {
      window
        .Axios({
          method: "get",
          url: "/api/rss/timeline",
          params: {
            accesstoken: this.vueGetCookie("accesstoken"),
            id: this.$route.params.id,
            msg_readid: this.$route.params.id,
            // id: 2,
            // msg_readid: 2,
          },
        })
        .then((res) => {
          if (res.data.code === 200 && res.data) {
            let data = res.data.data;
            this.data = data;
          } else {
            this.data = {};
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.handleAxios();
    setTimeout(() => {
      const hashLocation = sessionStorage.getItem("hashLocation"); //缓存中获取当前页面的路由名称
      // 注意, 这里使用全路径匹配,在hash模式中,因为地址会携带#,所以页面报告中的url需要重新覆盖一下, 将#去除
      window._paq.push(["setCustomUrl", "https://" + hashLocation]); //覆盖页面报告的url，可以自定义页面url，加上本页面路由
      window._paq.push(["trackPageView", "订阅管理"]); //页面名称,可以自定义页面名称
      window._paq.push(["setDocumentTitle", "订阅管理"]);
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/var.less";
.mc {
  .right-view {
    .section {
      .sec-view {
      }
      .all-none {
        width: 100%;
        min-height: calc(100vh - 35px - 304px - 48px - 50px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .all-none-msg {
          margin-top: 24px;
          font-size: 14px;
          color: @FontColor2;
        }
      }
    }
  }
}
</style>
