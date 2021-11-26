<template>
  <div class="slide-lan">
    <div class="header">
      <div class="lc">{{title}}</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    title: {
      type: String,
      default: '基本信息'
    },
  }
}
</script>

<style lang="less">
  @import "@/assets/less/var.less";

  // middle
  .slide-lan {
    width: 99.3%;
    background-color: #fff;
    .content {
      width: 90%;
      background: #fff;
      padding: 30px 65px;
      border-bottom: 2px solid #dfe5f1;
    }
    .header {
      background-color: #fff;
      box-sizing: border-box;
      height: 24px;
      line-height: 24px;
      .lc {
        position: relative;
        display: inline-block;
        margin-left: 32px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        padding: 0px 10px 0px 4px;
        font-weight: bold;
      }

      .lc::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 8px;
        width: 4px;
        height: 14px;
        background-color: #333;
      }
    }
  }

  @media screen and (max-width: 1920px) {
    .slide-lan {
      .content {
        // padding-right: 90px;
      }
    }
  }
  @media screen and (max-width: 1440px) {
    .slide-lan {
      .content {
        // padding-right: 90px;
      }
    }
  }

</style>
