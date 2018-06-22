<template>
  <div class="detail">
    <div class="item">
        <img src="../../assets/bit.jpg" alt="">
        <div class="middle">
          <p>{{item.description['round no']}}期  {{item.description.name}}夺宝</p>
          <p><span class="winner">获得者：{{item.winner_username}} </span><span class="total">夺宝：{{item.price}}人次</span></p>
          <p>商品价值：{{item.price}}平台币</p>
          <p>揭晓时间：{{item.updated_at | formDate}}</p>
          <p>中奖号码：{{item.calc_result}}</p>
        </div>
    </div>
    <div class="resultTab">
      <tab>
        <tab-item selected @on-item-click="onItemClick('allResult')">所有参与记录</tab-item>
        <tab-item @on-item-click="onItemClick('calcResult')">计算结果</tab-item>
      </tab>
      <div class="resultDetail" v-if="resultType === 'allResult' && !loginAlert">
        <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>日期</th>
            <th>参与人</th>
            <th>计算结果</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in allResultDetail" :key="index" v-if="allResultDetail.length != 0">
            <td>{{item.created_at | formDate}}</td>
            <td>{{item.username}}</td>
            <td> {{item.buy_count}}</td>
          </tr>
          <tr  v-if="allResultDetail.length == 0" style="text-align:center">
            暂无数据
          </tr>
        </tbody>
      </x-table>
      </div>
      <div class="resultDetail"  v-if="resultType === 'allResult' && loginAlert" style="text-align:center;padding:20px 0;">
          请登录后查看
      </div>
      <div class="resultDetail" v-if="resultType === 'calcResult'">
        <p>计算规则：以夺宝结束后第一个以太坊区块的hash值作为随机数据结果</p>
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
import moment from 'moment'
import { Tab, TabItem , XTable } from 'vux'
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
    }
  },
  components:{
    Tab,
    TabItem ,
     XTable 

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
            this.loginAlert = false 
        }else{
            this.loginAlert = true
        }
      })
    },
    onItemClick(type){
      this.resultType = type
    }
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
<style scoped>
.resultTab{
  margin-top:20px;
}
.resultDetail{
  width: 100%;
  font-size:14px;
}
.resultDetail p{
  line-height: 1.3;
  padding:20px;
  
}
.item{
  width: 100%;
  padding:10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100px;
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
</style>
