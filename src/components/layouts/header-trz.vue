<template>
  <div class="header-trz" ref="header-trz">
    <div class="header-content">
      <div class="logo">
        <img src="~@/assets/imgs/trz/logo.png" @click="linkTo('/trz')" />
      </div>
      <div class="menu">
        <router-link tag="span" to="/trz/home" active-class="active" exact
          >首页</router-link
        >
        <span>
          <div class="title">
            找投资
            <img src="~@/assets/imgs/trz/dropdown-icon.png" class="arrow" />
          </div>
          <div class="menu-items fadeInUp">
            <router-link
              tag="span"
              to="/trz/jigou"
              active-class="submenu-active"
              class="menu-item"
              exact
              >投资机构</router-link
            >
          </div></span
        >
        <span>
          <div class="title">
            寻项目
            <img src="~@/assets/imgs/trz/dropdown-icon.png" class="arrow" />
          </div>
          <div class="menu-items fadeInUp">
            <router-link
              tag="span"
              to="/trz/rongzi"
              active-class="submenu-active"
              class="menu-item"
              exact
              >投融资事件</router-link
            >
            <img src="~@/assets/imgs/trz/menu-line.png" class="menu-line" />
            <router-link
              tag="span"
              to="/trz/binggou"
              active-class="submenu-active"
              class="menu-item"
              exact
              >并购事件</router-link
            >
          </div></span
        >
        <span>
          <div class="title">
            看企业
            <img src="~@/assets/imgs/trz/dropdown-icon.png" class="arrow" />
          </div>
          <div class="menu-items fadeInUp">
            <router-link
              tag="span"
              to="/trz/qiye"
              active-class="submenu-active"
              class="menu-item"
              exact
              >融资企业</router-link
            >
          </div></span
        >
        <router-link tag="span" to="/trz/news" active-class="active" exact
          >新闻动态</router-link
        >
        <router-link tag="span" to="/trz/analy" active-class="active" exact
          >数据分析</router-link
        >
      </div>
      <div class="userinfo">
        <div class="el-dropdown-link">
          <router-link to="/usercenter" class="avatar">
            <span class="user-img-wrap">
              <img class="user-img" :src="accountData.picture" />
            </span>
            <span class="user-name">{{ accountData.username }}</span>
          </router-link>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "trz-header",
  mounted() {
    $(".submenu-active")
      .parent()
      .parent()
      .addClass("active")
      .siblings()
      .removeClass("active");
    if (this.$route.name == "database_trz_index") {
      $(".header-trz").addClass("transparent");
      $(".header-trz").addClass("home-head");
      window.addEventListener("scroll", this.handleScrolls, true);
    }
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScrolls);
  },
  computed: {
    ...mapState({
      accountData: state => state.UserCenter.accountData
    })
  },
  methods: {
    linkTo(path) {
      this.$router.push({
        path
      });
    },
    handleScrolls() {
      if (this.$route.name == "database_trz_index") {
        let top = document.querySelector(".el-scrollbar__wrap").scrollTop;
        if (top > $(".header-trz").height()) {
          $(".header-trz").removeClass("transparent");
        } else {
          $(".header-trz").addClass("transparent");
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header-trz {
  height: 48px;

  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 999;
  background: rgb(9, 20, 79);
  padding: 0 20px;
  top: 0;
  left: 0;
  box-sizing: border-box;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 45%, 0);
      transform: translate3d(0, 45%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  &.home-head {
    height: 64px;
    .header-content {
      width: 1200px;
    }
  }
  &.transparent {
    background: transparent;
  }
  .fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }
  &.home-head {
    height: 64px;
    .header-content {
      width: 1200px;
    }
  }
  &.transparent {
    background: transparent;
  }

  .header-content {
    height: 44px;
    width: 100%;
    min-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;

    .logo {
      display: flex;
      align-items: center;
      margin-right: 90px;
      img {
        width: 143px;
        height: 34px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .menu {
      height: 100%;
      .title {
        padding-bottom: 20px;
        margin-top: 20px;
      }
      span {
        color: #ffffff;
        line-height: 22px;
        font-size: 16px;
        font-weight: 400;
        display: inline-flex;
        align-items: center;
        position: relative;

        &:hover {
          cursor: pointer;
        }

        &:hover > .arrow {
          transform: rotate(180deg);
          transition: 0.6s ease-in-out;
        }

        &:hover {
          .menu-items {
            display: block;
          }
        }

        .menu-items {
          animation-duration: 0.6s;
          animation-fill-mode: forwards;
          position: absolute;
          top: 50px;
          left: 0;
          width: 120px;
          display: none;
          background: #f6f8fc;
          border-radius: 4px;
          padding: 10px;

          .submenu-active {
            color: #182462 !important;
          }

          .menu-item {
            height: 20px;
            line-height: 20px;
            font-size: 14px;

            font-weight: 400;
            color: #666666;
          }

          .menu-line {
            width: 118px;
            height: 1px;
            margin: 10px auto;
            display: flex;
          }
        }
      }

      & > :not(:last-child) {
        margin-right: 50px;
        // padding-bottom: 20px !important;
      }

      .active {
        color: #e7af2f !important;
        position: relative;

        &::after {
          content: "";
          top: 24px;
          left: 0;
          position: absolute;
          width: 100%;
          height: 2px;
          background: #e7af2f;
        }
      }

      .arrow {
        margin-left: 6px;
        width: 12px;
        height: 7px;
      }
    }
    .userinfo {
      position: absolute;
      right: 0;
      .avatar {
        text-decoration: none;
        display: flex;
        align-items: center;
        padding-left: 0;
        .user-img-wrap {
          float: left;
          width: 34px;
          height: 34px;
          border-radius: 34px;
          border: 1px solid #fff;
          overflow: hidden;
          .user-img {
            float: left;
            width: 34px;
            height: 34px;
          }
        }
        .user-name {
          color: #fff;
          font-size: 13px;
          max-width: 90px;
          float: left;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
