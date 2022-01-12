<template>
  <div class="la-list">
    <List :loading="listLoading" :nodata="res1 && !res1.length">
      <div class="actions">
        <span
          class="action-btn"
          :class="{ 'abandon-click-method': nopms && nopms.ksh }"
          @click="sendGa"
        >
          <span class="icon iconfont">&#xe643;</span>
          智能分析
        </span>
        <!-- 显示 -->
        <list-check
          :defaultFiled="defaultFiled"
          vuex_name="Fdadrugnew"
          :showArray="tableHead"
          @changeTableHeader="(list) => changeTableHeader(this, list)"
        />
        <!-- 导出 -->
        <Export
          :out_max="allBase.out_max"
          vuex_name="Fdadrugnew"
          api_name="fdadrugnew"
          :max_num="extendCount.BaseCount"
          :defaultFiled="exportDefaultFiled"
          outdataAction="apply"
        ></Export>
      </div>
      <el-table
        :data="res1"
        stripe
        fixed
        ref="ElTable"
        :height="tableHeight"
        @sort-change="sortChange"
        :default-sort="order.apply ? defaultSort(order.apply) : {}"
        v-if="show_table"
      >
        <el-table-column
          v-for="item in tableHead"
          :prop="item.prop"
          :min-width="item.field_width || item.width || 100"
          :key="item.prop"
          :sortable="item.sort"
          :fixed="item.is_fixed == '1'"
          :label="item.label"
        >
          <template :slot="1 ? 'header' : ''" slot-scope="scope">
            <span>
              <NewProjectGuide
                postion="列表"
                :newPosition="{
                  top: -5,
                  right: getPositonRight(item.order, item.statement),
                }"
                :onlyKey="item['new_id']"
                display="inline"
                compoentsName="字段"
                :initItem="item"
                :showMenban="item['is_show_new']"
                >{{ item.label }}</NewProjectGuide
              >
            </span>
            <el-tooltip
              v-if="item.statement"
              class=""
              effect="zhuce"
              placement="right"
            >
              <div slot="content" v-html="item.statement"></div>
              <i
                class="el-icon-question cl-green"
                style="margin-left: 4px; line-height: 28px"
              ></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div
              v-if="vueCheckListPms('Fdadrugnew', item.label)"
              :title="scope.row[item.prop]"
            >
              <template v-if="item.prop === 'applno'">
                <router-link
                  v-if="scope.row.appltype === '生物药（CBER）'"
                  tag="a"
                  :to="{ path: '/fdadrugnew/' + scope.row.applno + '/cber' }"
                  target="_blank"
                  style="color: #4877e8"
                  >{{ scope.row.applno }}</router-link
                >
                <router-link
                  v-else
                  tag="a"
                  :to="{ path: '/fdadrugnew/' + scope.row.applno }"
                  target="_blank"
                  style="color: #4877e8"
                  >{{ scope.row.applno }}</router-link
                >
                <span
                  class="id-green bg-blue"
                  :title="scope.row['firstgeneric']"
                  v-if="scope.row['firstgeneric']"
                  >{{ "仿" }}</span
                >
                <span
                  class="id-green bg-orange"
                  :title="scope.row['chengpishu']"
                  v-if="scope.row['chengpishu']"
                  >{{ "橙" }}</span
                >
                <span
                  class="id-green bg-green"
                  :title="scope.row['submissionpropertytypecode']"
                  v-if="scope.row['submissionpropertytypecode']"
                  >{{ "孤" }}</span
                >
                <!-- <div>
                      <span class="id-green bg-blue" :title="scope.row['firstgeneric']" v-if="scope.row['firstgeneric']">{{'仿'}}</span>
                      <span class="id-green bg-orange" :title="scope.row['chengpishu']" v-if="scope.row['chengpishu']">{{'橙'}}</span>
                      <span class="id-green bg-green" :title="scope.row['submissionpropertytypecode']" v-if="scope.row['submissionpropertytypecode']">{{'孤'}}</span>
                    </div> -->
              </template>
              <!-- <div v-else-if="item.prop === 'activeingredient'" :title="scope.row.activeingredient + scope.row.cname">
                  <span class="dis">{{ scope.row.activeingredient }}</span>
                  <span class="dis">{{ scope.row.cname }}</span>
                </div> -->
              <!-- <div v-else-if="item.prop === 'sponsorname'" :title="scope.row.sponsorname + scope.row.chinesecompany">
                  <span class="dis">{{ scope.row.sponsorname }}</span>
                  <span class="dis">{{ scope.row.chinesecompany }}</span>
                </div> -->
              <div
                v-else-if="item.prop === 'drugname'"
                :title="scope.row.drugname"
              >
                <span>{{ scope.row.drugname }}</span>
                <!-- <span class="id-green bg-blue" v-if="scope.row['essentialmedicine_tag']">{{scope.row['essentialmedicine_tag']}}</span>
                  <span class="id-green bg-orange" v-if="scope.row['firstinclass']">{{scope.row['firstinclass']}}</span>
                  <span class="id-green bg-green" v-if="scope.row['firstapproved']">{{scope.row['firstapproved']}}</span> -->
              </div>
              <div v-else-if="item.prop === 'targets'" :title="''">
                <TooltipBD
                  :targets="scope.row.targets"
                  :targets_abbr="scope.row.targets_abbr"
                />
              </div>
              <template v-else
                ><span>{{ scope.row[item.prop] }}</span></template
              >
            </div>
            <span v-else class="abandon-click-method">暂无权限</span>
          </template>
        </el-table-column>
      </el-table>

      <div style="positon: relative">
        <el-pagination
          v-if="extendCount.BaseCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="param.page"
          :page-sizes="[20, 30, 50]"
          :page-size="param.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="extendCount.BaseCount"
          :disabled="nopms.fy"
          :class="{ 'abandon-click-method': nopms.fy }"
        >
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
import { mapState } from "vuex";
import tablehead from "@/config/tablehead";
import commonMixins from "@/mixins/common.js";
import setTableHMixins from "@/mixins/setTableH.js";

