<template>
  <div class="withdraw">
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">
    <p class="toRecord"><a href="javascript:history.back(-1)">返回</a></p>
    <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>提币时间</th>
            <th>提币数量</th>
            <th>提币地址</th>
            <th>提币状态</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,index) in items" :key="index">
            <td>{{i.created_at *1000 | dateFormat}}</td>
            <th>{{i.amount}}{{coinType[i.coin_type]}}</th>
            <th>{{111111}}</th>
            <th>{{i.state==1?'已提币':'进行中'}}</th>
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
  name: 'withdraw',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[],
      lastId:null,
      coinType:null,
      typeId:null,
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
      API.get(API.merchantCashHistory.url+`?session=${this.userLoginToken}&coin_type=${this.typeId}`,{},{}).then(res => {
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
    dateFormat
  },
  created(){
    this.coinType = coinType;
    this.typeId = this.$route.params.id
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
