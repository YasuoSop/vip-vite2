<template>
  <div class="la-ypmc">
    <List :loading="listLoading" :nodata="res4 && !res4.length">
      <div class="actions">
        <!-- 显示 -->
        <list-check :defaultFiled="defaultFiled.vue"x_name="Yyxs" :showArray="tableHead" @changeTableHeader="(list)=>changeTableHeader(this,list)" style="text-align:left;" />
        <!-- 导出 -->
        <Export
          :out_max="allBase.out_max"
          vuex_name="Yyxs"
          api_name="yyxs"
          :max_num="extendCount.zwylbmCount"
          :defaultFiled="defaultFiled"
          outdataAction="zwylbm"
          style="text-align:left;"></Export>
      </div>
      <!-- row-key 和 expand-row-keys 配合显示展开的数据，row-key 定义每一行唯一的 key；expand-row-keys 数组，定义哪些 key 显示展开的数据 -->
      <el-table
        ref="ElTable"
        :height="tableHeight"
        :data="res4"
        stripe
        fixed
        :row-key="getRowKeys"
        :expand-row-keys="expands.expandsrow"
        @cell-click="toggleRowExpansion"
        @sort-change="sortChange"
        :default-sort = "order.zwylbm ? defaultSort(order.zwylbm) : {}"
        class="table extensible-table"
        style="width: 100%"
        v-if="show_table">
        <el-table-column type="expand" width="1">
          <div type="expand" slot-scope="props" class="table-expand">
            <!-- 自定义加载界面 -->
            <LoadingGif :className="'list-in-loading'" :classNameImg="'little-size-loading'" :loadFlag="expandsLoading" v-if="expandsLoading"></LoadingGif>
            <!-- 加载完成显示部分 -->
            <div v-else>
              <el-table
                :data="props.row.second[scope].res"
                fixed
                ref="expandtable"
                style="width: 100%"
                class="expand-table">
                <el-table-column
                  v-for="(item, ix) in expandFiled"
                  :prop="item.prop"
                  :key="ix"
                  :sortable="item.sort"
                  :min-width="item.field_width || item.width || 100"
                  :label="item.label">
                  <template slot-scope="scope">
                    <div v-if="item.prop === 'dw'">
                      万元
                    </div>
                    <div :title="scope.row[item.prop]" v-else>
                      {{ scope.row[item.prop]||'-' }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                v-if="props.row.second[scope].count > 20"
                @current-change="(val)=>expandCurrentChange(val,props)"
                :current-page="props.row.second[scope].page"
                :page-size="20"
                layout="prev, next"
                :total="props.row.second[scope].count"
                :disabled="nopms.fy"
                :class="{'abandon-click-method': nopms.fy}">
              </el-pagination>
            </div>
          </div>
        </el-table-column>
        <el-table-column
         v-for="item in tableHead"
          :prop="item.prop"
          :key="item.prop"
          :sortable="item.sort"
          :min-width="item.width"
          :label="item.label">
          <template slot-scope="scope">
            <div :title="scope.row[item.prop]">
            <div v-if="item.prop === 'ypfx'" @click="showAnaly(scope.row.zwylbm)">
              <router-link target="_blank" class="cl-blue" :to="{ path: '/yyxsdata', query: { tab: '1',ypname:scope.row.zwylbm,type: '1' }}">药品分析</router-link>
            </div>
            <div v-else :class="{'extensible-td': Number(scope.row[item.prop])}" @click="item.prop != 'zwylbm'?getExpandRes(scope.row.zwylbm, item.prop, scope.row[item.prop], item.label,scope):''">
              {{ scope.row[item.prop] }}
            </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="positon: relative;">
        <el-pagination
          v-if="extendCount.zwylbmCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="param.page"
          :page-sizes="[20, 30, 50]"
          :page-size="20"
          layout="total, sizes, prev, pager, next"
          :total="extendCount.zwylbmCount"
          :disabled="nopms.fy"
          :class="{'abandon-click-method': nopms.fy}">
        </el-pagination>
        <span class="out-of-page cl-red">限于内容篇幅，部分结果未予显示</span>
      </div>

    </List>
  </div>
</template>

<script>
  import LoadingGif from '@/components/common/globalCom/loading-gif.vue'
  import List from '@/components/layouts/list.vue'
  import Export from '@/components/common/export.vue'
  import { mapState } from 'vuex'
  import tablehead from '@/config/tablehead'
  import listCheck from "@/components/common/list-check.vue"
  import commonMixins from '@/mixins/common.js'
  import setTableHMixins from '@/mixins/setTableH.js'
  const defaultFiled = tablehead.yyxs.hxcf
  export default{
    components: {
      LoadingGif,
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
        scope: '',
        defaultFiled: defaultFiled,
        expandFiled: [],
        tableHead:[],
        checkallShow: [],
        show_table: true,
        getRowKeys(row) {
          return row.zwylbm
        },
        expandParams:{    //存分组查询的条件 横坐标和纵坐标的prop值 以及page pageSize
          zwylbm:'',     //药品名称
          pageSize: 20,
          page:1
        },
        expands: {
          expandsrow:[],  //存要展开的行
          element: null,  //存分组点击的dom元素（点击这个元素，触发展开）
          expanCell: "",  //存当前展开项对应的 列id（此 id 是 el-table 生成的）
          expandRes:{},   //展开项对应的资源
          erroCode:'200',
        },
        expandsLoading: true,
        changeStyle: "",
        tableHeight: document.documentElement.clientHeight-48-60-60-50-88,
      }
    },
    computed: {
      //同时获取多个属性
      ...mapState({
        tableconf: state => state.Yyxs.tableconf,
        allBase: state => state.Yyxs.allBase,
        nopms: state => state.Yyxs.nopms,
        res4: state => _.keys(state.Yyxs.res4).length ? state.Yyxs.res4.res : [],
        errocode: state => state.Yyxs.error,
        listLoading: state => state.Yyxs.listLoading,
        params: state => state.Yyxs.putong,
        words: state => state.Yyxs.gaoji,
        group: state => state.Yyxs.shaixuan,
        extendCount: state => state.Yyxs.extendCount,
        param: state => state.Yyxs.zwylbm_param, // 附加参数(存于vuex内)
        search_api_param: state => state.Yyxs.search_api_param,
        accesstoken: state => state.UserCenter.accesstoken,
        order: state => state.Yyxs.order
      }),
    },
    methods: {

      // 定量分析 ---> 点击药品分析
      showAnaly (ypmc) {
        this.$store.commit('Yyxs/dlfx_nowNav', '检品分析')
        this.$store.commit('Yyxs/dlfx_searchValYp', ypmc);
        this.$store.commit('Yyxs/dlfx_searchListYp', [
          {label: ypmc, value: ypmc},
        ]);
      },
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
          Store.dispatch('Yyxs/nomalSearch',{params:this.param})
        } else {
          $('.out-of-page').show()
        }
      },
      handleSizeChange (val) {
        this.param.page = 1
        this.param.pageSize = val
        if (val * this.param.page <= 1500) {
          $('.out-of-page').hide()
          Store.dispatch('Yyxs/nomalSearch',{params:this.param})
        } else {
          $('.out-of-page').show()
        }
      },
      handleRequest (props) {
        Store.dispatch("Yyxs/getGroupRes",{path:'/api/yyxs/byzwylbm',params:this.expandParams}).then(res=>{
          this.expandsLoading = false
          if (res.data.code == 404) {
            this.expands.erroCode = '404'
          }else{
            if (res.data.code == 200) {
              this.expands.erroCode = '200'
              let data = res.data.data
              this.expands.expandRes = data
              data.res = this.tableData(data.res)
              this.$set(props.row.second,[this.scope],data)
              // 处理二级列表出现后不能滚动的问题
              $('.el-table').addClass('el-table--scrollable-y')
            }
          }
        }).catch(error=>{
          this.expandsLoading = false
          this.expands.erroCode = '500'
        })
      },
      //分组展示的page发生改变
      expandCurrentChange (val,props) {
        this.expandParams.page = val
        this.handleRequest(props)
      },
      // 排序
      sortChange (column, prop, order) {
        let sort
        // column.prop为null时，不排序
        if (column.prop) {
          sort = column.prop +" "+ (column.order=="descending"?"desc":"asc")
        }
        this.param.order = sort
        Store.commit('Yyxs/order', Object.assign({}, this.$store.state.Yyxs.order, {zwylbm: sort ? sort : null}))
        Store.dispatch('Yyxs/nomalSearch',{params:this.param})
      },
      // 获取展开列表的数据
      getExpandRes (drugsname,groupname,num,label,scope) {
        if (num) {
          let tp
          switch (label)
          {
            case '品种': tp = 1; break;
            case '生产企业': tp = 2; break;
            case '区域': tp = 3; break;
            case '省份': tp = 4; break;
          }

          this.expandFiled[0] = {prop:'field', label:label==='品种'?'药品名称':label, width:100, checked:true}
          this.expandFiled[1] = {prop:"dw", label:"销售单位", width:100, checked:true}

          this.expandParams.zwylbm = drugsname
          this.expandParams.tp = tp
          this.expandParams.pageSize = 20
          this.expandParams.page = 1
          this.expandParams.accesstoken = this.accesstoken

          this.scope = scope.column.property
          if(scope.row.second[this.scope]) {
            this.$set(scope.row.second,[this.scope],scope.row.second[this.scope])
            return
          }
          this.expandsLoading = true

          this.handleRequest(scope)
        }
      },
      //处理二级表格数据
      tableData(data){
        this.expandFiled = this.expandFiled.slice(0, 2)
        let list = []
        _.forEach(data, (item,i) => {
          let _list = item.year.split(',')
          let obj = {}
          _.forEach(_list, (items) => {
            let year = items.split(':')
            let yearkey = year[0]
            let numkey = year[1]
            obj[yearkey] = this.echartsTooltipMoney(numkey)
            if(i === 0){
              this.expandFiled.push({
                prop:yearkey, label:yearkey, width:100, checked:true
              })
            }
          })
          list.push(
            _.assign({ field: item.field },obj)
          )
        })
        return list
      },
      // 切换展开行
      toggleRowExpansion(row, column, cell, event){
        if(event.target.localName==='td'||event.target.className==='cell') return
        window.ga("send","event", "txt", "click","yyxs_"+"_byzwylbm_"+column.property);
      window._paq.push(['trackEvent', 'txt',"click","yyxs_"+"_byzwylbm_"+column.property, ])

        let num = Number($(cell).text().trim())
        if (num) {
          let isOneRow = false
          let column_index = $(cell).index()
          let row_index = $(cell).parent().index()
          if (this.expands.old_row >= 0) {
            if (this.expands.old_row == row_index) {
              isOneRow = true
            }
          }
          this.expands.old_row = row_index
          let src_el = $(cell);
          if (!this.expands.element) {
            // 存储点击的 src_el
            this.expands.element = src_el
          }
          // 展开显示的数据清空
          this.expands.expandsrow = [];
          // 判断是不是之前列
          if (column.id == this.expands.expanCell && isOneRow) {
            if(src_el.hasClass('active')){
              this.expands.element.removeClass('active')
            }else{
              this.expands.element.addClass('active')
            }
            this.expands.expanCell = ""
            // 如果是点击的同一个 cell，无论是展开还是收起，page重置为1
            this.expandParams.page = 1;
          }else{
            this.expands.expanCell = column.id
            this.expands.expandsrow.push(row.zwylbm)
            this.expands.element.removeClass('active')
            src_el.addClass('active')
            this.expands.element = src_el
          }
        };
      }
    },
    created () {
      this.init()
    },
    mounted (){

    },
    // safari浏览器回到当前页面会导致样式错乱问题，由于使用了keepalive所以需要在activated生命周期中在调一次计算方法
    activated() {
      this.registerEven();
    },
    watch: {
      res4: {
        handler() {
          this.$nextTick(() => {
            this.registerEven()
          })
          // 重置行点击
          this.expands = {
            expandsrow:[],
            element: null,
            expanCell: "",
            expandRes:{},
            erroCode:'200',
          }
        },
        immediate: true
      },
      tableHead: {
        handler() {
          this.$nextTick(() => {
            this.registerEven();
          });
        },
        immediate: true,
      },
      // tableconf(n){
      //   this.expandFiled = this.tableheaderCombain(n, this.expandFiled)
      // },
      checkedFiled () {
        this.tableHead = []
        this.defaultFiled = _.map(defaultFiled,item=>{
          if(this.checkedFiled.indexOf(item.prop) != -1){
            item.checked = true
            this.tableHead.push(item)
          }else{
            item.checked = false
          }
          return item
        })
      }
    }
  }
</script>

<style lang="less">
  @import "~@/assets/less/var.less";
  .la-ypmc{
    min-height: 100px;
    .no-data-msg {
      width: 100%;
      text-align: center;
      font-weight: bold;
      // font-size: 20px;
    }
  }
  .extensible-table{
    .extensible-td{
      cursor: pointer;
      text-decoration: underline;
      &:hover{
        color: @PrimaryColor;
        font-weight: normal;
      }
    }
    tr.el-table__row--striped{
      td{
        &.active{
          color: @PrimaryColor;
          font-weight: 600;
          background:url('~@/assets/imgs/zhuce/el-icon-caret-top.png') no-repeat 30px bottom #f5f8fb!important;
          border: none;
        }
      }
    }
    td{
      position: relative;
      .el-icon-caret-top{
        font-size: 20px;
        display: none;
      }
      &.active{
        color: @PrimaryColor;
        font-weight: 600;
        background:url('~@/assets/imgs/zhuce/el-icon-caret-top.png') no-repeat 30px bottom;
        border: none;
      }
    }
  }

</style>
