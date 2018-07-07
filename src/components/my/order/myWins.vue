<template>
  <div class="myWins">
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">
     <p class="to"><a href="javascript:history.back(-1)" class="back">返回</a></p>
    <h4>中奖订单</h4>
    <x-table :cell-bordered="false" style="background-color:#fff;" >
        <thead>
          <tr>
            <th>图片</th>
            <th>信息</th>
            <th>价值</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(i,index) in items" :key="index">
              <th><img src="../../../assets/bit.jpg"></th>
             <th>{{i.description.name}}</th>
              <th>{{i.price}}</th>
              <th>{{i.state == 4 ? '已到账': '未到账'}}</th>
              <!-- <router-link :to="'/exchange/'+ amount * rate" tag="th" style="color:blue">兑换</router-link> -->
            </tr>
        </tbody>
      </x-table>
      <p class="tip">温馨提示：到账部分平台已收取10%的平台使用费</p>
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
import { XTable } from 'vux'
export default {
  name: 'myWins',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:null,
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
    get_list(){
      API.get(API.winners.url+`?session=${this.userLoginToken}&state=3`,{},{}).then(res => {
        if(res.data.code ==200){
          this.items =  res.data.data;
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
  },
  created(){
    this.get_list()
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th{
  position: relative;
}
tr th img{
  width:30px;
  height:30px;
  top:0;
  bottom:0;
  position: absolute;
  margin:auto;
}
.tip{
  color:red;
  font-size:12px;
  height: 30px;
  line-height: 30px;
  margin:10px 0;
  padding-left:20px;
}
h4{
  width: 100%;
  text-align: center;
  height:20px;
  line-height: 20px;
  margin-bottom:5px;
}
.to{
  padding-left:20px;
  height: 40px;
  line-height: 40px;
}
.to .back {
  float:left
}
</style>
