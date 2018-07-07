<template>
<div>
  <loading :show="!loading" text=""></loading>
    <div v-if="loading">
      <div class="questionDetail">
          <p class="back"><a href="javascript:history.back(-1)" >返回</a></p>
          <p class="p"><span>提问时间：{{item.created_at * 1000 | dateFormat}}</span> </p>
          <p class="p"><span>问题编号：{{item.id}}</span> </p>
          <p class="p"><span>问题类型：</span>{{types[item.type_id]}}</p>
          <p class="p"><span>问题状态：</span>{{item.state == 1 ? '进行中':'解决'}}</p>
          <p class="p"><span>问题描述：</span>{{item.body}}</p>
          <p class="p" v-for="(i,index) in comItems" :key="index">
             <span>客服回复：</span>
              <span class="box">{{i.body}}</span>
              <span>{{i.created_at * 1000 | dateFormat}}</span>
           </p>
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
import { Checker, CheckerItem, Group, Cell, Popup, XInput,XButton,XTextarea ,dateFormat} from 'vux'
import stateType from '../../../utils/questionState.js'
const url  = require('../../../utils/issue_image.js')
export default {
  name: 'questionDetail',
  data () {
    return {
      id:null,
      item:null,
      types:null,
      comItems:null,
      loading:false,
      baseUrl:null
    }
  },
  components:{
      Checker,
    CheckerItem,
    Group,
    Cell,
    Popup,
    XInput,
    XButton,
    XTextarea,
  },
   filters:{
    dateFormat
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    getIssueDetail(){
      API.get(API.getIssueInfo.url+`?issue_id=${this.$route.params.id}&session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.item = res.data.data;
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
    getComment(){
      API.get(API.getCommitList.url+ `?issue_id=${this.$route.params.id}&session=${this.userLoginToken}`,{},{}).then(res => {
        if(res.data.code == 200){
          this.comItems = res.data.data
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
    this.types = stateType
    this.id = this.$route.params.id
    this.baseUrl = url.urlBase
  },
  mounted(){
      this.getIssueDetail();
      this.getComment();
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.questionDetail{
  padding:20px;
}
.questionDetail a{
  padding:3px 10px;
  border:1px solid #333;
  color:#000;
  border-radius:3px;
}
.questionDetail p.p{
  height:30px;
  line-height: 30px;
  font-size:14px;
  /* padding:0 20px; */
}
.questionDetail p span{
  margin-right:5px;
}
.myself{
    height:30px;
  line-height: 30px;
  font-size:14px;
  margin:10px 0;
}
.myself span{
  float: left;
  margin-right:5px;
}
.myself p{
 float: left;
 border-bottom:1px solid #dfdfdf;
 height:30px;
  line-height: 30px;
  text-indent: 5px;
}
.back{
  margin-bottom:15px;
}
</style>
