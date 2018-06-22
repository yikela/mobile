<template>
    <x-header :left-options="{showBack: false}" id="xHeader">
      
      <p @click="showMyself()"><img src="../../../static/images/mine.png"></p>
        <!-- <p v-if="!userLoginToken">
            <router-link to="/login" exact>
                <img src="../../../static/images/mine.png">
                <span>登录/注册</span>
            </router-link>
            
        </p>
        <p v-if="userLoginToken">
          <router-link to="/home" exact>
            <img src="../../../static/images/mine.png">
            <span>个人中心</span>
          </router-link>
        </p>-->
        {{title}} 
    </x-header>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
import { XHeader } from 'vux'
export default {
  props:['title'],
  name: 'xheader',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
      XHeader
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    showMyself(){
      this.$emit('showMyself', true);
    }
  },
  created(){

  },
  mounted(){
      console.log(1111111111)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #xHeader{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background:#333333;
    z-index:99
  }
    #xHeader p {
        position: absolute;
        left: 10px;
        top:0;
        bottom:0;
        margin:auto;
        display: flex;
        color:#fff;
        flex-flow: row nowrap;
        align-items: center;
        font-size: 12px;
    }
    #xHeader p  img{
      width:20px;
      height: 20px;
      margin-right: 5px;
    }
</style>
