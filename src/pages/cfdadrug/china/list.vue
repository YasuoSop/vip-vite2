<template>
  <div>
    <el-tabs :value="activeTabName"
    @tab-click="handleClickTag"
    :before-leave="removeSwitch"
    class="la-list zhuce-list">
      <el-tab-pane
        :label="getTabLabel('按批准文号/注册证号浏览', extendCount.shoulihao_count)"
        name="base">
        <BaseTable></BaseTable>
      </el-tab-pane>
      <el-tab-pane
        :disabled="nopms.name_view"
        :label="getTabLabel('按药品名称浏览' ,extendCount.yaopingming_count)"
        name="nameGroup">
        <nameTable></nameTable>
      </el-tab-pane>
      <el-tab-pane
        :disabled="nopms.qy_view"
        :label="getTabLabel('按企业名称浏览' ,extendCount.qiyeming_count)"
        name="qiyeNameGroup">
        <qyTable></qyTable>
      </el-tab-pane>
      <el-tab-pane
        label="历史数据查询"
        name="history_data">
        <qyTable></qyTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BaseTable from './children/BaseTable.vue'
import nameTable from './children/nameTable.vue'
import qyTable from './children/qyTable.vue'
import { mapState } from 'vuex'

export default{
  components:{
    BaseTable,
    nameTable,
    qyTable
  },
  data (){
    return {
    }
  },
  computed: {
    //同时获取多个属性
    ...mapState({
      activeTabName: state => state.CfdaDrug.tabname,
      res1: state => state.CfdaDrug.res1,
      res2: state => state.CfdaDrug.res2,
      res3: state => state.CfdaDrug.res3,
      extendCount: state => state.CfdaDrug.extendCount,
      nopms: state => state.CfdaDrug.nopms,
      allBase: state => state.CfdaDrug.allBase,
    }),
    /* noData(){
      return !this.res1.res&&!this.res2.res&&!this.res3.res
    } */
  },
  /* watch:{
    //从智能分析返回列表刷新
    $route:{
      handler(){
        if(this.$route.path==='/cfdadrug/list.vue'){
          //智能分析重新搜索清空列表数据tab无法自动复位
          let tabname= this.activeTabName
          Store.commit('CfdaDrug/tabname','')
          Store.commit('CfdaDrug/tabname',tabname)
          this.noData && Store.dispatch('CfdaDrug/nomalSearch',{queryToPutong: false,tabs:true})
        }
      },
      immediate:true
    }
  }, */
  methods: {
    removeSwitch(activeName,oldActiveName){
      return !(activeName==='history_data')
    },
    handleClickTag (tab,event) {
      let gas = ''
      if(tab.name==='nameGroup'){
        gas='vip_cfdadrug_yaopin'
      }else if (tab.name==='history_data'){
        gas = 'vip_cfdadrug_history'
      }else{
        gas='vip_cfdadrug_qiye'
      }
      if(gas) {
        window.ga("send","event", "tab", "click", gas)
        window._paq.push(['trackEvent', 'tab', 'click',  gas, ])
      }
      if(tab.name==='history_data'){
        window.open('/pijian_jinkou_olddata')
        return
      }
      let path = tab.name==="base"?"/api/cfdadrug":("/api/cfdadrug/"+tab.name)
      Store.commit("CfdaDrug/path",path)
      Store.commit("CfdaDrug/tabname",tab.name)
      if ((tab.name === "base" && !_.keys(this.res1.res).length) || (tab.name === "nameGroup" && !_.keys(this.res2.res).length) || (tab.name === "qiyeNameGroup" && !_.keys(this.res3.res).length)) {
        Store.dispatch('CfdaDrug/nomalSearch',{path:path, queryToPutong: false})
      }
    }
  },
  created () {
    setTimeout(() => {
      const hashLocation= sessionStorage.getItem("hashLocation");//缓存中获取当前页面的路由名称
      // 注意, 这里使用全路径匹配,在hash模式中,因为地址会携带#,所以页面报告中的url需要重新覆盖一下, 将#去除
      window._paq.push(['setCustomUrl', "https://" + hashLocation]);//覆盖页面报告的url，可以自定义页面url，加上本页面路由
      window._paq.push(['trackPageView', this.allBase.dbname]);//页面名称,可以自定义页面名称
      window._paq.push(['setDocumentTitle', this.allBase.dbname])
    }, 1000);
  },
  mounted () {
      // $('.el-tabs__active-bar').css('width','84px')
  }
}
</script>

<style lang="less">
@import "@/assets/less/var.less";
.el-tabs__header{
  padding-left: 14px;
  margin: 0px;
}
.el-tabs__content{
  overflow: visible;
}
.el-tabs__active-bar{
  height: 3px;
  border-radius: 5px;
}

.el-tabs__item {
  padding: 0 14px;
}
</style>
