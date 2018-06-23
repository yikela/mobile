<template>
  <div class="temp">
    <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>币种</th>
            <th>余额</th>
            <th>B网汇率</th>
            <th>可兑换数量</th>
            <th>操作</th>
            
          </tr>
        </thead>
        <tbody>
            <tr v-for="(i,index) in items" :key="index">
              <th>{{coins[i.coin_type]}}</th>
              <th>{{i.amount}}</th>
              <th>{{rate[i.coin_type]}}</th>
              <th>{{i.amount * rate[i.coin_type]}}</th>
              <router-link to="/exchange" tag="th" style="color:blue">兑换</router-link>
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
import coinType from '../../utils/coin_type'
import { XTable } from 'vux'
import { POINT_CONVERSION_COMPRESSED } from 'constants';
export default {
  name: 'temp',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      coins:null,
      items:null,
      rate:{},
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
    getExchangeRate(item){

      for(var i in this.coins){
        ((j)=>{
            API.get(API.getExchangeRate.url+`?coin_type=${j}`,{},{}).then(res => {
              if(res.data.code == 200){
                // i.rate = Number(res.data.data)
                this.rate[j] = res.data.data;
              } 
            });
        })(i)
        
      }



    },
    getCoinList(){
      API.get(API.assetList.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          console.log('coin='+res.data.data);
          this.items = [{
                "coin_type": 1,  // 1代表比特币
                "amount": 1000
          },
          {
                "coin_type": 2,  // 1代表比特币
                "amount": 5000
          }];
        }
      })
    },
    
  },
  created(){
    this.coins = coinType;
    this.getExchangeRate();
    this.getCoinList();
    
    
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
