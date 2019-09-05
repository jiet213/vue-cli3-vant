<!--  -->
<template>
  <div class="u-bq-index">
    <div class="u-item-box"
         v-for="(item, index) in indexList"
         :key="index">
      <h2 class="u-tt">
        <span></span>
        <p>{{item.title}}</p>
      </h2>
      <div class="u-box">
        <div class="u-item"
             v-for="(detail, idx) in item.itemList"
             :key="idx"
             @click="goTo(detail)">
          <div class="info">
            <p class="icon">
              <img :class="detail.cs"
                   :src="detail.icon"
                   alt="">
            </p>
            <p class="name">{{detail.name}}</p>
          </div>

          <span class="line"></span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexList: [
        {
          title: '保单实时贷服务',
          itemList: [
            {
              id: 16,
              cs: 'loan-over',
              icon: require('../assets/img/loan-over.png'),
              name: '贷款清偿'
            }
          ]
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {
    //confirm组件测试
    this.$dialog.confirm({
      title: '更改失败',
      message: '弹窗内容'
    }).then(() => {
      // on confirm
      console.log('1');
    }).catch(() => {
      // on cancel
      console.log('2');
    });
  },

  methods: {
    /**
     * 跳转到对应的变更页
     * @param type 类型 1是手机号变更 2、9、10是信件发送方式变更 3家庭信息变更 4单位信息变更
     * 5是保单预约终止 6是续期账户变更 7是收费地址变更 8是身故受益人变更
     * 11是红利处置方式变更 12是结束自动垫缴保费 13红利领取方式变更
     * 14生存金领取方式变更 15年金领取频率及年限变更 16个单贷款清偿
     * 17身份证有效期变更 18红利领取
     */
    goTo(item) {
      this.$router.push({
        name: "baoqSearchNew",
        query: {
          csType: item.id
        }
      });
      // if (item.id == 2 || item.id == 9 || item.id == 10 || item.id == 11 || item.id == 12 || item.id == 13 || item.id == 14 || item.id == 15 || item.id == 16 || item.id == 17 || item.id == 18) {
      //   this.$router.push({
      //     name: "baoqSearchNew",
      //     query: {
      //       csType: item.id
      //     }
      //   });
      // } else {
      //   this.$router.push({
      //     name: "baoqSearch",
      //     query: {
      //       csType: item.id
      //     }
      //   });
      // }
    }
  }
}

</script>
<style lang='less' scoped>
.u-bq-index {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
}
.u-item-box {
  .u-tt {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: #333333;
    span {
      width: 2px;
      height: 10px;
      margin-right: 5px;
      background: #333;
    }
  }
  .u-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
  }
  .u-item {
    width: 33.3%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efeff4;
    .info {
      height: 100%;
      display: flex;
      flex: 1;
      align-items: center;
      margin: 0 3px;
    }
    .icon {
      width: 45px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
    .mobile {
      width: 24px;
    }
    .home {
      width: 34px;
    }
    .company {
      width: 34px;
    }
    .certi-validate {
      width: 36px;
    }
    .death-benefit {
      width: 32px;
    }
    .bank-card {
      width: 36px;
    }
    .policy-end {
      width: 30px;
    }
    .coverage-reduce {
      width: 32px;
    }
    .bank-address {
      width: 32px;
    }
    .email-year {
      width: 30px;
    }
    .email-success {
      width: 32px;
    }
    .email-invalid {
      width: 30px;
    }
    .end-charging {
      width: 32px;
    }
    .money-refund {
      width: 34px;
    }
    .bonus-change {
      width: 32px;
    }
    .bonus-get {
      width: 32px;
    }
    .bonus-money {
      width: 32px;
    }
    .live-get {
      width: 32px;
    }
    .year-get {
      width: 32px;
    }
    .loan-over {
      width: 32px;
    }
    .name {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: #999;
      line-height: 20px;
    }
    .line {
      width: 1px;
      height: 30px;
      background: #efeff4;
    }
    &:last-child,
    &:nth-child(3n) {
      .line {
        background: #fff;
      }
    }
  }
}
</style>
