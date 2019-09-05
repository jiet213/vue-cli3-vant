<!--  -->
<template>
  <div class="u-bq-body">
    <div class="u-srh-box">
      <h1 class="u-tt">{{titleName}}</h1>
      <p class="u-tip">{{tipInfo}}</p>
      <p class="name"
         @click="certiState = true">{{certiTypeText}}
        <span :class="[certiState ? 'rotate' : '']">></span>
      </p>
      <div class="u-ipt-box">
        <input class="ipt"
               v-model="certiNo"
               maxlength="26"
               :placeholder="iptHolder">
        <span class="icon"
              @click="callAppPhoto"
              v-if="certiType == 1"></span>
      </div>
      <div class="u-error"
           v-if="isError">
        <p>
          <span class="icon"></span>
          <span class="info">{{errorMsg}}</span>
        </p>
      </div>
      <div class="u-ipt-box"
           v-if="needPolicyCode">
        <input class="ipt"
               v-model="policyCode"
               maxlength="26"
               placeholder="输入保单号">
      </div>
    </div>
    <div class="u-query-btn">
      <a href="javascript:;"
         @click="queryCustomerInfo">查询</a>
    </div>
    <p class="u-date"
       @click="dateTimeStatus = true">{{selectedData}}</p>
    <van-popup v-model="certiState"
               position="bottom">
      <van-picker :columns='certiList'
                  show-toolbar
                  @cancel="certiState = false"
                  @confirm="onConfirm"
                  ref="certiPicker"></van-picker>
    </van-popup>
    <van-popup v-model="dateTimeStatus"
               position="bottom">
      <van-datetime-picker v-model="currentData"
                           type="date"
                           :min-date="minDate"
                           :max-date="maxDate"
                           @confirm="dateTimeConfirm"
                           @cancel="dateTimeStatus = false"
                           @change="dateTimeChange"
                           title="" />
    </van-popup>
  </div>
</template>

