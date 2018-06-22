<template>
  <div class="guide">
    <h3>常见问题解答：</h3>
    <p><router-link to="/guide/rmbRecharge">一、人民币如何充值夺宝？</router-link></p>
    <p><router-link to="/guide/treasure">二、如何夺宝？</router-link></p>
    <p><router-link to="/guide/outRecharge">三、如何场外充值？</router-link></p>
    <p><router-link to="/guide/winningRules">四、中奖规则？</router-link></p>
    <p><router-link to="/guide/question">五、问题反馈</router-link></p>
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
  .guide {
    width: 100%;
    padding:30px 15px 0;
    font-size: 14px;
  }
  .guide h3 {
    height: 40px;
    line-height: 40px;
    color: #000
  }
  .guide p{
    margin:10px 0;
    font-size: 14px;
  }
  .guide a{
    color:#000
  }
</style>
