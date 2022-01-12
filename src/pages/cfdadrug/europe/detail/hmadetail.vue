<template>
  <div class="wrapper">
    <!-- 自定义加载界面 -->
    <LoadingGif :loadFlag="isLoading" v-if="isLoading"></LoadingGif>
    <!-- 加载完成显示部分 -->
    <div class="detail-list" v-else>
      <div class="detail-header header-fixed">
        <div class="header-left">
          <div class="left-top">
            <span class="top-id" :title="data.List.product">
              {{
                data.List.product
              }}
            </span>
            <span class="id-green">{{ data.Source }}</span>
          </div>
        </div>
      </div>
      <div class="main" style="padding-top: 50px">
        <slide-section :title="'基本信息'">
          <div class="tb-wrap">
            <table class="tb-t">
              <tr>
                <td>MR号</td>
                <td>{{ data.List.mrno }}</td>
              </tr>
              <tr>
                <td>商品名</td>
                <td>{{ data.List.product }}</td>
              </tr>
              <tr>
                <td>获批时间</td>
                <td>{{ data.List.outcometime }}</td>
              </tr>
              <tr>
                <td>活性成分(英文)</td>
                <td>{{ data.List.activesubstances }}</td>
              </tr>
              <tr>
                <td>活性成分(中文)</td>
                <td>{{ data.List.cname }}</td>
              </tr>
              <tr>
                <td>剂型</td>
                <td>{{ data.List.form }}</td>
              </tr>
              <tr>
                <td>市场状态</td>
                <td>{{ data.List.outcome }}</td>
              </tr>
              <tr>
                <td>ATC编码</td>
                <td>{{ data.List.atccode }}</td>
              </tr>
              <tr>
                <td>靶点全称</td>
                <td>
                  <span :style="wordBreak" class="t-line5">
                    <div
                      v-for="(value, key, index) in data.List.targets"
                      v-if="value != ''"
                      :key="index"
                      style="
                          word-break: break-all;
                          margin-right: 15px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                    >
                      <router-link
                        tag="a"
                        :to="'/targetdatas/' + value"
                        target="_blank"
                        :title="key"
                        class="link-a"
                      >{{ key }}</router-link>
                    </div>
                    <span
                      v-else
                      style="
                          word-break: break-all;
                          margin-right: 15px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                    >{{ key }}</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>靶点简称</td>
                <td>
                  <span :style="wordBreak" class="t-line5">
                    <div
                      v-for="(value, key, index) in data.List.targets_abbr"
                      v-if="value != ''"
                      :key="index"
                      style="
                          word-break: break-all;
                          margin-right: 15px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                    >
                      <router-link
                        tag="a"
                        :to="'/targetdatas/' + value"
                        target="_blank"
                        :title="key"
                        class="link-a"
                      >{{ key }}</router-link>
                    </div>
                    <span
                      v-else
                      style="
                          word-break: break-all;
                          margin-right: 15px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                    >{{ key }}</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>上市许可持有人</td>
                <td>{{ data.List.holder }}</td>
              </tr>
              <tr>
                <td>参照成员国</td>
                <td>{{ data.List.rms }}</td>
              </tr>
              <tr>
                <td>有关成员国</td>
                <td>{{ data.List.cms }}</td>
              </tr>
              <tr>
                <td>最新更改时间</td>
                <td>{{ data.List.updatetime }}</td>
              </tr>
              <tr v-if="data.List.bq !== null" display="block">
                <td>附件</td>
                <td>
                  <p>
                    <span v-html="data.List.wxt"></span>
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </slide-section>
        <!-- 扩展信息开始 -->
        <slide-section :title="'扩展信息'" v-if="hasExtend">
          <div class="extend-list">
            <ExtendButton v-for="(item, index) in extendList" :key="index" :item="item"></ExtendButton>
          </div>
        </slide-section>
      </div>
      <la-footer></la-footer>
    </div>
  </div>
</template>

<script>
import LoadingGif from "@/components/common/globalCom/loading-gif.vue"
import SlideSection from "@/components/common/slide-section.vue"
import LaFooter from "@/components/layouts/footer.vue"
import { mapState } from "vuex";
import ExtendButton from "@/components/common/extend-button.vue"
import detailScrollMixins from "@/mixins/detailScroll.js";
export default {
  components: {
    SlideSection,
    LaFooter,
    ExtendButton,
    LoadingGif
  },
  mixins: [detailScrollMixins],
  data() {
    return {
      isLoading: true,
      data: {},
      id: "",
      extendList: [],
      hasExtend: false
      // dbname: qixiebiaozhun, // 数据库类型名称，如hmap、qixiebiaozhun等
      // id: 8782 //具体对应编号
    };
  },
  computed: {
    ...mapState({
      nopms: state => state.Epyp.nopms,
      allBase: state => state.Epyp.allBase,
      helpInfo: state => state.Epyp.helpInfo
    })
  },
  methods: {
    handleAxios() {
      window
        .Axios({
          method: "get",
          url: "/api/epyp/hmadetail",
          params: {
            id: this.$route.params.id,
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.data = res.data.data;
            this.getExtendList("epyp", res.data.data.extendList);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(this.removeLoading);
    },
    // 加载完后移除加载界面
    removeLoading() {
      this.isLoading = false;
    }
  },
  created() {
    if (!this.nopms.xqy) {
      this.handleAxios();
    }
    setTimeout(() => {
      const hashLocation = sessionStorage.getItem("hashLocation"); //缓存中获取当前页面的路由名称
      // 注意, 这里使用全路径匹配,在hash模式中,因为地址会携带#,所以页面报告中的url需要重新覆盖一下, 将#去除
      window._paq.push(["setCustomUrl", "https://" + hashLocation]); //覆盖页面报告的url，可以自定义页面url，加上本页面路由
      window._paq.push(["trackPageView", this.allBase.dbname]); //页面名称,可以自定义页面名称
      window._paq.push(["setDocumentTitle", this.allBase.dbname]);
    }, 1000);
  },
  mounted() {
    Store.dispatch("Epyp/getBaseInfo");
  },
  activated() {
    this.vueRouteToNoPms(this.nopms.xqy);
  },
  updated() {
    this.vueRouteToNoPms(this.nopms.xqy);
    this.vueTogglePmsTooltip();
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/var.less";
@import "~@/assets/less/detailCom.less";

.t-line5 {
  display: flex;
  flex-wrap: wrap;
}
/deep/.slide-section {
  .tb-t,
  .tb-f {
    tr {
      td {
        box-sizing: border-box;
        height: 32px;
        border: 1px solid @BorderColorNew;
        font-size: 13px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #545b6d;
        line-height: 32px;
        padding: 0 0 0 50px !important;
        font-size: 13px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #545b6d;
        max-width: 30vw !important;
        &:nth-child(odd) {
          min-width: 180px !important;
          width: 230px !important;
          background: @DetailTableLeftColor;
        }
        &:nth-child(even) {
          max-width: 20vw !important;
          width: auto !important;
          min-width: auto !important;
          word-wrap: break-word;
          word-break: break-all;
          white-space: normal;
          background: @DetailTableRightColor;
          line-height: 23px;
        }
        &:nth-child(2n) {
          padding: 0 0 0 60px !important;
        }
      }
    }
  }
}
.link-a {
  color: #4877e8;

  &:hover {
    text-decoration: underline;
  }
}
</style>
