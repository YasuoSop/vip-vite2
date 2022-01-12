/*
  错误提示细分
 */
 <template>
  <div class="ErrorEducation">
    <el-dialog
      class="dialog-actions"
      @close="RemoteLoginClose"
      :modal-append-to-body="false"
      :visible="errorEducationShow"
    >
      <div slot="title" class="dialog-header">
        {{ codTips[`login${isErrorMsg}`]["tips"] }}
      </div>
      <div class="clearfix zjl_body">
        <div class="fl body_left">
          <img
            v-show="isErrorMsg == 2"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABnCAYAAAAdQVz5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NEZCMzg4QTExQzUxMUVBQUQ1QkZFRTU0QkUzRkFGRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NEZCMzg4QjExQzUxMUVBQUQ1QkZFRTU0QkUzRkFGRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc0RkIzODg4MTFDNTExRUFBRDVCRkVFNTRCRTNGQUZGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc0RkIzODg5MTFDNTExRUFBRDVCRkVFNTRCRTNGQUZGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+nG8uZgAAKSFJREFUeNrsXQlcVdX2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"
            alt
          />
          <img v-show="isErrorMsg !== 2" src="data:image/png;base64,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" alt />
        </div>
        <div class="fl body_right">
          <div class="right_info info_text">
            <!-- errorEducation.msg || -->
            {{ codTips[`login${isErrorMsg}`]["msg"] }}
          </div>
          <div class="right_info">
            <el-button @click="Submit" class="zjl_button" type="primary"
              >重新登录</el-button
            >
            <el-button @click="toKefu" class="ml50 zjl_button_g"
              >联系客服</el-button
            >
          </div>
        </div>
        <div v-show="loginErr" class="tc error">
          登录失败，请输入账号密码重新登录
        </div>
      </div>
      <div slot="footer" class="zjl_footer"></div>
    </el-dialog>
  </div>
</template>
 <script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loginErr: false,
      needCode: [11043, 11044],
      codTips: {
        login1: { tips: "登录提示", msg: "账号登录信息已失效，请重新登录" },
        login2: {
          tips: "异常提示",
          msg: "系统异常，请尝试重新登录或联系客服反馈",
        },
        login3: {
          tips: "登录提示",
          msg: "账号登录信息已失效，请尝试重新登录或联系客服反馈",
        },
      },
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      Code: (state) => state.UserCenter.errorEducation.code,
      errorEducation: (state) => state.UserCenter.errorEducation,
      errorEducationShow: (state) => state.UserCenter.errorEducation.show,
      RemoteLoginInfo: (state) => state.UserCenter.RemoteLoginInfo,
    }),
    isErrorMsg() {
      let code = this.Code;
      if (code === 11015 || code === 11042) {
        return 3;
      }
      let _this = this;
      let includes = _this.needCode.includes(code);
      if (includes) {
        return 1;
      }

      return 2;
    },
  },
  props: {
    lineKEfuFunction: Function,
  },
  methods: {
    googleClick(flag) {
      var code = this.Code;
      if (code) {
        if (flag == "login") {
          var obj = {
            11015: "promp_no_token_login_again",
            11042: "promp_token_not_exist_login_again",
            11043: "promp_token_expired_login_again",
            11044: "promp_signature_verification_failed_login_again",
            11005: "promp_other_login_again",
          };
        } else {
          var obj = {
            11015: "promp_no_token_contact_customer_servic",
            11042: "promp_token_not_exist_contact_customer_Servic",
            11043: "promp_token_expired_contact_customer_Servic",
            11044: "promp_signature_verification_failed_contact_customer_servic",
            11005: "promp_other_customer_again",
          };
        }
        if(obj[code]){
          window.ga("send", "event", "button", "click", obj[code]);
          window._paq.push(['trackEvent', 'button', 'click', obj[code], ])

        }
      }
    },
    toKefu() {
      this.lineKEfuFunction();
      this.RemoteLoginClose();
      this.googleClick();
    },
    RemoteLoginClose() {
      this.$store.commit("UserCenter/errorEducation", { show: false });
      // console.info()
      let flag = this.$route.path.includes("/login");
      this.vueBackToLogin(flag); //全局方法，清楚cookie
    },
    errTips(flag) {
      let _this = this;
      if (flag) {
        _this.RemoteLoginClose();
      } else {
        this.loginErr = true;
        setTimeout(() => {
          _this.RemoteLoginClose();
          _this.loginErr = false;
        }, 2000);
      }
    },
    Submit() {
      var userName = GETCOOKIEFUN("userName");
      let _this = this;
      this.googleClick("login");
      if (!userName || this.Code == 11043) {
        this.errTips(true);
        return;
      }

      let timeStamp = Date.now();
      let randStr = Math.random().toString(36).slice(2); // 生成随机字符串+
      let params = {
        name: userName,
        timeStamp: timeStamp,
        randStr: randStr,
        signature: this.getSignature([timeStamp + "", randStr, "newdb"]),
      };
      localStorage.setItem("forceLogin", JSON.stringify(params));
      //  try {
      //     this.frontEndLog("/api/user/forceLogin",{ //强制登录日志
      //       // _data:_data,
      //       params:params
      //     })
      //   } catch (error) {
      //     console.info(error)
      //   }
      // this.vueSetCookie("accesstoken", '');
      this.vueDelCookie("accesstoken");
      Axios.post("/api/user/forceLogin", params)
        .then((res) => {
          let _data = res.data;
          let code = _data.code;

          if (code == 200) {
            // alert(res.data.data.accessToken)
            this.vueSetCookie("accesstoken", res.data.data.accessToken);
            this.vueSetCookie("userPicture", res.data.data.picture);
            this.vueSetCookie("userName", res.data.data.username);
            // 清除store中的状态
            this.$store.commit(
              "UserCenter/accountData",
              Object.assign(
                {},
                this.$store.state.UserCenter.accountData,
                res.data.data
              )
            );
            let flag = this.$route.path.includes("/login");
            let openPath = this.vueGetCookie("openPath");

            if (flag) {
              if (openPath == "/login") {
                window.open("/home", "_self");
              } else if (!openPath) {
                window.open("/home", "_self");
              } else {
                window.open(openPath, "_self");
              }
              this.vueDelCookie("openPath");
            } else {
              window.location.reload();
            }
          } else {
            this.errTips(true);
          }
        })
        .catch((err) => {
          console.info(err);
          this.errTips(true);
        });
    },
  },
};
</script>
 <style lang="less" scoped>
