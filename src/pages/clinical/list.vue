<template>
  <div class="la-list">
    <List :loading="listLoading" :nodata="res1Nodata">
      <div class="actions" :style="posi">
        <!-- 显示 -->
        <list-check :defaultFiled="defaultFiled" vuex_name="Clinical" :showArray="tableHead" @changeTableHeader="(list)=>changeTableHeader(this,list)" style="text-align:left;" />
        <!-- 导出 -->
        <Export
        :out_max="allBase.out_max"
        vuex_name="Clinical"
        api_name="clinical"
        :max_num="extendCount.BaseCount"
        :defaultFiled="exportDefaultFiled"
        outdataAction="base"
        style="text-align:left;"></Export>
      </div>
      <el-table
        :data="res1"
        stripe
        fixed
        ref="ElTable"
        :height="tableHeight"
        @sort-change="sortChange"
        :default-sort = "order.base ? defaultSort(order.base) : {}"
        v-if="show_table">
        <el-table-column
          v-for="item in tableHead"
          :prop="item.prop"
          :min-width="item.field_width || item.width || 100"
          :key="item.prop"
          :sortable="item.sort"
          :label="item.label">
          <template :slot="item.tips ? 'header':''" :slot-scope="'scope'">
            <span>
              {{item.label}}
              <el-tooltip class="" effect="light" placement="right">
                <div slot="content">{{headDesc[item.prop]}}</div>
                <i class="el-icon-question cl-green" style="margin-left:4px;"></i>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <div v-if="vueCheckListPms('Clinical', item.label)" :title="scope.row[item.prop]">
              <template v-if="item.prop === 'me_id'">
                <router-link tag="a" :title="scope.row.id" :to="{path:'/clinical/' + scope.row.id}" class="no-underline cl-blue" target="_blank">
                  {{ scope.row.me_id }}
                </router-link>
              </template>
              <div v-else-if="item.prop === 'interventions_guifan'" :title="''">
                <el-tooltip effect="light" placement="right" v-if="scope.row.interventions_guifan">
                  <div slot="content" >
                    <div style="word-break:break-all; " v-html="scope.row.interventions_guifan"></div>
                  </div>
                  <div class="lineTwoHidden">
                    <div v-html="scope.row.interventions_guifan"></div>
                  </div>
                </el-tooltip>
              </div>
              <div v-else-if="item.prop === 'recruitment'" :title="''">
                <p v-if="scope.row.recruitment" class="dis" :title="scope.row.recruitment">{{scope.row.recruitment}}</p>
                <p v-if="scope.row.recruitment_guifan" class="dis" :title="scope.row.recruitment_guifan">{{scope.row.recruitment_guifan}}</p>
              </div>
              <div v-else-if="item.prop === 'start'" :title="''">
                <span v-if="scope.row.register !== 'ClinicalTrials.gov美国'" :title="scope.row.start">{{scope.row.start}}</span>
                <template v-else>
                  <p v-if="scope.row.start_s" class="dis">{{scope.row.start_s}}(计划)</p>
                  <p v-if="scope.row.start" class="dis">{{scope.row.start}}(实际)</p>
                </template>
              </div>
              <div v-else-if="item.prop === 'completion'" :title="''">
                <span v-if="scope.row.register !== 'ClinicalTrials.gov美国'" :title="scope.row.completion">{{scope.row.completion}}</span>
                <template v-else>
                  <p v-if="scope.row.completion_s" class="dis">{{scope.row.completion_s}}(计划)</p>
                  <p v-if="scope.row.completion" class="dis">{{scope.row.completion}}(实际)</p>
                </template>
              </div>
              <div v-else-if="item.prop === 'targets'" :title="''" >
                <TooltipBD :targets="scope.row.targets" :targets_abbr="scope.row.targets_abbr" />
              </div>
              <template v-else><span>{{scope.row[item.prop]}}</span></template>
            </div>
            <span v-else class="abandon-click-method">暂无权限</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="positon: relative;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="param.page"
          :page-sizes="[20, 30, 50]"
          :page-size="param.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="extendCount.BaseCount"
          :disabled="nopms.fy"
          :class="{'abandon-click-method': nopms.fy}">
        </el-pagination>
        <span class="out-of-page cl-red">限于内容篇幅，部分结果未予显示</span>
      </div>
    </List>
  </div>
</template>
<script>
  import TooltipBD from "@/components/common/globalCom/target-tooltip.vue"
  import List from "@/components/layouts/list.vue"
  import Export from "@/components/common/export.vue"
  import listCheck from "@/components/common/list-check.vue"
