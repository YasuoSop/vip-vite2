<template>
  <div class="trz">
    <div class="bg">
      <header-trz></header-trz>
      <search-trz></search-trz>
    </div>
    <div class="news">
      <div class="news-box">
        <div v-for="(item, index) in newsList" :key="index" class="news-wrap">
          <router-link
            class="title"
            :to="`/trz/news/${item.data_id}`"
            tag="a"
            target="_blank"
            :title="item.title"
            >{{ item.title }}</router-link
          >
          <div class="time">{{ item.time }}</div>
        </div>
      </div>
    </div>

    <!-- IPO资讯 和 投融资事件 -->
    <div class="section-node" v-if="isLoading === false">
      <!-- IPO -->
      <div class="section-box">
        <div class="top">
          <span class="text">最新IPO资讯</span>
          <span class="more" @click="goNewsList('IPO资讯')">查看更多</span>
        </div>

        <div class="section-ipo">
          <div v-for="(item, index) in ipoList" :key="index" class="ipo-node">
            <!-- ipo时间 -->
            <div class="ipo-left">
              <div class="year">{{ item.timeYear }}</div>
              <!-- <div class="time">{{ item.time }}</div> -->
            </div>
            <!-- ipo点 -->
            <div class="ipo-dot">
              <div class="ipo-line"></div>
            </div>
            <!-- ipo具体信息 -->
            <div class="ipo-right">
              <router-link
                class="title"
                :to="`/trz/news/${item.data_id}`"
                tag="a"
                target="_blank"
                >{{ item.title }}</router-link
              >
              <div class="digest" v-if="item.digest">
                <div>{{ item.digest }}</div>
              </div>
              <div v-if="item.source" class="source">
                <img src="../../../static/imgs/trz/ipo_source.png" alt="" />
                来源：{{ item.source }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 投融资事件 -->
      <div class="section-box section-box2">
        <div class="top">
          <span class="text">最新投融资/并购事件</span>
          <router-link :to="`/trz/rongzi`" target="_blank" class="more" @click.native="goRongzi"
            >查看更多</router-link
          >
        </div>

        <div class="section-trzbg">
          <div
            v-for="(item, index) in trzbgList"
            :key="index"
            class="trzbg-node"
          >
            <!-- trzbg时间 -->
            <div class="trzbg-left">
              <div class="year">{{ item.time }}</div>

              <!-- trzbg实心点 -->
              <div class="trzbg-dot">
                <div class="trzbg-line"></div>
              </div>
            </div>

            <!-- trzbg具体信息 -->
            <div v-for="(txt, i) in item.list" :key="i" class="trzbg-child">
              <div class="child-left">
                <!-- <div class="time">{{ txt.time }}</div> -->
              </div>
              <!-- trzbg空心心点 -->
              <div class="child-dot">
                <div class="child-line"></div>
              </div>
              <div class="child-right">
                <!-- 投资信息 -->
                <div v-if="Object.keys(txt.tourongzi).length > 0">
                  <div class="child-tz">投资</div>
                  <div
                    class="info"
                    @click="goToDetails(txt.tourongzi, 'rongzi')"
                  >
                    <div v-if="txt.tourongzi.shortname && txt.tourongzi.shortname.length>0">
                      融资方：
                      <a
                        v-for="(item, i) in txt.tourongzi.shortname"
                        :key="i"
                        @click.stop="goToListDetail(item)"
                        :class="{'no-click': !item.gsWyuid && !item.jgWyuid}"
                        >{{ item.name }}</a
                      >
                      <span class="color9">{{ txt.tourongzi.round }}</span>
                      <span class="color9">{{ txt.tourongzi.amount }}</span>
                    </div>
                    <div v-if="txt.tourongzi.investors && txt.tourongzi.investors.length>0" class="tzf">
                      投资方：
                      <a
                        @click.stop="goToListDetail(item)"
                        v-for="(item, i) in txt.tourongzi.investors"
                        :class="{'no-click': !item.gsWyuid && !item.jgWyuid}"
                        :key="i"
                        >{{ item.name }}</a
                      >
                    </div>
                  </div>
                </div>

                <!-- 并购信息 -->
                <div v-if="Object.keys(txt.binggou).length > 0">
                  <div class="child-bg">并购</div>
                  <div
                    class="info"
                    @click="goToDetails(txt.binggou, 'binggou')"
                  >
                    <div v-if="txt.binggou.acquirer && txt.binggou.acquirer.length>0">
                      买方：
                      <a
                        @click.stop="goToListDetail(item)"
                        v-for="(item, i) in txt.binggou.acquirer"
                        :class="{'no-click': !item.gsWyuid && !item.jgWyuid}"
                        :key="i"
                        >{{ item.name }}</a
                      >
                      <span class="color9">{{ txt.binggou.amount }}</span>
                    </div>

                    <div v-if="txt.binggou.shortname && txt.binggou.shortname.length>0">
                      卖方：
                      <a
                        @click.stop="goToListDetail(item)"
                        v-for="(item, i) in txt.binggou.shortname"
                        :class="{'no-click': !item.gsWyuid && !item.jgWyuid}"
                        :key="i"
                        >{{ item.name }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <LoadingGif
      style="min-height: calc(100vh - 439px);"
      :className="'list-in-loading'"
      :classNameImg="'little-size-loading'"
      :loadFlag="isLoading"
      v-if="isLoading"
    ></LoadingGif>

    <footer-trz></footer-trz>

    <!-- 新手引导 -->
    <!-- <div class="new-guide" v-if="showNewGuide">
      <div :style="{boxShadow:'0 0 0 10000px rgb(0 0 0 / 50%)',marginLeft: marginLeft + 'px', width: '625px', height: '60px'}">

      </div>
    </div> -->
  </div>
</template>

<script>
import HeaderTrz from "@/components/layouts/trz/header.vue"
import FooterTrz from "@/components/layouts/footer-trz.vue"
import SearchTrz from "@/components/layouts/search-trz.vue"
import LoadingGif from "@/components/common/globalCom/loading-gif.vue"

export default {
  components: {
    HeaderTrz,
    SearchTrz,
    FooterTrz,
    LoadingGif
  },
  data() {
    return {
      ipoList: [],
      trzbgList: [],
      newsList: [],
      isLoading: false,
      showNewGuide: false, // 控制新手引导弹窗显示隐藏
      marginLeft: 0,
    };
  },
  created() {
    this.getIpoList();
    this.getTrzbgList();
  },
  mounted() {
    this.getLineHeight();
    this.getNewsList();

    this.$nextTick(()=> {
      let timer = setTimeout(()=> {
        if (!localStorage.getItem('showNewGuide')) {
          this.showNewGuide = true
          this.getGuidLeft()
        }
        clearTimeout(timer)
      }, 2000)
    })
    let _this = this
    window.onresize = function() {
      _this.getGuidLeft();
    };
  },
  methods: {
    // 获取左边距
    getGuidLeft() {
      this.$nextTick(() => {
        this.marginLeft = $('.menu').offset().left;
      })
    },
    // 获取新闻列表
    getNewsList() {
      window
        .Axios({
          method: "get",
          url: "/api/tourongzi_search/finReport",
          params: {
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.newsList = res.data.data;
          }
        });
    },

    // 获取ipo资讯
    getIpoList() {
      this.isLoading = true;
      window
        .Axios({
          method: "get",
          url: "/api/tourongzi_search/latestIPO",
          params: {
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          this.isLoading = false;
          if (res.data.code === 200 && res.data.data) {
            this.ipoList = res.data.data;
          }
        })
        .then(this.getLineHeight); // 动态计算高度
    },

    // 获取最新投融资并购事件数据
    getTrzbgList() {
      window
        .Axios({
          method: "get",
          url: "/api/tourongzi_search/touandbing",
          params: {
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.trzbgList = res.data.data;
          }
        })
        .then(this.getLineHeight); // 动态计算高度
    },

    // 融资并购事件跳转到对应的详情页
    goToDetails(obj, val) {
      console.log(obj, val);
      let pathUrl = "";
      if (val === "rongzi") {
        pathUrl = `/trz/rongzi/${obj.data_id}`;
      } else {
        pathUrl = `/trz/binggou/${obj.data_id}`;
      }
      const { href } = this.$router.resolve({
        path: pathUrl
      });
      window.open(href, "_blank");
    },

    goToListDetail(val) {
      let path = ''
      console.log(val)
      if (!val.gsWyuid && !val.jgWyuid) return false
      // 如果gsWyuid存在跳转到企业详情
      if (val.gsWyuid) path = `/trz/qiye/${val.gsWyuid}`

      // 如果jgWyuid存在跳转到企业详情
      if (val.jgWyuid) path = `/trz/jigou/${val.jgWyuid}`

      let routeData = this.$router.resolve({
        path: path,
      });
      window.open(routeData.href, "_blank");
    },

    // ipo资讯跳转
    goNewsList(val) {
      window.ga("send", "event", "button", "click", "viptrz_home_moreIPO");
      window._paq.push(["trackEvent", "button", "click", "viptrz_home_moreIPO"]);
      let routeData = this.$router.resolve({
        path: "/trz/news",
        query: {
          filter_condition: JSON.stringify({ category: [`${val}`] })
        }
      });
      window.open(routeData.href, "_blank");
    },

    goRongzi() {
      window.ga("send", "event", "button", "click", "viptrz_home_moretourongzi");
      window._paq.push(["trackEvent", "button", "click", "viptrz_home_moretourongzi"]);
    },

    // 获取ipo和投融资并购事件的线条高度
    getLineHeight() {
      this.$nextTick(() => {
        // 动态设置ipo时光轴点下面的线的高度
        let heightArr = [];
        let nodeNum = $(".ipo-node").length;

        $(".ipo-node").each(function() {
          heightArr.push($(this).height() - 10);
        });

        $(".ipo-dot .ipo-line").each(function(index) {
          if (index === nodeNum - 1) {
            $(this).css({ height: heightArr[index] });
          } else {
            $(this).css({ height: heightArr[index] });
          }
        });

        // 动态设置投融资并购事件的时光轴点下面的线的高度
        let heightArrTrz = [];
        let nodeNumTrz = $(".trzbg-node .trzbg-child").length;

        $(".trzbg-node .trzbg-child").each(function() {
          heightArrTrz.push($(this).height() - 10);
        });

        $(".child-dot .child-line").each(function(index) {
          if (index === nodeNumTrz - 1) {
            $(this).css({ height: heightArrTrz[index] - 30 });
          } else {
            $(this).css({ height: heightArrTrz[index] });
          }
        });
        console.log(heightArrTrz);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.la-app .la-app-main {
  overflow: visible !important;
}
.trz {
  min-height: 100vh;
  .bg {
    height: 320px;
    background: url("/static/imgs/trz/banner-trz-home.png") no-repeat center;
    background-size: 100% 100%;
  }

  .news {
    height: 80px;
    background: #09144f;
    padding: 15px 0;
    box-sizing: border-box;

    .news-box {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .news-wrap {
        width: 45%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;

        .title {
          font-size: 14px;
          color: #ffffff;
          width: 450px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            color: #e7af2f;
            text-decoration: none;
          }
        }

        .time {
          font-size: 14px;
          color: #999999;
          white-space: nowrap;
        }
      }
    }
  }

  // IPO资讯 和 投融资事件样式开始
  .section-node {
    display: flex;
    width: 1200px;
    min-height: calc(100vh - 511px);
    margin: 40px auto 30px auto;

    .section-box {
      width: 600px;
      border-radius: 4px;

      .top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 32px;
        line-height: 32px;
        padding: 0 20px;
        box-sizing: border-box;
        background: #182462;
        border-radius: 4px;

        .text {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }

        .more {
          font-size: 14px;
          color: #e7af2f;
          cursor: pointer;

          &:hover {
            text-decoration: none;
          }
        }
      }

      .section-ipo,
      .section-trzbg {
        margin-top: 30px;

        .ipo-node {
          display: flex;

          .ipo-left {
            width: 100px;
            position: relative;
            top: -5px;

            .year {
              font-size: 14px;
              color: #666;
            }

            .time {
              font-size: 16px;
              font-weight: 600;
              color: #666;
            }
          }

          .ipo-dot {
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: #ffffff;
            border: 1px solid #182462;
            position: relative;
            box-sizing: border-box;

            .ipo-line {
              position: absolute;
              background: #dbe0e8;
              width: 1px;
              height: 36px;
              left: 4px;
              top: 10px;
            }
          }

          .ipo-right {
            flex: 1;
            margin-left: 20px;
            margin-bottom: 30px;

            .title {
              display: block;
              width: 460px;
              font-size: 16px;
              font-weight: 600;
              color: #0d1a62;
              line-height: 20px;
              margin-bottom: 6px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &:hover {
                color: #e7af2f;
                text-decoration: none;
              }
            }

            .digest {
              background: #f6f8fc;
              border-radius: 4px;
              padding: 6px 10px;
              box-sizing: border-box;
              color: #666;
              font-size: 14px;

              > div {
                max-height: 66px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
            }

            .source {
              display: flex;
              align-items: center;
              margin-top: 10px;
              color: #999;

              img {
                width: 12px;
                margin-right: 6px;
              }
            }
          }
        }
      }

      // 投融资并购事件样式
      .section-trzbg {
        .trzbg-node {
          .trzbg-left {
            display: flex;
            margin-bottom: 30px;

            .year {
              font-size: 14px;
              color: #666;
              position: relative;
              top: -5px;
              width: 100px;
            }
          }

          .trzbg-dot {
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: #182462;
            position: relative;

            .trzbg-line {
              position: absolute;
              background: #dbe0e8;
              width: 1px;
              height: 42px;
              left: 5px;
              top: 11px;
            }
          }

          .trzbg-child {
            display: flex;

            .child-left {
              width: 100px;
              position: relative;
              top: -5px;
              text-align: right;

              .time {
                font-size: 16px;
                font-weight: 600;
                color: #666;
                margin-right: 30px;
              }
            }

            .child-dot {
              width: 11px;
              height: 11px;
              border-radius: 50%;
              background: #ffffff;
              border: 1px solid #182462;
              position: relative;
              box-sizing: border-box;
              position: relative;

              .child-line {
                position: absolute;
                background: #dbe0e8;
                width: 1px;
                height: 36px;
                left: 4px;
                top: 10px;
              }
            }

            .child-right {
              flex: 1;
              margin-left: 20px;
              margin-bottom: 30px;
              font-size: 14px;
              color: #666;

              .child-tz {
                width: 56px;
                height: 28px;
                line-height: 28px;
                background: #3556b9;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 600;
                color: #ffffff;
                text-align: center;
                position: relative;
                top: -10px;
              }

              .child-bg {
                width: 56px;
                height: 28px;
                line-height: 28px;
                background: #e7af2f;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 600;
                color: #ffffff;
                text-align: center;
                position: relative;
                top: -10px;
              }

              .info {
                padding: 6px 10px;
                box-sizing: border-box;
                background: #f6f8fc;
                border-radius: 4px;
                cursor: pointer;
                &:hover {
                  background: #dbe0e8;
                }

                .tzf {
                  max-height: 66px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical
                }

                a {
                  color: #182462;
                  margin-right: 8px;
                }

                .color9 {
                  color: #999;
                }

                .no-click {
                  text-decoration: none;
                  cursor: unset;
                }
              }
            }
          }
        }
      }
    }

    .section-box2 {
      width: 500px;
      margin-left: 100px;
    }
  }
  // IPO资讯 和 投融资事件样式结束

  .new-guide {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: rgba(0, 0, 0, 0.3)
  }
}
</style>
