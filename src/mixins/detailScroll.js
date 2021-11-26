import { mapState } from 'vuex';
import setTableHMixins from '@/mixins/setTableH';

export default {
  mixins: [setTableHMixins],
  data () {
    return {
      partDisTop: [],
      isClick: false,
      recordD: 0,
      spacingH: 0, // 针对像美国上市中间布局添加的高度计算
      topP: 20,
      bottomP: 15,
      leftP: 10, // 有变更后相应得药物报告和企业报告详情文件也要调整
      bottomB: 5,
      scrollNum: 0 // 记录当前
    }
  },
  computed: {
    ...mapState({
      showPromtNotice: state => state.showPromtNotice
    })
  },
  watch: {
    isLoading(val) {
      if(!val){
        this.$nextTick(function () {
          this.getPartsHeight()
        })
      }
    },
    showPromtNotice: {
      handler(val) {
        console.log(val);
        this.$nextTick(() => {
          if (val) $(".left-nav").css("top", $(".left-nav").css("top") + 30);
        })
        // if (document.querySelector(".header-fixed")) document.querySelector(".header-fixed").style.top = (val ? 78 : 48) + 'px';
      }
    }
  },
  methods: {
    getPartsHeight() {
      let part = $('.the-part')
      const h = $('.detail-header').height()
      this.partDisTop = [this.spacingH ? this.spacingH - h - this.bottomP : 0]
      this.selH = [this.spacingH]
      for (let i = 0; i < part.length; i++) {
        let ph = part.eq(i).outerHeight() + this.bottomB
        this.partDisTop.push(ph - h - this.bottomP  + _.sum(this.selH))
        this.selH.push(ph)
      }
    },
    handleNavClick(e){
      // if(!$(e.target).hasClass('active')){
        this.isClick = true
        let index = $(e.target).index()

        $(e.target).parent().children().removeClass('active')
        $(e.target).addClass('active')

        this.getPartsHeight()
        this.$parent.wrap.scrollTop = this.partDisTop[index]
        console.log(this.$parent.wrap.scrollTop)
      // }
    },
    handleScrolls() {
      let top = this.$parent.wrap.scrollTop
      let navHeight = $('.main .left-nav .nav-list').outerHeight()
      let wrapperHeight= $('.wrapper').outerHeight()
      // 判断上次左侧导航的滚动条位置和本次滚动调位置是否相等，如果相等则return  （如果继续执行下面的滚动条赋值代码的话,左侧导航会一直停留在当前位置）
      if(this.scrollNum === top/(wrapperHeight/navHeight)) {
        return
      }
      // 记录当前左侧滚动条的滚动的位置
      this.scrollNum = top/(wrapperHeight/navHeight)
      $('.main .left-nav').scrollTop(top/(wrapperHeight/navHeight))
      this.getPartsHeight()
      // console.log(top)
      // console.log(this.partDisTop)
      if(top > this.recordD){
        if(top > ($('.detail-header').height() + this.topP + this.bottomP)){
          // $('.detail-header').addClass(`header-fixed ${this.isClick ? 'anim-none' :''}`)

        $('.main').css({
          marginTop: 0
        })

          if(top > this.partDisTop[0]) {
            $('.left-nav').css({
              transition: !this.isClick ? 'top .2s' : 'none',
              position: 'fixed',
              top: $('.la-header').height() + $('.detail-header').height() + this.topP + this.bottomP,
              left: $('.la-menu').outerWidth() + this.leftP
            })
          }
        }
      }else{
        if(top < this.partDisTop[0]){
          $('.left-nav').removeAttr('style')
        }
        if(top < 1){
          $('.detail-header').removeClass('header-fixed anim-none')
          $('.main').removeAttr('style')
        }
      }

      this.recordD = top
      this.isClick = false;
      top += 20;
      for (let i = 0; i < this.partDisTop.length; i++){
        if(top > this.partDisTop[i] && top < this.partDisTop[i + 1]){
          $('.nav-event>.nav-item').removeClass('active')
          $('.nav-event>.nav-item').eq(i).addClass('active')
          return false
        }
        if(top > this.partDisTop[this.partDisTop.length - 1]){
          $('.nav-event>.nav-item').removeClass('active')
          $('.nav-event>.nav-item').eq(this.partDisTop.length - 1).addClass('active')
          return false
        }
      }
      if (document.querySelector(".header-fixed")) {
        // document.querySelector(".header-fixed").style.top = (this.showPromtNotice ? 78 : 48) + 'px';
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrolls, true)
  }
}
