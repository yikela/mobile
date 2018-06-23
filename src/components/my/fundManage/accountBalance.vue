<template>
  <div class="accountBalance">
    <p class="toDetail"><router-link to="/accountDetail">账户明细</router-link></p>
    <h4>账户余额</h4>
    <x-table :cell-bordered="false" style="background-color:#fff;">
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
            <th>{{i.amount}}</th>
            <router-link to="/recharge" tag="th" style="color:blue">充值</router-link>
            <router-link to="/" tag="th" style="color:blue">提币</router-link>
            <router-link to="/exchangeList" tag="th" style="color:blue">兑换夺宝币</router-link>
          </tr>
           <tr>
            <td>夺宝币</td>
            <th>{{coins}}</th>
            <th>场外充值</th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </x-table>

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
      items:[
        {
            "coin_type": 1,  // 1代表比特币
            "amount": 10000
        }
      ],
      coinType:null,
      coins:null,
    }
  },
  components:{
    XTable
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    getList(){
      API.get(API.assetList.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          // this.items = res.data.data
        }
      })
    },
    getCoin(){
      API.get(API.getMyCoin.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.coins = res.data.data
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
