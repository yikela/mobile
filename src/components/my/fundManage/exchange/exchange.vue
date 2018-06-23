<template>
  <div id="exchange">
    <group>
      <x-input title="可兑换"  novalidate :show-clear="false"  placeholder-align="right" v-model="amount"></x-input>
    </group>

    <group>
      <x-number title="兑换平台币数量" :min="1" :max="amount" v-model="number" fillable></x-number>
    </group>

    <x-button @click.native="exchange()" type="primary" style="margin-top:30px"> 提交</x-button>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
import {Group, XInput ,XNumber,XButton} from 'vux'
export default {
  name: 'exchange',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      amount:0,
      number:0,
      type:1,

    }
  },
  components:{
    XInput,
    XNumber,
    Group,
    XButton
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    exchange(){
      var form = {
        session:this.userLoginToken,
        amount:this.number,
        coin_type:this.type
      };
      console.log(form)

      API.post(API.exchangeGameCoin.url,{},form).then(res => {
        if(res.data.code == 200){
            this.$vux.toast.text('兑换成功', 'top');
        }else{
          this.$vux.toast.text(res.data.msg.zh, 'top');
        }
      })
    }
  },
  created(){
    this.amount = Number(this.$route.query.amount) ;
    this.type = Number(this.$route.query.type)
    
  },
  mounted(){
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
#exchange .vux-number-selector{
    height: 30px !important;
}
#exchange .vux-number-input{
    height: 30px !important;
}
</style>
