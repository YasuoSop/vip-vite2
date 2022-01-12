<template>
  <div class="rongzi-detail">
    <custom-header></custom-header>
    <LoadingGif
      :className="'fullscreen-loading'"
      :loadFlag="loading"
    ></LoadingGif>
    <div class="detail-container">
      <div
        v-if="infoObj.time && infoObj.shortname"
        style="margin-bottom: 20px;"
      >
        <div class="title">
          {{ infoObj.time.slice(0, 4) }}年{{ infoObj.time.slice(5, 7) }}月{{
            infoObj.time.slice(8, 10)
          }}日，{{ infoObj.shortname
          }}<span v-if="infoObj.round && infoObj.round !== '未公开'">{{
            infoObj.round
          }}</span
          >成功融资，金额{{ infoObj.amount }}
          <!-- <span
            class="tag1"
            v-if="
              infoObj.applicationscenarios &&
                infoObj.applicationscenarios.length > 0
            "
            v-for="(txt, i) in infoObj.applicationscenarios"
            :key="txt"
            @click="searchKeywords(txt)"
            >{{ txt }}</span
          > -->
          <span class="tag1 tag-provice" v-if="infoObj.province">{{
            infoObj.province
          }}</span>
          <span
            v-if="infoObj.concept && infoObj.concept.length > 0"
            class="tag"
            v-for="(item, index) in infoObj.concept"
            :key="item"
            @click="searchKeywords(item)"
          >
            {{ item }}
          </span>
        </div>
        <div
          class="touzifang"
          style="margin-bottom: 6px;"
          v-if="infoObj.investorsArr && infoObj.investorsArr.length > 0"
        >
          <span style="width: 55px">投资方：</span
          ><a
            class="touzifang-item"
            v-for="(item, index) in infoObj.investorsArr"
            :key="index"
            :class="{'no-click': !item.jgWyuid && !item.gsWyuid}"
            @click="toDetail(item)"
            >{{ item.name }}</a
          >
        </div>
        <div class="rongzi-target" v-if="infoObj.financingpurpose">
          <span>融资目的：</span>
          <div
            style="color: #333;
              max-height: 40px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden; flex: 1;"
            :title="infoObj.financingpurpose"
          >
            {{ infoObj.financingpurpose }}
          </div>
        </div>
      </div>
      <div class="cards">
        <div class="left-content">
          <div class="card">
            <div class="summary-list">
              <div
                v-for="(item, index) in navs"
                :key="index"
                :class="['summary-item', activeNav == index && 'active']"
                @click="positionPanel(index)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="middle-content">
          <div class="card" v-if="showSJGY === true">
            <div class="card-title">
              <div>
                <img
                  src="~@/assets/imgs/trz/summary.png"
                  class="speacker"
                  width="16"
                  height="13"
                />
                事件概要
              </div>
            </div>
            <div class="content">
              <div class="left-info">
                <div class="summary-item" v-if="infoObj.time">
                  <div><span>时</span><span>间：</span></div>
                  {{ infoObj.time }}
                </div>
                <div class="summary-item" v-if="infoObj.shortname">
                  <div><span>融</span><span>资</span><span>方：</span></div>
                  <a
                    class="touzifang-item"
                    v-for="(item, index) in infoObj.shortnameArr"
                    :key="index"
                    :class="{'no-click': !item.jgWyuid && !item.gsWyuid}"
                    @click="toDetail(item)"
                    >{{ item.name }}</a>
                </div>
                <div
                  class="summary-item summary-investors"
                  v-if="infoObj.investorsArr && infoObj.investorsArr.length > 0"
                >
                  <div><span>投</span><span>资</span><span>方：</span></div>
                  <a
                    class="touzifang-item"
                    v-for="(item, index) in infoObj.investorsArr"
                    :key="index"
                    :class="{'no-click': !item.jgWyuid && !item.gsWyuid}"
                    @click="toDetail(item)"
                    >{{ item.name }}</a
                  >
                </div>
                <div
                  class="summary-item"
                  v-if="infoObj.country || infoObj.province || infoObj.city"
                >
                  <div>
                    <span>融</span><span>资</span><span>地</span
                    ><span>区：</span>
                  </div>
                  {{ infoObj.country }} <span v-if="infoObj.province">-</span>
                  {{ infoObj.province }} <span v-if="infoObj.city">-</span>
                  {{ infoObj.city }}
                </div>
              </div>
              <div class="right-rongzi" v-if="infoObj.guifan_amount">
                {{ infoObj.round }}成功融资
                <div class="rongzi-money">
                  {{ thousandFormatter(infoObj.guifan_amount / 10000) }}万元
                </div>
              </div>
            </div>
            <div class="content2">
              <div class="info-item" v-if="infoObj.title">
                <div class="info-label">事件描述</div>
                <div class="info-desc">
                  {{ infoObj.title }}
                </div>
              </div>
              <div class="info-item" v-if="infoObj.financingpurpose">
                <div class="info-label">融资目的</div>
                <div class="info-desc">
                  {{ infoObj.financingpurpose }}
                </div>
              </div>

              <div class="info-item" v-if="infoObj.technology">
                <div class="info-label">行业</div>
                <div class="info-desc">
                  {{ infoObj.technology }}
                </div>
              </div>

              <div
                class="info-item"
                v-if="
                  infoObj.applicationscenarios &&
                    infoObj.applicationscenarios.length > 0
                "
              >
                <div class="info-label">关键词</div>
                <div class="info-desc">
                  {{ infoObj.applicationscenarios.join(" ") }}
                </div>
              </div>
              <!-- <div class="info-item">
                <div class="info-label">优势领域</div>
                <div class="info-desc">
                  新药研发 疫苗制剂生产
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">产品定位</div>
                <div class="info-desc">
                  创新药 传统疫苗（治疗用生物制品）
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">技术支持</div>
                <div class="info-desc">
                  生物技术
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">应用方向</div>
                <div class="info-desc">
                  肿瘤 治疗产品
                </div>
              </div> -->
            </div>
          </div>
          <div class="card" v-if="showTZGX === true">
            <div class="card-title">
              <div>
                <img
                  src="~@/assets/imgs/trz/relationship.png"
                  class="speacker"
                  width="14"
                  height="15"
                />投资关系
              </div>
            </div>
            <div class="content">
              <div id="touzi-relationship" class="touzi-relationship">
                <NoData class="no-chart" v-if="!show"></NoData>
              </div>
            </div>
          </div>
          <!-- 如果是IE的话就不显示该组件，此处必须用异步组件 否则页面会崩溃 -->
          <!-- <pop-component v-if="!isIE"></pop-component> -->
        </div>
        <div class="right-content">
          <div class="card">
            <div class="card-title">
              <div>
                <img
                  src="~@/assets/imgs/trz/speaker.png"
                  class="speacker"
                  width="16"
                  height="13"
                />
                相关报道
              </div>
              <div
                class="refresh-btn"
                @click="goToNewsList(infoObj.companyuid)"
                v-if="newsCount > 6"
              >
                查看更多
              </div>
            </div>
            <div class="content">
              <div class="news-list">
                <div
                  class="news-item"
                  v-for="(item, index) in newsList"
                  :key="index"
                >
                  <div
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      margin-bottom: 10px;
                    "
                  >
                    <router-link
                      :to="{ path: '/trz/news/' + item.data_id }"
                      class="news-text"
                      target="_blank"
                      :title="item.title"
                      >{{ item.title }}</router-link
                    >
                  </div>
                  <!-- <div class="news-text">{{ item.title }}</div> -->
                  <div class="news-info">
                    <div class="news-date">
                      <img
                        src="~@/assets/imgs/trz/clock.png"
                        class="clock"
                        width="14"
                        height="14"
                      />{{ item.regtime }}
                    </div>
                    <div class="news-source" v-if="item.source">
                      <img
                        src="~@/assets/imgs/trz/pin.png"
                        class="pin"
                        width="13"
                        height="14"
                      />{{ item.source }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from "@/components/layouts/trz/header.vue"
// import G6 from "@antv/g6";
// import { GraphLayoutPredict } from "@antv/vis-predict-engine";
import LoadingGif from "@/components/common/globalCom/loading-gif.vue"
import MiddleScroll from "@/components/common/trz/middle.scroll.js.vue"
import NoData from "@/components/common/trz/noData.vue"
// import SeeksRelationGraph from "relation-graph";
// 异步组件
const popComponent = () => ({
  component: import("./pop-component.vue"),
  delay: 200
});

export default {
  components: {
    CustomHeader,
    LoadingGif,
    popComponent,
    NoData
    // ,SeeksRelationGraph
  },
  name: "rongzi-detail",
  mixins: [MiddleScroll],
  data() {
    return {
      show: "",
      isIE: window.isIEAndLtIE11,
      isShowCodePanel: false,
      isShowNodeTipsPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      currentNode: {},
      graphOptions: {
        allowSwitchLineShape: true, // 是否在工具栏中显示切换线条形状的按钮
        allowSwitchJunctionPoint: true, // 是否在工具栏中显示切换连接点位置的按钮
        isMoveByParentNode: true, // 是否在拖动节点后让子节点跟随
        layouts: [
          {
            label: "自动布局",
            layoutName: "force",
            layoutClassName: "seeks-layout-force"
          }
        ]
        // 这里可以参考"Graph 图谱"中的参数进行设置
      },
      navs: ["事件概要", "投资关系"],
      showTZGX: true, // 显示投资关系模块
      showSJGY: true, // 显示事件概要模块
      infoObj: {},
      loading: false,
      newsList: [],
      activeNav: 0,
      newsCount: 0
    };
  },
  mounted() {
    this.handlerDetail();
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.echartsResize("touzi-relationship");
    });
  },
  methods: {
    echartsResize(id) {
      let echart = Echarts.getInstanceByDom(document.getElementById(id));
      echart && echart.resize();
    },
    searchKeywords(keywords) {
      let routeData = this.$router.resolve({
        path: "/trz/rongzi",
        query: {
          keywords: keywords
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 获取详情页信息
    async handlerDetail() {
      this.loading = true;
      await window
        .Axios({
          method: "get",
          url: "/api/trz/read",
          params: {
            id: this.$route.params.id,
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          this.loading = false;
          if (res.data.code === 200 && res.data.data) {
            let data = res.data.data;
            this.infoObj = data;
            // this.infoObj.concepts = [
            //   "肿瘤",
            //   "心血管疾病",
            //   "神经系统疾病",
            //   "口腔科",
            //   "皮肤科",
            //   "传染科",
            //   "药物概念"
            // ];
            this.handleRelationship2();
            // 相关报道
            this.handlerNews();
          } else {
            this.showSJGY = false;
            this.navs.splice(this.navs.indexOf("事件概要"), 1);
          }
        })
        .catch(err => {
          console.log(err);
          this.showSJGY = false;
          this.navs.splice(this.navs.indexOf("事件概要"), 1);
        });
    },

    // 相关报道
    handlerNews() {
      window
        .Axios({
          method: "get",
          url: "/api/trz/news",
          params: {
            companyuid: this.infoObj.companyuid,
            time: this.infoObj.time,
            pageSize: 6,
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            let data = res.data.data.res;
            this.newsCount = res.data.data.count;
            this.newsList = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 跳转到机构列表查询关键词
    toDetail(val) {
      let path = ''
      console.log(val)
      if (!val.gsWyuid && !val.jgWyuid) return false
      // 如果gsWyuid存在跳转到企业详情
      if (val.gsWyuid) path = `/trz/qiye/${val.gsWyuid}`

      // 如果jgWyuid存在跳转到企业详情
      if (val.jgWyuid) path = `/trz/jigou/${val.jgWyuid}`
      const { href } = this.$router.resolve({
        path: path
      });
      window.open(href, "_blank");
    },

    // 跳转到新闻列表页
    goToNewsList(id) {
      let routeData = this.$router.resolve({
        path: "/trz/news",
        query: {
          fourth_condition: `companyuid=${id}`
        }
      });
      window.open(routeData.href, "_blank");
    },

    // 左侧按钮定位事件
    positionPanel(index) {
      this.goTop(index);
    },
    // 投资关系
    async handleRelationship() {
      await window
        .Axios({
          method: "get",
          url: "/api/trz/tzgx",
          params: {
            uid: this.infoObj.uid,
            // uid: "6875169700000018",
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(async res => {
          if (res.data.code === 200 && res.data.data) {
            let data = res.data.data,
              obj = { nodes: [], edges: [] };

            G6.registerNode(
              "parent-jsx",
              cfg => `
                <group>
                    <circle style={{
                      r: ${
                        cfg.shortname.length * 3 > 33
                          ? cfg.shortname.length * 3
                          : 33
                      },
                      fill: '#fff',
                      stroke: ${cfg.color}
                    }} draggable="true">
                      <text
                        style={{
                        fontSize: 10,
                        marginTop: -10,
                        textAlign: 'center',
                        cursor: 'pointer',
                        fill: ${
                          cfg.color
                        }}} draggable="true">{{shortname}}</text>
                  </circle>
                </group>`
            );

            G6.registerNode(
              "child-node-jsx",
              cfg => `
                <group>
                  <rect>
                    <rect style={{
                      width: ${
                        cfg.companyname.length * 11 > 100
                          ? cfg.companyname.length * 11
                          : 100
                      },
                      height: 20,
                      fill: ${cfg.color},
                      radius: [6, 6, 0, 0],
                      cursor: 'move'，
                      stroke: ${cfg.color}
                    }} draggable="true">
                      <text style={{
                          fontSize: 10,
                          marginLeft: 10,
                          cursor: 'pointer',
                          fill: '#fff' }} draggable="true">{{companyname}}</text>
                    </rect>
                    <rect style={{
                      width: ${
                        cfg.companyname.length * 11 > 100
                          ? cfg.companyname.length * 11
                          : 100
                      },
                      height: 110,
                      cursor: 'pointer',
                      stroke: ${cfg.color},
                      fill: #ffffff,
                      radius: [0, 0, 6, 6],
                    }} draggable="true">
                      <text draggable="true" style={{ cursor: 'pointer', fontSize: 10, marginTop: 20, marginLeft: 10, fill: '#333' }}>{{stage}}</text>
                    </rect>
                  </rect>
                </group>`
            );

            data.type = "parent-jsx";
            data.color = "#2196f3";
            data.id = data.wyuid;
            data.shortname = this.formatterDesc(data.shortname);
            data.description = this.formatterDesc(data.description);

            if (data.children.res) {
              data.children.res.length > 0 &&
                data.children.res.forEach(item => {
                  item.type = "child-node-jsx";
                  item.color = "#2196f3";
                  item.id = item.wyuid;
                  item.stage = this.formatterDesc(item.stage);
                });

              let tempItem = _.cloneDeep(data);
              delete tempItem.children;
              obj.nodes.push(tempItem);

              data.children.res.length > 0 &&
                data.children.res.forEach(item => {
                  obj.nodes.push(item);
                  const tempObj = {
                    source: data.wyuid,
                    target: item.wyuid,
                    labelCfg: { style: { fontSize: 12 } }
                  };
                  obj.edges.push(tempObj);
                });
              try {
                // AI自动预测布局
                async function layoutPredict() {
                  return await GraphLayoutPredict.predict(obj);
                }
                // predictLayout 表示预测的布局
                // confidence 表示预测的可信度
                const { predictLayout, confidence } = await layoutPredict();
                const container = document.getElementById("touzi-relationship"),
                  width = $("#touzi-relationship").width(),
                  height = $("#touzi-relationship").height(),
                  tooltip = new G6.Tooltip({
                    getContent(e) {
                      let desc = e.item.getModel().description;
                      if (e.item.getModel().type == "parent-jsx")
                        if (desc != "")
                          return `<div style="color: #2196f3;">${desc}</div>`;
                    },
                    itemTypes: ["node"]
                  }),
                  graph = new G6.Graph({
                    container: "touzi-relationship",
                    width,
                    height,
                    // fitView: true,
                    fitCenter: true,
                    // translate the graph to align the canvas's center, support by v3.5.1
                    layout: {
                      type: "dagre",
                      rankdir: "BT",
                      preventOverlap: true
                    },
                    plugins: [tooltip], // 配置 Tooltip 插件
                    modes: {
                      default: ["drag-canvas", "drag-node", "zoom-canvas"]
                    },
                    animate: true
                  });
                graph.data(obj);
                graph.render();
              } catch (error) {}

              if (typeof window !== "undefined")
                window.onresize = () => {
                  if (!graph || graph.get("destroyed")) return;
                  if (
                    !container ||
                    !container.scrollWidth ||
                    !container.scrollHeight
                  )
                    return;
                  graph.changeSize(
                    $("#touzi-relationship").width(),
                    $("#touzi-relationship").height()
                  );
                  // graph.fitView();
                  graph.fitCenter();
                };
            }
          } else {
            this.showTZGX = false;
            // this.navs.splice(this.navs.indexOf("投资关系"), 1);
          }
        })
        .catch(err => {
          console.log(err);
          this.showTZGX = false;
          // this.navs.splice(this.navs.indexOf("投资关系"), 1);
        });
    },
    nodeClick(nodeObject, $event) {
      this.currentNode = nodeObject;
      this.$refs.seeksRelationGraph.focusNodeById(this.currentNode.id);
    },
    showNodeTips(nodeObject, $event) {
      this.currentNode = nodeObject;
      if (this.currentNode.data.description) {
        var _base_position = this.$refs.myPage.getBoundingClientRect();
        this.isShowNodeTipsPanel = true;
        this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x - 20;
        this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 60;
      }
    },
    hideNodeTips(nodeObject, $event) {
      this.isShowNodeTipsPanel = false;
    },
    // 投资关系
    async handleRelationship2() {
      await window
        .Axios({
          method: "get",
          url: "/api/trz/tzgx",
          params: {
            uid: this.infoObj.uid,
            // uid: "6875169700000018",
            accesstoken: GETCOOKIEFUN("accesstoken")
          }
        })
        .then(async res => {
          if (res.data.code === 200 && res.data.data) {
            let data = res.data.data,
              obj = { nodes: [], links: [] };

            data.type = "parent-jsx";
            data.color = "#3556B9";
            data.id = data.wyuid;
            data.symbolSize = 100;
            data.shortname = this.formatterDesc(data.shortname);
            data.name = this.labelLenLimit(data.shortname, 10);
            data.value = this.formatterDesc(data.description);
            data.description = this.formatterDesc(data.description);
            data.symbol = "circle";
            data.itemStyle = {
              color: "#0D1A62"
            };

            if (data.children.res) {
              this.show = true;
              data.children.res.length > 0 &&
                data.children.res.forEach(item => {
                  item.type = "child-node-jsx";
                  item.color = "#3556B9";
                  item.id = item.wyuid;
                  item.name = this.labelLenLimit(item.companyname, 10);
                  item.value = this.formatterDesc(item.stage);

                  item.symbol = "rect";
                  item.symbolSize = [200, 60];
                });

              let tempItem = _.cloneDeep(data);
              delete tempItem.children;
              tempItem.name = tempItem.shortname;
              obj.nodes.push(tempItem);

              data.children.res.length > 0 &&
                data.children.res.forEach(item => {
                  item.itemStyle = {
                    color: "#dae0e9"
                  };
                  item.label = {
                    color: "#000"
                  };
                  obj.nodes.push(item);
                  const tempObj = {
                    source: data.wyuid,
                    target: item.wyuid
                  };
                  obj.links.push(tempObj);
                });
              let option = {
                tooltip: {
                  show: true, //默认显示
                  showContent: true, //是否显示提示框浮层
                  trigger: "item", //触发类型，默认数据项触发
                  showDelay: 0, //浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
                  hideDelay: 300, //浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
                  enterable: false, //鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
                  position: "right", //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
                  confine: true, //是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
                  transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
                  formatter: function(params) {
                    if (params.data.type == "parent-jsx") {
                      return `简介：${params.value}`;
                    } else {
                      return `投资阶段：${params.value}`;
                    }
                  }
                },
                series: [
                  {
                    type: "graph", //关系图
                    layout: "force", //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
                    legendHoverLink: true, //是否启用图例 hover(悬停) 时的联动高亮。
                    hoverAnimation: true, //是否开启鼠标悬停节点的显示动画
                    coordinateSystem: null, //坐标系可选
                    force: {
                      //力引导图基本配置
                      repulsion: 100, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                      gravity: 0.01, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                      edgeLength: 200, //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                      layoutAnimation: true
                      //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
                    },
                    roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                    nodeScaleRatio: 0.6, //鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
                    draggable: true, //节点是否可拖拽，只在使用力引导布局的时候有用。
                    focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
                    edgeSymbol: ["arrow"],
                    edgeSymbolSize: 10, //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
                    itemStyle: {
                      //===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                      normal: {
                        //默认样式
                        label: {
                          show: true
                        },
                        opacity: 1
                        // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
                      }
                    },
                    label: {
                      //=============图形上的文本标签
                      normal: {
                        show: true, //是否显示标签。
                        textStyle: {
                          //标签的字体样式
                          color: "#FFF", //字体颜色
                          fontSize: 14 //字体大小
                        }
                      },
                      align: "left",
                      verticalAlign: "middle"
                    },
                    lineStyle: {
                      color: "#3556B9"
                    },
                    edgeLabel: {
                      //==============线条的边缘标签
                      normal: {
                        show: false
                      }
                    },
                    //别名为nodes   name:影响图形标签显示,value:影响选中后值得显示,category:所在类目的index,symbol:类目节点标记图形,symbolSize:10图形大小
                    //label:标签样式。
                    data: obj.nodes,
                    //edges是其别名代表节点间的关系数据。
                    links: obj.links
                  }
                ]
              };

              // 使用刚指定的配置项和数据显示图表。
              let myChart = Echarts.init(
                document.getElementById("touzi-relationship"),
                "customed"
              );
              myChart.setOption(option);
              const that = this;
              // 点击跳转到融资企业详情页
              myChart.on("click", function(params) {
                // 根节点跳转到融资企业详情页
                if (params.data.type == "parent-jsx") {
                  let router = that.$router.resolve({
                    path: `/trz/qiye/${params.data.wyuid}`
                  });
                  window.open(router.href, "_blank");
                } else {
                  // 子节点跳转到投资机构详情页
                  let router = that.$router.resolve({
                    path: `/trz/jigou/${params.data.wyuid}`
                  });
                  window.open(router.href, "_blank");
                }
              });
              window.addEventListener("resize", () => {
                this.echartsResize("touzi-relationship");
              });
            } else {
              this.show = false;
            }
            console.log(this.show);
          } else {
            this.showTZGX = false;
            this.show = false;
            this.navs.splice(this.navs.indexOf("投资关系"), 1);
          }
        })
        .catch(err => {
          console.log(err);
          this.showTZGX = false;
          this.show = false;
          this.navs.splice(this.navs.indexOf("投资关系"), 1);
        });
    },
    formatterDesc(desc) {
      var arr = desc && desc.split("");
      for (let i in arr) {
        if (i % 12 == 0) {
          //此处是每隔11字符换行
          arr.splice(i, 0, "\n");
        }
      }
      var res = arr && arr.join("");
      return res;
    }
  }
};
</script>

<style lang="less" scoped>
.rongzi-detail {
  min-width: 1280px;
  .detail-container {
    width: calc(100vw - 10px);
    min-height: calc(100vh - 72px);
    min-width: 1280px;
    margin: 68px 10px 0 0;

    .touzifang-item {
      display: flex;
      line-height: 20px;
      font-size: 13px;
      font-weight: 400;
      color: #09144f;
      margin-right: 10px;
    }

    .no-click {
      text-decoration: none;
    }

    .touzifang {
      flex-wrap: wrap;
      line-height: 20px;
      font-size: 13px;
      font-weight: 400;
      color: #666666;
      display: flex;
      width: calc(100vw - 360px);
      min-width: 1000px;
    }

    .rongzi-target {
      line-height: 20px;
      font-size: 13px;
      font-weight: 400;
      color: #666;
      margin: 6px 0 20px 0;
      width: calc(100vw - 360px);
      min-width: 1000px;
      display: flex;
      span {
        width: 65px;
      }
    }

    .title,
    .touzifang,
    .rongzi-target {
      padding-left: 20px;
    }

    .title {
      line-height: 18px;
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: calc(100vw - 360px);
      min-width: 1000px;

      .tag {
        font-size: 12px;
        font-weight: normal;
        line-height: 1;
        padding: 4px 7px;
        margin-left: 10px;
        border-radius: 4px;
        color: #9ca8b9;
        border: 1px solid #e4eaf3;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
          color: #fff;
          background-color: #3556b9;
        }
      }

      .tag1 {
        font-size: 12px;
        font-weight: normal;
        line-height: 1;
        padding: 4px 7px;
        margin-left: 10px;
        border-radius: 4px;
        color: #3556b9;
        border: 1px solid #3556b9;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
          color: #fff;
          background-color: #3556b9;
        }
      }

      .tag-provice {
        cursor: unset;
        &:hover {
          color: #3556b9;
          border: 1px solid #3556b9;
          background-color: #fff;
        }
      }

      .concepts {
        display: flex;
        align-items: center;
        .concept {
          margin-left: 10px;
          height: 18px;
          padding: 0 5px;
          border-radius: 4px;
          border: 1px solid #e4eaf3;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          color: #9ca8b9;
          cursor: pointer;
        }
      }
    }

    .clock,
    .pin {
      margin-right: 6px;
    }

    .second-title {
      display: flex;
      align-items: center;
      height: 14px;
      line-height: 14px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      margin-bottom: 20px;

      .pin {
        margin-left: 20px;
      }
    }

    .cards {
      display: flex;

      .left-content,
      .middle-content {
        margin-right: 10px;
      }

      .left-content {
        width: 230px;
        padding: 5px 0;
        box-sizing: border-box;

        .card {
          height: calc(100vh - 200px);
        }
      }
      .middle-content {
        width: calc(100vw - 560px);
        height: calc(100vh - 200px);
        min-width: 720px;
        overflow-y: auto;
        padding: 5px;
        box-sizing: border-box;

        .touzi-relationship {
          height: 500px;
          width: 100%;
          .no-chart {
            height: 500px;
            width: 100%;
            min-width: 300px;
            box-sizing: border-box;
            display: inline-block;
          }
        }

        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left-info {
            flex: 1;
            margin-right: 10px;
            .summary-item {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              color: #333;
              div {
                width: 70px;
                height: 14px;
                line-height: 14px;
                font-size: 14px;
                font-weight: 400;
                color: #666666;
                display: flex;
                justify-content: space-between;
              }
            }

            .summary-investors {
              flex-wrap: wrap;
            }
          }

          .right-rongzi {
            // width: 200px;
            padding: 0 5px;
            height: 84px;
            background: #f5f8fc;
            border-radius: 4px;
            border: 1px solid #dae0e9;
            font-size: 16px;
            font-weight: 400;
            color: #666666;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .rongzi-money {
              margin-top: 6px;
              height: 26px;
              line-height: 26px;
              font-size: 26px;
              font-weight: 600;
              color: #e7af2f;
            }
          }
        }

        .content2 {
          width: 100%;
          padding-bottom: 20px;
          box-sizing: border-box;

          .info-item {
            margin-left: 20px;
            display: flex;
            width: calc(100% - 40px);
            border-radius: 4px;
            border: 1px solid #dae0e9;
            margin-bottom: 10px;

            &:not(:last-child) {
              margin-bottom: 10px;
            }
            .info-label {
              width: 96px;
              background: #dae0e9;
              border-radius: 4px 0px 0px 4px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 20px;
            }

            .info-desc {
              display: flex;
              align-items: center;
              margin-left: 20px;
              padding: 6px 0;
              box-sizing: border-box;
              flex: 1;
              font-size: 14px;
              color: #333333;
            }
          }
        }
      }
      .card {
        width: 100%;
        background: #ffffff;
        box-shadow: 0 1px 6px 0px rgba(9, 20, 79, 0.19);
        border-radius: 4px;
        position: relative;
        &:not(:last-child) {
          margin-bottom: 10px;
        }

        .card-title {
          width: calc(100% - 40px);
          height: 16px;
          line-height: 36px;
          background: #f5f8fc;
          border-radius: 4px 4px 0px 0px;
          padding: 10px 20px;
          font-size: 16px;
          font-weight: 600;
          color: #0d1a62;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;

          .refresh-btn {
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 400;
            color: #3556b9;
          }
        }

        .summary-list {
          .summary-item {
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 400;
            color: #09144f;
            padding: 12px 20px;
            border-left: 2px solid #fff;
            cursor: pointer;
            position: relative;
            &::after {
              content: "";
              width: calc(100% - 40px);
              position: absolute;
              bottom: 0;
              left: 20px;
              border-bottom: 1px dashed #dae0e9;
            }
            &.active,
            &:hover {
              background-color: #f5f8fc;
              border-left: 2px solid #e7af2f;
            }
          }
        }

        .content {
          padding: 20px 20px 10px 20px;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 20px;

          .summary-list {
            .summary-item {
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              font-weight: 400;
              color: #09144f;
              padding: 12px 0;
              border-bottom: 1px dotted #dae0e9;
            }
          }

          .news-list {
            margin-top: 10px;
            .news-item {
              &:not(:last-child) {
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px dotted #dae0e9;
              }
              .news-text {
                line-height: 20px;
                font-size: 13px;
                font-weight: 400;
                color: #333333;
                margin-bottom: 10px;
                cursor: pointer;
                &:hover {
                  color: #e7af2f;
                }
              }
              .news-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 14px;
                line-height: 14px;
                font-size: 12px;
                font-weight: 400;
                color: #999999;
                margin-top: 10px;

                .news-date,
                .news-source {
                  display: flex;
                  align-items: center;
                }
              }
            }

            .news-more-btn {
              width: 120px;
              height: 28px;
              background: #3556b9;
              border-radius: 4px;
              margin: 20px auto 10px auto;
              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
              line-height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
        }

        .btn-area {
          width: calc(100% - 40px);
          border-top: 1px dotted #dae0e9;
          margin-top: 108px;
          height: 60px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .btn {
            height: 22px;
            line-height: 22px;
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            cursor: pointer;
            text-decoration: none;

            .prev {
              color: #e7af2f;
            }

            .next {
              color: #09144f;
            }
          }
        }
      }

      .right-content .card {
        width: 300px;
        padding: 5px;
        .content {
          padding: 10px 20px;
        }
      }
    }
    .speacker {
      margin-right: 6px;
    }
  }
}
</style>
