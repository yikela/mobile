<template>
  <div class="rmbrecharge">
    <a href="javascript:history.back(-1)">返回</a>
    <h4>人民币充值夺宝</h4>
    <p><span>1、</span><span>没有虚拟币包的用户，可以在火币网用人民币购买虚拟币，火币网址：http://huobipro.com，登录此网址需要翻墙，推荐购买翻墙软件：https://www.snshijie.com，启动翻墙后登录火币网购买虚拟币。</span></p>
    <p><span>2、</span><span>人民币如何购买虚拟币，具体教程：https://huobiglobal.zendesk.com/hc/zh-cn      需要翻墙才能查看。</span></p>
    <p><span>3、</span><span>购买成功后，需要将法币划转到"币币账户"才能充值到本平台，在"法币专区"找到"资产"按钮，进入后点击划转。</span></p>
    <p><span>4、</span><span>划转成功后进入https://www.huobipro.com首页，点击“资产按钮”选择“BTC"-“提币”。</span></p>
    <p><span>5、</span><span>在 “提币地址” 栏里输入本平台的充值地址。点击查看</span></p>
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
.rmbrecharge{
  margin-top:-75px;
  padding:10px
}
.rmbrecharge a{
  padding:3px 10px;
  border:1px solid #333;
  color:#000;
  border-radius:3px;
}
.rmbrecharge h4{
  width:100%;
  font-size:16px;
  text-align: center;
  line-height: 40px;
}
.rmbrecharge p{
  font-size:14px;
  line-height: 1.8;
  display: flex;
  flex-flow: row nowrap;
}
</style>
