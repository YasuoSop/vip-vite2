<template>
  <div class="wrapper" ref="wrapper">
    <!-- 自定义加载界面 -->
    <LoadingGif :loadFlag="isLoading" v-if="isLoading"></LoadingGif>
    <!-- 加载完成显示部分 -->
    <div class="detail-list" v-else>
      <div class="detail-header">
        <div class="header-left">
          <div class="left-top">
            <span class=" top-id" :title="data.pizhunwenhao">{{
              data.pizhunwenhao
            }}</span>
            <div class="left-bottom">
              <span class="bottom-name">{{ data.name }}</span>
              <span class="company-name">{{ data.shengchanqiye }}</span>
            </div>
            <span class="id-green bg-blue">{{ data.titel.country }}</span>
            <span class="id-green bg-green" v-if="data.titel.yblb">{{
              data.titel.yblb
            }}</span>
            <span class="id-green bg-orange" v-if="data.titel.jiyao">{{
              data.titel.jiyao
            }}</span>
          </div>
        </div>
      </div>
      <div class="main">
        <div
          class="left-nav"
          :style="{ top: (showPromtNotice ? 118 : 88) + 'px' }"
        >
          <div class="nav-list nav-event" @click="handleNavClick">
            <a class="nav-item active" v-if="hasPartOne">基本信息</a>
            <a class="nav-item" v-if="hasPartTwo">国家医保信息</a>
            <a class="nav-item" v-if="hasPartFive || nopms.devprocess"
              >药品研发历程</a
            >
            <a class="nav-item" v-if="hasExtend">扩展信息</a>
          </div>
        </div>
        <div class="right-list">
          <slide-section :title="'基本信息'" class="the-part" v-if="hasPartOne">
            <div class="tb-wrap">
              <table class="tb-t">
                <tr>
                  <td>批准文号</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.pizhunwenhao ? jbxx.pizhunwenhao : "/" }}
                    </div>
                  </td>
                  <td>原批准文号</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.yuanpizhunwenhao ? jbxx.yuanpizhunwenhao : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>药品名称（中文）</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.name ? jbxx.name : "/" }}
                    </div>
                  </td>
                  <td>药品名称（英文）</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.englishname ? jbxx.englishname : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>商品名（中文）</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.brandname ? jbxx.brandname : "/" }}
                    </div>
                  </td>
                  <td>靶点简称</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.targets_abbr ? jbxx.targets_abbr : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>适应症</td>
                  <td>
                    <div class="td-line5" v-html="jbxx.shiyingzheng ? jbxx.shiyingzheng : '/'">
                    </div>
                  </td>
                  <td>靶点全称</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.targets ? jbxx.targets : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>本位码（中文）</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.benweima ? jbxx.benweima : "/" }}
                    </div>
                  </td>
                  <td>本位码备注</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.remarks ? jbxx.remarks : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
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
                  </td>
                  <td>{{ data.wftjcbzj == 1 ? "是" : "否" }}</td>
                  <td>
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
                  </td>
                  <td>
                    <div class="td-line5">
                      {{ data.gdcf ? data.gdcf : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <!-- <td>
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
                  </td>
                  <td>
                    <div class="td-line5">
                      <router-link
                        target="_blank"
                        class="under_a"
                        :to="{
                          path: '/dailiangcaigou',
                          query: {
                            fourth_condition: `bianma=${jbxx.bianma} _and
                        qiyebianmatz=${jbxx.qiyebianmatz} _and guifanguige=${jbxx.guifanguige}`
                          }
                        }"
                        v-if="jbxx.dailiangcaigou === '是'"
                        >{{
                          jbxx.dailiangcaigou ? jbxx.dailiangcaigou : "/"
                        }}</router-link
                      >
                      <div v-else>
                        {{ jbxx.dailiangcaigou ? jbxx.dailiangcaigou : "/" }}
                      </div>
                    </div>
                  </td> -->
                  <td>规格</td>
                  <td colspan="3">
                    <div class="td-line5">
                      {{ jbxx.guige ? jbxx.guige : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>剂型</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.jixing ? jbxx.jixing : "/" }}
                    </div>
                  </td>
                  <td>药品类型</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.type ? jbxx.type : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <!-- <td>原研/仿制（药智）
                    <el-tooltip  effect="zhuce" placement="right">
                      <div slot="content">原研/仿制（药智）的分类主要是根据药品注册分类和新闻等信息综合判断。</div>
                      <i class="el-icon-question cl-green" style="margin-left:4px;"></i>
                    </el-tooltip>
                  </td>
                  <td><div class="td-line5">{{jbxx.yuanyanhuofangzhi ? jbxx.yuanyanhuofangzhi : '/'}}</div></td> -->
                  <td>批准日期</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.authorizationday ? jbxx.authorizationday : "/" }}
                    </div>
                  </td>
                  <td>生产企业</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.shengchanqiye ? jbxx.shengchanqiye : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>生产地址</td>
                  <td>
                    <div class="td-line5">
                      {{ jbxx.address ? jbxx.address : "/" }}
                    </div>
                  </td>
                  <td>上市许可持有人</td>
                  <td>
                    <div class="td-line5">{{ jbxx.mah || "/" }}</div>
                  </td>
                </tr>
                <tr>
                  <td>上市许可持有人地址</td>
                  <td colspan="3">
                    <div class="td-line5">
                      {{ jbxx.mahaddresszhongwen || "/" }}
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
                      {{ jbxx.changjiashuat || "/" }}
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
                      {{ jbxx.zcyly || "/" }}
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
                      {{ jbxx.baojianpin || "/" }}
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
                            fourth_condition: `bianma=${jbxx.bianma} _and
                        qiyebianmatz=${jbxx.qiyebianmatz} _and guifanguige=${jbxx.guifanguige}`
                          }
                        }"
                        v-if="jbxx.dailiangcaigou1 === '已中选'"
                        >{{
                          jbxx.dailiangcaigou1
                            ? jbxx.dailiangcaigou1
                            : "/"
                        }}</router-link
                      >
                      <div v-else>
                        {{
                          jbxx.dailiangcaigou1
                            ? jbxx.dailiangcaigou1
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
                        v-for="(item, index) in getAtcNames(data.atc)"
                        :key="item"
                        class="clearfix"
                      >
                        <span>{{ item }}&nbsp;&nbsp;</span
                        ><span>{{ getAtc(item, data.atcarr) }}</span>
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
                <tr>
                  <td>编号</td>
                  <td>
                    <div class="td-line5">
                      {{ drugInfos.yibaoxuhao ? drugInfos.yibaoxuhao : "/" }}
                    </div>
                  </td>
                  <td>分类</td>
                  <td v-if="drugInfos.yibao == '/'">非医保信息</td>
                  <td v-else>
                    <div class="td-line5">
                      {{ drugInfos.yibao ? drugInfos.yibao : "/" }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>药品名称</td>
                  <td>
                    <div class="td-line5">
                      {{ drugInfos.name1 ? drugInfos.name1 : "/" }}
                    </div>
                  </td>
                  <td>支付适应症</td>
                  <td>
                    <div class="td-line5">
                      {{ drugInfos.syz ? drugInfos.syz : "/" }}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </slide-section>

          <slide-section
            :title="'药品研发历程'"
            class="the-part part-five"
            v-if="hasPartFive || nopms.devprocess"
          >
            <div class="tb-wrap" v-if="!nopms.devprocess">
              <div class="med-info">
                <div class="info-item">
                  <span class="info-name">药品名称：</span
                  >{{ data.name ? data.name : "/" }}
                </div>
                <div class="info-item">
                  <span class="info-name">公司：</span>
                  {{ data.shengchanqiye ? data.shengchanqiye : "/" }}
                </div>
              </div>
              <div class="progress-info">
                <div class="up-down">
                  <div class="up" @click="handleUpClick">
                    <i class="iconfont">&#xe718;</i>
                  </div>
                  <div class="md-line"></div>
                  <div class="down" @click="handleDownClick">
                    <i class="iconfont">&#xe719;</i>
                  </div>
                </div>
                <div class="all-info" @scroll="handleAllInfoScroll">
                  <div
                    class="info"
                    v-for="(val1, key1, index1) in devProcess"
                    :key="index1"
                  >
                    <div class="info-detail">
                      <div class="info-table">
                        <div
                          class="table-item"
                          v-for="(item, index2) in val1"
                          :key="index2"
                        >
                          <div class="time" v-if="index2 === 0 && key1">
                            <span class="m-d"
                              >{{
                                key1
                                  .toString()
                                  .split("；")[0]
                                  .split("-")[1]
                              }}月{{
                                key1
                                  .toString()
                                  .split("；")[0]
                                  .split("-")[2]
                              }}日</span
                            >
                            <span class="year"
                              >{{
                                key1
                                  .toString()
                                  .split("；")[0]
                                  .split("-")[0]
                              }}年</span
                            >
                          </div>
                          <!-- 没有具体年月日时，则如下显示 -->
                          <div class="time" v-else-if="index2 === 0 && !key1">
                            <span class="m-d">日期不详</span>
                            <span class="year">年份不详</span>
                          </div>
                          <div class="circle" v-if="index2 === 0"></div>
                          <div
                            :class="{
                              'line-one': index2 === 0,
                              'line-other': index2 !== 0
                            }"
                          ></div>
                          <div class="line"></div>
                          <table>
                            <tr>
                              <td
                                v-bind:rowspan="
                                  getRowSpan(resetTableObject(item))
                                "
                                class="spe-td"
                              >
                                {{ item.drugidStatus }}
                              </td>
                              <td
                                v-for="(val2, index2) in resetTableObject(item)"
                                :key="index2"
                                v-if="index2 >= 0 && index2 < 3"
                              >
                                {{ $t("lDetail.devProgress." + val2.thename) }}
                                <router-link
                                  class="link"
                                  :to="yflcLink(item, val2.thename)"
                                  target="_blank"
                                  v-if="
                                    (val2.thename === 'shoulihao' ||
                                      val2.thename === 'me_id' ||
                                      (val2.thename == 'pizhunwenhao' &&
                                        item.pizhunwenhao_type != 0)) &&
                                      item.id
                                  "
                                  >{{ val2.thevalue }}</router-link
                                >
                                <span v-else>{{ val2.thevalue }}</span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                v-for="(val2, index2) in resetTableObject(item)"
                                :key="index2"
                                v-if="index2 >= 3 && index2 < 6"
                              >
                                {{ $t("lDetail.devProgress." + val2.thename) }}
                                <router-link
                                  class="link"
                                  :to="yflcLink(item, val2.thename)"
                                  target="_blank"
                                  v-if="
                                    (val2.thename === 'shoulihao' ||
                                      val2.thename === 'me_id' ||
                                      (val2.thename == 'pizhunwenhao' &&
                                        item.pizhunwenhao_type != 0)) &&
                                      item.id
                                  "
                                  >{{ val2.thevalue }}</router-link
                                >
                                <span v-else>{{ val2.thevalue }}</span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                v-for="(val2, index2) in resetTableObject(item)"
                                :key="index2"
                                v-if="index2 >= 6 && index2 < 9"
                              >
                                {{ $t("lDetail.devProgress." + val2.thename) }}
                                <router-link
                                  class="link"
                                  :to="yflcLink(item, val2.thename)"
                                  target="_blank"
                                  v-if="
                                    (val2.thename === 'shoulihao' ||
                                      val2.thename === 'me_id' ||
                                      (val2.thename == 'pizhunwenhao' &&
                                        item.pizhunwenhao_type != 0)) &&
                                      item.id
                                  "
                                  >{{ val2.thevalue }}</router-link
                                >
                                <span v-else>{{ val2.thevalue }}</span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                v-for="(val2, index2) in resetTableObject(item)"
                                :key="index2"
                                v-if="index2 >= 9 && index2 < 12"
                              >
                                {{ $t("lDetail.devProgress." + val2.thename) }}
                                <router-link
                                  class="link"
                                  :to="yflcLink(item, val2.thename)"
                                  target="_blank"
                                  v-if="
                                    (val2.thename === 'shoulihao' ||
                                      val2.thename === 'me_id' ||
                                      (val2.thename == 'pizhunwenhao' &&
                                        item.pizhunwenhao_type != 0)) &&
                                      item.id
                                  "
                                  >{{ val2.thevalue }}</router-link
                                >
                                <span v-else>{{ val2.thevalue }}</span>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 药品研发历程 - 无权限提示 -->
            <div class="detail-nopms" v-else>
              <!-- <img src="/static/imgs/zhuce/devprocess_before.jpg" class="pic-behind"> -->
              <div class="detail-nopms-describe">
                <img src="/static/imgs/zhuce/nopms_icon.jpg" />
                <p>对不起，您暂无该功能权限，需升级权限享用更多功能。</p>
                <p>
                  请你联系客服
                  <span class="cl-orange fs16 fw-bold">400-678-0778</span>
                </p>
              </div>
            </div>
          </slide-section>

          <slide-section
            :title="'扩展信息'"
            class="the-part part-six"
            v-if="hasExtend"
          >
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
      jbxx: {}, //存放基本信息
      drugInfos: {}, //存放医疗信息
      shoulihao: "",
      // devProcess: {},//时光轴
      devProcesses: [],
      heightArr: [],
      scroll: "",
      hasPartOne: false,
      hasPartTwo: true,
      hasPartFive: false,
      hasExtend: false,
      extendList: []
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
    yflcLink(item, val) {
      let url;
      if (val === "shoulihao") {
        url = "/zhuce/";
      }
      if (val === "me_id") {
        url = "/linchuangshiyan/";
      }
      if (val === "pizhunwenhao") {
        if (item.pizhunwenhao_type == 1) {
          return `/cfdadrug/detail/${
            item.pizhunwenhao_id
          }?pizhunwenhao=${encodeURI(item.pizhunwenhao)}`;
        } else if (item.pizhunwenhao_type == 2) {
          return `/pijian_jinkou_olddata/${item.pizhunwenhao_id}`;
        } else {
          return true;
        }
      }
      return url + item.id;
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
    async handleAxios() {
      await window
        .Axios({
          method: "get",
          url: "/api/cfdadrug/detail",
          params: {
            id: this.$route.params.id,
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            //放基本信息的data
            let jbxx = res.data.data.GroupList.jbxx;
            this.jbxx = jbxx;
            // 获取国家医保信息
            let data = res.data.data.GroupList;
            this.drugInfos = data.ybxx;
            //放表头信息的title
            let title = data.title;
            this.data = title;
            this.atc = data.atc;
            this.getExtendList("cfdadrug", res.data.data.extendList);
            // PART 1
            this.hasPartOne = true;

            // PART 2
            this.hasPartTwo = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
      // PART 5
      // 获取药品研发历程的数据
      window
        .Axios({
          method: "get",
          url: "/api/cfdadrug/devprocess",
          params: {
            id: this.$route.params.id,
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.hasPartFive = true;
            let data = res.data.data;
            this.devProcess = data;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(this.removeLoading)
        .then(this.resetSomeStyles)
        .then(this.addAnimation);
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
    // 循环前处理相关数据，并返回数组形式
    resetTableObject(obj) {
      let arr = [];
      for (let key in obj) {
        // if (key != "id" && key != "drugid" && key != "drugidStatus" && key != "drugidTime") { // 将不需要在列表中循环的在此列出
        //   let new_obj = {
        //     "thename": key,
        //     "thevalue": obj[key],
        //   }

        //   arr.push(new_obj)
        // }
        if (obj["drugidStatus"] == "上市信息") {
          //上市信息类  要显示批准日期  不显示状态开始时间
          if (
            key != "id" &&
            key != "drugid" &&
            key != "drugidStatus" &&
            key != "zhuangtaikaishishijian" &&
            key != "pizhunwenhao_type" &&
            key != "pizhunwenhao_id"
          ) {
            // 将不需要在列表中循环的在此列出
            let new_obj = {
              thename: key,
              thevalue: obj[key]
            };

            arr.push(new_obj);
          }
        } else if (obj["drugidStatus"] != "上市信息") {
          //非上市信息类  不显示批准日期  要显示状态开始时间
          if (
            key != "id" &&
            key != "drugid" &&
            key != "drugidStatus" &&
            key != "drugidTime" &&
            key != "pizhunwenhao_type" &&
            key != "pizhunwenhao_id"
          ) {
            // 将不需要在列表中循环的在此列出
            let new_obj = {
              thename: key,
              thevalue: obj[key]
            };

            arr.push(new_obj);
          }
        }
      }

      let len = arr.length;
      let need_num = len % 3 == 0 ? 0 : 3 - (len % 3);
      if (need_num == 1) {
        let new_obj = {
          thename: "none",
          thevalue: ""
        };
        arr.push(new_obj);
      } else if (need_num == 2) {
        let new_obj = {
          thename: "none",
          thevalue: ""
        };
        arr.push(new_obj);
        arr.push(new_obj);
      }

      return arr;
    },
    // 加载完后移除加载界面
    removeLoading() {
      this.isLoading = false;
    },
    //获取 研发历程 详情对应表格第一列合并数
    getRowSpan(obj) {
      let len = obj.length;
      return Math.ceil(len / 3);
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

<style lang="less">
@import "@/assets/less/var.less";
@import "@/assets/less/detailCom.less";
.part-five {
  .detail-nopms {
    width: 100%;
    height: 540px;
    background: url(/static/imgs/zhuce/timeline_before.jpg);
  }
  .tb-wrap {
    padding-bottom: 40px !important;
    padding-left: 60px !important;
    .med-info {
      margin-bottom: 60px;
      .info-item {
        display: inline-block;
        margin-right: 40px;
        font-size: 13px;
      }
      .info-name {
        color: @PrimaryColor;
      }
    }
    .progress-info {
      position: relative;
      .up-down {
        position: absolute;
        left: 80px;
        .up {
          cursor: pointer;
          position: absolute;
          top: -32px;
          left: -17px;
          width: 36px;
          height: 36px;
          line-height: 36px;
          i {
            font-size: 36px;
            color: @FontColor3;
          }
        }
        .down {
          cursor: pointer;
          position: absolute;
          bottom: -32px;
          left: -17px;
          width: 36px;
          height: 36px;
          line-height: 36px;
          i {
            font-size: 36px;
            color: @FontColor3;
          }
        }
        .md-line {
          height: 500px;
          width: 2px;
          background: @FontColor3;
        }
      }
      .all-info {
        max-height: 500px;
        overflow: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .info {
          margin-bottom: 45px;
          position: relative;
          display: flex;
          justify-content: flex-start;
          padding-left: 150px;
          &:last-of-type {
            margin-bottom: 0px;
          }
          .info-detail {
            .info-table {
              position: relative;
              .table-item {
                position: relative;

                &:first-child {
                  .line {
                    top: 55%;
                  }
                }

                &:last-child {
                  .line {
                    bottom: 50%;
                  }
                }
                &:first-of-type {
                  position: relative;
                  .time {
                    width: 75px;
                    position: absolute;
                    top: 50%;
                    left: -150px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    margin-top: -20px;
                    text-align: center;
                    .m-d {
                      height: 20px;
                      line-height: 20px;
                      font-size: 13px;
                      font-weight: bold;
                    }
                    .year {
                      height: 20px;
                      line-height: 20px;
                    }
                  }
                }
                .circle {
                  background: #fff;
                  position: absolute;
                  top: 50%;
                  left: -75px;
                  margin-top: -4px;
                  width: 8px;
                  height: 8px;
                  border-radius: 8px;
                  border: 2px solid @FontColor;
                }
                .line-one {
                  display: inline-block;
                  width: 44px;
                  border-bottom: 1px dashed @FontColor;
                  position: absolute;
                  top: 50%;
                  margin-top: 1px;
                  left: -60px;
                  &::after {
                    content: "";
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    background: @FontColor;
                    border-radius: 4px;
                    position: absolute;
                    top: -2px;
                    right: -8px;
                  }
                }
                .line {
                  border-left: 1px dashed @FontColor;
                  position: absolute;
                  top: -10px;
                  bottom: 0;
                  left: -36px;
                }
                .line-other {
                  display: inline-block;
                  width: 20px;
                  border-bottom: 1px dashed @FontColor;
                  position: absolute;
                  top: 50%;
                  margin-top: 1px;
                  left: -36px;
                  &::before {
                    content: "";
                    display: inline-block;
                    // height: 80px;
                    border-left: 1px dashed @FontColor;
                    position: absolute;
                    bottom: 0px;
                    left: 0;
                  }
                  &::after {
                    content: "";
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    background: @FontColor;
                    border-radius: 4px;
                    position: absolute;
                    top: -2px;
                    right: -8px;
                  }
                }
                table {
                  margin-bottom: 10px;
                  tr {
                    td {
                      background: @DetailTableRightColor;
                      box-sizing: border-box;
                      border: 1px solid @BorderColorNew;
                      width: 304px;
                      height: 30px;
                      padding-left: 10px;
                      font-size: 13px;
                      &.spe-td {
                        width: 88px;
                        text-align: center;
                        padding-left: 0px;
                        position: relative;
                        color: @PrimaryColor;
                        font-size: 14px;
                        font-weight: bold;
                        &::before {
                          // content: '';
                          // position: absolute;
                          // left: -10px;
                          // top: 50%;
                          // margin-top: -8px;
                          // border-top: 8px solid transparent;
                          // border-right: 10px solid @DetailTableRightColor;
                          // border-bottom: 8px solid transparent;
                          content: "";
                          position: absolute;
                          top: 51%;
                          left: -10px;
                          margin-top: -8px;
                          width: 0;
                          height: 0;
                          border-right: 9px solid @BorderColorNew;
                          border-bottom: 9px solid transparent;
                          border-top: 9px solid transparent;
                        }
                        &::after {
                          content: "";
                          position: absolute;
                          top: 50%;
                          left: -9px;
                          margin-top: -8px;
                          width: 0;
                          height: 0;
                          border-bottom: 8px solid transparent;
                          border-right: 8px solid @DetailTableRightColor;
                          border-top: 8px solid transparent;
                        }
                      }
                    }
                  }
                }
                &:hover {
                  .time {
                    color: @PrimaryColor;
                  }
                  .circle {
                    border-color: @PrimaryColor;
                  }
                  .line-one {
                    border-color: @PrimaryColor;
                    &::after {
                      background: @PrimaryColor;
                    }
                  }
                  .line-other {
                    border-color: @PrimaryColor;
                    &::before {
                      border-color: @PrimaryColor;
                    }
                    &::after {
                      background: @PrimaryColor;
                    }
                  }
                  table {
                    tr {
                      td {
                        background: @DetailTableFloorColor;
                        &::after {
                          border-right-color: @DetailTableFloorColor;
                        }
                      }
                    }
                  }
                }
                .link {
                  color: @PrimaryColor;
                }
              }
            }
          }
        }
      }
    }
  }
}
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
