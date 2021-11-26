<template>
  <div class="wrapper" ref="wrapper">
    <!-- 自定义加载界面 -->
    <LoadingGif :loadFlag="isLoading" v-if="isLoading"></LoadingGif>
    <!-- 加载完成显示部分 -->
    <div class="detail-list" v-else>
      <div class="detail-header">
        <div class="header-left">
          <div class="left-top">
            <span class="top-id" :title="data.title">{{ data.title }}</span>
          </div>
        </div>
      </div>
      <div class="main">
        <div
          class="left-nav"
          :style="{ top: (showPromtNotice ? 118 : 88) + 'px' }"
        >
          <div class="nav-list nav-event" @click="handleNavClick">
            <a class="nav-item active">基本信息</a>
            <a
              class="nav-item"
              v-if="data.register == 'ClinicalTrials.gov美国' && test_course"
              >试验历程</a
            >
            <a class="nav-item" v-if="test_info">试验信息</a>
            <a class="nav-item" v-if="recruitment_info">招募信息</a>
            <a class="nav-item" v-if="man_info">管理信息</a>
            <a class="nav-item" v-if="(test_info.resultsurl) || (test_info.related_literature && test_info.related_literature.length)">临床结果/文献</a>
            <a class="nav-item" v-if="extendList && extendList.length"
              >扩展信息</a
            >
          </div>
        </div>
        <div class="right-list">
          <slide-section :title="'基本信息'" ref="ScrollDom_1" class="the-part">
            <div class="tb-wrap">
              <table class="tb-t">
                <tr>
                  <td>登记号</td>
                  <td>
                    <span>{{ data.me_id }}</span>
                  </td>
                  <td>试验状态</td>
                  <td>
                    <p>{{ data.recruitment }}</p>
                    <p>{{ data.recruitment_guifan }}</p>
                  </td>
                </tr>
                <tr>
                  <td>登记日期</td>
                  <td>
                    <span>{{ data.received }}</span>
                  </td>
                  <td>试验分期</td>
                  <td>
                    <span>{{ data.phases }}</span>
                  </td>
                </tr>
                <tr>
                  <td>注册机构</td>
                  <td>
                    <span>{{ data.register }}</span>
                  </td>
                  <td>试验国家/地区</td>
                  <td>
                    <span>{{ data.countries }}</span>
                  </td>
                </tr>
                <tr>
                  <td>申办者单位</td>
                  <td>
                    <span>{{ data.sponsors }}</span>
                  </td>
                  <td>申办者类型
                    <el-tooltip
                      class="item tooltips-position"
                      effect="light"
                      placement="right"
                    >
                      <div slot="content">仅包含ClinicalTrials.gov美国的数据</div>
                      <i class="el-icon-question cl-green"></i>
                    </el-tooltip>
                  </td>
                  <td>
                    <span>{{ data.sponsor1_guifan }}</span>
                  </td>
                </tr>
                <tr>
                  <td>试验通俗题目</td>
                  <td colspan="3">
                    <span>{{ data.title }}</span>
                  </td>
                </tr>
                <tr>
                  <td>试验专业题目</td>
                  <td colspan="3">
                    <span>{{ data.stitle }}</span>
                  </td>
                </tr>
                <tr>
                  <td>疾病</td>
                  <td colspan="3">
                    <div class="td-line5" v-if="data.conditions">
                      <p v-html="data.conditions"></p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>干预措施</td>
                  <td colspan="3">
                    <div class="td-line5" v-if="data.interventions">
                      <p v-html="data.interventions"></p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>疾病领域
                    <el-tooltip
                      class="item tooltips-position"
                      effect="light"
                      placement="right"
                    >
                      <div slot="content">仅包含ClinicalTrials.gov美国的数据</div>
                      <i class="el-icon-question cl-green"></i>
                    </el-tooltip>
                  </td>
                  <td>
                    <span>{{ data.conditions1_guifan }}</span>
                  </td>
                  <td>干预药物类别
                    <el-tooltip
                      class="item tooltips-position"
                      effect="light"
                      placement="right"
                    >
                      <div slot="content">仅包含ClinicalTrials.gov美国的数据</div>
                      <i class="el-icon-question cl-green"></i>
                    </el-tooltip>
                  </td>
                  <td>
                    <span>{{ data.interventions1_guifan }}</span>
                  </td>
                </tr>
                <tr>
                  <td>药物名称</td>
                  <td colspan="3">
                    <span>{{ data.name_guifan }}</span>
                  </td>
                </tr>
                <tr>
                  <td>靶点全称</td>
                  <td class="td5">
                    <div
                      class="td-line5"
                      v-if="data.targets && data.targets.length"
                    >
                      <p v-for="(item, ix) in data.targets" :key="ix">
                        <a
                          :href="'https://vip.yaozh.com/targetdatas/' + item.id"
                          v-if="item.id"
                          target="_blank"
                          style="color: #4877e8"
                          >{{ item.name }}</a
                        >
                        <span v-else>{{ item.name }}</span>
                      </p>
                    </div>
                  </td>
                  <td>靶点简称</td>
                  <td class="td5">
                    <div
                      class="td-line5"
                      v-if="data.targets_abbr && data.targets_abbr.length"
                    >
                      <p v-for="(item, ix) in data.targets_abbr" :key="ix">
                        <a
                          :href="'https://vip.yaozh.com/targetdatas/' + item.id"
                          v-if="item.id"
                          target="_blank"
                          style="color: #4877e8"
                          >{{ item.name }}</a
                        >
                        <span v-else>{{ item.name }}</span>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>关键词</td>
                  <td colspan="3">
                    <div class="td-line5" v-if="data.keyword">
                      <p v-html="data.keyword"></p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>最新变更日期</td>
                  <td>
                    <span>{{ data.updated }}</span>
                  </td>
                  <td>最新公示日期</td>
                  <td>
                    <span>{{ data.updateds }}</span>
                  </td>
                </tr>
                <tr v-if="data.url">
                  <td>试验详情网站</td>
                  <td colspan="3">
                    <span @click="gaEvent(data.url)" class="span-a">查看</span>
                  </td>
                </tr>
              </table>
            </div>
          </slide-section>

          <slide-section
            :title="'试验历程'"
            ref="ScrollDom_2"
            class="the-part part-two"
            v-if="data.register == 'ClinicalTrials.gov美国' && test_course"
          >
            <div class="tb-wrap">
              <div class="course-ul">
                <div
                  class="div_box"
                  :style="{ flex: index == 0 ? '0' : '1' }"
                  v-for="(item, index) in test_courseArr"
                  :key="item.val"
                >
                  <template>
                    <div class="li-even" v-if="index != 0"></div>
                    <div class="li-odd">
                      <span>
                        <span>{{ item.val[0] }}</span>
                        <span v-if="item.val[1]">{{ item.val[1] }}</span>
                        <!-- <template
                        v-if="
                          data.register === registerName &&
                          (cyleBtnName[item.key]['type'])
                        "
                        >({{
                          cyleBtnName[item.key]['type']
                        }})</template
                      > -->
                      </span>
                      <div
                        :class="[
                          'empty-circle',
                          data.register === registerName &&
                          cyleBtnName[item.key]['type'] == '计划'
                            ? 'empty-circle-b'
                            : ''
                        ]"
                      ></div>
                      <span>{{ cyleBtnName[item.key]["name"] }}</span>
                    </div>
                  </template>

                  <!-- <template v-if="item.key == 'received'">
                  <div class="li-even" v-if="index != 0"></div>
                  <div class="li-odd">
                    <span>{{ test_course.received }}</span>
                    <div class="empty-circle"></div>
                    <span>临床试验登记</span>
                  </div>
                </template>
                <template v-if="item.key == 'receiveds'">
                  <div class="li-even" v-if="index != 0"></div>
                  <div class="li-odd">
                    <span>{{ test_course.receiveds }}</span>
                    <div class="empty-circle"></div>
                    <span>首次公示</span>
                  </div>
                </template>
                <template v-if="item.key == 'start' || item.key == 'start_s'">
                  <div class="li-even" v-if="index != 0"></div>
                  <div class="li-odd">
                    <span>
                      {{
                        test_course[item.key]
                      }}
                      <template
                        v-if="
                          data.register === registerName &&
                          (test_course[item.key])
                        "
                        >({{ item.key == 'start' ? "实际" : "计划" }})</template
                      >
                    </span>
                    <div
                      :class="[
                        'empty-circle',
                        data.register === registerName &&
                        item.key !== 'start' &&
                        item.key == 'start_s'
                          ? 'empty-circle-b'
                          : '',
                      ]"
                    ></div>
                    <span>开始</span>
                  </div>
                </template>
                <template v-if="item.key == 'firstreceived'">
                  <div class="li-even" v-if="index != 0"></div>
                  <div class="li-odd">
                    <span>{{ test_course.firstreceived }}</span>
                    <div class="empty-circle"></div>
                    <span>首次结果</span>
                  </div>
                </template>
                <template
                  v-if="item.key == 'completions' || item.key == 'completions_s'"
                >
                  <div class="li-even" v-if="index != 0"></div>
                  <div class="li-odd">
                    <span>
                      {{
                        test_course.completions
                          ? test_course.completions
                          : test_course.completions_s
                      }}
                      <template
                        v-if="
                          data.register === registerName &&
                          (test_course.completions || test_course.completions_s)
                        "
                        >({{
                          test_course.completions ? "实际" : "计划"
                        }})</template
                      >
                    </span>
                    <div
                      :class="[
                        'empty-circle',
                        data.register === registerName &&
                        !test_course.completions &&
                        test_course.completions_s
                          ? 'empty-circle-b'
                          : '',
                      ]"
                    ></div>
                    <span>主要完成</span>
                  </div>
                </template>
                <template
                  v-if="item.key == 'completion' || item.key == 'completion_s'"
                >
                  <div class="li-even" v-if="index != 0"></div>
                  <div class="li-odd">
                    <span>
                      {{
                        test_course.completion
                          ? test_course.completion
                          : test_course.completion_s
                      }}
                      <template
                        v-if="
                          data.register === registerName &&
                          (test_course.completion || test_course.completion_s)
                        "
                        >({{
                          test_course.completion ? "实际" : "计划"
                        }})</template
                      >
                    </span>
                    <div
                      :class="[
                        'empty-circle',
                        data.register === registerName &&
                        !test_course.completion &&
                        test_course.completion_s
                          ? 'empty-circle-b'
                          : '',
                      ]"
                    ></div>
                    <span>完成</span>
                  </div>
                </template> -->
                </div>
              </div>
            </div>
          </slide-section>

          <slide-section
            :title="'试验信息'"
            ref="ScrollDom_3"
            class="the-part"
            v-if="test_info"
          >
            <template v-if="test_info.summary">
              <div class="detail-title"><span class="in">试验简介</span></div>
              <div class="tb-wrap">
                <p v-html="test_info.summary"></p>
              </div>
            </template>
            <template v-if="test_info.description">
              <div class="detail-title">
                <span class="in">试验详细介绍</span>
              </div>
              <div class="tb-wrap">
                <p class="max-790" v-html="test_info.description"></p>
              </div>
            </template>
            <template v-if="test_info.study_guifan">
              <div class="detail-title" style="margin-bottom: 20px">
                <span class="in">研究类型:</span>
                <span class="rela-span">{{ test_info.study_guifan }}</span>
              </div>
            </template>
            <template v-if="test_info.studydesigns">
              <div class="detail-title"><span class="in">研究设计</span></div>
              <div class="tb-wrap">
                <!-- 注册机构（register字段）值=ClinicalTrials.gov美国 显示规则：遇到分号“；”，换一行-->
                <!-- 注册机构（register字段）值≠ClinicalTrials.gov美国 显示规则：遇到一个“<br>”，换一行 -->
                <!-- v-html="test_info.studydesigns.replace(/;|；/g, ';<br>')" -->
                <p
                  v-if="data.register == 'ClinicalTrials.gov美国'"
                  v-html="test_info.studydesigns.replace(/;|；/g, ';<br>')"
                ></p>
                <p v-else v-html="test_info.studydesigns"></p>
              </div>
            </template>
            <template v-if="test_info.studyarms">
              <div class="detail-title"><span class="in">试验分组</span></div>
              <div class="tb-wrap">
                <p v-html="test_info.studyarms"></p>
              </div>
            </template>
            <template v-if="test_info.measures">
              <div class="detail-title">
                <span class="in">主要结果指标</span>
              </div>
              <div class="tb-wrap">
                <!-- 注册机构（register字段）值=ClinicalTrials.gov美国 显示规则：遇到分号“；”，换一行 遇到一个“<br>”，换2行-->
                <!-- 注册机构（register字段）值≠ClinicalTrials.gov美国 显示规则：遇到一个“<br>”，换一行 -->
                <p
                  v-if="data.register === registerName"
                  v-html="
                    test_info.measures
                      .replace(/<br>/g, '<br><br>')
                      .replace(/;|；/g, ';<br>')
                  "
                ></p>
                <p v-else v-html="test_info.measures"></p>
              </div>
            </template>
            <template v-if="test_info.measuress">
              <div class="detail-title">
                <span class="in">次要结果指标</span>
              </div>
              <div class="tb-wrap">
                <!-- 注册机构（register字段）值=ClinicalTrials.gov美国 显示规则：遇到分号“；”，换一行 遇到一个“<br>”，换2行-->
                <!-- 注册机构（register字段）值≠ClinicalTrials.gov美国 显示规则：遇到一个“<br>”，换一行 -->
                <p
                  v-if="data.register === registerName"
                  v-html="
                    test_info.measuress
                      .replace(/<br>/g, '<br><br>')
                      .replace(/;|；/g, ';<br>')
                  "
                ></p>
                <p v-else v-html="test_info.measuress"></p>
              </div>
            </template>
            <!-- <template v-if="test_info.results || test_info.resultsurl">
              <div class="detail-title" style="margin-bottom: 20px">
                <span class="in">试验结果:</span>
                <span class="rela-span">{{
                  test_info.results ? test_info.results : ""
                }}</span>
                <span
                  @click="gaEvent(test_info.resultsurl)"
                  class="rela-span span-a"
                  v-if="test_info.resultsurl"
                  >查看详情</span
                >
              </div>
            </template> -->
            <!-- <template
              v-if="
                test_info.related_literature &&
                  test_info.related_literature.length
              "
            >
              <div class="detail-title"><span class="in">相关文献</span></div>
              <div class="tb-wrap">
                <p
                  v-for="(item, ix) in test_info.related_literature"
                  :key="ix"
                  class="overflow-g"
                >
                  <template v-if="item.title">
                    <span
                      v-if="item.url1"
                      @click="gaEvent(item.url1, item.title, ix + 1)"
                      class="span-a"
                      :title="item.title"
                      >{{ item.title }}</span
                    >
                    <span
                      v-else-if="item.url2"
                      @click="gaEvent(item.url2, item.title, ix + 1)"
                      class="span-a"
                      :title="item.title"
                      >{{ item.title }}</span
                    >
                    <span
                      v-else-if="item.url3"
                      @click="gaEvent(item.url3, item.title, ix + 1)"
                      class="span-a"
                      :title="item.title"
                      >{{ item.title }}</span
                    >
                    <span v-else :title="item.title">{{ item.title }}</span>
                  </template>
                </p>
              </div>
            </template> -->
          </slide-section>

          <slide-section
            :title="'招募信息'"
            ref="ScrollDom_4"
            class="the-part"
            v-if="recruitment_info"
          >
            <div class="tb-wrap">
              <table class="tb-t">
                <tr>
                  <td>受试者样本大小</td>
                  <td>
                    <span>{{ recruitment_info.enrollment }}</span>
                  </td>
                  <td>受试者性别</td>
                  <td>
                    <span>{{ recruitment_info.gender }}</span>
                  </td>
                </tr>
                <tr>
                  <td>受试者年龄范围</td>
                  <td colspan="3">
                    <span>{{ recruitment_info.age }}</span>
                  </td>
                </tr>
                <tr>
                  <td>最小年龄</td>
                  <td>
                    <span>{{ recruitment_info.min }}</span>
                  </td>
                  <td>最大年龄</td>
                  <td>
                    <span>{{ recruitment_info.max }}</span>
                  </td>
                </tr>
                <tr>
                  <td>是否有健康受试者</td>
                  <td colspan="3">
                    <span>{{ recruitment_info.jkssz }}</span>
                  </td>
                </tr>
                <tr>
                  <td>招募联系</td>
                  <td colspan="3">
                    <p v-html="recruitment_info.contacts"></p>
                  </td>
                </tr>
              </table>
            </div>
            <template v-if="recruitment_info.rxbz">
              <div class="detail-title"><span class="in">入选标准</span></div>
              <div class="tb-wrap">
                <p v-html="recruitment_info.rxbz"></p>
              </div>
            </template>
            <template v-if="recruitment_info.pcbz">
              <div class="detail-title"><span class="in">排除标准</span></div>
              <div class="tb-wrap">
                <p v-html="recruitment_info.pcbz"></p>
              </div>
            </template>
          </slide-section>

          <slide-section
            :title="'管理信息'"
            ref="ScrollDom_5"
            class="the-part"
            v-if="man_info"
          >
            <div class="tb-wrap">
              <table class="tb-t">
                <tr>
                  <td>其它研究编号</td>
                  <td>
                    <span>{{ man_info.otherids }}</span>
                  </td>
                  <td>是否有数据监测委员会</td>
                  <td>
                    <span>{{ man_info.dmc }}</span>
                  </td>
                </tr>
                <tr>
                  <td>是否FDA管制产品</td>
                  <td colspan="3">
                    <p
                      v-if="man_info.regulated"
                      v-html="man_info.regulated.replace(/;|；/g, ';<br>')"
                    ></p>
                  </td>
                </tr>
                <tr>
                  <td>申办单位</td>
                  <td>
                    <span>{{ man_info.sponsors }}</span>
                  </td>
                  <td>申办单位类型</td>
                  <td>
                    <span>{{ man_info.sponsorclass }}</span>
                  </td>
                </tr>
                <tr>
                  <td>合作者</td>
                  <td>
                    <div class="td-line5">
                      <p v-html="man_info.collaborator"></p>
                    </div>
                    <!-- <span>{{ man_info.collaborator }}</span> -->
                  </td>
                  <td>责任方</td>
                  <td>
                    <span>{{ man_info.funded }}</span>
                  </td>
                </tr>
                <tr>
                  <td>研究者</td>
                  <td colspan="3">
                    <p>{{ man_info.researcher }}</p>
                  </td>
                </tr>
              </table>
            </div>
          </slide-section>

          <slide-section
            :title="'临床结果/文献'"
            ref="ScrollDom_6"
            class="the-part"
            v-if="(test_info.resultsurl) || (test_info.related_literature && test_info.related_literature.length)"
          >
           <template v-if="test_info.resultsurl">
              <div class="detail-title" style="margin-bottom: 20px">
                <span class="in">官网结果:</span>
                <span
                  @click="gaEvent(test_info.resultsurl)"
                  class="rela-span span-a"
                  v-if="test_info.resultsurl"
                  >查看详情</span
                >
              </div>
            </template>
            <template
              v-if="
                test_info.related_literature &&
                  test_info.related_literature.length
              "
            >
              <div class="detail-title"><span class="in">试验文献</span></div>
              <div class="tb-wrap">
                <p
                  v-for="(item, ix) in test_info.related_literature"
                  :key="ix"
                  class="overflow-g"
                >
                  <template v-if="item.title">
                    <span
                      v-if="item.url1"
                      @click="gaEvent(item.url1, item.title, ix + 1)"
                      class="span-a"
                      :title="item.title"
                      >{{ item.title }}</span
                    >
                    <span
                      v-else-if="item.url2"
                      @click="gaEvent(item.url2, item.title, ix + 1)"
                      class="span-a"
                      :title="item.title"
                      >{{ item.title }}</span
                    >
                    <span
                      v-else-if="item.url3"
                      @click="gaEvent(item.url3, item.title, ix + 1)"
                      class="span-a"
                      :title="item.title"
                      >{{ item.title }}</span
                    >
                    <span v-else :title="item.title">{{ item.title }}</span>
                  </template>
                </p>
              </div>
            </template>
          </slide-section>

          <slide-section
            :title="'扩展信息'"
            ref="ScrollDom_7"
            class="the-part"
            v-if="extendList && extendList.length"
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
    <la-footer></la-footer>
  </div>
