<template>
    <div class="items">
      <p class="itemTitle">
       <span class="title">最新上架</span>
        <span class="more">更多··· </span>
      </p>
      <div class="itemList">
        <div class="item" v-for="(item,index) in items" :key="index">
            <div class="price">
              <h4> 1BTC</h4>
              <p>价值{{item.price}}</p>
            </div>
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
            <button class="buy" :disabled="item.remaining == 0 ? true:false">立即购买</button>
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
      API.get(API.newsgoods.url,{},{}).then(res => {
        if(res.data.code ==200){
          this.items = res.data.data.slice(0,6)
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
  .items .itemTitle {
    height: 30px;
    line-height: 30px;
    text-align: center;
    background:#666666;
    padding:0 10px;
    color: #fff;
  }
  .itemTitle span.more{
    float: right;
  }
  .itemList{
    width:100%;
    display: flex;
    flex-flow: row wrap;
    height: 260px;
  }
  .itemList .item{
    width: 33.3%;
    display: flex;
    flex-flow: column nowrap;
    padding:5px;

  }
  .itemList .item{
    height: 130px;
    border-right: 2px solid #333;
    border-bottom: 2px solid #333
  }
  .itemList .item:nth-child(3),.itemList .item:nth-child(6){
    border-right:none
  }
  .itemList .item .price{
    height: 40%;
    text-align:center;
  }
  .price p{
    font-size:12px;
    margin-bottom:3px;
  }
  .detail{
    height: 35%;
  }
  .detail ul{
    display: flex;
    height: 100%;
    clear:both;
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
  .buy{
    width:80%;
    height:20px;
    text-align: center;
    background: #C7163D;
    border:none;
    margin:auto;
    color:#fff;
    border-radius:3px;
    font-size:12px
  }
  .buy:disabled {
      color: graytext;
      background: #cfcfcf
    }
.progress {  
      height: 3%;
      width:100%;
      margin:2px 0;
      overflow: hidden;  
      background-color: #f7f7f7;  
      background-image: -moz-linear-gradient(top, #f5f5f5, #f9f9f9);  
      background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#f5f5f5), to(#f9f9f9));  
      background-image: -webkit-linear-gradient(top, #f5f5f5, #f9f9f9);  
      background-image: -o-linear-gradient(top, #f5f5f5, #f9f9f9);  
      background-image: linear-gradient(to bottom, #f5f5f5, #f9f9f9);  
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
      background-image: -moz-linear-gradient(top, #C7163D, #C7163D);  
      background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#C7163D), to(#C7163D));  
      background-image: -webkit-linear-gradient(top, #C7163D, #C7163D);  
      background-image: -o-linear-gradient(top, #C7163D, #C7163D);  
      background-image: linear-gradient(to bottom, #C7163D, #C7163D);  
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
