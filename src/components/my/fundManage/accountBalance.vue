<template>
  <div class="accountBalance">
    <!-- <p class="toDetail"><router-link to="/accountDetail">账户明细</router-link></p> -->
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">

    
    <h4>账户余额</h4>
    <x-table :cell-bordered="false" style="background-color:#fff;" v-if="loading">
        <thead>
          <tr>
            <th>币种</th>
            <th>余额</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,index) in items" :key="index">
            <td>{{coinType[i.coin_type]}}</td>
            <th>{{i.amount | toFixed}}</th>
            <router-link :to="'/recharge/'+i.coin_type" tag="th" style="color:blue" exact>充值</router-link>
            <router-link :to="'/withdraw/'+i.coin_type" tag="th" style="color:blue" exact>提币</router-link>
            <router-link :to="'/exchange/'+i.coin_type" tag="th" style="color:blue" exact>兑换夺宝币</router-link>
          </tr>
           <tr v-if="coins">
            <th>夺宝币</th>
            <th>{{coins}}</th>
            <router-link to="/outside/recharge" tag="th" style="color:blue" exact>场外充值</router-link>
            <router-link to="/outside/transfer" tag="th" style="color:blue" exact>场外转账</router-link>
            <th></th>
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
import { XTable } from 'vux'
import coinType from '../../../utils/coin_type'
export default {
  name: 'accountBalance',
  data () {
    return {
      items:[],
      coinType:null,
      coins:null,
      loading:false
    }
  },
  components:{
    XTable
  },
  filters:{
    toFixed(str){
      return Number(str).toFixed(8)
    }
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    getList(){
      API.get(API.assetList.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
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
    },
    getCoin(){
      API.get(API.getMyCoin.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.coins = res.data.data
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
    this.coinType = coinType
  },  
  mounted(){
    
    this.getList();
    this.getCoin();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4{
  width: 100%;
  text-align: center;
  height:40px;
  line-height: 40px;
  margin:5px 0;
}
td{
  position: relative;
}
tr td img{
  width:30px;
  height:30px;
  top:0;
  bottom:0;
  position: absolute;
  margin:auto;
}
.toDetail{
  width:100%;
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding:0 10px;
}
</style>