<script>
import { Popup, Picker, DatetimePicker } from 'vant';
import controlStorage from '@js/storage'
import $ from 'jquery'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      csType: this.$route.query.csType, //变更类型
      certiList: [ // 证件类型集合
        { text: '身份证', value: '1' },
        { text: '军人证', value: '2' },
        { text: '护照', value: '3' },
        { text: '出生证', value: '4' },
        { text: '港澳台通行证', value: '6' },
        { text: '士兵证', value: '7' },
        { text: '警官证', value: '8' },
        { text: '户口簿', value: '12' },
        { text: '永久居留证', value: '61' },
        { text: '其他', value: '9' }
      ],
      value: {},
      certiState: false,
      certiTypeVal: [], //默认身份证
      certiType: '1', //默认身份证
      certiTypeText: '身份证',
      certiNo: '',
      certiImage: '',
      policyCode: '',
      needPolicyCode: false, //是否需要保单号
      isError: false, // 查询是否错误
      errorMsg: '',
      tipInfo: '',
      iptHolder: '投保人身份证号',
      dateTimeStatus: false,
      selectedData: '选择日期',
      currentData: new Date(),
      minDate: new Date(1990, 1, 1),
      maxDate: new Date(2030, 1, 1),
    };
  },

  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
  },

  computed: {
    titleName() {
      if (this.csType == '1' || this.csType == '3' || this.csType == '4' || this.csType == '17') {
        return '客户查询';
      } else {
        return '保单查询'
      }
    }
  },

  created() {
    window['certiNoOcrDone'] = (obj) => {
      if (obj) {
        this.certiNo = JSON.parse(obj).certiNo; //certiImage
        this.certiImage = 'data:image/jpeg;base64,' + JSON.parse(obj).certiImage;
      }
    }
    window['remoteOnCertiOcrDone'] = (obj) => {
      if (obj) {
        this.certiNo = JSON.parse(obj).certiNo; //certiImage
        this.certiImage = 'data:image/jpeg;base64,' + JSON.parse(obj).certiImage;
      }
    }
  },

  mounted() {
    controlStorage('test', 'set', '111');
    console.log($);
    let csType = parseInt(this.csType);
    switch (csType) {
      case 1:
        document.title = '手机号码变更';
        this.tipInfo = '请输入投保人身份证号，点击查询客户手机号';
        break;
      case 2:
        document.title = '保单年度报告变更';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 3:
        document.title = '家庭信息变更';
        this.tipInfo = '请输入投保人身份证号，点击查询家庭信息';
        break;
      case 4:
        document.title = '单位信息变更';
        this.tipInfo = '请输入投保人身份证号，点击查询单位信息';
        break;
      case 5:
        document.title = '预约终止变更';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 6:
        document.title = '续期账户变更';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 7:
        document.title = '收费地址变更';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 8:
        document.title = '身故受益人变更';
        this.tipInfo = '请输入被保人身份证号，点击查询保单';
        this.iptHolder = '被保人身份证号';
        break;
      case 9:
        document.title = '续期缴费成功通知书变更';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 10:
        document.title = '失效通知书变更';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 11:
        document.title = '红利处置方式变更';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 12:
        document.title = '结束自动垫缴保费';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 13:
        document.title = '红利领取方式变更';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 14:
        document.title = '生存金领取方式变更';
        this.tipInfo = '请输入被保人身份证号，点击查询保单';
        this.iptHolder = '被保人身份证号';
        break;
      case 15:
        document.title = '年金领取频率及年限变更';
        this.tipInfo = '请输入被保人身份证号，点击查询保单';
        this.iptHolder = '被保人身份证号';
        break;
      case 16:
        document.title = '个单贷款清偿';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 17:
        document.title = '证件有效期变更';
        this.tipInfo = '请输入投保人身份证号，点击查询客户证件有效期';
        break;
      case 18:
        document.title = '红利领取';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 19:
        document.title = '保单余额账户退费';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      case 20:
        document.title = '个单减额缴清';
        this.tipInfo = '请输入投保人身份证号，点击查询保单';
        break;
      default:
        break;
    }
    //alert组件测试
    this.$dialog.alert({
      message: '弹窗内容'
    }).then(() => {
      // on close
    });
  },

  methods: {
    callAppPhoto() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      // 1. 获取handler
      let handler = {
        callHander: function (obj) {
          if (isiOS) {
            window.webkit.messageHandlers.remoteOnCertiOcr.postMessage(JSON.stringify(obj))
          }
          if (isAndroid) {
            window.tpbbAppRemote.remoteOnCertiOcr(JSON.stringify(obj));
          }
        }
      }
      let para = {
        certiType: this.certiType,
        certiSide: "F",
      };
      handler.callHander(para)
    },
    certiNoAppOcr() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      // 1. 获取handler
      var handler = {
        callHander: function (json) {
          if (isiOS) {
            window.webkit.messageHandlers.certiNoOcr.postMessage(JSON.stringify(json))
          }
          if (isAndroid) {
            window.tpbbAppRemote.certiNoOcr(JSON.stringify(json));
          }
        }
      }
      handler.callHander({
        'type': "2",
        'name': "二代身份证正面"
      })
    },
    // 客户地址信息查询
    queryCustomerInfo() {
      let regIDCardNum = /^[0-6](\d{5})(\d{8})(\d{2})(\d)([0-9Xx])$/; // 身份证或居民户口本
      let self = this;
      self.certiNo = self.certiNo ? self.certiNo.trim() : self.certiNo;
      if (!self.certiNo) {
        let errorTip = '请输入投保人证件号码';
        if (self.csType == '14' || self.csType == '15') {
          errorTip = '请输入被保人证件号码'
        }
        self.$toast(errorTip);
        return;
      }
      if (self.certiType == 1 && !regIDCardNum.test(self.certiNo)) {
        self.$toast('请输入正确的身份证号码');
        return;
      }
      if (self.needPolicyCode && !self.policyCode) {
        self.$toast('请输入保单号');
        return;
      }
      self.certiNo = self.certiNo.toUpperCase();
      //身故受益人传1 查询被保人数据
      let customerType = '0';
      let allowMinors = '';
      if (self.csType == '8') {
        customerType = '1';
      }
      if (self.csType == '14' || self.csType == '15') {
        customerType = '1';
        allowMinors = '1';
      }
      self.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中...'
      })
      self.$axios.get(`${this.$axios.defaults.baseURL}/cs/customer-info`, {
        params: {
          certiType: self.certiType,
          certiNo: self.certiNo,
          policyCode: self.policyCode,
          customerType: customerType,
          allowMinors: allowMinors
        }
      }).then(res => {
        self.$toast.clear();
        if (res.data.errCode == 0) {
          // 上传身份证正面照片
          if (self.certiType == '1' && self.certiImage) {
            self.certiImageUpload(self.certiImage);
          }
          let csType = parseInt(self.csType);
          switch (csType) {
            case 1:
              self.$router.push({
                name: "baoqPhoneUpdate",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 2:
            case 9:
            case 10:
              self.$router.push({
                name: "baoqEmailChoose",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 3:
            case 4:
              self.$router.push({
                name: "baoqHomeUpdate",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 5:
              self.$router.push({
                name: "policyEndList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 6:
              self.$router.push({
                name: "bankAddressList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 7:
              self.$router.push({
                name: "bankAddressList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 8:
              self.$router.push({
                name: "policyDeathList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 11:
              self.$router.push({
                name: "bonusChangeList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 12:
              self.$router.push({
                name: "endChargingList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 13:
              self.$router.push({
                name: "bonusGetList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 14:
              self.$router.push({
                name: "liveGetList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 15:
              self.$router.push({
                name: "yearGetList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 16:
              self.$router.push({
                name: "loanOverList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 17:
              self.$router.push({
                name: "certiValidateUpdate",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 18:
              self.$router.push({
                name: "bonusMoneyList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 19:
              self.$router.push({
                name: "moneyRefundList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            case 20:
              self.$router.push({
                name: "coverageReduceList",
                query: {
                  csType: self.csType,
                  certiType: self.certiType
                }
              });
              break;
            default:
              break;
          }
        } else if (res.data.errCode == 84001) {
          self.errorMsg = res.data.errMsg;
          self.isError = true;
          self.needPolicyCode = true;
        } else {
          self.errorMsg = res.data.errMsg;
          self.isError = true;
        }

      }).catch(err => {
        self.$toast.clear();
        self.errorMsg = res.data.errMsg;
        self.isError = true;
      })
    },
    onConfirm(value) {
      this.value = value;
      this.certiType = value.value;
      this.certiTypeText = value.text;
      this.certiState = false;
    },
    dateTimeConfirm(value) {
      let date = value,
        m = date.getMonth() + 1,
        d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      this.selectedData = date.getFullYear() + "-" + m + "-" + d
      this.dateTimeStatus = false;
    },
    dateTimeChange(value) {
      let dateSelect = value.getValues();
      console.log(dateSelect);
    }
  }
}

</script>
<style lang='less' scoped>
.u-bq-body {
  width: 100%;
  height: 100%;
}

.u-srh-box {
  width: 100%;
  height: 100%;
  padding: 0 25px;

  .u-tt {
    font-family: PingFangSC-Medium;
    font-size: 22px;
    color: #333333;
    padding-top: 42px;
  }

  .u-tip {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
    padding: 10px 0 35px;
  }

  .name {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
  }

  .u-ipt-box {
    width: 100%;
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efeff4;

    .ipt {
      // flex: 1;
      width: 180px;
      line-height: 22px;
      padding: 0 5px;
      color: #333;
      font-family: PingFangSC-Regular;
      font-size: 16px;
    }

    .icon {
      width: 24px;
      height: 20px;
      background: url(../assets/img/scan.png) no-repeat;
      background-size: contain;
    }
  }

  .u-error {
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 15px;

    p {
      line-height: 18px;
      display: flex;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #ff6333;

      .icon {
        width: 14px;
        height: 14px;
        margin-right: 6px;
        background: url(../assets/img/error-new.png) no-repeat;
        background-size: contain;
      }

      .info {
        width: 95%;
      }
    }
  }
}

.u-query-btn {
  width: 303px;
  height: 42px;
  margin: 80px auto 0;

  a {
    width: 303px;
    height: 42px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(-90deg, #62d5e8 0%, #2fa8fe 100%);
    box-shadow: 0 2px 10px 0 rgba(15, 148, 230, 0.4);
    border-radius: 100px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #fff;
  }
}
.u-date {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #666666;
}
</style>
