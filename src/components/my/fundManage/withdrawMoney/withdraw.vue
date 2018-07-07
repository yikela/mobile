<template>
  <div class="withdraw">
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">

    
    <p class="withdrawTo"><a href="javascript:history.back(-1)" class="back">返回</a><router-link :to="'/withdrawRecord/'+this.typeId" class="detail">提币明细</router-link></p>
     <group class="groupBorder">
      <cell title="币种" :value="type"  class="fontSize"></cell>
    </group>
    <!-- <popup v-model="showPopup" class="checker-popup">
        <div style="padding:10px 10px 40px 10px;">
          <p style="padding: 5px 5px 5px 2px;color:#888;">币的种类</p>
          <checker v-model="type" default-item-class="type-item" selected-item-class="type-item-selected">
            <checker-item value="BTC" @on-item-click="onItemClick"> BTC </checker-item>
             <checker-item value="ETH" @on-item-click="onItemClick">  ETH  </checker-item>
            <checker-item value="ETC" @on-item-click="onItemClick">  ETC  </checker-item>
            <checker-item value="BCH" @on-item-click="onItemClick">  BCH  </checker-item> 
          </checker>
        </div>
      </popup> -->

      <group>
        <x-input title="提现地址" type="text" placeholder="输入您的提现地址" v-model="address" class="fontSize" ></x-input>
      </group>

      <group>
        <x-input title="提币数量" type="text" placeholder="最低提现单位0.01" v-model="number" class="fontSize"></x-input>
        <p style="font-size:12px;color:red;text-align:center">可提余额：{{amount}}{{type}}  提现手续费10%</p>
      </group>

      <group  style="margin-top:20px">
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="phone" class="fontSize"></x-input>
      </group>

      <group>
        <x-input title="验证码" class="weui-vcode fontSize" v-model="captcha">
          <x-button slot="right" type="primary" mini v-if="!sendMsgDisabled" @click.native="sendCode()">发送验证码</x-button>
          <x-button slot="right" type="primary" mini v-if="sendMsgDisabled" disabled>{{time+'s后获取'}}</x-button>
        </x-input>
       </group>

      <group>
        <x-input title="资金密码" type="password" placeholder="" v-model="password" class="fontSize"></x-input>
      </group>

       <x-button @click.native="withdraw()" type="primary" style="margin-top:30px" class="fontSize">兑换</x-button>
       </div>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
import { Checker, CheckerItem, Divider, Group, Cell, Popup, XInput,XButton } from 'vux'
import coinType from '../../../../utils/coin_type'
export default {
  name: 'withdraw',
  data () {
    return {
      showPopup:false,
      type:null,
      address:'',
      captcha:'',
      number:'',
      typeId:null,
      amount:null,
      phone:null,
      time:60,
      password:null,
      sendMsgDisabled:false,
      loading:false

    }
  },
  components:{
    Checker,
    CheckerItem,
    Group,
    Cell,
    Popup,
    XInput,
    XButton
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    onItemClick(value){
      if (!this.disabled) {
        this.showPopup = false
      };
      console.log(value)
    },
    withdraw(){
      var form = {
        session: this.userLoginToken,
        coin_type: this.typeId,
        address: this.address,
        number: this.number,
        captcha:this.captcha,
        pay_password:this.password

      }
      API.post(API.merchantCash.url,{},form).then(res => {
        if(res.data.code == 200){

        }
      })
    },
     getCoin(){
      API.get(API.getCoinNUm.url+`?session=${this.userLoginToken}&coin_type=${this.$route.params.id}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.amount = Number(res.data.data).toFixed(8);
          this.loading = true
        }else if(res.data.code == 401){
          this.$vux.toast.text(res.data.msg, 'top');
          this.USER_SIGNOUT();
          setTimeout(()=>{
            this.$router.push('/login');
          },1000)
        }else{
          this.$vux.toast.text(res.data.msg, 'top');
        }
      })
    },
    sendCode(){
      var regPhone = /^1(3|4|5|7|8)\d{9}$/;
        //针对大陆号码做判断
        
        if (!regPhone.test(this.phone)) {
            this.$vux.toast.text('手机号码格式不正确', 'top');
            return false
        }else{
          API.post(API.sendCode.url,{},{"tel":this.phone}).then(res => {
            if(res.data.code == 200){
              this.send()
            }
          })
          
        }
        
    },
    send() {
      let self = this;
      self.sendMsgDisabled = true;
      let interval = window.setInterval(function() {
      if ((self.time--) <= 0) {
        self.time = 60;
        self.sendMsgDisabled = false;
        window.clearInterval(interval);
      }
      }, 1000);
    }
  },
  created(){
    this.typeId = this.$route.params.id;
    this.type = coinType[this.$route.params.id];
  },
  mounted(){
    this.getCoin()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fontSize{
  font-size:14px;
}
.withdrawTo{
  padding:15px 10px  10px 10px
}
.withdrawTo .back {
  float:left
}

.withdrawTo .detail {
  float:right
}

.tip{
  color:red;
  font-size:12px;
  padding:20px;
}

.type-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.type-item-selected {
  background-color: #FF3B3B;
  color: #fff;
}
</style>
