<template>
  <div class="outrecharge">
    <a href="javascript:history.back(-1)">返回</a>
    <h4>如何场外充值</h4>
    <p>觉得去交易平台充值很麻烦的用户，可以私下找平台认证的商家进行购买“夺宝币”。</p>
    <p style="margin-top:10px;">场外交易流程：</p>
    <p>1、提供充值地址给卖家</p>
    <p>2、协商数量价格</p>
    <p>3、打款给卖家</p>
    <p>4、卖家确认打币</p>
    <p style="margin-top:20px;">
      <router-link to="/outside/recharge" class="toRecharge"  tag="span">查看场外充值地址</router-link>
    </p>
    
    
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

export default {
  name: 'howtorecharge',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
  },
  created(){

  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outrecharge{
  margin-top:-75px;
  padding:10px
}
.outrecharge a{
  padding:3px 10px;
  border:1px solid #333;
  color:#000;
  border-radius:3px;
}
.outrecharge h4{
  width:100%;
  font-size:16px;
  text-align: center;
  line-height: 40px;
}
.outrecharge p{
  font-size:14px;
  line-height: 1.8
}
.toRecharge{
  padding:3px 10px;
  border:1px solid #333;
  color:#000;
  border-radius:3px;
}
</style>
