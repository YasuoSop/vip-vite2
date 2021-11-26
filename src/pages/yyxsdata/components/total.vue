<template>
  <div class="totals">
    <ul class="total-item" v-for="(item,i) in list" :key="i" v-if="item.value">
      <li class="li1">{{ totalObj[item.key].val }} <span v-if="item.value.year">({{ item.value.year }})</span></li>
      <li class="li2" v-if="item.value.value"><span>{{ item.value.value }}</span>{{ totalObj[item.key].unit }}</li>
      <li class="li2" v-else><span>{{ echartsTooltipMoney(moneyNumChange(item.value.sale)) }}</span>{{ unit ? '亿元' : totalObj[item.key].unit }}</li>
    </ul>
  </div>
</template>

<script>
export default{
  props: {
    list: {
      type: Array,
    },
    totalObj: {
      type: Object,
    }
  },
  watch: {

  },
  data (){
    return {
      unit: false
    }
  },
  methods: {
    moneyNumChange(val) {
      let num = parseFloat(val)
      if (num >= 10000) {
        num = num/10000
        this.unit = true
      }else{
        this.unit = false
      };
      return num
    },
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/less/var.less";
.totals{
  box-shadow: 0 0 5px #c4d3f8;
  height: 110px;
  display: flex;
  .total-item{
    flex:1;
    text-align: center;
    padding: 25px 0;
    .li1{
      font-size: 13px;
      font-weight: 600;
    }
    .li2{
      font-size: 14px;
      span{
        font-size: 24px;
        color: @PrimaryColor;
      }
    }
    &:hover{
      color: @PrimaryColor;
      background-color: #eff2fa;
      border-bottom: 3px solid @PrimaryColor;
    }
  }
}
</style>