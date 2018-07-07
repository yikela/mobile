<template>
  <div class="invite">
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">
    <h4>我的邀请</h4>
    <p class="title">我的邀请收益（收益按周结算）</p>
     <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>未兑换</th>
            <th>已兑换</th>
            <th>累积收益</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{detail.remaining}}</td>
            <td>{{detail.total-detail.remaining}}</td>
            <td> {{detail.total}}</td>
          </tr>
          
        </tbody>
      </x-table>

      <group>
        <x-input title="兑现的数量"  placeholder="请输入需要兑换的数量" class="fontSize" v-model="amount" type="number"></x-input>
      </group>

      <x-button @click.native="sub()" type="primary" style="margin-top:30px" class="fontSize">兑换</x-button>
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
import {XTable,Group,XInput,XButton} from 'vux'
export default {
  name: 'invite',
  data () {
    return {
      detail:{
        remaining:200,
        total:500,
      },
      amount:null,
      loading:false
    }
  },
  components:{
    XTable,
    Group,
    XInput,
    XButton
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    getDetail(){
      API.get(API.getRefDetail.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
            this.detail = res.data.data;
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
    sub(){
      var form = {
        session:this.userLoginToken,
        amount:this.amount
      }
      API.post(API.exchangeRefCash.url,{},form).then(res => {
        if(res.data.code == 200){
          this.$vux.toast.text('兑换成功', 'center');
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
    this.getDetail()
  },
  mounted(){

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
.title{
  margin:10px 0;
}
.fontSize{
  font-size:14px;
}
</style>
