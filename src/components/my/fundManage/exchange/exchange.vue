<template>
  <div id="exchange">
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">
    <x-table :cell-bordered="false" style="background-color:#fff;" >
        <thead>
          <tr>
            <th>币种</th>
            <th>余额</th>
            <th>B网汇率</th>
            <th>可兑换数量</th>
          </tr>
        </thead>
        <tbody>
            <tr  v-if="loading">
              <th>{{coins[type]}}</th>
              <th>{{amount}}</th>
              <th>{{rate}}</th>
              <th>{{total}}</th>
              <!-- <router-link :to="'/exchange/'+ amount * rate" tag="th" style="color:blue">兑换</router-link> -->
            </tr>
        </tbody>
      </x-table>


      <group >
      <x-input title="可兑换平台币" disabled :show-clear="false"  placeholder-align="right" v-model="total" class="fontSize"></x-input>
    </group>

    <group>
      <x-number :title="'需要兑换的虚拟币('+coins[type]+')'" :min="min" :max="max" v-model="number" fillable class="fontSize"></x-number>
      <p class="platForm">折算成平台币：  {{realTotal}}</p>
    </group>

    <x-button @click.native="exchange()" type="primary" style="margin-top:30px" class="fontSize"> 提交</x-button>
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
import coinType from '../../../../utils/coin_type'
import {Group, XInput ,XNumber,XButton} from 'vux'
import { XTable } from 'vux'
export default {
  name: 'temp',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      coins:null,
      items:null,
      amount:0,
      rate:{},
      loading:false,
      type:null,
      total:null,
      number:0,
      max:0,
      min:1
      
    }
  },
  components:{
    XTable,
    XInput,
    XNumber,
    Group,
    XButton
  },
  computed:{
    ...mapGetters(['userLoginToken']),
    realTotal(){
      return this.number * this.rate
    }
   
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    getExchangeRate(item){
      API.get(API.getExchangeRate.url+`?coin_type=${this.type}`,{},{}).then(res => {
        if(res.data.code == 200){
          // i.rate = Number(res.data.data)
          this.rate = res.data.data;
          this.getCoin();
          
        } 
      });
    },
    getCoin(){
      API.get(API.getCoinNUm.url+`?session=${this.userLoginToken}&coin_type=${this.type}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.amount = Number(res.data.data).toFixed(8);
          this.max = Number(res.data.data);
          this.total = Number(this.rate)*this.amount;
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
          this.$vux.toast.text(res.data.msg, 'top');
        }
      })
    }
    
  },
  created(){
    this.coins = coinType;
    this.type = this.$route.params.id
    this.getExchangeRate();
    
    
    
  },
  mounted(){
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.platForm{
  font-size:14px;
  padding:5px 15px;

}
#exchange .vux-number-selector{
    height: 30px !important;
}
#exchange .vux-number-input{
    height: 30px !important;
}
.fontSize{
  font-size:14px;
}
</style>