const defaultFiled = tablehead.fdadrugnew.sqh;
export default {
  components: {
    TooltipBD,
    List,
    Export,
    listCheck,
  },
  mixins: [commonMixins, setTableHMixins],
  data() {
    return {
      vuex_name: "Fdadrugnew",
      activeTabName: "first",
      defaultFiled: [],
      exportDefaultFiled: [],
      tableHead: [],
      checkallShow: [],
      show_table: true,
      headDesc: {
        marketingstatusid:
          "暂定批准是指对符合全部批准条件的仿制药申请所采取的行动，但是在申请所参考的上市药物的市场独占权和/或专利期限到期之前，它不被允许在美国合法销售。",
        firstgeneric:
          "FDA首次批准并允许制造商在美国销售此药。FDA认为第一个首仿药对公众健康很重要，并优先审查这些提交的文件。",
        f505b2:
          "当NDA申请人提交完整的安全性和有效性研究报告时，至少有部分内容来源于非申请者开展或申请者无权引用的研究，则必须通过505(b)(2)途径。",
        offexclusiity:
          "申请人在这些NDA新药过了保护期之后申请ANDA，但是向FDA提交ANDA之前，需要参考上述三个选项。partI：若提交为ANDA，FDA可立即受理；partII：若提交为ANDA，会涉及到部分法案，需要在此之前与FDA沟通；appendix：从partI、partII删除，已获得FDA的批准。",
        acceleration:
          "加速批准主要适用于病程较长和需要较长的时间才能衡量药物预期的临床效益的环境。",
        breakthroughtherapy:
          "如果一种药物被指定为突破性治疗，FDA将加快这种药物的开发和审查。所有突破性治疗指定的申请将在收到后60天内进行审核，FDA有权利批准或拒绝该申请。",
        priority:
          "优先审评是在提交BLA，NDA或功效补充剂时确定的。如果符合相关标准，则任何药物，包括已获得快速通道名称，突破性疗法名称或正在评估加速批准的药物，都可以进行优先审评。",
        fasttrack:
          "快速审批通道是指用于治疗严重或危及生命的疾病的药物，非临床或临床数据表明有潜力解决严重疾病的未满足医疗需求。",
        submissionclasscode:
          "对于原始(ORIG)的NDA提交，此处提供了新药申请的分类；对于补充(SUPPL)提交，此处描述了FDA批准申请的变更类型。",
        tecode:
          "使用户快速了解FDA是否已将特定批准的药品评估为与其他药学等效性产品具有等效治疗性（第一个字母），并在FDA的评估基础上提供其他信息（第二个字母）。首字母A代表没有生物等效问题，或已解决，B有生物等效问题且尚未解决。第二个字母按照剂型等划分其他信息。",
        referencedrug:
          "简称RLD，是指在FDA批准上市，用于仿制药注册申请的参照药品。通常是具有完整规范的安全性和有效性研究数据的药品。",
        appltype:
          "生物药CBER即“生物制品审评与研究中心“批准的产品，包括过敏原性、血液制品、细胞和基因治疗、疫苗等产品。",
      },
      changeStyle: "",
      tableHeight:
        document.documentElement.clientHeight - 48 - 60 - 60 - 50 - 88,
    };
  },
  computed: {
    //同时获取多个属性
    ...mapState({
      allBase: (state) => state.Fdadrugnew.allBase,
      tableconf: (state) => state.Fdadrugnew.tableconf,
      res1: (state) =>
        _.keys(state.Fdadrugnew.res1).length ? state.Fdadrugnew.res1.res : [],
      errorcode: (state) => state.Fdadrugnew.error,
      listLoading: (state) => state.Fdadrugnew.listLoading,
      putong: (state) => state.Fdadrugnew.putong,
      gaoji: (state) => state.Fdadrugnew.gaoji,
      shaixuan: (state) => state.Fdadrugnew.shaixuan,
      extendCount: (state) => state.Fdadrugnew.extendCount,
      param: (state) => state.Fdadrugnew.slh_param, // 附加参数(存于vuex内)
      nopms: (state) => state.Fdadrugnew.nopms,
      order: (state) => state.Fdadrugnew.order,
    }),
  },
  mounted() {},
  // safari浏览器回到当前页面会导致样式错乱问题，由于使用了keepalive所以需要在activated生命周期中在调一次计算方法
  activated() {
    let tempTableconf = _.cloneDeep(this.tableconf),
      actionName = `${
        this.vuex_name[0].toUpperCase() + this.vuex_name.substr(1)
      }/tableconf`; // 第一个字母转大写
    this.$store.commit(actionName, []);
    this.$store.commit(actionName, tempTableconf);
    this.registerEven();
  },
  watch: {
    res1: {
      handler() {
        this.$nextTick(() => {
          this.registerEven();
        });
      },
      immediate: true,
    },
    tableHead: {
      handler() {
        this.$nextTick(() => {
          this.registerEven();
        });
      },
      immediate: true,
    },
    tableconf(n) {
      n.forEach((item) => {
        item.checked = item.hidden === undefined;
        item.prop = item.field;
      });
      //后台控制列表宽度
      this.defaultFiled = this.tableheaderCombain(n, n);
      this.exportDefaultFiled = this.defaultFiled;
      this.init();
    },
  },
  methods: {
    // 动态计算new标签的right间距(order为排序标签，statement为提示问号)
    getPositonRight(order, statement) {
      if (order && !statement) {
        return -42;
      } else if (!order && statement) {
        return -40;
      } else if (order && statement) {
        return -58;
      } else {
        return -25;
      }
    },
    // 跳转到智能分析
    sendGa() {
      if (this.nopms && !this.nopms.ksh) {
        window.ga("send", "event", "tab", "click", "fdadrugnew_analy");
        window._paq.push(["trackEvent", "tab", "click", "fdadrugnew_analy"]);
        this.$router.push({ path: "/fdadrugnew/analy" });
      }
    },

    init() {
      this.tableHead = this.defaultFiled.reduce((res, item) => {
        if (item.checked && !item.hide) {
          res.push(item);
        }
        return res;
      }, []);
    },
    handleCurrentChange(val) {
      this.param.page = val;
      if (val * this.param.pageSize <= 1500) {
        $(".out-of-page").hide();
        Store.dispatch("Fdadrugnew/nomalSearch", { params: this.param });
      } else {
        $(".out-of-page").show();
      }
    },
    handleSizeChange(val) {
      this.param.page = 1;
      this.param.pageSize = val;
      if (val * this.param.page <= 1500) {
        $(".out-of-page").hide();
        Store.dispatch("Fdadrugnew/nomalSearch", { params: this.param });
      } else {
        $(".out-of-page").show();
      }
    },
  },
  updated() {
    this.vueTogglePmsTooltip();
  },
};
</script>
<style lang="less">
@import "~@/assets/less/var.less";
@import "~@/assets/less/app.less";
.id-green {
  display: inline-block;
  padding: 0 10px;
  border-radius: 10px;
  // height: 20px;
  line-height: 14px;
  background: @Green;
  color: #fff;
  white-space: nowrap;
  font-size: 12px;
}
.bg-blue {
  background: @Blue;
}
.bg-orange {
  background: @Orange;
}
.bg-green {
  background: @Green;
}
.el-table {
  .cell {
    overflow: visible;
    // padding-left: 30px;
  }
}

.cell-shoulihao-wrap {
  position: relative;
  .cell-shoulihao {
    float: left;
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

.la-slh {
}
.ytz-icons {
  display: inline-block;
  & > span {
    overflow: hidden;
    display: inline-block;
    float: left;
    font-size: 12px;
    padding: 4px;
    // margin: 0px 0px 0px 6px;
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    color: #fff;
    border-radius: 11px;
  }
}
.yxsp-icon {
  background: @McTypeGreen;
}
.zdzx-icon {
  background: @PrimaryColor;
}
.tssp-icon {
  background: @McTypeOrange;
}
// el-dialog遮罩层样式（背景色）
.v-modal {
  background: rgba(102, 102, 102, 0.4);
}
</style>
