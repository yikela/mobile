<template>
  <div class="recharge">
    <p class="toRecord"><a href="javascript:history.back(-1)">返回</a></p>

    <x-table :cell-bordered="false" style="background-color:#fff;">
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
            <td>{{i.created_at | formDate}}</td>
            <th>{{i.amount}}{{coinType[i.coin_type]}}</th>
            <th>{{Number(i.token_amount).toFixed(2)}}</th>
            <th>{{Number(i.rate).toFixed(2)}}</th>
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
import moment from 'moment'
import coinType from '../../utils/coin_type'
export default {
  name: 'recharge',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[],
      lastId:null,
      coinType:null
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
      API.get(API.getPayment.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.items = res.data.data
        } 
      })
    }
  },
  filters:{
    formDate(str){
      return moment(str*1000).format('YYYY-MM-DD HH:mm')
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
