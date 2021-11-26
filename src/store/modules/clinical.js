import Vue from 'vue'
import Qs from 'qs'
import Lang from '@/i18n/lang/zh-CN.js'
import store from '@/store'

const stateObj = {
  allBase: {},
  helpInfo: {},
  update_conf: [],
  tableconf:[],
  listLoading: true, // 控制表格中数据的加载清空
  analyLoading: true,
  error: 0, // 错误码
  tabname: 'first', // 表示目前处于按那种方式浏览/first（受理号）/namegroup（药品名称）/qiyegroup（企业名称）
  path: '/api/clinical', // 维护当前搜索请求接口
  //普通查询
  nomal_filed: [], // 普通搜索列举项（来源于API的原始数据）
  query: [], // 已选普通搜索查询条件 格式请查看readme.md
  queryStr:"", // 由于监听不到数组变化，需监听query时，转成字符串
  putong: {}, // 普通搜索查询条件所用的储存对象（主要用于API前的处理）
  //高级查询
  advanced_filed: [], // 高级搜索列举项（来源于API的原始数据）
  conditions: [], // 已选高级搜索查询条件 格式请查看readme.md
  gaoji: {}, // 高级搜索查询条件所用的储存对象（主要用于API前的处理）
  //二次筛选
  filters: {}, // 条件筛选结果（来源于API的原始数据）
  groups: {}, // 已选筛选条件
  shaixuan: {}, // 条件筛选所用的储存对象（主要用于API前的处理）
  //热点查询
  hot_filter_filed: {}, // 热门信息筛选列举项（来源于API的原始数据）
  hot_checked: {}, // 已选热门筛选条件
  hot: {}, // 热门筛选条件所用的储存对象（主要用于API前的处理）
  //关联查询
  fourth: {},
  iffirstCommonIn:true,//连接跳转搜索进这个界面
  fourth_checked: {},
  // 查询出的数量
  extendCount: {
    BaseCount: 0,
    NameCount: 0,
    QiyeCount: 0
  },
  res1: {}, // 按受理号查询的结果
  res2: [], // 按药品名称查询的结果
  res3: [], // 按企业名称查询的结果
  pageSize: '20', // 当前页显示条数（条/页）
  order: {}, // 查询的排序规则
  slh_param: { // 按受理号查询页的附加参数
    order: null, // 排序
    page: 1, // 页数
    pageSize: 20 // 每页条数
  },
  ypmc_param: { // 按药品名称查询页的附加参数
    order: null, // 排序
    page: 1, // 页数
    pageSize: 20 // 每页条数
  },
  qy_param: { // 按企业查询页的附加参数
    order: null, // 排序
    page: 1, // 页数
    pageSize: 20 // 每页条数
  },
  cate_param: {
    name: null,
    cate: null,
    type: 'conditions',
    order: null, // 排序
    page: 1, // 页数
    pageSize: 20 // 每页条数
  },
  cate_param_one: '',
  cateCount: 0,
  cateNum: [],
  cateList: {},
  changeBox: 'szm',
  cateLabelObj: {
    conditions:'疾病领域',
    interventions:'药物干预',
    rare:'罕见病',
    dietary:'膳食补充剂',
    sponsor:'申办者/合作者',
    locations:'地区',
  },
  mapGeoJson: {},
  // 可视化结果
  kshRes: {},
  // 匹配 主要用于已选条件显示需要
  match_putong: {
    'comprehensive_drug': '综合搜索（药品）',
    'comprehensive_company': '综合搜索（企业）',
    'comprehensive_devices': '综合搜索（医疗器械）',
    'comprehensive_chinesemedicine': '综合搜索（中药材）',
    'comprehensive_targets': '综合搜索（靶点）',
    'comprehensive_disease': '综合搜索（疾病）'
  },
  match_gaoji: {},
  match_shaixuan: Lang.fields.clinical.filters,
  match_shaixuan_values: {},
  search_api_param: {},
  saved_options: [],
  nopms: {
    'list': [],
    'detail': []
  },
  norules: {}
}
export default {
  namespaced: true,
  state: Object.assign({}, stateObj),
  mutations: {
    reset (state, Payload) {
      store.state.Zhuce = Object.assign({}, stateObj)
    },
    nopms (state, Payload) {
      state.nopms = Payload
    },
    norules (state, Payload) {
      state.norules = Payload
    },
    fourth_condition (state, Payload) {
      state.fourth_condition = Payload
    },
    fourth_checked (state, Payload) {
      state.fourth_checked = Payload
    },
    fourth (state, Payload) {
      
      if(Payload instanceof Array){
        this.iffirstCommonIn = true;
      }else{
        this.iffirstCommonIn = false;
      }

      let fourth_condition = ''
      _.map(Payload, (item, index) => {
        if (index == 0) {
          fourth_condition = item.logic + ' ' + item.name + '=' + item.value
        } else {
          fourth_condition += ' ' + item.logic + ' ' + item.name + '=' + item.value
        }
      })
      state.fourth = fourth_condition ? {"fourth_condition": fourth_condition} : {}
    },
    allBase (state, Payload) {
      state.allBase = Payload
    },
    tableconf(state, Payload) {
      state.tableconf = Payload
    },
    helpInfo (state, Payload) {
      state.helpInfo = Payload
    },
    update_conf(state, Payload) {
      state.update_conf = Payload
    },
    saved_options (state, Payload) {
      state.saved_options = Payload
    },
    search_api_param (state, Payload) {
      let obj = _.omit(Payload, ['order', 'page', 'pageSize'])
      state.search_api_param = obj
    },
    match_putong (state, Payload) {
      // state.match_putong = Payload
      for (let item of Payload) {
        _.set(state.match_putong, item.name, item.label)
      }
    },
    match_gaoji (state, Payload) {
      // state.match_gaoji = Payload
      for (let item of Payload) {
        _.set(state.match_gaoji, item.name, item.label)
      }
    },
    match_shaixuan_values (state, Payload) {
      state.match_shaixuan_values = Payload
    },
    match_hot_key (state,Payload) {
      let obj_keyvalue = {}
     _.map(Payload,(value,key)=>{


     })
    },
    listLoading (state, Payload) {
      state.listLoading = Payload
    },
    analyLoading (state, Payload) {
      state.analyLoading = Payload
    },
    error (state, Payload) {
      state.error = Payload
    },
    tabname (state, Payload) {
      state.tabname = Payload
    },
    extendCount (state, Payload) {
      state.extendCount = Payload
    },
    // 普通搜索项
    nomalFiled (state, Payload) {
      state.nomal_filed = Payload
    },
    query (state, Payload) {
      // opt=1增加条件 或 替换已有条件
      if (Payload.opt && Payload.opt == 1) {
        if (state.query.length == 0) {
          state.query.push(Payload.param)
        } else {
          for (let i = 0, l = state.query.length; i < l; i++) {
            if (Payload.param.name == state.query[i].name) {
              if (Payload.param.value == '' || Payload.param.value == ':' || Payload.param.value == undefined) { // **清除**此条件
                // 将无效的输入条件移除
                _.remove(state.query, n => {
                  return n.name.indexOf(Payload.param.name) == 0
                })
              } else { // **替代**此条件
                state.query[i] = Payload.param
              }
              break
            } else {
              if (i == l - 1) {
                state.query.push(Payload.param)
                break
              }
            }
          }
        }
      } else {
        state.query = Payload;
      }
    },
    queryStr (state) {
      state.queryStr = JSON.stringify(state.query)
    },
    putong (state, Payload) {
      //console.log(Payload)
      if (Payload) {
        if (Payload.length) {
          let obj = {}
          for (let i = 0; i < Payload.length; i++) {
            let iname = Payload[i].name
            let ilabel = Payload[i].label
            let iaccurate = Payload[i].accurate
            let pivalue = Payload[i].value

            if (pivalue) {
              _.set(obj, (iaccurate ? iname + '_eq' : iname), pivalue)
            } else {
              _.omit(obj, (iaccurate ? iname + '_eq' : iname))
            }
          }
          state.putong = obj
        } else {
          state.putong = {}
        }
      }
    },
    conditions (state, Payload) {
      state.conditions = Payload
    },
    gaoji (state, Payload) {
      
      let words = ''
      let atcs_sel = false
      _.map(Payload, (item, index) => {
        if (item.value) { // 去空
          if (item.atcs_sel) {
            atcs_sel = true
          };
          if (index == 0) {
            words = item.value.length ? (item.logic + ' ' + (item.accurate ? item.name + '_eq' : item.name) + '=' + (_.isArray(item.value) ? _.join(_.map(item.value, (n) => { return n }), 'ღ') : item.value)) : ''
          } else {
            words += item.value.length ? (' ' + item.logic + ' ' + (item.accurate ? item.name + '_eq' : item.name) + '=' + (_.isArray(item.value) ? _.join(_.map(item.value, (n) => { return n }), 'ღ') : item.value)) : ''
          }
        }
      })
      state.gaoji = atcs_sel ? {'words': words, 'atcs_sel': 1} : {'words': words}
    },
    groups (state, Payload) {
      state.groups = Payload
    },
    shaixuan (state, Payload) {
      let group = ''

      _.map(Payload, (item, index) => {
        if (item.length > 0) { // 去空
          if (group == '') {
            group = index + '=' + _.join(item, 'ღ')
          } else {
            group += ' ' + '_and' + ' ' + index + '=' + _.join(item, 'ღ')
          }
        }
      })

      if (group != '') {
        state.shaixuan = {'filter_condition': group}
      } else {
        state.shaixuan = {}
      }
    },
    hot_checked (state,Payload) {
      state.hot_checked = Payload
    },
    hot (state,Payload) {
      let hotcheckeds = ''
      _.map(Payload,(item,index)=>{
        if (item.length > 0) { // 去空
          if (hotcheckeds == '') {
            hotcheckeds = index + '=' + _.join(item, 'ღ')
          } else {
            hotcheckeds += ' ' + '_and' + ' ' + index + '=' + _.join(item, 'ღ')
          }
        }
      })

      if (hotcheckeds != '') {
        state.hot = {'hot_condition':hotcheckeds}
      } else {
        state.hot = {}
      }
    },
    path (state, Payload) {
      state.path = Payload
    },
    order (state, Payload) {
      state.order = Payload
    },


    // 高级搜索项
    advancedFiled (state, Payload) {
      state.advanced_filed = Payload
    },
    // 条件筛选结果项
    filters (state, Payload) {
      state.filters = Payload
    },
    // 热门信息筛选项
    hot_filter_filed (state, Payload) {
      state.hot_filter_filed = Payload
    },
    /*
     * 注册数据 - API数据
     */
    // 按受理号查询的API数据
    res1 (state, Payload) {
      state.res1 = Payload
    },
    // 按药品名称查询的API数据
    res2 (state, Payload) {
      state.res2 = Payload
    },
    // 按企业名称查询的API数据
    res3 (state, Payload) {
      state.res3 = Payload
    },
    // 智能分析 - 可视化的获取API数据
    kshRes (state, Payload) {
      state.kshRes = Payload
    },
    cateList (state, Payload) {
      state.cateList = Payload
    },
    cate_param (state, Payload) {
      state.cate_param = Payload
    },
    cateNum (state, Payload) {
      state.cateNum = Payload
    },
    cateCount (state, Payload) {
      state.cateCount = Payload
    },
    changeBox (state, Payload) {
      state.changeBox = Payload
    },
    cate_param_one (state, Payload) {
      state.cate_param_one = Payload
    },
    mapGeoJson (state, Payload) {
      state.mapGeoJson = Payload
    },
  },
  actions: {
    reset (state, Payload) {
      state.commit('handleReset')
    },
    // 普通搜索 和 高级搜索 通用方法
    nomalSearch (state, Payload) {//type为1时是为了
      state.commit('listLoading', true)
      if(!this.iffirstCommonIn){
        state.commit("fourth", state.state.fourth_checked);
      }
      this.iffirstCommonIn = false;

      // 确定api的url
      if (Payload !== undefined) {
        if (Payload.path) {
          state.commit('path', Payload.path)
        }
      }
      let param = {} // 储存axios获取数据的API参数
      if (Payload && !Payload.queryToPutong) { // 不把query的状态传给putong
      } else {
        // console.log("查询内容：",state.state.query)
        state.commit('putong', state.state.query)
      }
      state.commit('gaoji', state.state.conditions)
      state.commit('shaixuan', state.state.groups)
      state.commit('hot', state.state.hot_checked)
      // state.commit('fourth', state.state.fourth_checked)
      let sparam = state.state.putong
      let swords = state.state.gaoji
      let sgroup = state.state.shaixuan
      let sfourth = state.state.fourth
      let shot = state.state.hot
      if (state.state.gaoji.words) {
        param = (Payload && Payload.params) ? _.assign({}, sfourth, swords, sgroup, shot, Payload.params) : _.assign({}, sfourth, swords, sgroup, shot, {page: 1, pageSize: state.state[(state.state.tabname==='first'?'slh':state.state.tabname==='namegroup'?'ypmc':'qy')+'_param'].pageSize})
      } else {
        param = (Payload && Payload.params) ? _.assign({}, sfourth, sparam, sgroup, shot, Payload.params) : _.assign({}, sfourth, sparam, sgroup, shot, {page: 1, pageSize: state.state[(state.state.tabname==='first'?'slh':state.state.tabname==='namegroup'?'ypmc':'qy')+'_param'].pageSize})
      }
      //关键词统计方法
      param = _.assign(param,this.vue.searchKeywords(state.state,Payload))

      // 当没有跟其他参数时，正常搜索，回到第一页
      if (!Payload) {
        state.commit('res1', [])
        state.commit('res2', [])
        state.commit('res3', [])
        state.commit('order', {})
        state.state.slh_param.page = 1
        state.state.slh_param.order = null
        state.state.ypmc_param.page = 1
        state.state.ypmc_param.order = null
        state.state.qy_param.page = 1
        state.state.qy_param.order = null
      }

      let paramAfter = _.omit(param, ['order', 'page', 'pageSize'])
      if (Qs.stringify(state.state.search_api_param) != Qs.stringify(paramAfter)) {
        state.commit('res1', [])
        state.commit('res2', [])
        state.commit('res3', [])
        state.commit('order', {})
      }
      state.commit('search_api_param', paramAfter)

      // if (Qs.stringify(state.state.search_api_param) != Qs.stringify(param)) {
      this.vue.getSearchParams('clinical',state,param)

      
      let that = this
      return window.Axios({
        method: 'get',
        // url: state.state.path,
        url: state.state.path,
        params: _.assign(param, {
          accesstoken: GETCOOKIEFUN("accesstoken")
        })
      }).then(res => {

        if (res.data.data) {
          let data = res.data.data
          let dataLen = _.keys(data).length
          state.commit('error', 0)
          // 改变extendCount
          if (dataLen) {
            state.commit('extendCount', {
              BaseCount: data.List.count,
              NameCount: 0,
              QiyeCount: 0
            })
          } else {
            state.commit('extendCount', {
              BaseCount: 0,
              NameCount: 0,
              QiyeCount: 0
            })
          }
          switch (state.state.tabname) {
            case 'first':
              state.commit('res1', data.List ? data.List : [])
              break
            case 'namegroup':
              state.commit('res2', data.List ? data.List : [])
              break
            case 'qiyegroup':
              state.commit('res3', data.List ? data.List : [])
              break
            default:
              state.commit('res1', data.List ? data.List : [])
              break
          }          
        }

        if (res.data.code == 404) {
          let data=res.data.data
          if(data.ExtendCount && data.ExtendCount.BaseCount || data.ExtendCount.NameCount  || data.ExtendCount.QiyeCount){
            state.commit('extendCount', data.ExtendCount)
          }else{
            state.commit('extendCount',{
              BaseCount: 0,
              NameCount: 0,
              QiyeCount: 0
            })
          }
          state.commit('error', 404)
        }
        state.commit('listLoading', false)
        return res
      }).catch((res) => {
        state.commit('extendCount', {
          BaseCount: 0,
          NameCount: 0,
          QiyeCount: 0
        })
        state.commit('error', 500)
        state.commit('listLoading', false)
        return res
      })
      // }
    },
    getCatestand (state, Payload) {
      let param = _.assign({}, state.state.cate_param, Payload&&Payload.params)
      state.commit('cate_param', _.assign({}, param, {is_visual: null}))
      state.commit('cate_param_one', param.type)
      state.commit('listLoading', true)
      state.commit('cateList', {})

      let params = this.vue.keywordStatistics(param,{name:state.state.cateLabelObj[state.state.cate_param_one]})
      if(params.searchname_zh){
        params.searchname_zh = params.searchname_zh.replace(',', `,${params.cate?(params.type==='locations'?'按区域':'按类别'):'按首字母顺序'}_`)
      }

      return window.Axios({
        method: 'get',
        url: '/api/clinical/catestand',
        params
      }).then(res => {

        if (res.data.data) {
          let data = res.data.data
          let dataLen = _.keys(data).length
          state.commit('error', 0)
          if(dataLen){
            state.commit('cateCount', data.List.count)
            state.commit('cateList', data.List ? data.List : {})
          }
        }

        if (res.data.code == 404) {
          state.commit('cateList', {})
          state.commit('error', 404)
        }
        state.commit('listLoading', false)
        return res
      }).catch((res) => {
        state.commit('cateList', {})
        state.commit('error', 500)
        state.commit('listLoading', false)
        return res
      })
    },
    getCate (state, Payload) {
      state.commit('listLoading', true)
      state.commit('cate_param_one', Payload)

      return window.Axios({
        method: 'get',
        url: '/api/clinical/cate',
        params: {
          type: Payload
        }
      }).then(res => {

        if (res.data.code===200) {
          state.commit('cateNum', res.data.data)
        }

        if (res.data.code == 404) {
          state.commit('cateNum', [])
          state.commit('error', 404)
        }
        state.commit('listLoading', false)
        return res
      }).catch((res) => {
        state.commit('cateNum', [])
        state.commit('error', 500)
        state.commit('listLoading', false)
        return res
      })
    },
    // 获取普通 或 高级搜索项
    getFiled (state) {
      return window.Axios({
        method: 'get',
        url: '/api/config/search?dbname=clinical'
      }).then(res => {
        if (res.data.code === 200 && res.data.data) {
          let data = res.data.data
          // 普通搜索项
          state.commit('nomalFiled', data.normal)
          state.commit('match_putong', data.normal)
        }
      })
    },
    getBaseInfo (state, Payload) {
      return window.Axios({
        method: 'get',
        url: '/api/config/view?dbname=clinical',
        params: {
          accesstoken: GETCOOKIEFUN("accesstoken")
        }
      }).then(res => {
        if (res.data.code === 200 && res.data.data) {
          let data = res.data.data
          if (data.baseconf.dbname) {
            store.commit('Normal/names', {
              'name': data.baseconf.dbename,
              'dbname': data.baseconf.dbname
            })
          }
          state.commit('allBase', data.baseconf) //
          state.commit('tableconf', data.tableconf)
          state.commit('helpInfo', data.helpconf)
          state.commit("update_conf", data.updatelog)
          // 权限处理 start
          state.commit('norules', data.norules)
          for (let item of state.state.norules.common) {
            switch (item.name) {
              case '高级搜索': state.state.nopms.gjss = true; break
              case '条件筛选': state.state.nopms.tjsx = true; break
              case '可视化': state.state.nopms.ksh = true; break
              case '详情页': state.state.nopms.xqy = true; break
              case '导出(默认300)': state.state.nopms.dc = true; break
              case '翻页(最大75)': state.state.nopms.fy = true; break
              case '热点搜索': state.state.nopms.rdss = true; break
            }
          }

          for (let item of state.state.norules.exclusive) {
            switch (item.action) {
              case 'rss': state.state.nopms.rss = true; break
              case 'namegroup': state.state.nopms.namegroup = true; break
              case 'qiyegroup': state.state.nopms.qiyegroup = true; break
              case 'timeline': state.state.nopms.timeline = true; break
              case 'devprocess': state.state.nopms.devprocess = true; break
            }
          }

          state.state.nopms.list = data.norules.list
          state.state.nopms.detail = data.norules.detail
          // 权限处理 end
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
