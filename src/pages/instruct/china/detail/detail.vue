<template>
  <div class="wrapper" ref="wrapper">
    <!-- 自定义加载界面 -->
    <LoadingGif :loadFlag="isLoading" v-if="isLoading"></LoadingGif>
    <!-- 加载完成显示部分 -->
    <div class="detail-list" v-else>
      <div class="detail-header">
        <div class="header-left">
          <div class="left-top">
            <span
              class="top-id"
              v-if="data_title.name"
              :title="data_title.name"
              >{{ data_title.name }}</span
            >
            <div class="left-bottom" v-if="data_title.source">
              <span class="bottom-name">{{ data_title.source }}</span>
            </div>
            <span class="id-green" v-if="data_title.second">{{
              data_title.second
            }}</span>
            <span
              class="id-green bg-blue"
              v-if="data_content.yibao == '国家医保'"
              title="国家医保"
              >国家医保</span
            >
            <span
              class="id-green bg-orange"
              v-if="data_content.otcsort"
              :title="data_content.otcsort"
              >{{ data_content.otcsort }}</span
            >
          </div>
        </div>
      </div>
      <!-- 详情模板1 -->
      <div class="main analysis-html">
        <div class="left-nav">
          <div class="nav-list nav-event" @click="handleNavClick">
            <a class="nav-item active" v-if="isEmpty(timeData)">修订日期</a>
            <a class="nav-item" v-if="data_content.hzyyjd">患者用药交代</a>
            <a class="nav-item" v-if="isEmpty(nameData)">药品名称</a>
            <a class="nav-item" v-if="data_content.chengfen">成分</a>
            <a class="nav-item" v-if="data_content.xingzhuang">性状</a>
            <a class="nav-item" v-if="data_content.zhuzhi">适应症</a>
            <a class="nav-item" v-if="data_content.guige">规格</a>
            <a class="nav-item" v-if="data_content.yongfa">用法用量</a>
            <a class="nav-item" v-if="data_content.fanying">不良反应</a>
            <a class="nav-item" v-if="data_content.jingji">禁忌</a>
            <a class="nav-item" v-if="data_content.zhuyi">注意事项</a>
            <a class="nav-item" v-if="isEmpty(yfData)">孕妇及哺乳期妇女用药</a>
            <a class="nav-item" v-if="data_content.child">儿童用药</a>
            <a class="nav-item" v-if="data_content.old">老年用药</a>
            <a class="nav-item" v-if="data_content.xianghuzhuoyong">药物相互作用</a>
            <a class="nav-item" v-if="data_content.guoliang">药物过量</a>
            <a class="nav-item" v-if="data_content.clinical">临床试验</a>
            <a class="nav-item" v-if="data_content.yaoli">药物毒理</a>
            <a class="nav-item" v-if="data_content.donglixue">药学动力学</a>
            <a class="nav-item" v-if="data_content.zhucang">贮藏</a>
            <a class="nav-item" v-if="data_content.baozhuang">包装</a>
            <a class="nav-item" v-if="data_content.youxiaoqi">有效期</a>
            <a class="nav-item" v-if="data_content.zhixingbiaozhun">执行标准</a>
            <a class="nav-item" v-if="data_content.pizhunwenhao">批准文号</a>
            <a class="nav-item" v-if="data_content.source">生产企业</a>
            <a class="nav-item" v-if="isEmpty(yzData)">药智信息</a>
            <a class="nav-item" v-if="extendList && extendList.length > 0">扩展信息</a>
          </div>
        </div>
        <div class="right-list">
          <div
            class="list-in-left"
            :class="{
              'list-in-left-no-img': !data.Image || data.Image.length === 0,
            }"
          >
            <!-- 修订日期 -->
            <slide-lan
              :title="'修订日期'"
              class="the-part part-one"
              v-if="isEmpty(timeData)"
            >
              <table class="tb-xdrq">
                <tr v-if="data_content.hezhunri">
                  <td class="part-detail-title">【核准日期】</td>
                  <td>
                    <div
                      class="reset-style"
                      v-html="data_content.hezhunri"
                    ></div>
                  </td>
                </tr>
                <tr v-if="data_content.xiugairi">
                  <td class="part-detail-title">【修改日期】</td>
                  <td><div class="reset-style" v-html="data_content.xiugairi"></div></td>
                </tr>
              </table>
            </slide-lan>

            <!-- 患者用药交代 -->
            <slide-lan
              :title="'患者用药交代'"
              class="the-part part-two"
              v-if="data_content.hzyyjd"
            >
              <div class="reset-style" v-html="data_content.hzyyjd"></div>
            </slide-lan>

            <!-- 药品名称 -->
             <slide-lan
              :title="'药品名称'"
              class="the-part part-three"
              v-if="isEmpty(nameData)"
            >
              <table class="tb-jbxx">
                <tr v-if="data_content.name">
                  <td class="part-detail-title">【通用名称】</td>
                  <td>
                    <div
                      class="link-div"
                      @click="goList('name', data_content.name)"
                      v-html="data_content.name"
                    ></div>
                  </td>
                </tr>
                <tr v-if="data_content.shangpinname">
                  <td class="part-detail-title">【商品名称】</td>
                  <td>
                    <div
                      class="link-div"
                      @click="goList('name', data_content.shangpinname)"
                      v-html="data_content.shangpinname"
                    ></div>
                  </td>
                </tr>
                <tr v-if="data_content.englishname">
                  <td class="part-detail-title">【英文名称】</td>
                  <td>
                    <div
                      class="link-div"
                      @click="goList('name', data_content.englishname)"
                      v-html="data_content.englishname"
                    ></div>
                  </td>
                </tr>
              </table>
            </slide-lan>

            <!-- 成分 -->
            <slide-lan
              :title="'成分'"
              class="the-part part-four"
              v-if="data_content.chengfen"
            >
              <div class="reset-style" v-html="data_content.chengfen"></div>
            </slide-lan>

            <!-- 性状 -->
            <slide-lan
              :title="'性状'"
              class="the-part part-five"
              v-if="data_content.chengfen"
            >
              <div class="reset-style" v-html="data_content.xingzhuang"></div>
            </slide-lan>

            <!-- 适应症 -->
            <slide-lan
              :title="'适应症'"
              class="the-part part-six"
              v-if="data_content.zhuzhi"
            >
              <div class="reset-style" v-html="data_content.zhuzhi"></div>
            </slide-lan>

            <!-- 规格 -->
            <slide-lan
              :title="'规格'"
              class="the-part part-seven"
              v-if="data_content.guige"
            >
              <div class="reset-style" v-html="data_content.guige"></div>
            </slide-lan>

            <!-- 用法用量 -->
            <slide-lan
              :title="'用法用量'"
              class="the-part part-eight"
              v-if="data_content.yongfa"
            >
              <div class="reset-style" v-html="data_content.yongfa"></div>
            </slide-lan>

            <!-- 不良反应 -->
            <slide-lan
              :title="'不良反应'"
              class="the-part part-nine"
              v-if="data_content.fanying"
            >
              <div class="reset-style" v-html="data_content.fanying"></div>
            </slide-lan>

            <!-- 禁忌 -->
            <slide-lan
              :title="'禁忌'"
              class="the-part part-ten"
              v-if="data_content.jingji"
            >
              <div class="reset-style" v-html="data_content.jingji"></div>
            </slide-lan>

            <!-- 注意事项 -->
            <slide-lan
              :title="'注意事项'"
              class="the-part part-eleven"
              v-if="data_content.zhuyi"
            >
              <div class="reset-style" v-html="data_content.zhuyi"></div>
            </slide-lan>

            <!-- 孕妇及哺乳期妇女用药 -->
            <slide-lan
              :title="'孕妇及哺乳期妇女用药'"
              class="the-part part-twelve"
              v-if="isEmpty(yfData)"
            >
              <div class="reset-style" v-html="data_content.pregnant"></div>
              <!-- 妊娠分级 -->
              <div v-if="data_content.renshenfenji">
                <div class="part-detail-title">【妊娠分级】</div>
                <div
                  class="part-detail-content"
                  v-html="data_content.renshenfenji"
                ></div>
              </div>
              <!-- 哺乳期分级 -->
              <div v-if="data_content.buruqifenji">
                <div class="part-detail-title">【哺乳期分级】</div>
                <div
                  class="part-detail-content"
                  v-html="data_content.buruqifenji"
                ></div>
              </div>
            </slide-lan>

            <!-- 儿童用药 -->
            <slide-lan
              :title="'儿童用药'"
              class="the-part part-thirteen"
              v-if="data_content.child"
            >
              <div class="reset-style" v-html="data_content.child"></div>
            </slide-lan>

            <!-- 老年用药 -->
            <slide-lan
              :title="'老年用药'"
              class="the-part part-fourteen"
              v-if="data_content.old"
            >
              <div class="reset-style" v-html="data_content.old"></div>
            </slide-lan>

            <!-- 药物相互作用 -->
            <slide-lan
              :title="'药物相互作用'"
              class="the-part part-fifteen"
              v-if="data_content.xianghuzhuoyong"
            >
              <div class="reset-style" v-html="data_content.xianghuzhuoyong"></div>
            </slide-lan>

            <!-- 药物过量 -->
            <slide-lan
              :title="'药物过量'"
              class="the-part part-sixteen"
              v-if="data_content.guoliang"
            >
              <div class="reset-style" v-html="data_content.guoliang"></div>
            </slide-lan>

            <!-- 临床试验 -->
            <slide-lan
              :title="'临床试验'"
              class="the-part part-seventeen"
              v-if="data_content.clinical"
            >
              <div class="reset-style" v-html="data_content.clinical"></div>
            </slide-lan>

            <!-- 药物毒理 -->
            <slide-lan
              :title="'药物毒理'"
              class="the-part part-eighteen"
              v-if="data_content.yaoli"
            >
              <div class="reset-style" v-html="data_content.yaoli"></div>
            </slide-lan>

            <!-- 药学动力学 -->
            <slide-lan
              :title="'药学动力学'"
              class="the-part part-nineteen"
              v-if="data_content.donglixue"
            >
              <div class="reset-style" v-html="data_content.donglixue"></div>
            </slide-lan>

            <!-- 贮藏 -->
            <slide-lan
              :title="'贮藏'"
              class="the-part part-twenty"
              v-if="data_content.zhucang"
            >
              <div class="reset-style" v-html="data_content.zhucang"></div>
            </slide-lan>

            <!-- 包装 -->
            <slide-lan
              :title="'包装'"
              class="the-part part-twenty-one"
              v-if="data_content.baozhuang"
            >
              <div class="reset-style" v-html="data_content.baozhuang"></div>
            </slide-lan>

            <!-- 有效期 -->
            <slide-lan
              :title="'有效期'"
              class="the-part part-twenty-two"
              v-if="data_content.youxiaoqi"
            >
              <div class="reset-style" v-html="data_content.youxiaoqi"></div>
            </slide-lan>

            <!-- 执行标准 -->
            <slide-lan
              :title="'执行标准'"
              class="the-part part-twenty-three"
              v-if="data_content.zhixingbiaozhun"
            >
              <div class="reset-style" v-html="data_content.zhixingbiaozhun"></div>
            </slide-lan>

            <!-- 批准文号 -->
            <slide-lan
              :title="'批准文号'"
              class="the-part part-twenty-four"
              v-if="data_content.pizhunwenhao"
            >
              <div class="reset-style" v-html="data_content.pizhunwenhao"></div>
            </slide-lan>

            <!-- 生产企业 -->
            <slide-lan
              :title="'生产企业'"
              class="the-part part-twenty-five"
              v-if="data_content.source"
            >
              <div class="part-detail-title" style="display: block;">【企业名称】</div>
              <div
                class="link-div"
                style="margin-top: 5px;display:inline-block;"
                @click="goList('source', data_content.source)"
                v-html="data_content.source"
              ></div>
            </slide-lan>

            <!-- 药智信息 -->
            <slide-lan
              :title="'药智信息'"
              class="the-part part-twenty-six"
              v-if="isEmpty(yzData)"
            >
              <!-- 医保类别 -->
              <div v-if="data_content.yibao == '国家医保'">
                <div class="part-detail-title">【医保类别】</div>
                <div
                  class="part-detail-content"
                  v-html="data_content.yibao"
                ></div>
              </div>

              <!-- OTC分类 -->
              <div v-if="data_content.otcsort">
                <div class="part-detail-title">【OTC分类】</div>
                <div
                  class="part-detail-content"
                  v-html="data_content.otcsort"
                ></div>
              </div>

              <div v-if="data_content.atc">
                <div class="part-detail-title">【ATC分类】</div>
                <div class="part-detail-content">
                  <div
                    v-for="(item, index) in getAtcNames(data_content.atc)"
                    :key="item"
                    class="clearfix"
                  >
                    <span>{{ item }}&nbsp;&nbsp;</span
                    ><span>{{ getAtc(item, data_content.atcarr) }}</span>
                    <br v-if="index % 2 != 0" />
                  </div>
                </div>
              </div>
            </slide-lan>

            <slide-lan
              :title="'扩展信息'"
              class="the-part part-twenty-seven"
              v-if="extendList && extendList.length > 0"
            >
              <div class="extend-list">
                <ExtendButton
                  class="reset-style"
                  v-for="(item, index) in extendList"
                  :key="index"
                  :item="item"
                ></ExtendButton>
              </div>
            </slide-lan>
          </div>
          <div class="list-in-right" v-if="data.Image && data.Image.length > 0">
            <slide-lan :title="'包装图片'">
              <img
                title="点击放大"
                @click="() => $Img(item)"
                v-for="(item, index) in data.Image"
                :key="index"
                :src="item"
                alt=""
                class="right_img"
              />
            </slide-lan>
          </div>
        </div>
      </div>
    </div>
    <la-footer></la-footer>
  </div>
