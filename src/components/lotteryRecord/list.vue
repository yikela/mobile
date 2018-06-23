<template>
  <div class="winnerList">
  <div id="minirefresh" class="minirefresh-wrap">
                
  <div class="minirefresh-scroll">
    <div class="itemBox">
      <div class="item" v-for="(item,index) in items" :key="index">
        <img src="../../assets/bit.jpg" alt="">
        <div class="middle">
          <p>标题：{{item.description.name}}</p>
          <p><span class="winner">获得者：{{item.winner_username}} </span><span class="total">夺宝：{{item.price}}人次</span></p>
          <p>商品价值：{{item.price}}平台币</p>
          <p>揭晓时间：{{item.updated_at | dateFormat}}</p>
          <p>中奖号码：{{item.calc_result}}</p>
          <router-link class="moreDetail" :to="{name: 'winnerDetail', params: { id: item.id}}">查看详情</router-link>
        </div>
      </div>
      </div>
      </div>
      </div>
  </div>
</template>

<script>
import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css'
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
      items: [],
      minirefresh: null,
      maxDataSize: 30,
      requestDelayTime: 600,
      dataStamp: [],
    }
  },
  components:{
 
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  filters:{
    dateFormat
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    get_list(){
      API.get(API.winners.url,{},{}).then(res => {
        if(res.data.code ==200){
          this.dataStamp =  res.data.data;
        }
      })
    },
    downCallback() {
        var self = this;
        self.get_list();
        console.log('下拉')
        setTimeout(() =>{
          self.item = self.dataStamp;
            self.miniRefresh.endDownLoading(true);
        }, self.requestDelayTime);
    },
    upCallback() {
        var self = this;
        console.log('上拉');
        self.get_list()
        setTimeout(function() {
            self.items = self.items.concat(self.dataStamp);
            self.miniRefresh.endUpLoading(self.items.length >= self.maxDataSize ? true : false);
        }, self.requestDelayTime);
    },
  },
  created(){
    
  },
  mounted(){
    var self = this;
    self.miniRefresh = new MiniRefresh({
      container: '#minirefresh',
      down: {
          callback: self.downCallback
      },
      isScrollBar:false,
      up: {
          isAuto: true,
          offset: 60,
          callback: self.upCallback
      }
  });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.minirefresh-wrap{
  top:75px
}
/* .selllist{
  height: 646px;
  overflow-y: scroll
} */
.item{
  width: 100%;
  padding:10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 120px;
  border-bottom: 1px solid #666
}
.item img{
  width: 90px;
  height: 90px;
  display: block
}
.item .middle{
  width: 280px;
  height:90px;
  position: relative;
   margin: 0 5px;
}
.moreDetail{
  position: absolute;
  bottom:5px;
  right:5px;
  color:skyblue
}
.middle .winner{
  margin-right:20px;
}

.item button{
  width:70px;
  height: 26px;
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
      height: 10px;
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
