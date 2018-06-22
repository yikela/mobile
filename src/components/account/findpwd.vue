<template>
  <div id="login">
      <h1>赢夺宝</h1>
      <p>全球首家区块链夺宝平台</p>
      <div class="content"> 
          <x-input title="手机号码:" name="username" placeholder="请输入手机号码" type="text" v-model.trim="phone" class="phone"></x-input>
          <span v-if="sendMsgDisabled" class="sendCode">{{time+'s后获取'}}</span>
          <span v-if="!sendMsgDisabled" class="sendCode" @click="sendCode()">发送验证码</span>
          <x-input title="验证码:" name="messagecode" placeholder="请输入验证码" type="text" v-model.trim="messagecode"></x-input>
          <x-input title="设置密码:" name="password" placeholder="请输入密码" type="password" v-model.trim="password"></x-input>
          <x-input title="确认密码:" name="password" placeholder="请输入密码" type="password" v-model.trim="secPassword"></x-input>
          <x-button mini plain  @click.native="clickRegister() " class="flex-demo">确认</x-button>
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
import { XInput , XButton,Datetime} from 'vux'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      phone:null,
      password:null,
      messagecode:null,
      secPassword:null,
      time: 60, // 发送验证码倒计时
      sendMsgDisabled: false,

    }
  },
  components:{
      XInput,
      XButton,
      Datetime
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    clickRegister(){
      var regPhone = /^1(3|4|5|7|8)\d{9}$/;
      var regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if(!this.phone || !this.messagecode || !this.password || !this.secPassword ){
        this.$vux.toast.text('请填写相关信息', 'top');
        return false
      }
      if (!regPhone.test(this.phone)) {
          this.$vux.toast.text('手机号码格式不正确', 'top');
          return false
      }

      if(this.password !== this.secPassword){
        this.$vux.toast.text('两次密码不一致', 'top');
          return false
      }
      
        const params = {
          "password": this.password,
          "password2": this.secPassword,
          "tel": this.phone,
          "captcha": this.messagecode,
        };
        API.post(API.findpwd.url,{},params).then(res => {
          if(res.data.code == 200){
            this.$router.push('/login')
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
  mounted(){
      console.log(1111)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login{
    margin-top:-20px;
  }
  #login h1, #login p{
    width: 100%;
    text-align: center;
  }
  #login h1 {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
   .content  .phone {
    width:75%;
  }
  .content  span.sendCode{
    width: 25%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border:1px solid #000;
    border-left:none;
    display:block;
    position: absolute;
    top:0;
    right: 0;
    margin:auto
  }
  #login p{
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
  #login .content{
    display: flex;
    flex-flow: column nowrap;
    justify-content:center; 
    width:80%;
    margin: 20px auto;
    position: relative;
  }
  #login .content .vux-x-input ,#login .content .birthday{
    font-size:16px;
    border:1px solid #333333;
    padding:0 5px;
    height:40px;
    line-height: 40px;
    margin-bottom:15px;
    border-radius:3px;
  }
  #login .content .birthday a{
    padding:0;
  }
  #login .content .phone.vux-x-input {
  border-radius:0px;
  }
  #login .content .weui-btn {
    width:100px;
    height: 40px;
    line-height: 40px;
    margin-top:15px;
  }
  #login .content p{
    width:100%;
    height: 40px;
    line-height: 40px;
    padding:0 15px;
  }
  #login .content p .forget{
    float: left;
  }
  #login .content p .register{
    float: right;
  }
</style>
