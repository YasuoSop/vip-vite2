<template>
  <div class="lists">
    <el-tabs :value="activeTabName" @tab-click="handleClickTag" class="la-list zhuce-list">
      <el-tab-pane
        :label="getTabLabel('按受理号浏览',extendCount.BaseCount)"
        name="first"
        class="slh-pane">
        <ListOne></ListOne>
      </el-tab-pane>
      <el-tab-pane
        :label="getTabLabel('按药品名称浏览',extendCount.NameCount)"
        name="namegroup"
        :disabled="nopms.namegroup"
        :class="{'abandon-click-method': nopms.namegroup}">
        <ListTwo></ListTwo>
      </el-tab-pane>
      <el-tab-pane
        :label="getTabLabel('按企业名称浏览',extendCount.QiyeCount)"
        name="qiyegroup"
        :disabled="nopms.qiyegroup"
        :class="{'abandon-click-method': nopms.qiyegroup}">
        <ListThree></ListThree>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import ListOne from '@/components/common/list-config'
import ListOne from './lists/list-one.vue'
import ListTwo from './lists/list-two.vue'
import ListThree from './lists/list-three.vue'
import { mapState } from 'vuex'

export default{
  components:{
    ListOne,
    ListTwo,
    ListThree,
  },
  data (){
    return {
    }
  },
  computed: {
    //同时获取多个属性
    ...mapState({
      activeTabName: state => state.Zhuce.tabname,
      extendCount: state => state.Zhuce.extendCount,
      res1: state => state.Zhuce.res1,
      res2: state => state.Zhuce.res2,
      res3: state => state.Zhuce.res3,
      nopms: state => state.Zhuce.nopms,
    }),
    /* noData() {
      return !this.res1.res&&!this.res2.length&&!this.res3.length
    } */
  },
  /* watch: {
    $route:{
      handler(){
        if(this.$route.path==='/zhuce/list.vue'){
          //智能分析重新搜索清空列表数据tab无法自动复位
          let tabname= this.activeTabName
          Store.commit('Zhuce/tabname','')
          Store.commit('Zhuce/tabname',tabname)
          this.noData && Store.dispatch('Zhuce/nomalSearch',{queryToPutong: false,tabs:true})
        }
      },
      immediate:true
    }
  }, */
  methods: {
    handleClickTag (tab,event) {
      window.ga("send","event", "tab", "click","zhuce_"+tab.name);
          window._paq.push(['trackEvent', 'tab',"click","zhuce_"+tab.name, ])

      let path = tab.name==="first"?"/api/zhuce":("/api/zhuce/"+tab.name)
      // window.ga("send", "event", "tab", "click", "zhuce_"+tab.name)
      Store.commit("Zhuce/tabname",tab.name)
      Store.commit("Zhuce/path",path)
      if ((tab.name === "first" && !_.keys(this.res1.res).length) || (tab.name === "namegroup" && !_.keys(this.res2).length) || (tab.name === "qiyegroup" && !_.keys(this.res3).length)) {
        Store.dispatch('Zhuce/nomalSearch',{path:path, queryToPutong: false})
      }
    }
  },
  created () {

  },
  mounted () {
  }
}
</script>

<style lang="less">
@import "@/assets/less/var.less";
.zhuce-list {
  .el-tabs__header{
    padding-left: 14px;
    margin: 0px;
  }
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
