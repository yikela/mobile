<template>
  <div class="howtoTreasure">
    <a href="javascript:history.back(-1)">返回</a>
    <h4>如何夺宝</h4>
    <p><span>1、</span><span>完成虚拟币充值，然后兑换平台币</span></p>
    <p><span>2、</span><span>选择需要购买的虚拟币商品，点击“立即购买”</span></p>
    <p><span>3、</span><span>选择需要购买的份数，购买的份数越多，中奖率越高。</span></p>
    <p><span>4、</span><span>完成购买，等待开奖。</span></p>
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
  name: 'howtoTreasure',
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
.howtoTreasure{
  margin-top:-75px;
  padding:10px
}
.howtoTreasure a{
  padding:3px 10px;
  border:1px solid #333;
  color:#000;
  border-radius:3px;
}
.howtoTreasure h4{
  width:100%;
  font-size:16px;
  text-align: center;
  line-height: 40px;
}
.howtoTreasure p{
  font-size:14px;
  line-height: 1.8;
  display: flex;
  flex-flow: row nowrap;
}
</style>
