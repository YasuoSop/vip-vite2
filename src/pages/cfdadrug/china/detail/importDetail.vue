<template>
  <div class="wrapper" ref="wrapper">
    <!-- 自定义加载界面 -->
    <LoadingGif :loadFlag="isLoading" v-if="isLoading"></LoadingGif>
    <!-- 加载完成显示部分 -->
    <div class="detail-list" v-else>
      <div class="detail-header">
        <div class="header-left">
          <div class="left-top">
            <span class=" top-id" :title="data.title.zhucezhenghao">{{
              data.title.zhucezhenghao
            }}</span>
            <div class="left-bottom">
              <span class="bottom-name">{{
                data.title.chanpinmingchengzhongwen
              }}</span>
              <a class="company-name">{{
                data.title.gongsimingchengzhongwen
              }}</a>
            </div>
            <span class="id-green bg-blue" v-if="data.title.titel.country">{{
              data.title.titel.country
            }}</span>
            <span class="id-green bg-green" v-if="data.title.yblb">{{
              data.title.yblb
            }}</span>
            <span class="id-green bg-orange" v-if="data.title.titel.jiyao">{{
              data.title.titel.jiyao
            }}</span>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="left-nav">
          <div class="nav-list nav-event" @click="handleNavClick">
            <a class="nav-item active" v-if="hasPartOne">基本信息</a>
            <a class="nav-item" v-if="hasPartTwo">国家医保信息</a>
            <a class="nav-item" v-if="hasExtend">扩展信息</a>
          </div>
        </div>
        <div class="right-list">
          <slide-section :title="'基本信息'" class="the-part" v-if="hasPartOne">
            <div class="tb-wrap">
              <table class="tb-t">
                <tr>
                  <td>
                    <div class="td-line5">
                      注册证号
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.zhucezhenghao }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      原注册证号
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.yuanzhucezhenghao }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      分包装注册证号
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.fenbaozhuangpizhunwenhao }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      注册证号备注
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.zhucezhenghaobeizhu }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      药品名称（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.chanpinmingchengzhongwen }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      药品名称（英文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.chanpinmingchengyingwen }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      商品名（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.shangpinmingzhongwen }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      商品名（英文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.shangpinmingyingwen }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      本位码（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.benweima }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      本位码（备注）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.benweimabeizhu }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      靶点简称
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.targets_abbr }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      靶点全称
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.targets }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      适应症
                    </div>
                  </td>
                  <td>
                    <div class="td-line5" v-html="data.jbxx.shiyingzheng ? data.jbxx.shiyingzheng : '/'">
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      药品类型
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.chanpinleibie }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <!-- <td>
                    <div class="td-line5">
                      原研/仿制（药智）
                      <el-tooltip  effect="zhuce" placement="right">
                        <div slot="content">原研/仿制（药智）的分类主要是根据药品注册分类和新闻等信息综合判断。</div>
                        <i class="el-icon-question cl-green" style="margin-left:4px;"></i>
                      </el-tooltip>
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.yuanyanhuofangzhi }}
                    </div>
                  </td> -->
                  <td>
                    <div class="td-line5">
                      剂型（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.jixingzhongwen }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      无需开展一致性评价品种
                      <el-tooltip effect="zhuce" placement="right">
                        <div slot="content">
                          根据《临床价值明确，无法推荐参比制剂的化学药品目录》分类。
                        </div>
                        <i
                          class="el-icon-question cl-green"
                          style="margin-left:4px;"
                        ></i>
                      </el-tooltip>
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.wftjcbzj === 1 ? "是" : "否" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      过度重复品种
                      <el-tooltip effect="zhuce" placement="right">
                        <div slot="content">
                          根据中国药学会发布的过度重复药品提示性公告标记分类。过度重复：同一药品已获批准文号企业数在20家以上；获批企业数≤3家：指在该药品大类是过度重复品种，但药品当前剂型已有批准文号企业数≤3家。
                        </div>
                        <i
                          class="el-icon-question cl-green"
                          style="margin-left:4px;"
                        ></i>
                      </el-tooltip>
                    </div>
                  </td>
                  <td colspan="3">
                    <div class="td-line5">
                      {{ data.jbxx.gdcf }}
                    </div>
                  </td>
                  <!-- <td>
                    <div class="td-line5">
                      带量采购品种
                      <el-tooltip effect="zhuce" placement="right">
                        <div slot="content">
                          集中采购品种目录中药品名称、规格及其生产企业相同的药品
                        </div>
                        <i
                          class="el-icon-question cl-green"
                          style="margin-left:4px;"
                        ></i>
                      </el-tooltip>
                    </div>
                  </td> -->
                  <!-- <td>
                    <div class="td-line5">
                      <router-link
                        target="_blank"
                        class="under_a"
                        :to="{
                          path: '/dailiangcaigou',
                          query: {
                            fourth_condition: `bianma=${data.jbxx.bianma} _and
                        qiyebianmatz=${data.jbxx.qiyebianmatz} _and guifanguige=${data.jbxx.guifanguige}`
                          }
                        }"
                        v-if="data.jbxx.dailiangcaigou === '是'"
                        >{{
                          data.jbxx.dailiangcaigou
                            ? data.jbxx.dailiangcaigou
                            : "/"
                        }}</router-link
                      >
                      <div v-else>
                        {{
                          data.jbxx.dailiangcaigou
                            ? data.jbxx.dailiangcaigou
                            : "/"
                        }}
                      </div>
                    </div>
                  </td> -->
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      规格
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.guigezhongwen }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      包装规格（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.baozhuangguigezhongwen }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      发证日期
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.fazhengriqi }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      有效期截止日
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.youxiaoqijiezhiri }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      公司名称（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.gongsimingchengzhongwen || "/" }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      公司名称（英文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.gongsimingchengyingwen || "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      生产厂商（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.shengchanchangshangzhongwen || "/" }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      生产厂商（英文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.shengchanchangshangyingwen || "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      上市许可持有人中文名称
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.mah }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      上市许可持有人英文名称
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.mahyingwen }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      上市许可持有人地址（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.mahaddresszhongwen }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      上市许可持有人地址（英文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.mahaddressyingwen }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      厂商国家（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.changshangguojiazhongwen }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      厂商国家（英文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.changshangguojiayingwen }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      持有者国家（中文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.guojiazhongwen || "/" }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      持有者国家（英文）
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.guojiayingwen || "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      分包装企业名称
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.fenbaozhuangqiyemingcheng }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      分包装企业地址
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.fenbaozhuangqiyedizhi }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      分包装文号批准日期
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.fenbaozhuangwenhaopizhunriqi }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      分包装文号有效期截止日期
                    </div>
                  </td>
                  <td colspan="3">
                    <div class="td-line5">
                      {{ data.jbxx.fenbaozhuangwenhaoyouxiaoqijiezhiri }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      同成分厂家数
                      <el-tooltip effect="zhuce" placement="right">
                        <div slot="content">
                          活性成分相同的厂家数。
                        </div>
                        <i
                          class="el-icon-question cl-green"
                          style="margin-left:4px;"
                        ></i>
                      </el-tooltip>
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.changjiashuat }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      自产原料药厂家
                      <el-tooltip effect="zhuce" placement="right">
                        <div slot="content">
                          既生产原料药又生产该原料药的制剂产品的厂家。
                        </div>
                        <i
                          class="el-icon-question cl-green"
                          style="margin-left:4px;"
                        ></i>
                      </el-tooltip>
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.zcyly }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="td-line5">
                      保健药品
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.jbxx.baojianpin }}
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      带量采购品种
                      <el-tooltip effect="zhuce" placement="right">
                        <div slot="content">
                          带量采购是国家药品组织的药品集中采购制度的重大改革，首先由4+7城市试点，目前已在全国范围开展。
                        </div>
                        <i
                          class="el-icon-question cl-green"
                          style="margin-left:4px;"
                        ></i>
                      </el-tooltip>
                    </div>
                  </td>
                  <td>
                    <div class="td-line5">
                      <router-link
                        target="_blank"
                        class="under_a"
                        :to="{
                          path: '/dailiangcaigou',
                          query: {
                            fourth_condition: `bianma=${data.jbxx.bianma} _and
                        qiyebianmatz=${data.jbxx.qiyebianmatz} _and guifanguige=${data.jbxx.guifanguige}`
                          }
                        }"
                        v-if="data.jbxx.dailiangcaigou1 === '已中选'"
                        >{{
                          data.jbxx.dailiangcaigou1
                            ? data.jbxx.dailiangcaigou1
                            : "/"
                        }}</router-link
                      >
                      <div v-else>
                        {{
                          data.jbxx.dailiangcaigou1
                            ? data.jbxx.dailiangcaigou1
                            : "/"
                        }}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>ATC分类</td>
                  <td colspan="3">
                    <div class="td-line5">
                      <div
                        v-for="(item, index) in getAtcNames(data.title.atc)"
                        :key="item"
                        class="clearfix"
                      >
                        <span>{{ item }}&nbsp;&nbsp;</span
                        ><span>{{ getAtc(item, data.title.atcarr) }}</span>
                        <br v-if="index % 2 != 0" />
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </slide-section>

          <slide-section
            :title="'国家医保信息'"
            class="the-part"
            v-if="hasPartTwo"
          >
            <div class="tb-wrap">
              <table class="tb-t">
                <tr v-for="(infos, index) in drugInfos" :key="index">
                  <td>
                    <div class="td-line5">{{ infos[0].name }}</div>
                  </td>
                  <td>
                    <div class="td-line5">{{ infos[0].state }}</div>
                  </td>
                  <td>
                    <div class="td-line5">{{ infos[1].name }}</div>
                  </td>
                  <td>
                    <div class="td-line5">{{ infos[1].state }}</div>
                  </td>
                </tr>
              </table>
            </div>
          </slide-section>

          <slide-section :title="'扩展信息'" class="the-part" v-if="hasExtend">
            <div class="extend-list">
              <ExtendButton
                v-for="(item, index) in extendList"
                :key="index"
                :item="item"
              ></ExtendButton>
            </div>
          </slide-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingGif from "@/components/common/globalCom/loading-gif.vue";
