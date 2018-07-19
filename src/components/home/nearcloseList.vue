<template>
    <div class="items">
    <h4>即将开奖</h4>
    <div class="itemBox">
      <div class="item" v-for="(item,index) in items" :key="index">
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
                <li>总人次</li>
                <li>剩余</li>
              </ul>
            </div>
        </div>
        <router-link class="buy" :disabled="item.remaining == 0 ? true:false"  tag="button" :to="{name: 'goodsDetail', params: { id: item.id}}">我要购买</router-link>

      </div>
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

export default {
  name: 'temp',
  data () {
    return {
      items:null,
    }
  },
  components:{

  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    getList(){
      API.get(API.nearClose.url,{},{}).then(res => {
        if(res.data.code ==200){
          this.items = res.data.data
        }
      })
    }
  },
  created(){

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
.item{
  width: 100%;
  padding:10px 10px 10px 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100px;
  border-bottom: 1px dotted #666
}
.item img{
  width: 70px;
  height: 70px;
 
  display: block
}
.item .middle{
  width: 210px;
  height:70px;
   margin: 0 5px;
}
.middle p{
  height: 25px;
  line-height: 25px;
}

.item button{
  width:60px;
  height: 24px;
  border:1px solid #333;
  font-size:12px;
  border-radius:3px;
  color:#0e90d2;
  background:#fff;

}
.item button:disabled {
      color:graytext;
      background:#cfcfcf;
      border:1px solid #cfcfcf
    }
.detail ul{
  display: flex;
  height: 30px;
  margin-top:5px;
  flex-flow: row wrap;

}
.detail ul li{
  width: 33%;
  font-size:10px;
  line-height: 1;
  color:#666
}

.detail ul li:nth-child(1){
    color: #C7163D
  }
.detail ul li:nth-child(3){
  color:#4FC8DA
} 
.detail ul li:nth-child(2),.detail ul li:nth-child(5){
  text-align: center;
}
.detail ul li:nth-child(3),.detail ul li:nth-child(6){
  text-align: right;
}
.middle .progress {  
      height: 5px;
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
  .progress .bar {  
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
