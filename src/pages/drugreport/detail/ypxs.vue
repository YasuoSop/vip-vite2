<template>
  <div class="detail-items">
    <!-- API信息 -->
    <div class="detail-item">
      <div class="item-title">
        <span class="text"
          >市场销售<span class="num">{{ allCount }}</span></span
        >
        <span
          class="export"
          v-if="!ypxsList"
          @click="maxTotal(exportUrl, res.count)"
          ><i class="iconfont">&#xe605;</i> 导出</span
        >
      </div>
      <!-- 图表 -->
      <div class="charts">
        <div
          :id="echartsID"
          class="qqxs-stack"
          :class="{ 'qqxs-stack-pdf': ypxsList }"
        ></div>
      </div>
      <div>
        <div class="ypxs_unit">销售额单位：万人民币</div>
        <!-- 自定义加载界面 -->
        <LoadingGif
          :className="'list-in-loading'"
          :classNameImg="'little-size-loading'"
          :loadFlag="loading1"
          v-if="loading1"
          :delayTime="0"
        ></LoadingGif>
        <pdfTable
          v-else-if="ypxsList"
          :headerList="tableHead"
          :dataList="res.res"
        />
        <!-- 加载完成显示部分 -->
        <el-table
          :data="res.res"
          stripe
          fixed
          class="table"
          style="width: 100%"
          v-else
        >
          <el-table-column
            v-for="item in tableHead"
            :prop="item.prop"
            :min-width="item.width"
            :key="item.prop"
            :label="item.label"
          >
            <template slot-scope="scope">
              <div v-if="item.prop === 'brandname'">
                {{ scope.row.brandname || "/" }}
              </div>
              <div v-if="item.prop === 'company'">
                {{ scope.row.company || "/" }}
              </div>
              <div v-if="item.prop === 'year_4'">
                {{ scope.row.year_4 || "/" }}
              </div>
              <div v-if="item.prop === 'year_3'">
                {{ scope.row.year_3 || "/" }}
              </div>
              <div v-if="item.prop === 'year_2'">
                {{ scope.row.year_2 || "/" }}
              </div>
              <div v-if="item.prop === 'year_1'">
                {{ scope.row.year_1 || "/" }}
              </div>
              <div v-if="item.prop === 'year_0'">
                {{ scope.row.year_0 || "/" }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="res.count > 10 && !ypxsList"
          layout="total, prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="param.page"
          :page-size="param.pageSize"
          :total="res.count"
        >
        </el-pagination>
      </div>
    </div>
    <DetailKzxx v-if="showKZXX()" :extendList="extendList"></DetailKzxx>
  </div>
</template>
<script>
import LoadingGif from "@/components/common/globalCom/loading-gif.vue"
import pdfTable from "../pdfReport/table2";
import tablehead from "@/config/tablehead";
import DetailKzxx from "./kzxx";
const tableFiled = tablehead.drugreport.ypxs;

export default {
  components: {
    LoadingGif,
    pdfTable,
    DetailKzxx,
  },
  props: {
    extendList: Array,
    info: {
      type: Object,
    },
    ylbm: {
      type: String,
    },
    ypxsEchart: {
      type: Array,
    },
    ypxsList: {
      type: Object | Array,
    },
    jspdf: {
      type: Boolean,
    },
  },
  data() {
    return {
      res: {
        res: [],
        count: 0,
        name: "",
      },
      tableHead: tableFiled,
      exportUrl: "/api/report/ypxslist?outdata=1",
      chartData: {
        series_data: [],
        xAxis_data: [],
      },
      param: {
        pageSize: 10,
        page: 1,
      },
      loading1: true,
      nodata: false,
    };
  },
  computed: {
    echartsID() {
      return "echartsID" + Math.random() * 100000;
    },
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.loadChartData();
  },
  methods: {
    showKZXX() {
      let flag = false;
      if (this.jspdf) {
        flag = false;
      } else {
        flag = true;
      }
      return flag;
    },
    loadData() {
      if (this.ypxsList) {
        this.loading1 = false;
        this.res = this.ypxsList;
        this.allCount = this.ypxsList.count;
        this.dealListYear(this.ypxsList.res);
        return;
      }
      return window
        .Axios({
          method: "get",
          url: "/api/report/ypxslist",
          params: _.assign({}, { ylbm: this.ylbm }, this.param),
        })
        .then((res) => {
          if (res.data.code == 404) {
            this.nodata = true;
          } else if (res.data.code == 200) {
            this.nodata = false;
            this.allCount = res.data.data.count;
            this.res.count = res.data.data.count;
            this.dealListYear(res.data.data.res);
          } else {
            this.nodata = true;
          }
          this.loading1 = false;
        });
    },
    loadChartData() {
      if (this.ypxsEchart) {
        this.dealChartData(this.ypxsEchart);
        return;
      }
      return window
        .Axios({
          method: "get",
          url: "/api/report/ypxs",
          params: {
            ylbm: this.ylbm,
          },
        })
        .then((res) => {
          this.dealChartData(res.data.data);
        });
    },
    //总数超过1000提示
    maxTotal(url, total) {
      if (total > 1000) {
        this.$Confirm(
          "导出",
          `当前数据量为<span class="cl-red">${total}</span>条，最大导出量为<span class="cl-red">1000</span>条，是否导出？`,
          () => {
            this.handleExport(url);
          }
        );
      } else {
        this.handleExport(url);
      }
    },
    handleExport(url) {
      window.open(
        url +
          "&ylbm=" +
          this.ylbm +
          "&accesstoken=" +
          GETCOOKIEFUN("accesstoken")
      );
    },
    dealListYear(res) {
      var date = new Date();
      var year = date.getFullYear();
      var _res = [];
      _.map(res, (item, index) => {
        let _item = {
          brandname: item.brandname,
          company: item.company,
          year_4: "",
          year_3: "",
          year_2: "",
          year_1: "",
          year_0: "",
        };
        if (item.year != "") {
          for (let i = 0; i < 5; i++) {
            let reg = new RegExp(year - i - 1 + ":([0-9]*)(.[0-9]{2})", "gi");
            var find = item.year.match(reg);
            if (find) {
              _item["year_" + i] = find[0].split(":")[1] || 0;
            } else {
              _item["year_" + i] = 0;
            }
          }
        }
        _res.push(_item);
      });
      this.res.res = _res;
    },
    dealChartData(res) {
      let _res = [];
      let _years = [];
      let stack = [];
      let totals = [];
      let _totals = [];
      let data = [];
      _.map(res, (item) => {
        let _item = {
          count: item.count,
          year: item.year,
          info: [],
        };
        // //存横坐标数据
        _years.push(item.year);

        if (item.info != "") {
          let info = item.info.split(";;");
          _.map(info, (ele) => {
            let _info = ele.split("||");
            _item.info.push({
              brandname: _info[0],
              company: _info[1],
              value: _info[2],
              key: _info[0] + ":" + _info[1],
            });
            stack.push(_info[0] + ":" + _info[1]);
          });
        }
        _res.push(_item);

        //存总销售量折线数据
        totals.push(item.total);
      });

      //brandname company 作为一个整体 去重
      stack = _.uniq(stack);

      //计算同比
      _.map(totals, (item, index) => {
        if (index) {
          return _totals.push(
            Math.round(
              ((item - totals[index - 1]) * 10000) / totals[index - 1] / 100
            )
          );
        } else {
          return _totals.push(null);
        }
      });
      //设置总金额的series_data
      this.chartData.series_data.push({
        color: "transparent",
        name: "总销售额",
        type: "line",
        yAxisIndex: 0,
        data: totals,
        symbolSize: 1,
        hoverAnimation: false,
        itemStyle: {
          color: "transparent",
          opacity: 1,
        },
        label: {
          show: true,
          position: "top",
          color: "#000",
          formatter: function (value) {
            let vk = (value.data / 1000).toFixed(1);
            return vk + "k";
          },
        },
      });
      //设置同比的series_data
      this.chartData.series_data.push({
        name: "同比",
        type: "line",
        yAxisIndex: 1,
        data: _totals,
      });
      // 设置商品的tooltip
      _.map(stack, (item) => {
        data[item] = [];
        for (let i = 0, l = _res.length; i < l; i++) {
          var index = _.findIndex(_res[i].info, function (o) {
            return o.key == item;
          });
          if (index < 0) {
            data[item].push(0);
          } else {
            data[item].push(_res[i].info[index].value);
          }
        }
        this.chartData.series_data.push({
          name: item,
          type: "bar",
          stack: "year",
          data: data[item],
          // label: {
          //   show:true,
          //   position:'top',
          //   formatter:function(paramas,ticket){
          //     let str
          //   }
          // },
        });
      });
      this.chartData.xAxis_data = _years;
      this.drawSbqsStack();
    },
    drawSbqsStack() {
      var _that = this;
      Echarts.init(
        document.getElementById(this.echartsID),
        "yaozh_theme"
      ).setOption({
        title: {
          text: this.info.name + "全球销售情况",
          left: "center",
        },
        animation: !this.ypxsList,
        tooltip: {
          formatter: function (params, ticket) {
            //实现设计图上的提示样式
            let str = params[0].name + "<br>";
            _.map(params, (item) => {
              if (item.seriesType == "bar" && item.value) {
                let seriesname = item.seriesName.split(":");
                str +=
                  '<span style="display: inline-block;height: 6px;width: 6px;border-radius: 50%;margin-right:5px; background-color:' +
                  item.color +
                  '"></span>' +
                  seriesname[0] +
                  " " +
                  item.value +
                  "<br>" +
                  '<span style="display: inline-block; padding-left:10px;">' +
                  seriesname[1] +
                  "</span> <br>";
              } else if (item.seriesName == "总销售额") {
                str +=
                  '<span style="display: inline-block;height: 6px;width: 6px;border-radius: 50%;margin-right:5px; background-color:' +
                  item.color +
                  '"></span>' +
                  "总销售额: " +
                  item.value +
                  "<br>";
              } else if (item.value) {
                str +=
                  '<span style="display: inline-block;height: 6px;width: 6px;border-radius: 50%;margin-right:5px; background-color:' +
                  item.color +
                  '"></span>' +
                  "同比: " +
                  item.value.toFixed(2) +
                  "% <br>";
              }
            });
            return str;
          },
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
        xAxis: [
          {
            data: this.chartData.xAxis_data,
            name: "销售年份",
            nameLocation: "middle", //name的水平居中
            nameGap: 30, //调整与x轴上下间的距离
          },
        ],
        yAxis: [
          {
            name: "销售额（万元）",
            type: "value",
            nameLocation: "center",
            nameGap: 65,
            splitLine: { show: true }, //增加网格线
            axisLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "同比（%）",
            nameLocation: "center", //name的位置水平居中
            nameGap: 65, //name与y轴左右间的距离
            axisLabel: {
              formatter: "{value} %",
            },
            axisLine: {
              show: false,
            },
          },
        ],
        series:
          // {
          //   name:item,
          //   type:'bar',
          //   stack:"year",
          //   data:data[item],
          //   label: {
          //     show: true,
          //     position: "top",
          //   },
          // },
          // {
          //   name:"总销售额",
          //   type:'bar',
          //   yAxisIndex: 0,
          //   label: {
          //     normal: {
          //       show: true,
          //       position: 'top',
          //       formatter: function (obj) {
          //         return data.reduce((total, curr, index, arr) => {
          //         return total += curr[obj.dataIndex];
          //         }, 0);
          //       }
          //     }
          //   },
          // },
          this.chartData.series_data,

        // {
        //   type: "bar",
        //   label: {
        //     show: true,
        //     position: "top"
        //   },
        // this.chartData.series_data
      });
    },
    //分页
    handleCurrentChange(val) {
      this.loading1 = true;
      this.param.page = val;
      this.loadData();
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/less/var.less";
@import "../css/com.less";
.ypxs_unit {
  position: relative;
  padding-left: 20px;
}
.ypxs_unit:before {
  content: "";
  position: absolute;
  left: 7px;
  top: 7px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: @PrimaryColor;
}

.qqxs-stack {
  width: 1000px;
  height: 600px;
  margin: 0 auto;
}
.qqxs-stack-pdf {
  width: 900px;
}
.detail-items {
  padding-bottom: 10px !important;
}
</style>