<template>
  <div class="myNumber">
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">
    <p class="toOrder"><router-link to="/my/order">订单详情</router-link></p>
    <p class="title">订单夺宝码</p>
    <p class="detail"><span>购买时间：{{1}}</span><span>购买次数：{{1}}</span></p>
    <p class="number">夺宝码：<span v-for="(i,index) in numbers" :key="index" class="num">{{i}},</span></p> 
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
      id:null,
      item:null,
      numbers:[],
      loading:false
    }
  },
  components:{

  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    getDetail(){
      API.get(API.goodDetial.url,{id:this.id},{}).then(res => {
        if(res.data.code == 200){
          this.item = res.data.data;
          this.loading = true
          // let start = res.data.data.start;
          // let end = res.data.data.next_start;
          let start = 1;
          let end = 15;
          for(var i = start;i<=end;i++){
            this.numbers.concat(i)
          }
        }
      })
    },
    aa(){
      let start = 1;
          let end = 15;
          for(var i = start;i<=end;i++){
            this.numbers.push(i)
          }
    }
  },
  created(){
    this.id = this.$route.params.id
  },
  mounted(){
    this.getDetail();
    this.aa()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toOrder{
  width:100%;
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding:0 10px;
}
.myNumber{
  padding:10px 20px;
}
  .myNumber .title{
    height:40px;
    line-height: 40px;
    text-align: center
  }
  .myNumber .detail{
    display: flex;
    flex-flow:row nowrap;
    align-items: center;
    justify-content: center;
    height:40px;
  }
  .myNumber .detail span{
    flex:1
  }
  .num{
    padding:0 5px;
  }
</style>
