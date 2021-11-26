<template>
  <div>
    <!-- 自定义加载界面 -->
    <LoadingGif :loadFlag="isLoading" v-if="isLoading"></LoadingGif>
    <!-- 加载完成显示部分 -->
    <div class="main-wrap" v-else>
      <MainTop :title="title" :countShow="false">
        <Input
          class="title-input"
          placeholder="搜索数据库关键词"
          @updateValue="(i, val) => (keyValue = val)"
          v-model="keyValue"
        />
      </MainTop>
      <div class="main-list-wrap">
        <div v-for="(item, i) in navList" :key="i">
          <div class="column" v-if="item.group.length > 0">
            <div class="head">
              <span class="title">{{ item.label }}</span>
            </div>
            <ul class="ul-list-wrap">
              <li v-for="(items, j) in item.group" :key="j">
                <a
                  target="_blank"
                  v-if="items.is_outerlink"
                  :href="items.href + urlParam"
                >
                  <span v-html="colorKeyword(items.label, keyValue)"></span>
                  <span class="iconfont">&#xe60b;</span>
                </a>
                <router-link
                  v-else
                  :to="'/' + items.href + urlParam"
                  v-html="colorKeyword(items.label, keyValue)"
                ></router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="empty-wrap" v-if="navList.length === 0">
          <img src="@/assets/imgs/menu-nodata-grey.png" />
          <div class="msg">
            对不起，小智暂时没有找到相关数据，换个关键词试试吧~
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingGif from "@/components/common/globalCom/loading-gif.vue";
import MainTop from "@/components/common/main-top.vue";
import Input from "@/components/inputs/input.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "导航地图",
      isLoading: true,
      navList: [],
      urlParam: "?ga_source=vip&ga_name=navmap",
    };
  },
  computed: {
    ...mapState({
      navMapData: (state) => state.Nav.navMapData,
      navMapList: (state) => state.Nav.navMapList,
      userData: (state) => state.UserCenter.accountData,
    }),
    keyValue: {
      get: () => {
        return Store.state.Nav.keyValue;
      },
      set: (val) => {
        Store.commit("Nav/setKeyValue", val);
      },
    },
  },
  components: {
    LoadingGif,
    MainTop,
    Input,
  },
  watch: {
    keyValue(val) {
      this.updateValue(val);
    },
    userData(val) {
      this.getNavData();
    },
  },
  methods: {
    getNavData() {
      if (this.navMapData.length === 0) {
        Store.dispatch("Nav/getNavMapData").then(() => {
          this.setNavList();
        });
      } else {
        this.setNavList();
      }
    },
    setNavList() {
      this.isLoading = false;
      this.navMapData.forEach((item) => {
        if (item.label == "市场") {
          item.group.forEach((item2) => {
            if (item2.title == "医院销售数据") {
              item2.href = "yyxsdata?type_id=2";
            }
          });
        }
      });
      this.navList = this.navMapData;
      if (this.keyValue) {
        this.updateValue(this.keyValue);
      }
    },
    updateValue: window._.debounce(function (val) {
      Store.commit("Nav/updateValue", val);
      this.keyValue = val;
      this.navList = this.navMapList;
    }, 300),
    colorKeyword(word, key) {
      // 高亮关键词
      word = word.replace(key, `<span style='color:#ffab2a'>${key}</span>`);
      return word;
    },
  },
  created() {
    if (this.userData.grade_id) {
      this.getNavData();
    }
    setTimeout(() => {
      const hashLocation = sessionStorage.getItem("hashLocation"); //缓存中获取当前页面的路由名称
      // 注意, 这里使用全路径匹配,在hash模式中,因为地址会携带#,所以页面报告中的url需要重新覆盖一下, 将#去除
      window._paq.push(["setCustomUrl", "https://" + hashLocation]); //覆盖页面报告的url，可以自定义页面url，加上本页面路由
      window._paq.push(["trackPageView", "导航地图"]); //页面名称,可以自定义页面名称
      window._paq.push(["setDocumentTitle", "导航地图"]);
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
@import "@/assets/less/var.less";
.title-input {
  margin-left: 30px;
  /deep/input {
    border-color: #c0c4cc;
    background: unset;

    &:focus {
      border-color: rgb(72, 119, 232);
    }
  }
}
.main-wrap {
  padding: 0 10px 0 20px;
}
.main-list-wrap {
  background: #fff;
  box-shadow: @BoxShadow;
  padding-bottom: 30px;
  border-radius: 4px;
}
.column {
  padding: 10px 0;
}
.head {
  height: 32px;
  line-height: 32px;
  border-bottom: 1px solid #dfe5f1;
  .title {
    display: inline-flex;
    margin-left: 26px;
    font-size: 14px;
    color: @PrimaryColor;
    height: 29px;
    line-height: 29px;
    border-bottom: 3px solid @PrimaryColor;
  }
}
.ul-list-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px 0 60px;
  li {
    width: 25%;
    text-align: left;
    margin-top: 15px;
    a {
      position: relative;
      font-size: 13px;
      color: @FontColor;
      &:before {
        position: absolute;
        content: "";
        width: 6px;
        height: 6px;
        background: @FontColor;
        border-radius: 6px;
        left: -10px;
        top: 46%;
        transform: translateY(-50%);
      }
      &:hover {
        color: @PrimaryColor;
        text-decoration: none;
        &:before {
          background: @PrimaryColor;
        }
      }
    }
    .iconfont {
      font-size: 12px;
      margin-left: 5px;
    }
  }
}
.empty-wrap {
  text-align: center;
  padding: 120px 0;
  .msg {
    margin-top: 15px;
  }
}

/deep/.sec1 {
  display: inline-flex !important;
  align-items: center !important;
}
</style>
