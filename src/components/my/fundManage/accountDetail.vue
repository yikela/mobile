<template>
  <div class="accountDetail">
    <p class="backtobalance"><a href="javascript:history.back(-1)">账户余额</a></p>
    <h4>账户明细</h4>
    <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>日期</th>
            <th>类型</th>
            <th>币种</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2018.5.18</td>
            <th>充值</th>
            <th>BTC</th>
            <th>+2</th>
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
  name: 'accountDetail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[],
      coinType:null,
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
.backtobalance{
  width:100%;
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding:0 10px;
}
</style>
