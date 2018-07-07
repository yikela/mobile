<template>
<div class='questionList'>
  <loading :show="!loading" text=""></loading>
    <div v-if="loading">
  <a href="javascript:history.back(-1)" class="back">返回</a>
  <div class="issueList" v-if="loading">
    <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>问题编号</th>
            <th>问题类型</th>
            <th>进度</th>
            <th>操作</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,index) in items" :key="index">
            <td>{{i.id}}</td>
            <td>{{stateType[i.type_id]}}</td>
            <td>{{i.state ==1 ? '进行中':'已解决'}}</td>
            <router-link :to="'/question/detail/'+i.id" tag="td">查看</router-link>
          </tr>
        </tbody>
      </x-table>
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
import { XTable} from 'vux'
import stateType from '../../../utils/questionState.js'
export default {
  name: 'issueList',
  data () {
    return {
      items:null,
      loading:false,
      stateType:null
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
    getIssue(item){
      API.get(API.getIssueList.url+`?session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.items = res.data.data;
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
      });
    },
  },
  created(){
    this.stateType = stateType
  },
  mounted(){
    this.getIssue()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.questionList{
  padding-top:20px;
}
.questionList a.back{
  padding:3px 10px;
  border:1px solid #333;
  color:#000;
  border-radius:3px;
}
.issueList{
  padding-top:30px;
}
</style>
