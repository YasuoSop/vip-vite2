<template>
  <div class="analy-wrapeer">
    <!-- 自定义加载界面 -->
    <LoadingGif
      :className="'db-index-loading'"
      :loadFlag="analyLoading"
      v-if="analyLoading"
    ></LoadingGif>
    <!-- 加载完成显示部分 -->
    <div class="chart">
      <!-- 顶部统计 -->
      <div class="chart_top">
        <div class="newtotals">
          <div
            class="iconfont newtotals-arrow newtotals-left"
            @click="handleShowScrollLeft"
          >
            &#xe64e;
          </div>
          <div
            class="iconfont newtotals-arrow newtotals-right"
            @click="handleShowScrollRight"
          >
            &#xe64f;
          </div>
          <div class="newtotals-scroll">
            <div class="newtotals-scroll-inner">
              <ul class="total-item">
                <li class="li1">申报量</li>
                <li class="li2">
                  总计<span>{{ basic.total[0] }}</span
                  >个
                </li>
                <li class="li3">报临床{{ basic.total[1] }}个</li>
                <li class="li3">报生产{{ basic.total[2] }}个</li>
              </ul>
              <ul class="total-item">
                <li class="li1">申报最多</li>
                <li class="li2">
                  <span>{{ basic.shenbaonum[0] }}年</span>最多
                </li>
                <li class="li3">共{{ basic.shenbaonum[1] }}个</li>
              </ul>
              <ul class="total-item">
                <li class="li1">已批准</li>
                <li class="li2">
                  总计<span>{{ basic.pizhun[0] }}</span
                  >个
                </li>
                <li class="li3">批准率{{ basic.pizhun[1] }}</li>
              </ul>
              <ul class="total-item">
                <li class="li1">产品</li>
                <li class="li2">
                  申报<span>{{ basic.shenbaoname[0] }}</span
                  >个
                </li>
                <li class="li3">独立产品{{ basic.shenbaoname[1] }}个</li>
                <li class="li3">
                  {{ basic.shenbaoname[2] }}申报最多,共{{
                    basic.shenbaoname[3]
                  }}个
                </li>
              </ul>
              <ul class="total-item">
                <li class="li1">省份</li>
                <li class="li2">
                  总计<span>{{ basic.shenbaoshengfen[0] }}</span
                  >个
                </li>
                <li class="li3">{{ basic.shenbaoshengfen[1] }}最多</li>
                <li class="li3">共{{ basic.shenbaoshengfen[2] }}个</li>
              </ul>
              <ul class="total-item">
                <li class="li1">申报企业</li>
                <li class="li2">
                  共<span>{{ basic.shenbaoqiye[0] }}</span
                  >家
                </li>
                <li class="li3">{{ basic.shenbaoqiye[1] }}最多</li>
                <li class="li3">共{{ basic.shenbaoqiye[2] }}个</li>
              </ul>
              <ul class="total-item">
                <li class="li1">优先审评</li>
                <li class="li2">
                  总计<span>{{ basic.yxsp }}</span
                  >个
                </li>
              </ul>
              <ul class="total-item">
                <li class="li1">特殊审批</li>
                <li class="li2">
                  总计<span>{{ basic.tspz }}</span
                  >个
                </li>
              </ul>
              <ul class="total-item">
                <li class="li1">重大专项</li>
                <li class="li2">
                  总计<span>{{ basic.zdzx }}</span
                  >个
                </li>
              </ul>
              <ul class="total-item">
                <li class="li1">一致性评价</li>
                <li class="li2">
                  总计<span>{{ basic.yzxpj }}</span
                  >个
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="chart_bottom">
        <div class="go-list">
          <router-link tag="a" :to="{ path: '/zhuce/list.vue' }"
            >返回列表</router-link
          >
        </div>
        <div class="chart-boxes">
          <DbEcharts title="申报趋势">
            <div id="sbqs-line" class="echarts">
              <div class="nodata-box"></div>
            </div>
          </DbEcharts>
          <DbEcharts title="申报数量">
            <div id="sbqs-bar" class="echarts">
              <div class="nodata-box"></div>
            </div>
          </DbEcharts>
          <DbEcharts title="申请类型">
            <div id="sqlx-bar" class="echarts">
              <div class="nodata-box"></div>
            </div>
          </DbEcharts>
          <DbEcharts title="药品类型">
            <div id="yplx-bar" class="echarts">
              <div class="nodata-box"></div>
            </div>
          </DbEcharts>
          <DbEcharts title="审评结论">
            <div id="spjl-pie" class="echarts">
              <div class="nodata-box"></div>
            </div>
          </DbEcharts>
          <DbEcharts title="办理状态">
            <div id="blzt-bar" class="echarts">
              <div class="nodata-box"></div>
            </div>
          </DbEcharts>
          <DbEcharts title="ATC分类">
            <div id="ylfl-pie" class="echarts">
              <div :class="atcs_sel ? 'nodata-box-atc' : 'nodata-box'"></div>
            </div>
          </DbEcharts>
          <DbEcharts title="剂型">
            <div id="jx-bar" class="echarts">
              <div class="nodata-box"></div>
            </div>
          </DbEcharts>
          <DbEcharts title="企业排名">
            <div id="qypm-bar" class="echarts">
              <div class="nodata-box"></div>
            </div>
          </DbEcharts>
          <DbEcharts title="申报地区">
            <div id="sbdq-map" class="echarts">
              <div class="nodata-box"></div>
            </div>
          </DbEcharts>
        </div>
      </div>
      <!-- 展开效果 -->
      <div class="dialog hide">
        <div class="menu">
          <div
            v-for="(ti, index) in title"
            v-bind:class="[index == openIndex ? 'active' : '', 'nav']"
            @click="handleOpenIndex(index)"
            :key="index"
          >
            {{ ti }}
          </div>
        </div>
        <div class="echarts-items-wap">
          <div class="echarts-items-title">
            <span class="echart-title">{{ title[openIndex] }}</span>
            <a
              class="esc-btn"
              href="javascript:;"
              @click="handleDialogVisible(false)"
              ><i></i
              ><img
                src="/static/imgs/echarts/esc-fullscreen.png"
                alt="退出全屏"
            /></a>
          </div>
          <div class="echarts-items">
            <!-- 申报趋势 -->
            <div class="echarts-item">
              <!-- 折线图 -->
              <div id="sbqs-line-open" class="open-charts"></div>
            </div>
            <div class="echarts-item">
              <!-- 条形图 -->
              <div id="sbqs-bar-open" class="open-charts"></div>
            </div>
            <div class="echarts-item">
              <!-- 申请类型 -->
              <div id="sqlx-bar-open" class="open-charts"></div>
            </div>
            <div class="echarts-item">
              <!-- 药品类型 -->
              <div id="yplx-bar-open" class="open-charts"></div>
            </div>
            <div class="echarts-item">
              <!-- 审评结论 -->
              <div id="spjl-pie-open" class="open-charts"></div>
            </div>
            <div class="echarts-item">
              <!-- 办理状态 -->
              <div id="blzt-bar-open" class="open-charts"></div>
            </div>
            <div class="echarts-item">
              <!-- ATC分类 -->
              <div id="ylfl-pie-open" class="open-charts"></div>
            </div>
            <div class="echarts-item">
              <!-- 剂型 -->
              <div id="jx-bar-open" class="open-charts"></div>
            </div>
            <div class="echarts-item">
              <!-- 企业排名 -->
              <div id="qypm-bar-open" class="open-charts"></div>
            </div>
            <div class="echarts-item">
              <!-- 申报地区 -->
              <div id="sbdq-map-open" class="open-charts"></div>
            </div>
          </div>
          <div class="ctr-actions">
            <el-button
              class="pre action"
              @click="handleOpenIndex(openIndex - 1)"
              ><i class="el-icon-arrow-left"></i
            ></el-button>
            <el-button
              class="next action"
              @click="handleOpenIndex(openIndex + 1)"
              ><i class="el-icon-arrow-right"></i
            ></el-button>
          </div>
          <div class="nodata-box fullcharts hide">
            <div :class="atcs_sel ? 'nodata-box-atc' : 'nodata-box'"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingGif from "@/components/common/globalCom/loading-gif.vue";
