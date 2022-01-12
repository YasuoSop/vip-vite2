<template>
  <div class="chart-box">
    <div class="chart-title">{{title}}
      <el-tooltip
        v-if="statement"
        class=""
        effect="zhuce"
        placement="right"
      >
        <div slot="content" v-html="statement"></div>
        <i
          class="el-icon-question cl-green"
          style="margin-left: 4px; line-height: 28px"
        ></i>
      </el-tooltip>

      <span style="margin-left: 30px;" v-if="title=='同品种国家排行'">{{gjCname}}</span>
      <span style="margin-left: 30px;" v-if="title=='同品种上市趋势'">{{shCname}}</span>
    </div>
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
    gjCname: {
      type: String,
      default: () => {
        return ''
      }
    },
    shCname: {
      type: String,
      default: () => {
        return ''
      }
    },
    statement:{
      type: String,
      default: () => {
        return ''
      }
    },
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
@import "~@/assets/less/app.less";
@import "~@/assets/less/var.less";

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
