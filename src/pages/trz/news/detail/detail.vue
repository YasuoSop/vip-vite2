<template>
  <div class="news-detail">
    <custom-header></custom-header>
    <LoadingGif
      :className="'fullscreen-loading'"
      :loadFlag="loading"
    ></LoadingGif>
    <div class="detail-container">
      <div class="title" :title="newsInfo.title">{{ newsInfo.title }}</div>
      <div class="second-title">
        <img
          src="~@/assets/imgs/trz/clock.png"
          class="clock"
          width="14"
          height="14"
          v-if="newsInfo.time"
        />
        <span v-if="newsInfo.time">{{ newsInfo.time.slice(0, 10) }}</span>
        <img
          src="~@/assets/imgs/trz/pin.png"
          class="pin"
          width="13"
          height="14"
          v-if="newsInfo.source"
        />{{ newsInfo.source }}
      </div>
      <div class="cards">
        <div class="left-content">
          <div class="card">
            <div class="summary-list">
              <div
                v-for="(item, index) in navs"
                :key="item"
                :class="['summary-item', activeNav == index && 'active']"
                @click="positionPanel(index)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="middle-content">
          <div class="card" v-if="newsInfo.digest">
            <div class="card-title">
              <div>
                <img
                style="margin-right: 6px;"
                src="~@/assets/imgs/trz/zhaiyao.png"
                width="14"
                height="14"/>摘要
              </div>
            </div>
            <div class="content" style="color: #666;" v-html="newsInfo.digest"></div>
          </div>
          <div class="card">
            <div class="card-title" v-if="newsInfo.content">
              <div>
                <img
                style="margin-right: 6px;"
                src="~@/assets/imgs/trz/zhengwen.png"
                width="14"
                height="14"/>正文
              </div>
            </div>
            <div class="content" v-html="newsInfo.content"></div>
            <div class="btn-area">
              <div
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 46%;
                "
              >
                <router-link
                  :to="{ path: '/trz/news/' + prevNews.data_id }"
                  target="_blank"
                  class="btn"
                  v-if="Object.keys(prevNews).length > 0"
                >
                  上一篇：<span class="prev" :title="prevNews.title">{{
                    prevNews.title
                  }}</span>
                </router-link>
              </div>
              <div
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 46%;
                  text-align: right;
                "
              >
                <router-link
                  :to="{ path: '/trz/news/' + nextNews.data_id }"
                  target="_blank"
                  class="btn"
                  v-if="Object.keys(nextNews).length > 0"
                >
                  下一篇：<span class="next" :title="nextNews.title">{{
                    nextNews.title
                  }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="right-content">
          <div class="card">
            <div class="card-title">
              <div>
                <img
                  src="~@/assets/imgs/trz/speaker.png"
                  class="speacker"
                  width="16"
                  height="13"
                />
                相关资讯
              </div>
              <!-- <div class="refresh-btn" @click="refreshNews">刷新</div> -->
              <div class="refresh-btn" @click="goNewsList" v-if="newsCount>6">查看更多</div>
            </div>
            <div class="content">
              <div class="news-list">
                <div
                  class="news-item"
                  v-for="(item, index) in newsList"
                  :key="index"
                >
                  <div
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      margin-bottom: 10px;
                    "
                  >
                    <router-link
                      :to="{ path: '/trz/news/' + item.data_id }"
                      class="news-text"
                      target="_blank"
                      :title="item.title"
                      >{{ item.title }}</router-link
                    >
                  </div>
                  <div class="news-info">
                    <div class="news-date">
                      <img
                        src="~@/assets/imgs/trz/clock.png"
                        class="clock"
                        width="14"
                        height="14"
                        v-if="item.fmt_time"
                      />{{ item.fmt_time }}
                    </div>
                    <div class="news-source">
                      <img
                        src="~@/assets/imgs/trz/pin.png"
                        class="pin"
                        width="13"
                        height="14"
                        v-if="item.source"
                      />{{ item.source }}
                    </div>
                  </div>
                </div>
                <LoadingGif
                  :className="'list-in-loading'"
                  :classNameImg="'little-size-loading'"
                  :loadFlag="isLoading"
                  v-if="isLoading"
                ></LoadingGif>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from "@/components/layouts/trz/header.vue"
import LoadingGif from "@/components/common/globalCom/loading-gif.vue"

export default {
  components: { CustomHeader, LoadingGif },
  data() {
    return {
      navs: ['摘要', '正文'],
      newsInfo: {},
      nextNews: {},
      prevNews: {},
      loading: false,
      isLoading: false,
      newsList: [],
      newsCount: 0,
      activeNav: 0,
    };
  },
  mounted() {
    this.getNewsInfo();
    this.getNewList();
  },

  methods: {
    // 获取新闻详情页信息
    getNewsInfo() {
      this.loading = true;
      window
        .Axios({
          method: "get",
          url: "/api/tourongzi_news/read",
          params: {
            id: this.$route.params.id,
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          this.loading = false;
          if (res.data.code === 200 && res.data.data) {
            let data = res.data.data;
            this.newsInfo = data.info;
            console.log(this.newsInfo.content)
            this.newsInfo.content = this.newsInfo.content
              .replace(/style\s*?=\s*?([‘"'])[\s\S]*?\1/gi, "")
              .replace(/(<\/?strong.*?>)/g, "")
              .replace(/<\/strong>/g, "")
              .replace(/(<\/?br.*?>)/g, "")
              .replace(/(<\/?b.*?>)/g, "")
              .replace(/<\/b>/g, "")
              .replace(/(<\/?a.*?>)/g, "")
              .replace(/<\/a>/g, "")
              .replace(/(<\/?script.*?>)/g, "")
              .replace(/<\/script>/g, "")
              .replace(/(<\/?i\s.*?>)/g, "")
              .replace(/<\/i>/g, "")
              .replace(/(<\/?em.*?>)/g, "")
              .replace(/<\/em>/g, "");
            this.nextNews = data.next;
            this.prevNews = data.prev;
            if (!this.newsInfo.digest) {
              this.navs.splice(this.navs.indexOf("摘要"), 1);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取相关资讯
    getNewList() {
      window
        .Axios({
          method: "get",
          url: "/api/tourongzi_news/related",
          params: {
            id: this.$route.params.id,
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          this.isLoading = false;
          if (res.data.code === 200 && res.data.data) {
            let data = res.data.data.res;
            this.newsCount = res.data.data.count
            this.newsList = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 刷新相关资讯
    refreshNews() {
      this.isLoading = true;
      this.newsList = [];
      this.getNewList();
    },

    // 相关资讯查看更多
    goNewsList() {
      let routeData = this.$router.resolve({
        path: "/trz/news",
        query: {
          filter_condition: JSON.stringify({ category: [`${this.newsInfo.sort}`] })
        }
      });
      window.open(routeData.href, "_blank");
    },

    // 左侧按钮定位事件
    positionPanel(index) {
      this.goTop(index);
    },
  }
};
</script>

<style lang="less" scoped>
.news-detail {
  min-width: 1280px;
  .detail-container {
    width: calc(100vw - 20px);
    min-height: calc(100vh - 78px);
    min-width: 1280px;
    margin: 68px 0 0 0;

    /deep/ img {
      max-width: 600px;
    }

    .title,
    .second-title {
      padding-left: 20px;
    }

    .title {
      height: 18px;
      line-height: 18px;
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: calc(100vw - 360px);
      min-width: 1000px;
    }

    .clock,
    .pin {
      margin-right: 6px;
    }

    .second-title {
      display: flex;
      align-items: center;
      height: 14px;
      line-height: 14px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      margin-bottom: 20px;

      .pin {
        margin-left: 20px;
      }
    }

    .cards {
      display: flex;
      min-width: 1200px;
      .left-content,
      .middle-content {
        margin-right: 10px;
      }

      .left-content {
        width: 230px;
        padding: 5px 0;
        box-sizing: border-box;
        .card {
          height: calc(100vh - 140px);
        }
      }

      .middle-content {
        width: calc(100% - 560px);
        height: calc(100vh - 140px);
        overflow: auto;
        padding: 5px;
        box-sizing: border-box;
        position: relative;
        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .info-list {
            display: flex;
            flex-wrap: wrap;
            .summary-item {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              width: 49.5%;
              div {
                width: 70px;
                height: 14px;
                line-height: 14px;
                font-size: 14px;
                font-weight: 400;
                color: #666666;
                display: flex;
                justify-content: space-between;
              }
              .link {
                line-height: 14px;
                font-size: 14px;
                font-weight: 400;
                color: #3556b9;
                text-decoration: none;
              }
            }
          }
        }

        .btn-area {
          width: calc(100% - 40px);
          border-top: 1px dotted #dae0e9;
          margin-top: 108px;
          height: 60px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .btn {
            height: 22px;
            line-height: 22px;
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            cursor: pointer;
            text-decoration: none;

            .prev,
            .next {
              color: #09144f;

              &:hover {
                color: #e7af2f;
              }
            }
          }
        }
      }

      .card {
        width: 100%;
        background: #ffffff;
        box-shadow: 0 1px 6px 0px rgba(9, 20, 79, 0.19);
        border-radius: 4px;
        position: relative;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        .card-title {
          width: calc(100% - 40px);
          height: 16px;
          line-height: 36px;
          background: #f5f8fc;
          border-radius: 4px 4px 0px 0px;
          padding: 10px 20px;
          font-size: 16px;
          font-weight: 600;
          color: #0d1a62;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          .refresh-btn {
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 400;
            color: #3556b9;
          }
        }
        .summary-list {
          .summary-item {
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 400;
            color: #09144f;
            padding: 12px 20px;
            border-left: 2px solid #fff;
            cursor: pointer;
            position: relative;
            &::after {
              content: "";
              width: calc(100% - 40px);
              position: absolute;
              bottom: 0;
              left: 20px;
              border-bottom: 1px dashed #dae0e9;
            }
            &.active,
            &:hover {
              background-color: #f5f8fc;
              border-left: 2px solid #e7af2f;
            }

            &.active::after {
              border-bottom: none;
            }
          }
        }
        .content {
          padding: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 28px;
          /deep/ .new {
            color: #333333 !important;
          }
          .news-list {
            margin-top: 10px;
            .news-item {
              &:not(:last-child) {
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px dotted #dae0e9;
              }
              .news-text {
                font-size: 13px;
                font-weight: 400;
                color: #333333;
                margin-bottom: 10px;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:hover {
                  color: #e7af2f;
                  text-decoration: none;
                }
              }
              .news-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 14px;
                line-height: 14px;
                font-size: 12px;
                font-weight: 400;
                color: #999999;

                .news-date,
                .news-source {
                  display: flex;
                  align-items: center;
                }
              }
            }
          }
        }
      }
      .right-content {
        padding: 5px 0;
        box-sizing: border-box;
      }
      .right-content .card {
        width: 300px;
        .content {
          padding: 10px 20px;
        }
      }
    }
  }
}
</style>