import DbEcharts from "@/components/common/db-echarts.vue";
import * as echarts from "echarts";
import { mapState, mapGetters, createLogger } from "vuex";

var _res = {};
const myicon = {
  open: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
};

export default {
  components: {
    LoadingGif,
    DbEcharts,
  },
  data() {
    return {
      itemWidth: 700,
      promise: null,
      loading: true,
      dialogVisible: false,
      initopen: false, //控制渲染一次
      openIndex: 0, //控制展开第几个图形
      title: [
        "申报趋势",
        "申报数量",
        "申请类型",
        "药品类型",
        "审评结论",
        "办理状态",
        "ATC分类",
        "剂型",
        "企业排名",
        "申报地区",
      ], //图形标题
      basic: {
        total: [],
        shenbaonum: [],
        pizhun: [],
        shenbaoname: [],
        shenbaoshengfen: [],
        shenbaoqiye: [],
        yxsp: 0,
        tspz: 0,
        zdzx: 0,
        yzxpj: 0,
      },
      sbqs_line: {
        echarts: null,
        legend_data: ["申报数量", "批准"],
        xAxis_data: [],
        series_data: [],
        data_error: false,
      },
      sbqs_bar: {
        echarts: null,
        legend_data: [
          "待受理",
          "已受理",
          "待审评",
          "在审评审批中",
          "待审批",
          "在审评",
          "审批完毕－待制证",
          "制证完毕－待发批件 ",
          "制证完毕－等待交回旧证",
          "制证完毕－已发批件",
          "已备案",
          "已发通知件",
          "已取批件",
          "资料在邮寄",
          "已缴费",
        ],
        yAxis_data: [],
        series_data: [],
      },
      sqlx_bar: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
      },
      yplx_bar: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
      },
      spjl_pie: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
      },
      blzt_bar: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
      },
      // 由于剂型总数量太多，jx_bar用于存储最多15个（在首页显示），jx_open_bar存储全部（在全屏显示）
      jx_bar: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
      },
      jx_open_bar: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
      },
      ylfl_pie: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
      },
      qypm_bar: {
        echarts: null,
        yAxis_data: [],
        series_data: [],
      },
      // 申报地区 - map、bar、pie
      sbdq_map: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
        max: 0,
      },
      // sbdq_bar包含bar和pie的数据
      sbdq_bar: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
      },
      // sbdq_bar包含了bar和pie的数据，sbdq_pie暂不用
      sbdq_pie: {
        echarts: null,
        xAxis_data: [],
        series_data: [],
      },
      // 记录大屏智能分析的无数据的选项卡
      recordNoData: new Set(),
      atcs_sel: false, //药理分类是否多分类
    };
  },
  computed: {
    ...mapState({
      kshRes: (state) => state.Zhuce.kshRes,
      analyLoading: (state) => state.Zhuce.analyLoading,
      nopms: (state) => state.Zhuce.nopms,
      conditions: (state) => state.Zhuce.conditions,
      res1: (state) => state.Zhuce.res1,
      res2: (state) => state.Zhuce.res2,
      res3: (state) => state.Zhuce.res3,
      activeTabName: (state) => state.Zhuce.tabname,
    }),
    noData() {
      return !this.res1.res && !this.res2.length && !this.res3.length;
    },
  },
  watch: {
    kshRes() {
      if (this.$route.path == "/zhuce/analy") {
        this.update();
      }
    },
    $route(newVal, oldVal) {
      if (this.$route.path === "/zhuce/analy" && !this.kshRes.basic) {
        this.loadData();
      }
      if (this.$route.path === "/zhuce/analy") {
        window.addEventListener("resize", this.echartsResizeHandler);
      } else {
        window.removeEventListener("resize", this.echartsResizeHandler);
        this.echartsClear("open-charts");
        this.echartsClear("echarts");
      }
      if (this.$route.path === "/zhuce/list.vue") {
        //智能分析重新搜索清空列表数据tab无法自动复位
        let tabname = this.activeTabName;
        Store.commit("Zhuce/tabname", "");
        Store.commit("Zhuce/tabname", tabname);
        this.noData &&
          Store.dispatch("Zhuce/nomalSearch", {
            queryToPutong: false,
            tabs: true,
          });
      }
    },
    dialogVisible() {
      if (this.dialogVisible) {
        $(".dialog").removeClass("hide");
        this.initLayout();
        this.echartsResize("open-charts");
      } else {
        $(".dialog").addClass("hide");
      }
    },
  },
  methods: {
    getImgName(i) {
      return `药智数据企业版-${document.title}-智能分析-${this.title[i]}`;
    },
    initLayout() {
      let screen_width = window.innerWidth;
      let screen_height = window.innerHeight;
      this.itemWidth = screen_width - 244;
      $(".dialog .echarts-items-wap").css("height", screen_height - 50);
      $(".dialog .echarts-items-wap").css("width", screen_width - 244);
      $(".dialog .echarts-items")
        .width((this.itemWidth + 12) * 10)
        .css("margin-left", -this.openIndex * this.itemWidth);
      $(".dialog .echarts-item").width(this.itemWidth - 100);
    },
    loadData: _.debounce(function () {
      this.promise = Store.dispatch("Zhuce/getKshRes").then((res) => {
        this.update();
        return res;
      });
    }, 10),
    handleOpenIndex(index) {
      if (index > 0 && index < 10) {
        this.openIndex = index;
      } else {
        this.openIndex = 0;
      }
      // 显示 no-data 提示图片
      if (this.recordNoData.has(this.openIndex)) {
        $(".fullcharts").show();
      } else {
        $(".fullcharts").hide();
      }
      $(".echarts-items").css("margin-left", -this.openIndex * this.itemWidth);
    },
    update() {
      if (typeof this.kshRes.basic != "undefined") {
        this.basic = this.kshRes.basic;
        /* Store.commit("Zhuce/extendCount", {
          BaseCount: Number(this.basic.total[0] || 0),
          NameCount: Number(this.basic.shenbaoname[0]),
          QiyeCount: Number(this.basic.shenbaoqiye[0]),
        }) */

        this.dealSbqsLine(this.kshRes.pizhun, this.kshRes.shenbaoshuliang);
        this.dealSbqsBar(this.kshRes.shenbaobanli);
        this.dealSqlxBar(this.kshRes.shenqingleixing);
        this.dealYplxBar(this.kshRes.yaopinleixing);
        this.dealSpjlPie(this.kshRes.xulie);
        this.dealBlztBar(this.kshRes.guifanzhuangtaizhongwen);
        this.dealYlflPie(this.kshRes.atc);
        this.dealJxBar(this.kshRes.guifanjixing);
        this.dealQypmBar(this.kshRes.guifanqiyezhongbiao);
        this.dealSbdqMap(this.kshRes.shengfen);
      }
    },
    //初始化全屏图形
    initOpendKsh(index) {
      var _that = this;
      this.loading = true;
      this.dialogVisible = true;
      //使用定时器 解决echarts无法在隐藏元素绘制图形问题
      if (!_that.initopen) {
        _that.loading = false;
        setTimeout(() => {
          _that.initLayout();
          _that.initopen = true;
          _that.drawSbqsLineOpen();
          _that.drawSbqsBarOpen();
          _that.drawSqlxBarOpen();
          _that.drawYplxBarOpen();
          _that.drawSpjlPieOpen();
          _that.drawBlztBarOpen();
          _that.drawYlflPieOpen();
          _that.drawJxBarOpen();
          _that.drawQypmBarOpen();
          _that.drawSbdqMapOpen();

          _that.handleOpenIndex(index);
          this.loading = false;
        }, 500);
      } else {
        this.handleOpenIndex(index);
        this.loading = false;
      }
    },
    // 申报趋势折线图
    dealSbqsLine(pizhun, shenbaoshuliang) {
      var xAxis_data = [];
      var series_data = [[], []];

      var allData =
        pizhun.length > shenbaoshuliang.length ? pizhun : shenbaoshuliang;
      var shortData = allData === shenbaoshuliang ? pizhun : shenbaoshuliang;

      if (shenbaoshuliang.length) {
        allData.forEach((item) => {
          let currentIndex = shortData.findIndex(
            (el) => el.key_as_string == item.key_as_string
          );
          xAxis_data.push(item.key_as_string);
          let shenbaoValue =
            currentIndex !== -1
              ? allData === shenbaoshuliang
                ? item.doc_count
                : shortData[currentIndex].doc_count
              : allData === shenbaoshuliang
              ? item.doc_count
              : "";
          let pizhunValue =
            currentIndex !== -1
              ? shortData === pizhun
                ? shortData[currentIndex].doc_count
                : item.doc_count
              : shortData === pizhun
              ? ""
              : item.doc_count;
          series_data[0].push(shenbaoValue);
          series_data[1].push(pizhunValue);
        });
        this.sbqs_line.xAxis_data = xAxis_data;
        this.sbqs_line.series_data = series_data;
        this.drawSbqsLine();
        console.log(this.sbqs_line);
        this.recordNoData.delete(0);
      } else {
        this.recordNoData.add(0);
        $("#sbqs-line").html('<div class="nodata-box"></div>');
        $("#sbqs-line").removeAttr("_echarts_instance_");
      }
    },
    drawSbqsLine() {
      var _that = this;
      _that.sbqs_line.echarts = echarts.init(
        document.getElementById("sbqs-line")
      );
      _that.sbqs_line.echarts.setOption({
        toolbox: {
          right: "20",
          show: true,
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(0),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.dialogVisible = true;
                _that.initOpendKsh(0);
              },
            },
          },
        },
        legend: {
          show: true,
          bottom: 0,
          data: _that.sbqs_line.legend_data,
        },
        tooltip: {
          trigger: "axis",
          position: "right",
        },
        grid: {
          containLabel: true,
        },
        xAxis: {
          data: _that.sbqs_line.xAxis_data,
        },
        yAxis: {},
        series: [
          {
            name: "申报数量",
            type: "line",
            data: _that.sbqs_line.series_data[0],
          },
          {
            name: "批准",
            type: "line",
            connectNulls: true,
            data: _that.sbqs_line.series_data[1],
          },
        ],
      });
    },
    drawSbqsLineOpen() {
      console.log(this.sbqs_line);
      var _that = this;
      var e = echarts.init(document.getElementById("sbqs-line-open"));
      e.setOption({
        toolbox: {
          right: "20",
          show: true,
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(0),
              icon: "image:///static/imgs/echarts/download.png",
            },
          },
        },
        title: {},
        legend: {
          show: true,
          bottom: 0,
          data: _that.sbqs_line.legend_data,
        },
        tooltip: {
          show: true,
          trigger: "axis",
        },
        grid: {
          containLabel: true,
        },
        xAxis: {
          nameLocation: "end",
          data: _that.sbqs_line.xAxis_data,
        },
        yAxis: {},
        series: [
          {
            name: "申报数量",
            type: "line",
            data: _that.sbqs_line.series_data[0],
          },
          {
            name: "批准",
            type: "line",
            data: _that.sbqs_line.series_data[1],
          },
        ],
      });
    },
    //申报趋势堆形图
    dealSbqsBar(shenbaobanli) {
      var _len = shenbaobanli.length;
      var yAxis_data = [];
      var series_data = [[]];
      var series_data_result = [];
      var legend_data = this.sbqs_bar.legend_data;
      var legend_data_len = this.sbqs_bar.legend_data.length;
      // 数据全为0，显示nodata
      let notAllZero = shenbaobanli.find((item) => {
        return item.guifanzhuangtaizhongwen.find((ite) => {
          return ite.doc_count != 0;
        });
      });
      if (!notAllZero) {
        _len = 0;
      }

      if (_len > 0) {
        for (var k = 0; k < _len; k++) {
          yAxis_data.push(shenbaobanli[k].key_as_string);
        }
        for (var i = 0; i < legend_data_len; i++) {
          series_data[i] = new Array(_len);
          for (var j = 0; j < _len; j++) {
            let gfzt_len = shenbaobanli[j].guifanzhuangtaizhongwen.length;
            let gfzt_key = [];
            for (var n = 0; n < gfzt_len; n++) {
              gfzt_key.push(shenbaobanli[j].guifanzhuangtaizhongwen[n].key);
            }
            let m = _.indexOf(gfzt_key, legend_data[i].trim());
            if (m < 0) {
              series_data[i][j] = 0;
            } else {
              series_data[i][j] =
                shenbaobanli[j].guifanzhuangtaizhongwen[m].doc_count;
            }
          }
        }
        for (var i = 0; i < legend_data_len; i++) {
          series_data_result.push({
            name: legend_data[i],
            type: "bar",
            stack: "状态",
            data: series_data[i],
          });
        }

        this.sbqs_bar.yAxis_data = yAxis_data;
        this.sbqs_bar.series_data = series_data_result;
        this.drawSbqsBar();

        this.recordNoData.delete(1);
      } else {
        this.recordNoData.add(1);
        $("#sbqs-bar").html('<div class="nodata-box"></div>');
        $("#sbqs-bar").removeAttr("_echarts_instance_");
      }
    },
    drawSbqsBar() {
      var _that = this;
      _that.sbqs_bar.echarts = echarts.init(
        document.getElementById("sbqs-bar")
      );
      _that.sbqs_bar.echarts.setOption({
        toolbox: {
          right: "20",
          show: true,
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(1),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.initOpendKsh(1);
              },
            },
          },
        },
        tooltip: {
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = { top: 20 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          type: "scroll",
          bottom: 0,
          data: _that.sbqs_bar.legend_data,
        },
        yAxis: [
          {
            type: "category",
            axisLabel: {
              interval: 0,
            },
            data: _that.sbqs_bar.yAxis_data,
          },
        ],
        xAxis: [
          {
            type: "value",
          },
        ],
        series: _that.sbqs_bar.series_data,
      });
    },
    drawSbqsBarOpen() {
      var _that = this;
      echarts.init(document.getElementById("sbqs-bar-open")).setOption({
        toolbox: {
          right: "20",
          show: true,
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(1),
              icon: "image:///static/imgs/echarts/download.png",
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          type: "scroll",
          bottom: 0,
          data: _that.sbqs_bar.legend_data,
        },
        yAxis: [
          {
            type: "category",
            axisLabel: {
              interval: 0,
            },
            data: _that.sbqs_bar.yAxis_data,
          },
        ],
        xAxis: [
          {
            type: "value",
          },
        ],
        series: _that.sbqs_bar.series_data,
      });
    },
    //申请类型柱状图
    dealSqlxBar(shenqingleixing) {
      let _len = shenqingleixing.length;
      let xAxis_data = [];
      let series_data = [];

      if (_len > 0) {
        shenqingleixing.sort(function (a, b) {
          return b.doc_count - a.doc_count;
        });
        for (var i = 0; i < _len; i++) {
          xAxis_data.push(shenqingleixing[i].label);
          series_data.push(shenqingleixing[i].doc_count);
        }
        console.log(series_data);
        this.sqlx_bar.xAxis_data = xAxis_data;
        this.sqlx_bar.series_data = series_data;
        this.drawSqlxBar();

        this.recordNoData.delete(2);
      } else {
        this.recordNoData.add(2);
        $("#sqlx-bar").html('<div class="nodata-box"></div>');
        $("#sqlx-bar").removeAttr("_echarts_instance_");
      }
    },
    drawSqlxBar() {
      var _that = this;
      _that.sqlx_bar.echarts = echarts.init(
        document.getElementById("sqlx-bar")
      );
      console.log(_that.sqlx_bar.xAxis_data, _that.sqlx_bar.series_data);
      let dataset = {
        dimensions: ["name", "value"],
        source: [],
      };
      _that.sqlx_bar.xAxis_data.forEach((item, i) => {
        dataset.source.push([item, _that.sqlx_bar.series_data[i]]);
      });
      _that.sqlx_bar.echarts.setOption({
        dataset: [dataset],
        xAxis: {
          type: "category",
        },
        yAxis: {},
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(2),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie("sqlx-bar", _that.sqlx_bar, 2);
              },
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.initOpendKsh(2);
              },
            },
          },
        },
        series: [
          {
            type: "bar",
            id: "sqlx",
            universalTransition: true,
            animationDurationUpdate: 1000,
          },
        ],
      });
    },
    drawSqlxBarOpen() {
      var _that = this;
      echarts.init(document.getElementById("sqlx-bar-open")).setOption({
        legend: {
          bottom: 0,
          data: _that.sqlx_bar.legend_data,
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(2),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie(
                  "sqlx-bar-open",
                  _that.sqlx_bar,
                  undefined
                );
              },
            },
          },
        },
        grid: {
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
          },
          data: _that.sqlx_bar.xAxis_data,
        },
        yAxis: {
          type: "value",
          name: "申报数量",
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: _that.sqlx_bar.series_data,
          },
        ],
      });
    },
    //药品类型柱状图
    dealYplxBar(yaopinleixing) {
      let _len = yaopinleixing.length;
      let xAxis_data = [];
      let series_data = [];
      if (_len > 0) {
        yaopinleixing.sort(function (a, b) {
          return b.doc_count - a.doc_count;
        });
        for (var i = 0; i < _len; i++) {
          xAxis_data.push(yaopinleixing[i].label);
          series_data.push(yaopinleixing[i].doc_count);
        }
        this.yplx_bar.xAxis_data = xAxis_data;
        this.yplx_bar.series_data = series_data;
        this.drawYplxBar();

        this.recordNoData.delete(3);
      } else {
        this.recordNoData.add(3);
        $("#yplx-bar").html('<div class="nodata-box"></div>');
        $("#yqlx-bar").removeAttr("_echarts_instance_");
      }
    },
    drawYplxBar() {
      var _that = this;
      _that.yplx_bar.echarts = echarts.init(
        document.getElementById("yplx-bar")
      );
      _that.yplx_bar.echarts.setOption({
        legend: {
          bottom: 0,
          data: _that.yplx_bar.legend_data,
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(3),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie("yplx-bar", _that.yplx_bar, 3);
              },
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.initOpendKsh(3);
              },
            },
          },
        },
        grid: {
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
          },
          data: _that.yplx_bar.xAxis_data,
        },
        yAxis: {
          type: "value",
          name: "数量",
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: _that.yplx_bar.series_data,
          },
        ],
      });
    },
    drawYplxBarOpen() {
      var _that = this;
      echarts.init(document.getElementById("yplx-bar-open")).setOption({
        legend: {
          bottom: 0,
          data: _that.yplx_bar.legend_data,
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(3),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie(
                  "yplx-bar-open",
                  _that.yplx_bar,
                  undefined
                );
              },
            },
          },
        },
        grid: {
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
          },
          data: _that.yplx_bar.xAxis_data,
        },
        yAxis: {
          type: "value",
          name: "数量",
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: _that.yplx_bar.series_data,
          },
        ],
      });
    },
    //审评结论空心饼形图
    dealSpjlPie(xulie) {
      let _len = xulie.length;
      let xAxis_data = [];
      let series_data = [];
      if (_len > 0) {
        // xulie.sort(function(a,b){
        //   return a.doc_count- b.doc_count
        // })
        for (var i = 0; i < _len; i++) {
          xAxis_data.push(xulie[i].label);
          series_data.push({ value: xulie[i].doc_count, name: xulie[i].label });
        }

        // 排序
        for (let index in series_data) {
          for (let i = 0; i < index; i++) {
            if (
              Number(series_data[index].value) > Number(series_data[i].value)
            ) {
              let y = series_data[index];
              let x = xAxis_data[index];
              xAxis_data[index] = xAxis_data[i];
              series_data[index] = series_data[i];
              xAxis_data[i] = x;
              series_data[i] = y;
            }
          }
        }

        this.spjl_pie.xAxis_data = xAxis_data;
        this.spjl_pie.series_data = series_data;
        this.drawSpjlPie();

        this.recordNoData.delete(4);
      } else {
        this.recordNoData.add(4);
        $("#spjl-pie").html('<div class="nodata-box"></div>');
        $("#spjl-pie").removeAttr("_echarts_instance_");
      }
    },
    //审评结论
    drawSpjlPie() {
      var _that = this;
      _that.spjl_pie.echarts = echarts.init(
        document.getElementById("spjl-pie")
      );
      _that.spjl_pie.echarts.setOption({
        legend: {
          type: "scroll",
          bottom: 0,
          data: _that.spjl_pie.xAxis_data,
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(4),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myToggleBar: {
              show: true,
              title: "柱形图",
              icon: "image:///static/imgs/echarts/bar.png",
              onclick() {
                _that.handleToggleBar("spjl-pie", _that.spjl_pie, 4);
              },
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.initOpendKsh(4);
              },
            },
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>数量：{c}<br/>占比：{d}%",
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "75%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "outside",
              },
              emphasis: {
                show: true,
                formatter: "{d}%",
                align: "center",
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: _that.spjl_pie.series_data,
          },
        ],
      });
    },
    drawSpjlPieOpen() {
      var _that = this;
      echarts.init(document.getElementById("spjl-pie-open")).setOption({
        legend: {
          type: "scroll",
          bottom: 0,
          data: _that.spjl_pie.xAxis_data,
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(4),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "柱形图",
              icon: "image:///static/imgs/echarts/bar.png",
              onclick() {
                _that.handleToggleBar(
                  "spjl-pie-open",
                  _that.spjl_pie,
                  undefined
                );
              },
            },
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>数量：{c}<br/>占比：{d}%",
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "75%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "outside",
              },
              emphasis: {
                show: true,
                formatter: "{d}%",
                align: "center",
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: _that.spjl_pie.series_data,
          },
        ],
      });
    },
    //办理状态柱形图
    dealBlztBar(guifanzhuangtaizhongwen) {
      let _len = guifanzhuangtaizhongwen.length;
      let xAxis_data = [];
      let series_data = [];
      if (_len > 0) {
        // guifanzhuangtaizhongwen.sort(function(a,b){
        //   return a.doc_count- b.doc_count
        // })
        for (var i = 0; i < _len; i++) {
          xAxis_data.push(guifanzhuangtaizhongwen[i].key);
          series_data.push(guifanzhuangtaizhongwen[i].doc_count);
        }
        this.blzt_bar.xAxis_data = xAxis_data;
        this.blzt_bar.series_data = series_data;
        this.drawBlztBar();

        this.recordNoData.delete(5);
      } else {
        this.recordNoData.add(5);
        $("#blzt-bar").html('<div class="nodata-box"></div>');
        $("#blzt-bar").removeAttr("_echarts_instance_");
      }
    },
    drawBlztBar() {
      var _that = this;
      _that.blzt_bar.echarts = echarts.init(
        document.getElementById("blzt-bar")
      );
      _that.blzt_bar.echarts.setOption({
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(5),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie("blzt-bar", _that.blzt_bar, 5);
              },
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.initOpendKsh(5);
              },
            },
          },
        },
        grid: {
          // 控制图的大小，调整下面这些值就可以，
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 30,
          },
          data: _that.blzt_bar.xAxis_data,
        },
        yAxis: {
          type: "value",
          name: "数量",
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: _that.blzt_bar.series_data,
          },
        ],
      });
    },
    drawBlztBarOpen() {
      var _that = this;
      echarts.init(document.getElementById("blzt-bar-open")).setOption({
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(5),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie(
                  "blzt-bar-open",
                  _that.blzt_bar,
                  undefined
                );
              },
            },
          },
        },
        grid: {
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
          },
          data: _that.blzt_bar.xAxis_data,
        },
        yAxis: {
          type: "value",
          name: "数量",
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: _that.blzt_bar.series_data,
          },
        ],
      });
    },
    //ATC分类
    dealYlflPie(atc) {
      this.atcs_sel = false;
      _.forEach(this.conditions, (item) => {
        if (item.name === "atc") {
          if (item.atcs_sel) {
            this.atcs_sel = true;
          }
        }
      });
      let _len = atc.length;
      let xAxis_data = [];
      let series_data = [];
      if (_len > 0) {
        // atc.sort(function(a,b){
        //   return a.doc_count- b.doc_count
        // })
        for (var i = 0; i < _len; i++) {
          xAxis_data.push(atc[i].key);
          series_data.push({ value: atc[i].doc_count, name: atc[i].key });
        }

        // 排序
        for (let index in series_data) {
          for (let i = 0; i < index; i++) {
            if (
              Number(series_data[index].value) > Number(series_data[i].value)
            ) {
              let y = series_data[index];
              let x = xAxis_data[index];
              xAxis_data[index] = xAxis_data[i];
              series_data[index] = series_data[i];
              xAxis_data[i] = x;
              series_data[i] = y;
            }
          }
        }

        this.ylfl_pie.xAxis_data = xAxis_data;
        this.ylfl_pie.series_data = series_data;

        this.drawYlflPie();

        this.recordNoData.delete(6);
      } else {
        this.recordNoData.add(6);
        let html = this.atcs_sel
          ? '<div class="nodata-box-atc"></div>'
          : '<div class="nodata-box"></div>';
        $("#ylfl-pie").html(html);
        $("#ylfl-pie").removeAttr("_echarts_instance_");
      }
    },
    drawYlflPie() {
      var _that = this;
      _that.ylfl_pie.echarts = echarts.init(
        document.getElementById("ylfl-pie")
      );
      _that.ylfl_pie.echarts.setOption({
        legend: {
          type: "scroll",
          bottom: 0,
          data: _that.ylfl_pie.xAxis_data,
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(6),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myToggleBar: {
              show: true,
              title: "柱形图",
              icon: "image:///static/imgs/echarts/bar.png",
              onclick() {
                _that.handleToggleBar("ylfl-pie", _that.ylfl_pie, 6);
              },
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.initOpendKsh(6);
              },
            },
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>数量：{c}<br/>占比：{d}%",
        },
        series: [
          {
            type: "pie",
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{b}{d}%",
              },
            },
            data: this.ylfl_pie.series_data,
          },
        ],
      });
    },
    drawYlflPieOpen() {
      var _that = this;
      echarts.init(document.getElementById("ylfl-pie-open")).setOption({
        legend: {
          type: "scroll",
          bottom: 0,
          data: _that.ylfl_pie.xAxis_data,
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(6),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "柱形图",
              icon: "image:///static/imgs/echarts/bar.png",
              onclick() {
                _that.handleToggleBar(
                  "ylfl-pie-open",
                  _that.ylfl_pie,
                  undefined
                );
              },
            },
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>数量：{c}<br/>占比：{d}%",
        },
        series: [
          {
            type: "pie",
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{b}{d}%",
              },
            },
            data: this.ylfl_pie.series_data,
          },
        ],
      });
    },
    //剂型
    dealJxBar(guifanjixing) {
      let _len = guifanjixing.length;
      let xAxis_data = [];
      let series_data = [];
      let open_xAxis_data = [];
      let open_series_data = [];
      if (_len > 0) {
        if (_len > 15) {
          for (var i = 0; i < 15; i++) {
            xAxis_data.push(guifanjixing[i].key);
            series_data.push(guifanjixing[i].doc_count);
          }
        } else {
          for (var i = 0; i < _len; i++) {
            xAxis_data.push(guifanjixing[i].key);
            series_data.push(guifanjixing[i].doc_count);
          }
        }

        for (var i = 0; i < _len; i++) {
          open_xAxis_data.push(guifanjixing[i].key);
          open_series_data.push(guifanjixing[i].doc_count);
        }
        this.jx_bar.xAxis_data = xAxis_data;
        this.jx_bar.series_data = series_data;
        this.jx_open_bar.xAxis_data = open_xAxis_data;
        this.jx_open_bar.series_data = open_series_data;
        this.drawJxBar();

        this.recordNoData.delete(7);
      } else {
        this.recordNoData.add(7);
        $("#jx-bar").html('<div class="nodata-box"></div>');
        $("#jx-bar").removeAttr("_echarts_instance_");
      }
    },
    drawJxBar() {
      var _that = this;
      _that.jx_bar.echarts = echarts.init(document.getElementById("jx-bar"));
      _that.jx_bar.echarts.setOption({
        legend: {
          bottom: 0,
          data: _that.jx_bar.legend_data,
        },
        tooltip: {
          show: true,
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(7),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie("jx-bar", _that.jx_bar, 7);
              },
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.initOpendKsh(7);
              },
            },
          },
        },
        grid: {
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 30,
          },
          data: _that.jx_bar.xAxis_data,
        },
        yAxis: {
          type: "value",
          name: "数量",
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: _that.jx_bar.series_data,
          },
        ],
      });
    },
    drawJxBarOpen() {
      var _that = this;
      echarts.init(document.getElementById("jx-bar-open")).setOption({
        legend: {
          bottom: 0,
          data: _that.jx_bar.legend_data,
        },
        tooltip: {
          show: true,
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(7),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie("jx-bar-open", _that.jx_open_bar);
              },
            },
          },
        },
        grid: {
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 30,
          },
          data: _that.jx_open_bar.xAxis_data,
        },
        yAxis: {
          type: "value",
          name: "数量",
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: _that.jx_open_bar.series_data,
          },
        ],
      });
    },
    //企业排名
    dealQypmBar(qiyemingcheng) {
      let _len = qiyemingcheng.length;
      let yAxis_data = [];
      let series_data = [];
      if (_len > 0) {
        // qiyemingcheng.sort(function(a,b){
        //   return a.doc_count- b.doc_count
        // })
        for (var i = 0; i < _len && i < 10; i++) {
          yAxis_data.push(qiyemingcheng[i].key);
          series_data.push(qiyemingcheng[i].doc_count);
        }
        this.qypm_bar.yAxis_data = yAxis_data;
        this.qypm_bar.series_data = series_data;
        // 从上往下，从多至少
        this.qypm_bar.yAxis_data.reverse();
        this.qypm_bar.series_data.reverse();

        this.drawQypmBar();

        this.recordNoData.delete(8);
      } else {
        this.recordNoData.add(8);
        $("#qypm-bar").html('<div class="nodata-box"></div>');
        $("#qypm-bar").removeAttr("_echarts_instance_");
      }
    },
    drawQypmBar() {
      var _that = this;
      _that.qypm_bar.echarts = echarts.init(
        document.getElementById("qypm-bar")
      );
      _that.qypm_bar.echarts.setOption({
        tooltip: {
          position: (point, params, dom, rect, size) => {
            return this.echartsTooltipPositionX(point, params, dom, rect, size);
          },
          trigger: "item",
          formatter: "{b}<br />数量: {c}",
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(8),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.initOpendKsh(8);
              },
            },
          },
        },
        grid: {
          containLabel: true,
        },
        yAxis: {
          type: "category",
          axisLabel: {
            formatter: function (value) {
              if (value.length > 12) {
                return value.substring(0, 12) + "...";
              } else {
                return value;
              }
            },
          },
          data: _that.qypm_bar.yAxis_data,
        },
        xAxis: {
          type: "value",
          name: "数量",
        },
        series: [
          {
            data: _that.qypm_bar.series_data,
            type: "bar",
            label: {
              show: true,
              position: "right",
            },
          },
        ],
      });
    },
    drawQypmBarOpen() {
      var _that = this;
      echarts.init(document.getElementById("qypm-bar-open")).setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}<br />数量: {c}",
        },
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(8),
              icon: "image:///static/imgs/echarts/download.png",
            },
          },
        },
        grid: {
          containLabel: true,
        },
        yAxis: {
          type: "category",
          data: _that.qypm_bar.yAxis_data,
        },
        xAxis: {
          type: "value",
          name: "数量",
        },
        series: [
          {
            data: _that.qypm_bar.series_data,
            type: "bar",
            label: {
              show: true,
              position: "right",
            },
          },
        ],
      });
    },
    //地图
    dealSbdqMap(shengfen) {
      let _len = shengfen.length;
      let xAxis_data = [];
      let not_map_series_data = [];
      let map_series_data = [];
      var max = 0;
      if (_len > 0) {
        // 处理map数据
        for (var i = 0; i < _len; i++) {
          xAxis_data.push(String(shengfen[i].key));
          not_map_series_data.push(Number(shengfen[i].doc_count));
          map_series_data.push({
            value: shengfen[i].doc_count,
            name: shengfen[i].key,
          });
          max = shengfen[i].doc_count > max ? shengfen[i].doc_count : max;
        }
        this.sbdq_map.max = max;
        this.sbdq_map.series_data = map_series_data;

        this.sbdq_bar.xAxis_data = xAxis_data;
        this.sbdq_bar.series_data = not_map_series_data;

        this.sbdq_pie.xAxis_data = xAxis_data;
        this.sbdq_pie.series_data = map_series_data;
        this.drawSbdqMap();

        this.recordNoData.delete(9);
      } else {
        this.recordNoData.add(9);
        $("#sbdq-map").html('<div class="nodata-box"></div>');
        $("#sbdq-map").removeAttr("_echarts_instance_");
      }
    },
    drawSbdqMap() {
      var _that = this;
      _that.sbdq_map.echarts = echarts.init(
        document.getElementById("sbdq-map")
      );
      _that.sbdq_map.echarts.setOption({
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(9),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myToggleBar: {
              show: true,
              title: "柱形图",
              icon: "image:///static/imgs/echarts/bar.png",
              onclick() {
                _that.handleToggleBar("sbdq-map", _that.sbdq_bar, 9);
              },
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie("sbdq-map", _that.sbdq_pie, 9);
              },
            },
            myMagnify: {
              show: true,
              title: "全屏",
              icon: "image:///static/imgs/echarts/fullscreen.png",
              onclick() {
                _that.initOpendKsh(9);
              },
            },
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return `${params.name}<br/>数量：${
              params.value ? params.value : 0
            }`;
          },
        },
        visualMap: {
          min: 0,
          max: _that.sbdq_map.max,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
        },
        series: [
          {
            name: "数量",
            type: "map",
            map: "china",
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            data: _that.sbdq_map.series_data,
          },
        ],
      });
    },
    drawSbdqMapOpen() {
      var _that = this;
      echarts.init(document.getElementById("sbdq-map-open")).setOption({
        toolbox: {
          right: "20",
          feature: {
            saveAsImage: {
              title: "保存",
              name: _that.getImgName(9),
              icon: "image:///static/imgs/echarts/download.png",
            },
            myToggleBar: {
              show: true,
              title: "柱形图",
              icon: "image:///static/imgs/echarts/bar.png",
              onclick() {
                _that.handleToggleBar(
                  "sbdq-map-open",
                  _that.sbdq_bar,
                  undefined
                );
              },
            },
            myTogglePie: {
              show: true,
              title: "饼形图",
              icon: "image:///static/imgs/echarts/pie.png",
              onclick() {
                _that.handleTogglePie(
                  "sbdq-map-open",
                  _that.sbdq_pie,
                  undefined
                );
              },
            },
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return `${params.name}<br/>数量：${
              params.value ? params.value : 0
            }`;
          },
        },
        visualMap: {
          min: 0,
          max: _that.sbdq_map.max,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
        },
        series: [
          {
            name: "数量",
            type: "map",
            map: "china",
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            data: _that.sbdq_map.series_data,
          },
        ],
      });
    },
    handleDialogVisible(value) {
      this.dialogVisible = value;
      // 退出全屏的时候需要将initopen改为false，不然不会重新渲染图标。
      this.initopen = value;
    },
    // 切换为饼形图
    handleTogglePie(el, data, index) {
      let _that = this,
        option,
        id = el.substring(0, el.indexOf("-")),
        dataset = {
          dimensions: ["name", "value"],
          source: [],
        };
      data.xAxis_data.forEach((item, i) => {
        dataset.source.push([item, data.series_data[i]]);
      });
      if (el == "spjl-pie" || el == "spjl-pie-open") {
        // 审评结论 专属饼形图属性
        option = {
          legend: {
            type: "scroll",
            bottom: 0,
            data: data.xAxis_data,
          },
          toolbox: {
            right: "20",
            feature: {
              saveAsImage: {
                title: "保存",
                name: _that.getImgName(index),
                icon: "image:///static/imgs/echarts/download.png",
              },
              myToggleBar: {
                show: true,
                title: "柱形图",
                icon: "image:///static/imgs/echarts/bar.png",
                onclick() {
                  _that.handleToggleBar(el, data, index);
                },
              },
              myMagnify: {
                show: true,
                title: "全屏",
                icon: "image:///static/imgs/echarts/fullscreen.png",
                onclick() {
                  _that.initOpendKsh(index);
                },
              },
            },
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>数量：{c}<br/>占比：{d}%",
          },
          series: [
            {
              type: "pie",
              radius: ["40%", "75%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "outside",
                },
                emphasis: {
                  show: true,
                  formatter: "{d}%",
                  align: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold",
                  },
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              id,
              colorBy: "data",
              universalTransition: true,
              data: data.series_data,
            },
          ],
        };
      } else if (el == "ylfl-pie" || el == "ylfl-pie-open") {
        // ATC分类 专属饼形图属性
        option = {
          legend: {
            type: "scroll",
            bottom: 0,
            data: data.xAxis_data,
          },
          toolbox: {
            right: "20",
            feature: {
              saveAsImage: {
                title: "保存",
                name: _that.getImgName(index),
                icon: "image:///static/imgs/echarts/download.png",
              },
              myToggleBar: {
                show: true,
                title: "柱形图",
                icon: "image:///static/imgs/echarts/bar.png",
                onclick() {
                  _that.handleToggleBar(el, data, index);
                },
              },
              myMagnify: {
                show: true,
                title: "全屏",
                icon: "image:///static/imgs/echarts/fullscreen.png",
                onclick() {
                  _that.initOpendKsh(index);
                },
              },
            },
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>数量：{c}<br/>占比：{d}%",
          },
          series: [
            {
              type: "pie",
              label: {
                normal: {
                  show: true,
                  position: "outside",
                  formatter: "{b}{d}%",
                },
              },
              data: data.series_data,
            },
          ],
        };
      } else if (el == "sbdq-map" || el == "sbdq-map-open") {
        option = {
          legend: {
            type: "scroll",
            bottom: 0,
            data: data.xAxis_data,
          },
          toolbox: {
            right: "20",
            feature: {
              saveAsImage: {
                title: "保存",
                name: _that.getImgName(index),
                icon: "image:///static/imgs/echarts/download.png",
              },
              myToggleBar: {
                show: true,
                title: "柱形图",
                icon: "image:///static/imgs/echarts/bar.png",
                onclick() {
                  _that.handleToggleBar(el, _that.sbdq_bar, index);
                },
              },
              myToggleMap: {
                show: true,
                title: "热力图",
                icon: "image:///static/imgs/echarts/map.png",
                onclick() {
                  _that.handleToggleMap(el, _that.sbdq_map, index);
                },
              },
              myMagnify: {
                show: true,
                title: "全屏",
                icon: "image:///static/imgs/echarts/fullscreen.png",
                onclick() {
                  _that.initOpendKsh(index);
                },
              },
            },
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>数量：{c}<br/>占比：{d}%",
          },
          series: [
            {
              type: "pie",
              label: {
                normal: {
                  show: true,
                  position: "outside",
                  formatter: "{b}{d}%",
                },
              },
              data: data.series_data,
            },
          ],
        };
      } else {
        option = {
          toolbox: {
            right: "20",
            feature: {
              saveAsImage: {
                title: "保存",
                name: _that.getImgName(index),
                icon: "image:///static/imgs/echarts/download.png",
              },
              myToggleBar: {
                show: true,
                title: "柱形图",
                icon: "image:///static/imgs/echarts/bar.png",
                onclick() {
                  _that.handleToggleBar(el, data, index);
                },
              },
              myMagnify: {
                show: true,
                title: "全屏",
                icon: "image:///static/imgs/echarts/fullscreen.png",
                onclick() {
                  _that.initOpendKsh(index);
                },
              },
            },
          },
          dataset: [dataset],
          xAxis: {
            type: "category",
          },
          yAxis: {},
          series: [
            {
              type: "pie",
              id,
              universalTransition: true,
              animationDurationUpdate: 1000,
            },
          ],
        };
      }

      if (index == undefined) {
        option.toolbox.feature.myMagnify = {};
      }
      $("#" + el).removeAttr("_echarts_instance_");
      let chart = echarts.init(document.getElementById(el));
      //chart.clear()
      chart.setOption(option, true);
    },
    // 切换为柱形图
    handleToggleBar(el, data, index) {
      let _that = this;
      let option,
        id = el.substring(0, el.indexOf("-"));
      if (el == "sbdq-map" || el == "sbdq-map-open") {
        option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}:<br />数量: {c}",
          },
          dataZoom: [
            {
              type: "slider",
              startValue: 0,
              endValue: 9,
            },
            {
              type: "inside",
              startValue: 0,
              endValue: 9,
            },
          ],
          toolbox: {
            right: "20",
            feature: {
              saveAsImage: {
                title: "保存",
                name: _that.getImgName(index),
                icon: "image:///static/imgs/echarts/download.png",
              },
              myTogglePie: {
                show: true,
                title: "饼形图",
                icon: "image:///static/imgs/echarts/pie.png",
                onclick() {
                  _that.handleTogglePie(el, _that.sbdq_pie, index);
                },
              },
              myToggleMap: {
                show: true,
                title: "热力图",
                icon: "image:///static/imgs/echarts/map.png",
                onclick() {
                  _that.handleToggleMap(el, _that.sbdq_map, index);
                },
              },
              myMagnify: {
                show: true,
                title: "全屏",
                icon: "image:///static/imgs/echarts/fullscreen.png",
                onclick() {
                  _that.initOpendKsh(index);
                },
              },
            },
          },
          grid: {
            containLabel: true,
          },
          xAxis: {
            type: "category",
            axisLabel: {
              rotate: 45,
            },
            data: data.xAxis_data,
          },
          yAxis: {
            type: "value",
            name: "数量",
          },
          series: [
            {
              label: {
                show: true,
                position: "top",
              },
              colorBy: "data",
              id,
              universalTransition: true,
              data: data.series_data,
              type: "bar",
            },
          ],
        };
      } else {
        option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}:<br />数量: {c}",
          },
          toolbox: {
            right: "20",
            feature: {
              saveAsImage: {
                title: "保存",
                name: _that.getImgName(index),
                icon: "image:///static/imgs/echarts/download.png",
              },
              myTogglePie: {
                show: true,
                title: "饼形图",
                icon: "image:///static/imgs/echarts/pie.png",
                onclick() {
                  _that.handleTogglePie(el, data, index);
                },
              },
              myMagnify: {
                show: true,
                title: "全屏",
                icon: "image:///static/imgs/echarts/fullscreen.png",
                onclick() {
                  _that.initOpendKsh(index);
                },
              },
            },
          },
          grid: {
            containLabel: true,
          },
          xAxis: {
            type: "category",
            axisLabel: {
              rotate: 45,
            },
            data: data.xAxis_data,
          },
          yAxis: {
            type: "value",
            name: "数量",
          },
          series: [
            {
              data: data.series_data,
              type: "bar",
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        };
      }

      if (index == undefined) {
        option.toolbox.feature.myMagnify = {};
      }
      $("#" + el).removeAttr("_echarts_instance_");
      let chart = echarts.init(document.getElementById(el));
      chart.setOption(option, true);
    },
    handleToggleMap(el, data, index) {
      let _that = this;
      let option;
      if (el == "sbdq-map" || el == "sbdq-map-open") {
        option = {
          toolbox: {
            right: "20",
            feature: {
              saveAsImage: {
                title: "保存",
                name: _that.getImgName(index),
                icon: "image:///static/imgs/echarts/download.png",
              },
              myToggleBar: {
                show: true,
                title: "柱形图",
                icon: "image:///static/imgs/echarts/bar.png",
                onclick() {
                  _that.handleToggleBar(el, _that.sbdq_bar, index);
                },
              },
              myTogglePie: {
                show: true,
                title: "饼形图",
                icon: "image:///static/imgs/echarts/pie.png",
                onclick() {
                  _that.handleTogglePie(el, _that.sbdq_pie, index);
                },
              },
              myMagnify: {
                show: true,
                title: "全屏",
                icon: "image:///static/imgs/echarts/fullscreen.png",
                onclick() {
                  _that.initOpendKsh(index);
                },
              },
            },
          },
          tooltip: {
            trigger: "item",
            formatter: function (params) {
              return `${params.name}<br/>数量：${
                params.value ? params.value : 0
              }`;
            },
          },
          visualMap: {
            min: 0,
            max: this.sbdq_map.max,
            left: "left",
            top: "bottom",
            text: ["高", "低"], // 文本，默认为数值文本
            calculable: true,
          },
          series: [
            {
              name: "数量",
              type: "map",
              map: "china",
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: true,
                },
              },
              data: this.sbdq_map.series_data,
            },
          ],
        };
      }

      if (index == undefined) {
        option.toolbox.feature.myMagnify = {};
      }
      $("#" + el).removeAttr("_echarts_instance_");
      let chart = echarts.init(document.getElementById(el));
      chart.setOption(option, true);
    },
    initShowScroll() {
      let outterWidth = Number($(".newtotals").width());
      let num = Number($(".newtotals .total-item").length);
      let maxNum = parseInt((outterWidth - 60) / 150);
      if (150 * num <= outterWidth) {
        $(".newtotals-left").hide();
        $(".newtotals-right").hide();
        $(".newtotals .total-item").css({
          width: 100 / num + "%",
        });
        $(".newtotals-scroll").css({
          width: "100%",
          margin: "0",
        });
        $(".newtotals-scroll-inner").css({
          width: "100%",
        });
      } else {
        $(".newtotals-left").show();
        $(".newtotals-right").show();
        $(".newtotals-scroll").css({
          width: 150 * maxNum,
          margin: "0px 30px",
        });
        $(".newtotals-scroll-inner").css({
          width: 150 * num,
        });
        $(".newtotals .total-item").css({
          width: 150,
        });
      }
    },
    handleShowScrollLeft() {
      let pointer = Number(
        _.replace($(".newtotals-scroll-inner").css("left"), "px", "")
      );
      if (pointer != 0 && pointer % 150 == 0) {
        $(".newtotals-scroll-inner").animate(
          {
            left: pointer + 150,
          },
          300
        );
      }
    },
    handleShowScrollRight() {
      let outterWidth = Number($(".newtotals").width());
      let num = Number($(".newtotals .total-item").length);
      let maxNum = parseInt((outterWidth - 60) / 150);
      let pointer = Number(
        _.replace($(".newtotals-scroll-inner").css("left"), "px", "")
      );
      if (pointer != 150 * (maxNum - num) && pointer % 150 == 0) {
        $(".newtotals-scroll-inner").animate(
          {
            left: pointer - 150,
          },
          300
        );
      }
    },
    echartsResizeHandler() {
      if (this.dialogVisible) {
        this.initLayout();
        this.echartsResize("open-charts");
      }
      this.$nextTick(() => {
        this.echartsResize("echarts");
      });
    },
  },
  created() {
    //this.initLayout()
    this.loadData();
  },
  mounted() {
    window.addEventListener("resize", this.echartsResizeHandler);
  },
  activated() {
    // this.nopms一直为undefined状态，暂时屏蔽，后续再观察是否有其它用处
    this.vueRouteToNoPms(this.nopms.ksh);
    // this.initShowScroll()
  },
  updated() {
    this.vueRouteToNoPms(this.nopms.ksh);
    this.initShowScroll();
  },
};
</script>

