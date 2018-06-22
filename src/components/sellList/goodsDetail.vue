<template>
  <div id="goodsdetail">
    <div class="item">
        <img src="../../assets/bit.jpg" alt="">
        <div class="middle">
          <p>标题：{{item.description.name}}</p>
           <div class="progress">
              <span class="bar" id="bar" :style="'width:'+ (item.price - item.remaining)*100/(item.price) + '%'"></span>  
            </div>
            <div class="detail">
              <ul>
                <li>{{item.price - item.remaining}}</li>
                <li>{{item.price}}</li>
                <li>{{ item.remaining}}</li>
                <li>已参与</li>
                <li>总人数</li>
                <li>剩余</li>
              </ul>
            </div>
        </div>

      </div>

      <div>
          <group>
          <x-number :title="'我要购买:'" :min="1" :max="item.remaining" v-model="number" fillable></x-number>
          </group>

          <x-button  type="primary" style="margin-top:20px;" @click.native="buyGoods()"> 购买</x-button>
      </div>
    <div class="resultTab">
      <tab>
        <tab-item selected @on-item-click="onItemClick('allResult')">所有参与记录</tab-item>
      </tab>
      <div class="resultDetail" v-if="!loginAlert">
        <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>日期</th>
            <th>参与人</th>
            <th>购买份数</th>
          </tr>
        </thead>
        <tbody >

          <load-more tip="正在加载" :show-loading="true" v-if="loading"></load-more>
          <tr v-for="(item,index) in allResultDetail" :key="index" v-if="allResultDetail.length != 0 && !loading">
            <td>{{item.created_at | formDate}}</td>
            <td>{{item.username}}</td>
            <td> {{item.buy_count}}</td>
          </tr>
          
          <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe" style="width:100%;text-align:center"  v-if="allResultDetail.length == 0 && !loading"></load-more>
        </tbody>
      </x-table>
      </div>
      <div class="resultDetail"  v-if="loginAlert && !loading" style="text-align:center;padding:20px 0;">
          请登录后查看
      </div>
     
    </div>


 
      <confirm v-model="show"
      :title="'下单成功'"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;font-size:16px;"> 查看我的订单？</p>
      </confirm>

  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
import moment from 'moment'
import { Tab, TabItem , XTable ,XNumber,Group,XInput,XButton} from 'vux'
export default {
  name: 'detail',
  data () {
    return {
      item:{
        "description":{}
      },
      id:null,
      resultType:'allResult',
      allResultDetail:null,
      loginAlert:true,
      number:1,
      show:false,
      loading:true
    }
  },
  components:{
    Tab,
    TabItem ,
    XTable ,
    XNumber,
    Group,
    XInput,
    XButton

  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  filters:{
    formDate(str){
      return moment(str*1000).format('YYYY-MM-DD HH:mm')
    }
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    getDetail(){
      API.get(API.goodDetial.url,{id:this.id},{}).then(res => {
        if(res.data.code == 200){
          this.item = res.data.data; 
          console.log(res.data.data)
        }
      })
    },
    getBoughtInfo(){
      API.get(API.boughtList.url+'?sell_id='+this.id + '&session='+this.userLoginToken,{},{}).then(res => {
        console.log(res)
        if(res.data.code == 200){
            this.allResultDetail = res.data.data;
            this.loginAlert = false;
            this.loading = false 
        }else{
            this.loginAlert = true;
            this.loading = false 
        }
      })
    },
    buyGoods(){
        const form ={
            id:this.id,
            number:this.number,
            session:this.userLoginToken
        }
        
        API.post(API.buyGoods.url,{},form).then(res => {
            if(res.data.code == 200){
               this.show = true;
            }else{
                this.$vux.toast.text(res.data.msg, 'top');
            }
        })
    },
    onItemClick(type){
      this.resultType = type
    },
    onCancel () {
      this.getDetail();
      this.getBoughtInfo()
    },
    onConfirm (msg) {
      this.$router.push('/my/order')
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
  },
  created(){
    
  },
  mounted(){
    this.id = this.$route.params.id;
    this.getDetail();
    this.getBoughtInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#goodsdetail .vux-number-selector{
    height: 30px !important;
}
#goodsdetail .vux-number-input{
    height: 30px !important;
}
#goodsdetail .resultTab{
  margin-top:20px;
}
#goodsdetail .resultDetail{
  width: 100%;
}
#goodsdetail .resultDetail p{
  line-height: 1.3;
  padding:20px;
  font-size:16px;
}
#goodsdetail .item{
  width: 100%;
  padding:10px 15px 20px 15px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 120px;
  border-bottom: 1px dotted #666;
}
#goodsdetail .item img{
  width: 90px;
  height: 90px;
  display: block
}
#goodsdetail .item .middle{
  width: 255px;
  height:90px;
   margin: 0 5px;
}
#goodsdetail .middle p{
  height: 25px;
  line-height: 25px;
  font-size: 14px;
}