import { mapState } from 'vuex'
  import tablehead from '@/config/tablehead'
  import commonMixins from '@/mixins/common.js'
  import setTableHMixins from '@/mixins/setTableH.js'

  function getWinHeight(){
    return window.innerHeight
  }
  const defaultFiled = tablehead.clinical.qqlc
  const defaultExport = tablehead.clinical.qqlc
  export default{
    components: {
      TooltipBD,
      List,
      Export,
      listCheck
    },
    mixins: [
      commonMixins,
      setTableHMixins
    ],
    data () {
      return {
        res1Nodata: false,
        activeTabName: 'first',
        vuex_name: 'Clinical',
        defaultFiled: defaultFiled,
        exportDefaultFiled: defaultExport,
        tableHead:[],
        checkallShow: [],
        show_table: true,
        headDesc: {
          targets: '鼠标上移至靶点名称处可查看简称和全称',
          start: '仅ClinicalTrials.gov的临床试验，含有计划和实际开始日期',
          completion: '仅ClinicalTrials.gov的临床试验，含有计划和实际完成日期',
          conditions1_guifan: "仅包含ClinicalTrials.gov美国的数据",
          interventions1_guifan: "仅包含ClinicalTrials.gov美国的数据",
          sponsor1_guifan: "仅包含ClinicalTrials.gov美国的数据",
        },
        changeStyle:'',
        tableHeight: document.documentElement.clientHeight-48-40-40-36-58,
        posi: 'position:static;text-align:right;padding:0 10px;'
      }
    },
    computed: {
      //同时获取多个属性
      ...mapState({
        allBase: state => state.Clinical.allBase,
        tableconf: state => state.Clinical.tableconf,
        res1: state => _.keys(state.Clinical.res1).length&&state.Clinical.res1.res&&state.Clinical.res1.res.length ? state.Clinical.res1.res : [],
        errorcode: state => state.Clinical.error,
        listLoading: state => state.Clinical.listLoading,
        putong: state => state.Clinical.putong,
        gaoji: state => state.Clinical.gaoji,
        shaixuan: state => state.Clinical.shaixuan,
        extendCount: state => state.Clinical.extendCount,
        param: state => state.Clinical.slh_param, // 附加参数(存于vuex内)
        nopms: state => state.Clinical.nopms,
        order: state => state.Clinical.order
      }),
    },
    mounted(){
    },
    // safari浏览器回到当前页面会导致样式错乱问题，由于使用了keepalive所以需要在activated生命周期中在调一次计算方法
    activated() {
      this.registerEven();
    },
    watch: {
      res1: {
        handler(val) {
          this.res1Nodata = val.length ? false : true
          this.$nextTick(() => {
            this.registerEven()
          })
        }
      },
      tableHead: {
        handler() {
          this.$nextTick(() => {
            this.registerEven();
          });
        },
        immediate: true,
      },
      tableconf(n){
        //后台控制列表宽度
        this.defaultFiled = this.tableheaderCombain(n,this.defaultFiled);
      }
    },
    methods: {
      init () {
        this.tableHead = this.defaultFiled.reduce((res, item) => {
          if(item.checked){
            res.push(item)
          }
          return res
        }, [])
      },
      handleCurrentChange (val) {
        this.param.page = val
        if (val * this.param.pageSize <= 1500) {
          $('.out-of-page').hide()
          Store.dispatch('Clinical/nomalSearch',{params:this.param})
        } else {
          $('.out-of-page').show()
        }
      },
      handleSizeChange (val) {
        this.param.page = 1
        this.param.pageSize = val
        if (val * this.param.page <= 1500) {
          $('.out-of-page').hide()
          Store.dispatch('Clinical/nomalSearch',{params:this.param})
        } else {
          $('.out-of-page').show()
        }
      },
    },
    created () {
      this.init()
      setTimeout(() => {
        const hashLocation= sessionStorage.getItem("hashLocation");//缓存中获取当前页面的路由名称
        // 注意, 这里使用全路径匹配,在hash模式中,因为地址会携带#,所以页面报告中的url需要重新覆盖一下, 将#去除
        window._paq.push(['setCustomUrl', "https://" + hashLocation]);//覆盖页面报告的url，可以自定义页面url，加上本页面路由
        window._paq.push(['trackPageView', this.allBase.dbname]);//页面名称,可以自定义页面名称
        window._paq.push(['setDocumentTitle', this.allBase.dbname])
      }, 1000);
    },
    updated () {
      this.vueTogglePmsTooltip()
    },
  }
</script>
<style lang="less">
@import "@/assets/less/var.less";
@import "@/assets/less/app.less";

  .el-table {
    .cell {
      overflow: visible;
    }
  }


  .extensible-td{
    cursor: pointer;
    text-decoration: underline;
    &:hover{
      color: @PrimaryColor;
      font-weight: 600;
    }
  }
  .bg-green-br {
    // display: inline-block;
    text-align: center;
    font-size: 12px;
    padding: 0px 10px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    background-color: @Green;
    color: #fff;
    max-width: 80px;
    overflow: hidden;
  }
  .bg-orange-br {
    // display: inline-block;
    text-align: center;
    font-size: 12px;
    padding: 0px 10px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    background-color: @Orange;
    color: #fff;
    max-width: 80px;
    overflow: hidden;
  }
  .under_a{
    text-decoration: underline;
    &:hover{
      color: @PrimaryColor;
      font-weight: 600;
    }
  }

  // el-dialog遮罩层样式（背景色）
  .v-modal {
    background: rgba(102,102,102, .4);
  }

</style>