</template>

<script>
import LoadingGif from "@/components/common/globalCom/loading-gif.vue";
import SlideSection from "@/components/common/slide-section.vue";
import LaFooter from "@/components/layouts/footer.vue";
import ExtendButton from "@/components/common/extend-button.vue";
import { mapState } from "vuex";
import detailScrollMixins from "@/mixins/detailScroll.js";

export default {
  components: {
    LoadingGif,
    SlideSection,
    LaFooter,
    ExtendButton
  },
  mixins: [detailScrollMixins],
  data() {
    return {
      registerName: "ClinicalTrials.gov美国",
      isLoading: true,
      id: this.$route.params.id,
      data: {},
      test_course: null,
      test_info: null,
      recruitment_info: null,
      man_info: null,
      extendList: [], // 扩展信息
      isTrueSelectNum: 1,
      timeFlagId: null, //节流
      test_courseArr: [],
      cyleBtnName: {
        received: { name: "临床试验登记", type: "" },
        receiveds: { name: "首次公示", type: "" },
        start: { name: "开始", type: "实际" },
        start_s: { name: "开始", type: "计划" },
        completions: { name: "主要完成", type: "实际" },
        completions_s: { name: "主要完成", type: "计划" },
        completion: { name: "完成", type: "实际" },
        completion_s: { name: "完成", type: "计划" },
        firstreceived: { name: "首次结果", type: "" }
      }
    };
  },
  computed: {
    ...mapState({
      allBase: state => state.Clinical.allBase,
      helpInfo: state => state.Clinical.helpInfo,
      nopms: state => state.Clinical.nopms
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
              ) + "px"
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
    gaEvent(a, b, c) {
      window.ga(
        "send",
        "event",
        "link",
        "click",
        `${this.data.me_id}_${b ? b : a}${c ? "_" + c : ""}`
      );
      window._paq.push([
        "trackEvent",
        "link",
        "click",
        `${this.data.me_id}_${b ? b : a}${c ? "_" + c : ""}`
      ]);
      window.open(a, "_blank");
    },
    handleAxios() {
      // 基本信息
      window
        .Axios({
          method: "get",
          url: "/api/clinical/" + this.id,
          params: {
            accesstoken: GETCOOKIEFUN("accesstoken"),
            msg_readid: this.$route.query.msg_readid
          }
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            let datas = res.data.data;
            this.data = datas;
            this.test_course = datas.test_course;
            this.test_info = datas.test_info;
            this.recruitment_info = datas.recruitment_info;
            this.man_info = datas.man_info;
            this.getExtendList("clinical", datas.extendList);
            this.test_courseArrFun(datas.test_course);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(this.removeLoading);
    },
    test_courseArrFun(obj) {
      let arr = [];
      for (var i in obj) {
        if (obj[i]) {
          let str = this.cyleBtnName[i]["type"]
            ? "(" + this.cyleBtnName[i]["type"] + ")"
            : "";
          let objs = {
            key: i,
            val: [obj[i] + str]
          };
          arr.push(objs);
        }
      }

      arr.sort(function(a, b) {
        // 排序顺序规则临床试验登记——首次公示——开始——主要完成——完成——首次结果
        var order = [
          "received",
          "receiveds",
          "start_s",
          "start",
          "completions_s",
          "completions",
          "completion_s",
          "completion",
          "firstreceived"
        ];
        return order.indexOf(a.key) - order.indexOf(b.key);
      });
      arr.map((item, i) => {
        // 当开始的计划和实际时间都存在的时候需要合并显示
        if (obj.start && obj.start_s) {
          if (item.key === "start") {
            item.val.unshift(arr[i - 1].val[0]);
            arr.splice(i - 1, 1);
          }
        }
        // 当主要完成的计划和实际时间都存在的时候需要合并显示
        if (obj.completions && obj.completions_s) {
          if (item.key === "completions") {
            item.val.unshift(arr[i - 1].val[0]);
            arr.splice(i - 1, 1);
          }
        }
        // 当完成的计划和实际时间都存在的时候需要合并显示
        if (obj.completion && obj.completion_s) {
          if (item.key === "completion") {
            item.val.unshift(arr[i - 1].val[0]);
            arr.splice(i - 1, 1);
          }
        }
      });
      console.log(arr);
      this.test_courseArr = arr;
      // console.log(this.test_courseArr)
    },
    // 加载完后移除加载界面
    removeLoading() {
      this.isLoading = false;
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
    Store.dispatch("Clinical/getBaseInfo");
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

@FontsizeSmall: 13px;
@FontsizeSmallBold: bold;
.span-a {
  cursor: pointer;
  color: #4877e8;
  &:hover {
    text-decoration: underline;
  }
}
.wrapper {
  .detail-list {
    .main {
      .right-list {
        .max-790 {
          max-height: 790px;
          overflow-y: auto;
        }
        // PART 2
        .part-two {
          .tb-wrap {
            padding-right: 200px;
          }

          .course-ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            padding: 0 30px;
            .div_box {
              display: flex;
              flex: 1;
            }
            .li-odd {
              width: 70px;
              // display: flex;
              text-align: center;
              flex-direction: column;
              align-items: center;

              .empty-circle {
                box-sizing: border-box;
                height: 70px;
                width: 70px;
                border-radius: 50%;
                border: 3px solid #4877e8;
                background: #f6f8fc;
                z-index: 1;
              }
              .empty-circle-b {
                border: 3px solid #dfe5f1;
              }
              > span {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 40px;
                line-height: 28px;
                font-size: 14px;
                white-space: nowrap;
                span {
                  display: block;
                  line-height: 18px;
                }
              }
            }
            .li-even {
              // flex: 1;
              position: relative;
              height: 3px;
              background: #4877e8;
              top: 70px;
              width: calc(100% - 70px);
            }
            .li-even::before {
              content: "";
              position: absolute;
              top: -5px;
              left: 50%;
              border-top: 3px solid #4877e8;
              border-right: 3px solid #4877e8;
              border-radius: 2px;
              height: 10px;
              width: 10px;
              transform: rotate(45deg);
            }
            // .li-even:nth-child(1) {
            //   display: none;
            // }
          }
        }
        .tb-wrap {
          font-size: 13px;
        }
      }
    }
  }
}
.top-id {
  max-width: 80vw !important;
  display: block !important;
}
</style>