#goodsdetail .item button{
  width:70px;
  height: 26px;
  border:1px solid #333;
  font-size:12px;
  border-radius:3px;
  color:#0e90d2;
  background:#fff;

}
#goodsdetail .item button:disabled {
      color:graytext;
      background:#cfcfcf;
      border:1px solid #cfcfcf
    }
#goodsdetail .detail ul{
  display: flex;
  height: 50px;
  margin-top:5px;
  flex-flow: row wrap;

}
#goodsdetail .detail ul li{
  width: 33%;
  font-size:14px;
  line-height: 1;
  color:#666
}

#goodsdetail  .detail ul li:nth-child(1){
    color: #C7163D
  }
#goodsdetail  .detail ul li:nth-child(3){
  color:#4FC8DA
} 
#goodsdetail  .detail ul li:nth-child(2),#goodsdetail  .detail ul li:nth-child(5){
  text-align: center;
}
#goodsdetail  .detail ul li:nth-child(3),#goodsdetail  .detail ul li:nth-child(6){
  text-align: right;
}
#goodsdetail  .middle .progress {  
      height: 15px;
      width:100%;
      margin:2px 0;
      overflow: hidden;  
      background-color: #f7f7f7;  
      background-image: -moz-linear-gradient(top, #999999, #999999);  
      background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#999999), to(#999999));  
      background-image: -webkit-linear-gradient(top, #999999, #999999);  
      background-image: -o-linear-gradient(top, #999999, #999999);  
      background-image: linear-gradient(to bottom, #999999, #999999);  
      background-repeat: repeat-x;  
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff5f5f5', endColorstr='#fff9f9f9', GradientType=0);  
      -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);  
      -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);  
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);  
      -webkit-border-radius: 4px;  
      -moz-border-radius: 4px;  
      border-radius: 4px;  
  }
 #goodsdetail   .progress .bar {  
      width: 0%;  
      height: 100%;  
      color: #ffffff;  
      float: left;  
      font-size: 12px;  
      text-align: center;  
      align-items: center;  
      display: flex;  
      justify-content: center;  
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);  
      background-color: #0e90d2;  
      background-image: -moz-linear-gradient(top, #FA0019, #FA0019);  
      background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#FA0019), to(#FA0019));  
      background-image: -webkit-linear-gradient(top, #FA0019, #FA0019);  
      background-image: -o-linear-gradient(top, #FA0019, #FA0019);  
      background-image: linear-gradient(to bottom, #FA0019, #FA0019);  
      background-repeat: repeat-x;  
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff149bdf', endColorstr='#ff0480be', GradientType=0);  
      -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);  
      -moz-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);  
      box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);  
      -webkit-box-sizing: border-box;  
      -moz-box-sizing: border-box;  
      box-sizing: border-box;  
      -webkit-transition: width 0.6s ease;  
      -moz-transition: width 0.6s ease;  
      -o-transition: width 0.6s ease;  
      transition: width 0.6s ease;  
    } 
</style>
