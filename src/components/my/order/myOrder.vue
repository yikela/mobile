<template>
  <div class="myOrder">

    <loading :show="!loading" text=""></loading>
    <div v-if="loading">
    <p class="toOrder"><router-link to="/my/win">中奖订单</router-link></p>
    <h4>我的订单</h4>
    <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>图片</th>
            <th>名称</th>
            <th>次数</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in items" :key="index" v-if="items.length > 0">
            <th><img src="../../../assets/bit.jpg"></th>
            <th>{{item.description.name}}</th>
            <th>{{item.buy_count}}</th>
            <th>{{sellState[item.state]}}</th>
            <router-link v-if="sellState[item.state] == 3" tag="th" :to="'/winner/detail/'+item.id">详情</router-link>
            <router-link v-else tag="th" :to="'/my/orderNumber/'+item.id">查看夺宝码</router-link>
          </tr>
        </tbody>
      </x-table>
      <p v-if="tempItems.length == 10 & loading" class="more"  @click="getList()">
            加载更多
      </p>
      <p v-if="tempItems.length < 10 & loading" class="more" style="color:#999">
        已全部加载
      </p>
        <p v-if="items.length == 0 & loading" class="more">
        暂无订单
      </p>
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
import sell_state from '../../../utils/sell_state'
export default {
  name: 'myOrder',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[],
      loading:false,
      sellState:null,
      tempItems:[],
      lastId:null
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
      let url = null;
      if(this.lastId){
        url = API.boughtList.url + `?cursor_id=${this.lastId}&only_me=yes&session=${this.userLoginToken}`;
      }else{
        url = API.boughtList.url+`?only_me=yes&session=${this.userLoginToken}`
      }
      API.get(url,{},{}).then(res => {
        if(res.data.code == 200){
          if(this.lastId){
              this.items = this.items.concat(res.data.data);
          }else{
            this.items = res.data.data;
          }
          
          this.tempItems = res.data.data;
          this.lastId = res.data.data[res.data.data.length -1].id;
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
  created(){  
    this.sellState = sell_state
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
  height:20px;
  line-height: 20px;
  margin-bottom:5px;
}
td{
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
.toOrder{
  width:100%;
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding:0 10px;
}
p.more{
  text-align:center;
  width:100%;
  margin-top:20px
}
</style>
