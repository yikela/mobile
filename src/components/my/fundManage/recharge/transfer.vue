<template>
  <div class="transferOutside">

    <p class="back"><a href="javascript:history.back(-1)" class="back">返回</a></p>
      <group>
        <x-input title="转账地址" type="text" placeholder="输入您的转账地址" v-model="address" class="fontSize" ></x-input>
      </group>

      <group>
        <x-input title="转账数量" type="text" placeholder="请输入转账数量" v-model="number" class="fontSize"></x-input>
      </group>

      <x-button @click.native="sub()" type="primary" style="margin-top:30px" class="fontSize">转账</x-button>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
import { Checker, CheckerItem, Divider, Group, Cell, Popup, XInput,XButton } from 'vux'
import coinType from '../../../../utils/coin_type'
export default {
  name: 'withdraw',
  data () {
    return {
      address:null,
      number:1
    }
  },
  components:{
    Checker,
    CheckerItem,
    Group,
    Cell,
    Popup,
    XInput,
    XButton
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    sub(){
      if(!this.address){
        this.$vux.toast.text('请输入转账地址', 'center');
　　　　　return false;
      }
      if (!(/(^[1-9]\d*$)/.test(this.number))) { 
          this.$vux.toast.text('请输入正整数', 'center');
　　　　　  return false; 
　　　　}

      var form = {
        session:this.userLoginToken,
        address:this.address,
        amount:this.number
      }
      
      API.post(API.getOtcTransfer.url,{},form).then(res => {
        if(res.data.code == 200){
          this.$vux.toast.text('转账成功', 'center');
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
.fontSize{
  font-size:14px;
}
.transferOutside{
  padding:15px 0;
}

.transferOutside .back {
  padding-left:5px
}

.transferOutside .detail {
  float:right
}

</style>
