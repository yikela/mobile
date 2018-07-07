<template>
  <div id="login">
      <a href="javascript:history.back(-1)">返回</a>
      <h1>赢夺宝</h1>
      <p>全球首家区块链夺宝平台</p>
      <div class="content"> 
          <x-input title="手机号码:" name="username" placeholder="请输入手机号码" type="text" v-model="username"></x-input>
          <x-input title="密码:" name="password" placeholder="请输入密码" type="password" v-model="password"></x-input>
          <x-button mini plain  @click.native="clickLogin() " class="flex-demo"> 登录</x-button>
          <p>
            <router-link to="/findpwd"  tag="span" class="forget">忘记密码</router-link>
            <router-link to="/register"  tag="span" class="register">注册</router-link>
          </p>
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
import { XInput , XButton} from 'vux'
import { setTimeout } from 'timers';
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username:null,
      password:null,
    }
  },
  components:{
      XInput,
      XButton
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','']),
    ...mapActions(['userLogout', 'userLogin']),
    clickLogin(){
      var regPhone = /^1(3|4|5|7|8)\d{9}$/;
      if (!this.username || !this.password) {
          this.$vux.toast.text('请填写相关信息', 'top');
          return false
      }
        // if (!regPhone.test(this.username)) {
        //     this.$vux.toast.text('手机号码格式不正确', 'top');
        //     return false
        // }
        const params = {
            username:this.username,
            password:this.password
        };
        this.userLogin(params).then(res => {
            if(res.data.code == 200){
              this.USER_SIGNIN(res.data.session);
              this.$router.replace('/');
            }else{
              this.$toast(res.data.msg);
            }
        })
    }
  },
  mounted(){
      console.log(this.$router)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login{
    padding-top:50px;
  }
  #login a{
    position: fixed;
    top:10px;
    left:10px;
    padding:3px 10px;
    border:1px solid #333;
    color:#000;
    border-radius:3px;
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
    margin:50px auto;
  }
  #login .content .vux-x-input {
    font-size:16px;
    border:1px solid #333333;
    padding:0 5px;
    height:40px;
    line-height: 40px;
    margin-bottom:15px;
    border-radius:3px;
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