<style lang="less">
@import "@/assets/less/var.less";
.pc-zhuce-analy {
  .nodata,
  .nodata-box,
  .nodata-box-atc {
    width: 100%;
    height: 100%;
  }
  .nodata-box-atc {
    background: url(/static/imgs/nodata_atc.png) center center no-repeat;
  }
  .nodata-box,
  .nodata {
    background: url(/static/imgs/nodata.png) center center no-repeat;
  }
  .fullcharts.nodata-box {
    position: absolute;
    top: 40px;
    height: calc(100vh - 40px - 48px - 80px);
    background: #fff;
  }
  .chart {
    .chart_top {
      position: relative;
      .newtotals {
        // margin-top: 20px!important;
        height: 170px;
        background-color: @White;
        box-shadow: 0 0;
        // border-top: 1px solid #dfe5f1;
        overflow: hidden;
        display: flex;
        justify-content: center;
        position: relative;
        .newtotals-scroll {
          width: 100%;
          overflow: hidden;
          position: relative;
          .newtotals-scroll-inner {
            position: absolute;
            width: 100%;
            top: 0px;
            left: 0px;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: nowrap;
          }
        }
        .newtotals-arrow {
          display: none;
          height: 170px;
          line-height: 170px;
          width: 30px;
          color: @PrimaryColor;
          font-size: 20px;
          text-align: center;
          position: absolute;
          top: 0px;
          cursor: pointer;
          &:hover {
            background-color: rgba(222, 222, 222, 0.5);
          }
        }
        .newtotals-left {
          left: 0px;
        }
        .newtotals-right {
          right: 0px;
        }
        .newtotals-disabled {
          color: #aaa;
          cursor: normal;
          &:hover {
            background-color: transparent;
          }
        }
        .total-item {
          float: left;
          box-sizing: border-box;
          width: 150px;
          height: 170px;
          text-align: center;
          vertical-align: text-bottom;
          border-bottom: 3px solid @White;
          &:hover {
            color: @PrimaryColor;
            background-color: #eff2fa;
            border-bottom: 3px solid @PrimaryColor;
          }
          .li1 {
            padding-top: 30px;
            font-size: 13px;
            font-weight: 600;
          }
          .li2 {
            font-size: 14px;
            span {
              font-size: 24px;
              color: @PrimaryColor;
            }
          }
        }
      }
    }
    .chart-boxes {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .echarts {
      box-sizing: border-box;
      display: inline-block;
      margin: 50px 10px 20px 10px;
      width: calc(100% - 20px);
      height: 400px;
    }
    .hide {
      display: none;
    }
    .dialog {
      position: fixed;
      z-index: 99999;
      top: 48px;
      left: 0px;
      width: 100%;
      height: calc(100% - 48px);
      background-color: @PrimaryBackgroundColor;
      .menu {
        position: fixed;
        left: 0px;
        top: 48px;
        .nav {
          width: 220px;
          padding-left: 20px;
          line-height: 40px;
          border-left: 4px solid @PrimaryBackgroundColor;
          border-bottom: 1px dashed @BorderColor;
          cursor: pointer;
          &.active,
          &:hover {
            border-left: 4px solid @PrimaryColor;
            border-bottom: 0px;
            background-color: #fff;
            color: @PrimaryColor;
            box-shadow: @BoxShadow;
          }
        }
      }
      .echarts-items-wap {
        width: calc(100% - 250px) !important;
        height: 100% !important;
        position: absolute;
        // overflow-y: scroll;
        overflow-x: hidden;
        top: 0px;
        left: 250px;
        background-color: #fff;
        box-shadow: @BoxShadow;
        .echarts-items-title {
          position: relative;
          padding-right: 40px;
          background-color: @PrimaryBackgroundColor;
          line-height: 40px;
          text-align: right;
          .echart-title {
            position: absolute;
            left: 18px;
          }
          .esc-btn {
            display: inline-block;
            height: 100%;
            font-size: 13px;
            img {
              display: inline-block;
              margin-top: 10px;
            }
          }
        }
        .echarts-items {
          width: 1414px * 10;
          height: 700px;
          overflow-y: scroll;
          overflow-x: hidden;
          .echarts-item {
            display: inline-block;
            margin: 0px 50px;
            width: 1300px;
            height: 100%;
          }
          .open-charts {
            width: 100%;
            height: 700px;
          }
        }
        .ctr-actions {
          padding: 100px 0px 20px;
          text-align: center;
          .action {
            cursor: pointer;
            padding: 5px;
          }
        }
      }
    }
    .chart_top {
      background-color: #eff2fa;
    }
    .chart_bottom {
      background-color: #eff2fa;
      .go-list {
        height: 22px;
        line-height: 30px;
        text-align: right;
        padding-right: 40px;
        font-size: 14px;

        a:hover {
          color: #4877e8;
        }
      }
    }
  }
}
</style>
