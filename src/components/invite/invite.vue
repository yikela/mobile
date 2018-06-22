<template>
  <div class="invite">
    <img src="../../assets/invitebanner.png" alt="">
    <p>成功邀请小伙伴加入夺宝，被邀请人成功兑换100个夺宝币以上（含），我们将返还1%的夺宝币到您的账户，赶紧去邀请好友一起来玩吧！</p>
    <p>复制以下内容去邀请吧：我在币夺宝1元夺取到了1个比特币（BTC），你也赶紧来试试手气吧!  区块链夺宝平台等你来拿奖www.duobaobi.com/ID1123132，公平公正，所有开奖机制均在链上运行</p>
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
  name: 'temp',
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
    ...mapMutations(['USER_SIGNIN']),
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
  .invite img{
    width: 100%;
    display: block;
    height: 170px;
  }
  .invite p{
    margin:10px 0 20px 0;
    padding:0 10px;
    line-height: 1.3;
    font-size: 14px;
  }
</style>