@import "~@/assets/less/var.less";
.ErrorEducation {
  .ml50 {
    margin-left: 40px;
  }
  /deep/.v-modal {
    background: rgba(102, 102, 102, 0.4);
  }

  /deep/.el-dialog {
    border-radius: 20px !important;
    width: 579px;
    height: 225px;
    top: 50vh !important;
    box-shadow: -3px 2px 8px 0px rgba(188, 188, 188, 0.33);
  }
  /deep/.el-dialog__header {
    padding: 0px 20px;
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid @BorderColor;
    .dialog-header {
      height: 50px;
      line-height: 50px;
    }
  }
  /deep/.el-dialog__body {
    padding: 0px;
    .zjl_body {
      margin-top: 20px;
      .body_left {
        margin-left: 46px;
        margin-top: 10px;
      }
      .body_right {
        margin-left: 20px;
        .mt15 {
          margin-top: 15px;
        }
        .right_user {
          font-size: 16px;
          color: #fb5920;
        }
        .right_info {
          // margin: 5px 0px;
          text-align: center;
          .info_a {
            color: #4877e8;
          }
          .info_gray {
            // width: 300px;
            display: inline-block;
            vertical-align: top;
            color: #999999;
          }
        }
        .info_text {
          padding: 25px 0px;
          font-size: 16px;
          font-weight: bold;
          color: #545b6d;
        }
        .zjl_button_g {
          padding: 8px 40px;
          border-radius: 15px;
          font-size: 13px;
        }
        .zjl_button {
          padding: 8px 40px;
          border-radius: 15px;
          font-size: 13px;
          &:hover {
            background: #6d92ed;
            border-color: #6d92ed;
            color: #fff;
          }
        }
      }
    }
  }
  /deep/.el-dialog__footer {
    border-top: none;
    .zjl_footer {
      margin-top: 20px;
      text-align: center;
      .error {
        color: red;
        margin-top: 5px;
      }
    }
  }
}
</style>
