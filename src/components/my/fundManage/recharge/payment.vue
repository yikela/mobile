<template>
  <div class="recharge">
   
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">
    <p class="toRecord"><a href="javascript:history.back(-1)">返回</a></p>
    <x-table :cell-bordered="false" style="background-color:#fff;"  v-if="loading">
        <thead>
          <tr>
            <th>充值时间</th>
            <th>充值虚拟币数量</th>
            <th>充值游戏币数量</th>
            <th>充值汇率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,index) in items" :key="index">
            <td>{{i.created_at *1000 | dateFormat}}</td>
            <th>{{i.amount | toFixed}}{{coinType[i.coin_type]}}</th>
            <th>{{Number(i.token_amount).toFixed(2)}}</th>
            <th>{{Number(i.rate).toFixed(2)}}</th>
          </tr>
        </tbody>
      </x-table>
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
import { XTable,dateFormat } from 'vux'
import coinType from '../../../../utils/coin_type'
export default {
  name: 'recharge',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[],
      lastId:null,
      coinType:null,
      loading:false
    }
  },
  components:{
    XTable
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    getList(){
      API.get(API.getPayment.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.items = res.data.data;
          this.loading = true
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
  filters:{
    dateFormat,
    toFixed(str){
      return Number(str).toFixed(8)
    }
  },
  created(){
    this.coinType = coinType
  },
  mounted(){
    this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toRecord{
  width:100%;
  height: 40px;
  line-height: 40px;
  padding:0 10px;
}
</style>