</template>

<script>
import LoadingGif from "@/components/common/globalCom/loading-gif.vue";
import ExtendButton from "@/components/common/extend-button.vue";
import SlideLan from "@/components/common/slide-lan.vue";
import LaFooter from "@/components/layouts/footer.vue";
import detailScrollMixins from "@/mixins/detailScroll.js";
import { mapState } from "vuex";

export default {
  components: {
    LoadingGif,
    SlideLan,
    LaFooter,
    ExtendButton,
  },
  mixins: [detailScrollMixins],
  data() {
    return {
      isLoading: true,
      id: this.$route.params.id,
      scroll: "",
      data: {},
      heightArr: [],
      // 数据
      data_title: {},
      // 数据模板0
      data_content: {},
      timeData: {}, // 修订日期
      nameData: {}, // 药品名称
      yfData: {}, // 孕妇及哺乳期妇女用药
      yzData: {}, // 药智信息
      // 扩展信息
      extendList: [],
    };
  },
  computed: {
    ...mapState({
      nopms: (state) => state.ShuomingshuZg.nopms,
      allBase: (state) => state.ShuomingshuZg.allBase,
      helpInfo: (state) => state.ShuomingshuZg.helpInfo,
    }),
  },
  watch: {
    showPromtNotice(val) {
      if (val) {
        setTimeout(() => {
          if ($(".left-nav").css("top"))
            $(".left-nav").css(
              "top",
              parseInt($(".left-nav").css("top").replace("px", "")) + 30 + "px"
            );
        }, 600);
      } else {
        setTimeout(() => {
          if ($(".left-nav").css("top")) $(".left-nav").css("top", "118px");
        }, 600);
      }
    },
  },
  methods: {
    handleScroll() {
      let top = $(".main").offset().top,
        leftNav = $(".left-nav");
      if (top <= 50) {
        leftNav.css("top", (this.showPromtNotice ? 88 : 58) + "px");
      } else {
        leftNav.css("top", (this.showPromtNotice ? 118 : 88) + "px");
      }
    },
    goList(key, val) {
      val = val.replace(/<.*?>/gi, "");
      window.open(`/instruct?${key}=${val}`, "_blank");
    },
    // 加载完后移除加载界面
    removeLoading() {
      this.isLoading = false;
    },
    isEmpty(obj) {
      return _.keys(obj).length > 0;
    },
    handleAxios() {
      let handlObj = (data, list) => {
        return _.omitBy(_.pick(data, list), _.isEmpty);
      };
      window
        .Axios({
          method: "get",
          url: "/api/instruct/" + this.id,
          params: {
            accesstoken: GETCOOKIEFUN("accesstoken"),
          },
        })
        .then((res) => {
          if (res.data.code === 200 && res.data.data) {
            let data = res.data.data;
            this.data = data;
            // 修订日期
            this.timeData = handlObj(data.Content, ["hezhunri", "xiugairi"]);
            // 药品名称
            this.nameData =  handlObj(data.Content, ["name", "englishname", "shangpinname"]);
            // 孕妇及哺乳期妇女用药
            this.yfData = handlObj(data.Content, ["pregnant", "renshenfenji", "buruqifenji"]);
            // 药智信息
            this.yzData = handlObj(data.Content, ["yibao", "otcsort", "atc", "atcarr",]);
            // 获取扩展信息的数据
            this.getExtendList("instruct", data.extendList);
            // 一一对应获取数据
            this.data_title = data.Title ? data.Title : {};
            this.data_content = data.Content;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .then(this.removeLoading);
    },

    // 获取atc的中文
    getAtc(name, arr) {
      let str = "";
      if (arr) {
        for (let index in arr[name]) {
          str += arr[name][index].shuoming + " > ";
        }
        str = _.trimEnd(str, " > "); // 去除最后多余的" > "
      }
      return str;
    },
    getAtcNames(name) {
      return name ? name.replace(/\s+/g, "").split(";") : [];
    },
  },
  created() {
    setTimeout(() => {
      const hashLocation = sessionStorage.getItem("hashLocation"); //缓存中获取当前页面的路由名称
      // 注意, 这里使用全路径匹配,在hash模式中,因为地址会携带#,所以页面报告中的url需要重新覆盖一下, 将#去除
      window._paq.push(["setCustomUrl", "https://" + hashLocation]); //覆盖页面报告的url，可以自定义页面url，加上本页面路由
      window._paq.push(["trackPageView", this.allBase.dbname]); //页面名称,可以自定义页面名称
      window._paq.push(["setDocumentTitle", this.allBase.dbname]);
    }, 1000);
  },
  mounted() {
    Store.dispatch("ShuomingshuZg/getBaseInfo");
    this.handleAxios();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  activated() {
    this.vueRouteToNoPms(this.nopms.xqy);
  },
  updated() {
    this.vueRouteToNoPms(this.nopms.xqy);
    this.vueTogglePmsTooltip();
  },
};
</script>

<style lang="less">
@import "@/assets/less/var.less";
@import "@/assets/less/detailCom.less";
.link-div {
  text-decoration: underline;
  cursor: pointer;
  color: @Blue;
}

.Reset() {
  padding: 0;
  margin: 0;
}
.instruct-company-name {
  width: 100%;
}
.wrapper {
  .detail-list {
    padding-bottom: 20px;
    .analysis-html {
      td {
        & > div {
          * {
            .Reset();
          }
        }
      }
    }
    // 主要信息部分
    .main {
      .reset-style {
        * {
          .Reset();
        }
      }

      .left-nav {
        overflow-y: auto;
        height: calc(100% - 40px);
        padding-bottom: 20px;
        box-sizing: border-box;
        background: #f0f2f9;
        z-index: 99;
      }

      // 右边 - 详细列表
      .right-list {
        display: flex;
        justify-content: space-between;
        .list-in-left {
          // padding-right: 384px;
          display: inline-block;
          font-size: 13px;
          flex: 1;

          .the-part {
            .part-detail-title {
              font-weight: bold;
              line-height: 22px;
              display: inline-block;
              vertical-align: top;
            }
            .part-detail-content {
              margin: 5px 0 15px 0;
              line-height: 22px;
              * {
                .Reset();
              }
            }
          }
          .part-one {
            .tb-jbxx {
              td {
                min-height: 22px;
                line-height: 22px;
              }
              tr {
                td {
                  img {
                    max-width: 200px;
                  }
                  &:nth-of-type(1) {
                    font-weight: bold;
                    text-align: right;
                    vertical-align: text-top;
                    padding-right: 10px;
                    min-width: 80px;
                  }
                  &:nth-of-type(2) {
                    div {
                      min-height: 22px;
                      line-height: 22px;
                    }
                  }
                }
              }
            }
          }
          .part-eight {
            .tb-xdrq {
              td {
                min-height: 22px;
                line-height: 22px;
              }
              tr {
                td {
                  &:nth-of-type(1) {
                    font-weight: bold;
                    text-align: right;
                    vertical-align: text-top;
                    padding-right: 10px;
                    min-width: 80px;
                  }
                  &:nth-of-type(2) {
                    div {
                      min-height: 22px;
                      line-height: 22px;
                      max-height: 66px;
                      overflow: hidden;
                    }
                  }
                }
              }
            }
          }
        }
        .list-in-left-no-img {
          width: 100%;
          padding-right: 0;
        }
        .list-in-right {
          width: 380px;
          display: inline-block;
          // position: absolute;
          // right: 0;
          // top: 0px;
          .content {
            padding: 30px 40px !important;
            width: auto;
            height: auto;
            .right_img {
              display: block;
              width: 262px;
              margin: 0 auto;
              cursor: pointer;
            }
          }
        }
      }
    }
    .main0 {
      position: relative;
      margin-top: 10px;
      .right-list {
        // padding-left: 240px;
        .list-in-left {
          box-sizing: border-box;
          width: 100%;
          padding-right: 384px;
          display: inline-block;
          font-size: 13px;
        }
        .list-in-right {
          width: 380px;
          display: inline-block;
          position: absolute;
          right: 0;
          top: 0px;
          .content {
            padding: 30px 40px !important;
            width: auto;
            height: auto;
            .right_img {
              display: block;
              width: 262px;
              margin: 0 auto;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

.slide-lan .content {
  margin-left: 35px;
  padding: 15px 0 10px 0 !important;
}

@media screen and (max-width: 1600px) {
}
@media screen and (max-width: 1400px) {
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .left-bottom,
  .bottom-name,
  .id-green {
    display: block !important;
  }
}
</style>