import SlideSection from "@/components/common/slide-section.vue";
import LaFooter from "@/components/layouts/footer.vue";
import { mapState } from "vuex";
import ExtendButton from "@/components/common/extend-button.vue";
import detailScrollMixins from "@/mixins/detailScroll.js";
export default {
  components: {
    SlideSection,
    // TimeLine,
    LaFooter,
    ExtendButton,
    LoadingGif
  },
  mixins: [detailScrollMixins],
  data() {
    return {
      isLoading: true,
      id: "",
      // steps,
      data: {},
      atc: [],
      baseInfos: [], //存放基本信息
      drugInfos: [], //存放医疗信息
      atc: [],
      shoulihao: "",
      devProcess: {}, //时光轴
      devProcesses: [],
      heightArr: [],
      scroll: "",
      hasPartOne: false,
      hasPartTwo: true,
      hasExtend: false,
      extendList: [],
      yfxx: {}
    };
  },
  computed: {
    ...mapState({
      nopms: state => state.CfdaDrug.nopms,
      allBase: state => state.CfdaDrug.allBase,
      helpInfo: state => state.CfdaDrug.helpInfo
    })
  },
  watch: {
    showPromtNotice(val) {
      if (val) {
        setTimeout(() => {
          if ($(".left-nav").css("top"))
            $(".left-nav").css(
              "top",
              parseInt(
                $(".left-nav")
                  .css("top")
                  .replace("px", "")
              ) +
                30 +
                "px"
            );
        }, 600);
      } else {
        setTimeout(() => {
          if ($(".left-nav").css("top")) $(".left-nav").css("top", "88px");
        }, 600);
      }
    }
  },
  methods: {
    // 获取atc的中文
    getAtc(name, arr) {
      let str = "";
      if (arr) {
        for (let index in arr[name]) {
          str += arr[name][index].shuoming + " > ";
        }
        str = _.trimEnd(str, " > "); // 去除最后多余的" > "
      }
      return str;
    },
    getAtcNames(name) {
      return name ? name.replace(/\s+/g, "").split(";") : [];
    },
    handleUpClick(e) {
      let scrollTop = $(".all-info").scrollTop();
      if (scrollTop > 0) {
        $(".all-info").animate({ scrollTop: scrollTop - 200 }, 500);
      }
    },
    handleDownClick(e) {
      let scrollTop = $(".all-info").scrollTop();

      $(".all-info").animate({ scrollTop: scrollTop + 200 }, 500);
    },
    handleAllInfoScroll(e) {
      $(e.target).scroll(function() {
        var divHeight = $(this).height();
        var nScrollHeight = $(this)[0].scrollHeight;
        var nScrollTop = $(this)[0].scrollTop;
        if (nScrollTop + divHeight >= nScrollHeight) {
          $(".up-down .down i").css({ color: "#a9adb7" });
        } else if (nScrollTop === 0) {
          $(".up-down .up i").css({ color: "#a9adb7" });
        } else {
          $(".up-down .up i").css({ color: "#626262" });
          $(".up-down .down i").css({ color: "#626262" });
        }
      });
    },
    //先获取devprocess的异步数据，再获取研发历程的数据
    handleAxios() {
      window
        .Axios({
          method: "get",
          url: "/api/cfdadrug/jkdetail",
          params: {
            id: this.$route.params.id,
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            let data = res.data.data.GroupList;
            this.data = data;
            this.atc = data.atc;
            this.getExtendList("cfdadrug", res.data.data.extendList);
            //右侧国家进口的基础信息获取
            this.hasPartOne = true;
            //右侧国家进口的医保信息获取
            this.hasPartTwo = true;
            let drugInfos = [
              { name: "编号", state: data.ybxx.yibaoxuhao },
              { name: "分类", state: data.ybxx.yibao },
              { name: "药品名称", state: data.ybxx.name1 },
              { name: "支付适应症", state: data.ybxx.syz }
            ];
            for (let i = 0; i < drugInfos.length; i++) {
              if (i % 2 === 0) {
                this.drugInfos.push([]);
              }
              this.drugInfos[parseInt(i / 2)].push(drugInfos[i]);
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(this.removeLoading);
    },
    resetSomeStyles() {
      // 使up-down的中间线长度自适应
      $(".up-down .md-line").css({ height: $(".progress-info").height() });
      // 使down的颜色根据是否有滚动条适应
      if ($(".up-down .md-line").height() < 500) {
        $(".up-down .down i").css({ color: "#a9adb7" });
      } else {
        $(".up-down .down i").css({ color: "#626262" });
      }
    },
    // emitTimeLine (data) {
    //   this.hasPartTwo = data
    // }
    // 加载完后移除加载界面
    removeLoading() {
      this.isLoading = false;
    },
    ellipsizeTextElement($element) {
      var nodeList = document.querySelectorAll($element);
      var elements = Array.prototype.slice.call(nodeList, 0);
      elements.forEach(function(element) {
        var wordArray = element.innerHTML.split(" ");
        while (element.scrollHeight > element.offsetHeight) {
          wordArray.pop();
          element.innerHTML = wordArray.join(" ") + "...";
        }
      });
    },
    handleScroll() {
      let top = $(".main").offset().top,
        leftNav = $(".left-nav");
      if (top <= 50) {
        leftNav.css("top", (this.showPromtNotice ? 88 : 58) + "px");
      } else {
        leftNav.css("top", (this.showPromtNotice ? 118 : 88) + "px");
      }
    }
  },
  created() {
    if (!this.nopms.xqy) {
      this.handleAxios();
    }
    setTimeout(() => {
      const hashLocation = sessionStorage.getItem("hashLocation"); //缓存中获取当前页面的路由名称
      // 注意, 这里使用全路径匹配,在hash模式中,因为地址会携带#,所以页面报告中的url需要重新覆盖一下, 将#去除
      window._paq.push(["setCustomUrl", "https://" + hashLocation]); //覆盖页面报告的url，可以自定义页面url，加上本页面路由
      window._paq.push(["trackPageView", this.allBase.dbname]); //页面名称,可以自定义页面名称
      window._paq.push(["setDocumentTitle", this.allBase.dbname]);
    }, 1000);
  },
  mounted() {
    Store.dispatch("CfdaDrug/getBaseInfo");
    this.ellipsizeTextElement("td");
    window.addEventListener("scroll", this.handleScroll, true);
  },
  activated() {
    this.vueRouteToNoPms(this.nopms.xqy);
  },
  updated() {
    this.vueRouteToNoPms(this.nopms.xqy);
    this.vueTogglePmsTooltip();
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/less/var.less";
@import "@/assets/less/detailCom.less";
.td-line5 {
  max-height: 110px !important;
}
.under_a {
  text-decoration: underline;
  &:hover {
    color: @PrimaryColor;
    font-weight: 600;
  }
}
</style>
