<template>
  <div class="chart-box">
    <div class="chart-title">{{title}}</div>
    <!-- 插槽 - 插入echarts（最好是具名id） -->
    <slot></slot>
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
      default: () => {
        return ''
      }
    }
  },
  mounted() {
    
  },
}
</script>

<style lang="less" scoped>
@import "@/assets/less/app.less";
@import "@/assets/less/var.less";

.chart-box {
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  margin: 8px 0px;
  width: calc(50% - 8px);
  background-color: @White;
  box-shadow: @BoxShadow;
  overflow: hidden;
  transition: all 300ms;
  canvas {
    width: 100%!important;
  }
  .chart-title {
    box-sizing: border-box;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    padding-left: 5px;
    line-height: 40px;
    background-color: @GrayBackgroundColor;
    border-left: 5px solid @PrimaryColor;
  }
  .cp-echarts {
    
  }
  &:hover {
    transition: all 300ms;
    box-shadow: @BoxShadowHover;
  }
}

@media screen and (max-width: 1500px) {
  .chart-box {
    width: 100%;
  }
}
</style>
