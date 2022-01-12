

const scrollminxins = {
    data() {
        return {
            container: null,
            tops: [],
            activeNav: 0,
        }
    },
    activated() {
        this.init()
    },
    deactivated() {},
    methods: {
        init() {
            this.$nextTick(()=> {
              let nums = []
              let container = document.querySelector('.middle-content');
              let items = container.querySelectorAll('.card');
              items.forEach((element) => {
                  console.log(element.offsetTop);
                  nums.push(element.offsetTop);
              });
              let aa = nums[0]
              nums.map((v,i)=> {
                nums[i] = nums[i]-aa
              })
              console.log(nums)
              this.tops = nums;
              container.addEventListener('scroll', () => {
                  this.changeActive(container.scrollTop)
              })
              this.container = container

            })
        },
        uninit() {
            this.container.removeEventListener('scroll', () => {
                this.changeActive(this.container.scrollTop)
            })
        },
        goTop(idx) {
            if (idx < this.tops.length) {
                this.container.scrollTop = this.tops[idx];
                this.changeActive(this.tops[idx])
            } else {
                console.log('index 不对！')
            }
        },
        changeActive(top) {
            for (let i = 0;i<this.tops.length;i++) {
                if (top<this.tops[i]-50&&top>this.tops[i-1]) {
                    this.activeNav = i-1
                }
                if (top>this.tops[i]-50){
                    this.activeNav = i;
                }
            }
        }
    }
}

export default scrollminxins
