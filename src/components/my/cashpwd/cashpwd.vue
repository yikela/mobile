<template>

  <div class="cashpwd">
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">
    <group>
      <cell title="是否设置资金密码" :value="isSet" class="fontSize" ></cell>
    </group>
    <group title="设置资金密码" style="margin-top:20px">
      <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="phone" class="fontSize"></x-input>
      <x-input title="验证码" class="weui-vcode fontSize" v-model="captcha">
        <x-button slot="right" type="primary" mini v-if="!sendMsgDisabled" @click.native="sendCode()">发送验证码</x-button>
        <x-button slot="right" type="primary" mini v-if="sendMsgDisabled" disabled>{{time+'s后获取'}}</x-button>
      </x-input>
       <x-input title="密码" name="password" placeholder="请输入资金密码" type="password" class="fontSize" v-model="password"></x-input>
    </group>
    <x-button  type="primary" style="border-radius:99px;margin-top:20px"   @click.native="setCashPwd() " class="fontSize">设置</x-button>
    
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
import { Group,XInput,XButton,Cell } from 'vux'
export default {
  name: 'cashpwd',
  data () {
    return {
      isSet:null,
      captcha:null,
      password:null,
      phone:null,
      time:60,
      sendMsgDisabled:false,
      loading:false
    }
  },
  components:{
    Cell,
    Group,
    XInput,
    XButton
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    isSetCashPwd(){
      API.get(API.isSetCashPwd.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.isSet = '是';
          this.loading = true;
        }else if(res.data.code == 401){
          this.$vux.toast.text(res.data.msg, 'top');
          this.USER_SIGNOUT();
          setTimeout(()=>{
            this.$router.push('/login');
          },1000)
        }else{
          this.isSet = '否';
          this.loading = true;
          // this.$vux.toast.text(res.data.msg, 'top');
        }

      })
    },
    setCashPwd(){
      var form = {
          "session":this.userLoginToken,
          "captcha": this.captcha,
          "password": this.password
      }
      API.post(API.setCashPwd.url,{},form).then(res => {
        if(res.data.code == 200){
          this.isSetCashPwd();
          this.captcha = '';
          this.password = '';
          this.$vux.toast.text('设置成功', 'top');
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

  },
  mounted(){
    this.isSetCashPwd()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fontSize{
  font-size:14px;
}
</style>
