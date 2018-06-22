<template>
  <div class="myOrder">
    <h4>我的订单</h4>

    <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>图片</th>
            <th>名称</th>
            <th>状态</th>
            <th>次数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in items" :key="index" v-if="items.length > 0">
            <td><img src="../../assets/bit.jpg"></td>
            <th>1</th>
            <th>2</th>
            <th>{{item.buy_count}}</th>
            <th>3</th>
          </tr>
          <!-- <tr v-if="items.length == 0" style="text-align:center;width:100%;">
            暂无订单
          </tr> -->
        </tbody>
      </x-table>

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
  name: 'myOrder',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[]
    }
  },
  components:{
    XTable
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    getList(){
      API.get(API.boughtList.url+`?only_me=yes&session=${this.userLoginToken}`,{},{}).then(res => {
        console.log(res);
        if(res.data.code == 200){
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
td{
  position: relative;
}
tr td img{
  width:30px;
  height:30px;
  top:0;
  bottom:0;
  position: absolute;
  margin:auto;
}
</style>
