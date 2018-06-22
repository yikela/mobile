<template>
  <div class="myself">
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="hideMyself()" class="xheader">赢夺宝</x-header>
    <div class="avata">

        <router-link to="/login" tag="p" v-if="!userLoginToken" exact  @click.native="hideMyself()">
          <img src="../../assets/avatar.jpg">
          <span>登录/注册</span>
        </router-link>
            
        <p v-if="userLoginToken">
          <img src="../../assets/avatar.jpg">
          <span>个人中心</span>
        </p>
    </div>


      <group  label-align="right">
        <cell title="我的订单"  is-link class="cell" link="/my/order" @click.native="hideMyself()"></cell>
      </group>
      
      

      <group  label-align="right">
        <cell title="资产管理"  is-link  link="/accountBalance" class="cell" @click.native="hideMyself()"></cell>
      </group>


      <group  label-align="right">
        <cell title="邀请有奖"  is-link class="cell" link="/home" @click.native="hideMyself()"></cell>
      </group>

    

      <x-button @click.native="logOut()" v-if="userLoginToken" class="logOut">退出登录</x-button>
  </div>

</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
import { XHeader,Group,Cell,XButton } from 'vux'
export default {
  name: 'myself',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    XHeader,
    Group,
    Cell,
    XButton
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    hideMyself(){
      this.$emit('hideMyself',false)
    },
    logOut(){
      this.userLogout(this.userLoginToken).then(res => {
        if(res.data.code == 200) {
          this.USER_SIGNOUT();
          this.hideMyself();
          this.$router.push('/');
          
        }
      })
    }
  },
  created(){

  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell{
  font-size:14px;
}
.xheader{
  background:#333333;
}
.avata{
  width:100%;
  height:130px;
  background:grey;
   display: flex;
  align-items: center;
  justify-content: center;

}
.avata p{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;

}
.avata p img{
  width:50px;
  height:50px;
  border-radius:50%;
  margin-bottom:10px;
}

.avata p span{
  font-size:14px;
  color:#fff
}
.myself a{
  color:#333;
  font-size:14px
}
.logOut{
  position: fixed;
  bottom:20px;
  left:0;
}
</style>
