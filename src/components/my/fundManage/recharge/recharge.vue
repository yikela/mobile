<template>
  <div class="recharge">
    <p class="toRecord"><router-link to="/payment">充值记录</router-link></p>
    <p class="tip">需要1个网络确认才能到账，任何非BTC资产充值到BTC地址后不可找回！</p>

    <group class="groupBorder">
      <cell title="选择币种" :value="type" is-link  @click.native="showPopup=true"></cell>
    </group>
    <popup v-model="showPopup" class="checker-popup">
        <div style="padding:10px 10px 40px 10px;">
          <p style="padding: 5px 5px 5px 2px;color:#888;">币的种类</p>
          <checker v-model="type" default-item-class="type-item" selected-item-class="type-item-selected">
            <checker-item value="BTC" @on-item-click="onItemClick"> BTC </checker-item>
            <!-- <checker-item value="ETH" @on-item-click="onItemClick">  ETH  </checker-item>
            <checker-item value="ETC" @on-item-click="onItemClick">  ETC  </checker-item>
            <checker-item value="BCH" @on-item-click="onItemClick">  BCH  </checker-item> -->
          </checker>
        </div>
      </popup>
      <div style="text-align:center;margin-top:15px;">
        <qrcode :value="ad" type="img"></qrcode>
      </div>
      <div style="width:100%;margin:20px 0;text-align:center">{{ad}}</div>
      <div style="display:flex;justify-content:center;align-items:center">
        <button class="btnCopy">复制多重签名</button>
      </div>
      
    <br>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
import { Checker, CheckerItem, Divider, Group, Cell, Popup, TransferDom,Qrcode } from 'vux'
import coinType from '../../../../utils/coin_type'
export default {
  name: 'recharge',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showPopup:false,
      type:'BTC',
      ad:''
    }
  },
  components:{
    Checker, 
    CheckerItem, 
    Divider, 
    Group, 
    Cell, 
    Popup, 
    TransferDom,
    Qrcode
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    onItemClick(value){
      if (!this.disabled) {
        this.showPopup = false
      };
      console.log(value)
    },
    getAddress(value){
      API.get(API.getRechargeAd.url,{session:this.userLoginToken,type:value},{}).then(res => {
        if(res.data.code == 200){
          this.ad = res.data.data
        }
      })
    }
  },
  created(){

  },
  mounted(){
    this.getAddress(1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.groupBorder{
  /* border-right:1px solid #cfcfcf;
  border-left:1px solid #cfcfcf */
}
.recharge{
  /* padding:20px; */
  position: relative;
}
.toRecord{
  width:100%;
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding:0 10px;
}
.tip{
  color:red;
  font-size:12px;
  padding:20px;
}

.type-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.type-item-selected {
  background-color: #FF3B3B;
  color: #fff;
}
.btnCopy{
  padding:8px 10px;
  border-radius:3px;
  background: #fff;
  box-shadow: none;
  border:1px solid #000
}
</style>
