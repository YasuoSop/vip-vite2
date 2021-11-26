<template>
  <div class="detail-items" id="sspz">
    <!-- API信息 -->
    <div class="detail-item">
      <div class="item-title">
        <span class="text">
          上市批准
          <!-- <span class="num">{{allCount}}</span> -->
        </span>
      </div>
      <!-- 中国 -->
      <div v-show="chinaData.res.count">
        <div class="tabs mt12">
          <img class="flag" src="/static/imgs/state/icons/China.png" />
          <span class="tab-pane active">
            中国
            <span class="num">{{ chinaData.res.count }}</span>
          </span>
          <span
            class="export"
            v-if="!sspzchina"
            @click="maxTotal(chinaData.exportUrl, chinaData.res.count)"
          >
            <i class="iconfont">&#xe605;</i> 导出
          </span>
        </div>
        <div class="china_content">
          <!-- 自定义加载界面 -->
          <LoadingGif
            :className="'list-in-loading'"
            :classNameImg="'little-size-loading'"
            :loadFlag="loading1"
            v-if="loading1"
            :delayTime="0"
          ></LoadingGif>
          <pdfTable
            v-else-if="sspzchina"
            :headerList="chinaData.tableHead"
            :dataList="chinaData.res.res"
          />
          <!-- 加载完成显示部分 -->
          <el-table
            :data="chinaData.res.res"
            stripe
            fixed
            class="table"
            style="width: 100%"
            v-else
          >
            <el-table-column
              v-for="item in chinaData.tableHead"
              :prop="item.prop"
              :min-width="item.width"
              :key="item.prop"
              :label="item.label"
            >
              <template slot-scope="scope">
                <div v-if="item.prop === 'name'">
                  <!-- 跳转非进口详情 -->
                  <router-link
                    tag="a"
                    class="cl-blue"
                    :to="'/cfdadrug/detail/' + scope.row.xuhao"
                    target="_blank"
                    v-if="scope.row.isjk == 1"
                    >{{ scope.row.name || "/" }}</router-link
                  >
                  <!-- 跳转进口详情 -->
                  <router-link
                    tag="a"
                    class="cl-blue"
                    :to="'/cfdadrug/jkdetail/' + scope.row.xuhao"
                    target="_blank"
                    v-else
                    >{{ scope.row.name || "/" }}</router-link
                  >
                </div>
                <div v-if="item.prop === 'pizhunwenhao'">
                  {{ scope.row.pizhunwenhao || "/" }}
                </div>
                <div v-if="item.prop === 'guige'">
                  {{ scope.row.guige || "/" }}
                </div>
                <div v-if="item.prop === 'shengchanqiye'">
                  {{ scope.row.shengchanqiye || "/" }}
                </div>
                <div v-if="item.prop === 'shengchanshu'">
                  {{ scope.row.shengchanshu || "/" }}
                </div>
                <div v-if="item.prop === 'country'">
                  {{ scope.row.country || "/" }}
                </div>
                <div v-if="item.prop === 'bianma'">
                  {{ scope.row.yibao || "/" }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="chinaData.res.count > 10 && !sspzchina"
            layout="total, prev, pager, next"
            @current-change="cnCurrentChange"
            :current-page="cnParam.page"
            :page-size="cnParam.pageSize"
            :total="chinaData.res.count"
          ></el-pagination>
        </div>
      </div>

      <!-- 美国 -->
      <div v-show="usData.res.count">
        <div class="tabs mt20">
          <img
            class="flag"
            src="/static/imgs/state/icons/United States of America.png"
          />
          <span class="tab-pane active">
            美国
            <span class="num">{{ usData.res.count }}</span>
          </span>
          <span
            class="export"
            v-if="!sspzus"
            @click="maxTotal(usData.exportUrl, usData.res.count)"
          >
            <i class="iconfont">&#xe605;</i> 导出
          </span>
        </div>

        <div class="us_content">
          <!-- 自定义加载界面 -->
          <LoadingGif
            :className="'list-in-loading'"
            :classNameImg="'little-size-loading'"
            :loadFlag="loading2"
            v-if="loading2"
            :delayTime="0"
          ></LoadingGif>
          <pdfTable
            v-else-if="sspzus"
            :headerList="usData.tableHead"
            :dataList="usData.res.res"
          />
          <!-- 加载完成显示部分 -->
          <el-table
            :data="usData.res.res"
            stripe
            fixed
            class="table"
            style="width: 100%"
            v-else
          >
            <el-table-column
              v-for="item in usData.tableHead"
              :prop="item.prop"
              :min-width="item.width"
              :key="item.prop"
              :label="item.label"
              style="padding-left: 35px"
            >
              <template slot-scope="scope">
                <div v-if="item.prop === 'applno'">
                  <router-link
                    tag="a"
                    class="cl-blue"
                    :to="scope.row.applno_url"
                    target="_blank"
                    v-if="scope.row.applno_url"
                    >{{ scope.row.applno || "/" }}</router-link
                  >
                  <!-- 注：暂无ndc数据库 -->
                  <span v-else>{{ scope.row.applno || "/" }}</span>
                </div>
                <div v-else>{{ scope.row[item.prop] || "/" }}</div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="usData.res.count > 10 && !sspzus"
            layout="total, prev, pager, next"
            @current-change="usCurrentChange"
            :current-page="usParam.page"
            :page-size="usParam.pageSize"
            :total="usData.res.count"
          ></el-pagination>
        </div>
      </div>

      <!-- 欧盟 -->
      <div v-show="euData.res.count">
        <div class="tabs mt20">
          <img
            class="flag"
            src="/static/imgs/state/icons/European Patent Office.png"
          />
          <span class="tab-pane active">
            欧盟
            <span class="num">{{ euData.res.count }}</span>
          </span>
          <span
            class="export"
            v-if="!sspzeu"
            @click="maxTotal(euData.exportUrl, euData.res.count)"
          >
            <i class="iconfont">&#xe605;</i> 导出
          </span>
        </div>
        <div class="eu_content">
          <!-- 自定义加载界面 -->
          <LoadingGif
            :className="'list-in-loading'"
            :classNameImg="'little-size-loading'"
            :loadFlag="loading3"
            v-if="loading3"
            :delayTime="0"
          ></LoadingGif>
          <pdfTable
            v-else-if="sspzeu"
            :headerList="euData.tableHead"
            :dataList="euData.res.res"
          />
          <!-- 加载完成显示部分 -->
          <el-table
            :data="euData.res.res"
            stripe
            fixed
            class="table"
            style="width: 100%"
            v-else
          >
            <el-table-column
              v-for="item in euData.tableHead"
              :prop="item.prop"
              :min-width="item.width"
              :key="item.prop"
              :label="item.label"
            >
              <template slot-scope="scope">
                <div v-if="item.prop === 'mrno'">
                  <!-- epyp -->
                  <router-link
                    tag="a"
                    class="cl-blue"
                    :to="
                      '/epyp/emadetail/' +
                        scope.row.id +
                        '?active=' +
                        scope.row.active
                    "
                    target="_blank"
                    v-if="scope.row.tb == 1"
                    >{{ scope.row.mrno || "/" }}</router-link
                  >
                  <!-- hma -->
                  <router-link
                    tag="a"
                    class="cl-blue"
                    :to="
                      '/epyp/hmadetail/' +
                        scope.row.id +
                        '?active=' +
                        scope.row.active
                    "
                    target="_blank"
                    v-else
                    >{{ scope.row.mrno || "/" }}</router-link
                  >
                </div>
                <div v-if="item.prop === 'product'">
                  {{ scope.row.product || "/" }}
                </div>
                <div v-if="item.prop === 'form'">
                  {{ scope.row.form || "/" }}
                </div>
                <div v-if="item.prop === 'holder'">
                  {{ scope.row.holder || "/" }}
                </div>
                <div v-if="item.prop === 'date'">
                  {{ scope.row.date || "/" }}
                </div>
                <div v-if="item.prop === 'outcome'">
                  {{ scope.row.outcome || "/" }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="euData.res.count > 10 && !sspzeu"
            layout="total, prev, pager, next"
            @current-change="euCurrentChange"
            :current-page="euParam.page"
            :page-size="euParam.pageSize"
            :total="euData.res.count"
          ></el-pagination>
        </div>
      </div>

      <!-- 日本 -->
      <div v-show="jpData.res.count">
        <div class="tabs mt20">
          <img class="flag" src="/static/imgs/state/icons/Japan.png" />
          <span class="tab-pane active">
            日本
            <span class="num">{{ jpData.res.count }}</span>
          </span>
          <span
            class="export"
            v-if="!sspzjp"
            @click="maxTotal(jpData.exportUrl, jpData.res.count)"
          >
            <i class="iconfont">&#xe605;</i> 导出
          </span>
        </div>
        <div class="jp_content">
          <!-- 自定义加载界面 -->
          <LoadingGif
            :className="'list-in-loading'"
            :classNameImg="'little-size-loading'"
            :loadFlag="loading4"
            v-if="loading4"
            :delayTime="0"
          ></LoadingGif>
          <pdfTable
            v-else-if="sspzjp"
            :headerList="jpData.tableHead"
            :dataList="jpData.res.res"
          />
          <!-- 加载完成显示部分 -->
          <el-table
            :data="jpData.res.res"
            stripe
            fixed
            class="table"
            style="width: 100%"
            v-else
          >
            <el-table-column
              v-for="item in jpData.tableHead"
              :prop="item.prop"
              :min-width="item.width"
              :key="item.prop"
              :label="item.label"
            >
              <template slot-scope="scope">
                <div v-if="item.prop === 'bandname'">
                  <span v-if="scope.row.tb === 1">
                    {{ scope.row.bandname || "/" }}
                  </span>
                  <router-link
                    v-else
                    tag="a"
                    class="cl-blue"
                    :to="'/pmda/' + scope.row.id"
                    target="_blank"
                    >{{ scope.row.bandname || "/" }}</router-link
                  >
                </div>
                <div v-if="item.prop === 'active'">
                  {{ scope.row.active || "/" }}
                </div>
                <div v-if="item.prop === 'approval'">
                  {{ scope.row.approval || "/" }}
                </div>
                <div v-if="item.prop === 'company'">
                  {{ scope.row.company || "/" }}
                </div>
                <div v-if="item.prop === 'date'">
                  {{ scope.row.date || "/" }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="jpData.res.count > 10 && !sspzjp"
            layout="total, prev, pager, next"
            @current-change="jpCurrentChange"
            :current-page="jpParam.page"
            :page-size="jpParam.pageSize"
            :total="jpData.res.count"
          ></el-pagination>
        </div>
      </div>
    </div>
    <DetailKzxx v-if="showKZXX()" :extendList="extendList"></DetailKzxx>
  </div>
</template>

<script>
import LoadingGif from "@/components/common/globalCom/loading-gif.vue";
import pdfTable from "../pdfReport/table.vue";
import tablehead from "@/config/tablehead";
import DetailKzxx from "./kzxx.vue";
const chinaFiled = tablehead.drugreport.sspz.china;
const usFiled = tablehead.drugreport.sspz.us;
const euFiled = tablehead.drugreport.sspz.eu;
const jpFiled = tablehead.drugreport.sspz.jp;
const countriesFiled = tablehead.drugreport.sspz.countries;

export default {
  components: {
    LoadingGif,
    pdfTable,
    DetailKzxx
  },
  props: {
    extendList: Array,
    res: {
      type: Object
    },
    ylbm: {
      type: String
    },
    sspzchina: {
      type: Object
    },
    sspzus: {
      type: Object
    },
    sspzeu: {
      type: [Object, Array]
    },
    sspzjp: {
      type: Object
    },
    jspdf: {
      type: Boolean
    }
  },
  data() {
    return {
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      loading5: true,
      newArray: [],
      showArray: [],
      chinaData: {
        res: {},
        tableHead: chinaFiled,
        exportUrl: "/api/report/sspzchina?outdata=1"
      },
      usData: {
        res: {},
        tableHead: usFiled,
        exportUrl: "/api/report/sspzus?outdata=1"
      },
      euData: {
        res: {},
        tableHead: euFiled,
        exportUrl: "/api/report/sspzeu?outdata=1"
      },
      jpData: {
        res: {},
        tableHead: jpFiled,
        exportUrl: "/api/report/sspzjp?outdata=1"
      },
      allParam: {
        pageSize: 10,
        page: 1
      },
      cnParam: {
        pageSize: 10,
        page: 1
      },
      euParam: {
        pageSize: 10,
        page: 1
      },
      usParam: {
        pageSize: 10,
        page: 1
      },
      jpParam: {
        pageSize: 10,
        page: 1
      }
    };
  },
  watch: {},
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
    LoadChinaData(obj) {
      if (this.sspzchina) {
        this.chinaData.res = this.sspzchina;
        this.loading1 = false;
        return;
      }
      return window
        .Axios({
          method: "get",
          url: "/api/report/sspzchina",
          params: _.assign(
            {},
            {
              englishname: this.res.englishname,
              ylbm: this.ylbm,
              accesstoken: GETCOOKIEFUN("accesstoken")
            },
            this.cnParam
          )
        })
        .then(res => {
          this.loading1 = false;
          this.chinaData.res = res.data.data;
        });
    },
    LoadUsData() {
      if (this.sspzus) {
        this.usData.res = this.sspzus;
        this.loading2 = false;
        return;
      }
      return window
        .Axios({
          method: "get",
          url: "/api/report/sspzus",
          params: _.assign(
            {},
            {
              englishname: this.res.englishname,
              ylbm: this.ylbm,
              accesstoken: GETCOOKIEFUN("accesstoken")
            },
            this.usParam
          )
        })
        .then(res => {
          this.loading2 = false;
          this.usData.res = res.data.data;
        });
    },
    LoadEuData() {
      if (this.sspzeu) {
        this.euData.res = this.sspzeu;
        this.loading3 = false;
        return;
      }
      return window
        .Axios({
          method: "get",
          url: "/api/report/sspzeu",
          params: _.assign(
            {},
            {
              englishname: this.res.englishname,
              ylbm: this.ylbm,
              accesstoken: GETCOOKIEFUN("accesstoken")
            },
            this.euParam
          )
        })
        .then(res => {
          this.loading3 = false;
          this.euData.res = res.data.data;
        });
    },
    LoadJpData() {
      if (this.sspzjp) {
        this.jpData.res = this.sspzjp;
        this.loading4 = false;
        return;
      }
      return window
        .Axios({
          method: "get",
          url: "/api/report/sspzjp",
          params: _.assign(
            {},
            {
              englishname: this.res.englishname,
              ylbm: this.ylbm,
              accesstoken: GETCOOKIEFUN("accesstoken")
            },
            this.jpParam
          )
        })
        .then(res => {
          this.loading4 = false;
          this.jpData.res = res.data.data;
        });
    },
    chunk(arr, num) {
      //每十个截取一次
      let j = 0,
        o = j;
      while (j < arr.length) {
        j += num;
        this.newArray.push(arr.slice(o, j));
        o = j;
      }
      return this.newArray;
    },
    changePage(idx) {
      this.showArray = this.newArray[idx - 1];
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
          "englishname=" +
          this.res.englishname +
          "&ylbm=" +
          this.ylbm +
          "&accesstoken=" +
          GETCOOKIEFUN("accesstoken")
      );
    },
    cnCurrentChange(val) {
      this.loading1 = true;
      this.cnParam.page = val;
      this.LoadChinaData();
    },
    usCurrentChange(val) {
      this.loading2 = true;
      this.usParam.page = val;
      this.LoadUsData();
    },
    euCurrentChange(val) {
      this.loading3 = true;
      this.euParam.page = val;
      this.LoadEuData();
    },
    jpCurrentChange(val) {
      this.loading4 = true;
      this.jpParam.page = val;
      this.LoadJpData();
    },
    crCurrentChange(val) {
      this.loading5 = true;
      this.allParam.page = val;
      // this.LoadCountriesData();
    },
    loadData() {
      Promise.all([
        this.LoadChinaData(),
        this.LoadUsData(),
        this.LoadEuData(),
        this.LoadJpData()
      ]).then(res => {
        let isShow =
          this.chinaData.res.length > 0 ||
          this.usData.res.length > 0 ||
          this.euData.res.length > 0 ||
          this.jpData.res.length > 0;
        console.log(isShow);
        this.$emit("showSSPZ", isShow);
      });
    }
  },
  mounted() {
    // this.LoadCountriesData();
    this.loadData();
  }
};
</script>
<style lang="less" scoped>
@import "@/assets/less/var.less";
@import "../css/com.less";

.tabs {
  position: relative;
  height: 30px;
  width: auto;
  padding: 0 35px 10px;
  font-size: 14px;
  line-height: 30px;
  .flag {
    vertical-align: middle;
  }
  .tab-pane {
    padding: 0px 10px;
    color: @PrimaryColor;
    .num {
      padding: 1px 5px;
      margin-left: 5px;
      border-radius: 15px;
      border: 1px solid @PrimaryColor;
    }
  }
  .export {
    position: absolute;
    right: 30px;
    cursor: pointer;
  }
}
.china_content {
  .el-table {
    .el-table__header-wrapper {
      padding-left: 34px !important;
      background-color: #eaeef9;
    }
    th {
      padding-left: 35px;
    }
    .cell {
      padding-left: 35px;
    }
    .el-table__body-wrapper {
      .el-table__body {
        .el-table__row td {
          padding-left: 34px !important;
        }
      }
    }
  }
}
.us_content {
  .el-table {
    // padding-left: 35px;
    .el-table__header-wrapper {
      padding-left: 34px !important;
      background-color: #eaeef9;
    }
  }
}
.detail-items {
  padding-bottom: 10px !important;
}

.mt12 {
  margin-top: 12px;
}

.mt20 {
  margin-top: 20px;
}
</style>
