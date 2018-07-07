<template>
  <div class="question">
    <loading :show="!loading" text=""></loading>
    <div v-if="loading">
    <p class="toQuestion"><router-link to="/question/list">问题列表</router-link></p>
    <group class="groupBorder">
      <cell title="问题类型" :value="type" is-link  @click.native="showPopup=true" class="fontSize"></cell>
    </group>
    <popup v-model="showPopup" class="checker-popup">
        <div style="padding:10px 10px 40px 10px;" >
          <p style="padding: 5px 5px 5px 2px;color:#888;">问题类型</p>
          <checker v-model="type" default-item-class="type-item" selected-item-class="type-item-selected">
            <checker-item value="充值" @on-item-click="onItemClick"> 充值 </checker-item>
            <checker-item value="提现" @on-item-click="onItemClick">  提现  </checker-item>
            <checker-item value="交易" @on-item-click="onItemClick">  交易  </checker-item>
            <checker-item value="安全" @on-item-click="onItemClick">  安全  </checker-item>
            <checker-item value="活动" @on-item-click="onItemClick">  活动  </checker-item>
            <checker-item value="投诉与建议" @on-item-click="onItemClick">  投诉与建议  </checker-item>
          </checker>
        </div>
      </popup>
   
      <group class="imageList">
        <h4>上传的图片列表</h4>
        <p v-for="(i,index) in images" :key="index">
        <img :src="baseUrl+i.path" alt="">
        <span @click="del(i.id,id)">删除</span>
        </p>
        <p>
          <a href="javascript:;" class="file">选择图片上传
            <input type="file" name="image" id="image" @change='adImage()' class="file">
          </a>
        </p>
      </group>

      <group>
        <x-textarea  placeholder="问题描述" class="fontSize" v-model="dis"></x-textarea>
      </group>


      <group>
        <x-input title="手机号码" v-model="phone"  class="fontSize"></x-input>
      </group>

      <x-button @click.native="editIssue()" type="primary" style="margin-top:30px" class="fontSize">提问</x-button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Checker, CheckerItem, Group, Cell, Popup, XInput,XButton,XTextarea } from 'vux'
import stateType from '../../../utils/questionState.js'
const url  = require('../../../utils/issue_image.js')
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
export default {
  name: 'question',
  data () {
    return {
      showPopup:false,
      type:'充值',
      phone:null,
      id:null,
      dis:null,
      types:null,
      images:[],
      baseUrl:null,
      loading:false
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
    XTextarea
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
     onItemClick(value){
      if (!this.disabled) {
        this.showPopup = false
      };
      console.log(value)
    },
    getPics(value){
       API.get(API.getIssuePic.url+`?session=${this.userLoginToken}&issue_id=${this.id}`,{},{}).then(res => {
         if(res.data.code == 200){
           this.images = res.data.data;
           this.loading = true;
         }
       })
    },
    addIssue(){
      API.post(API.addIssue.url,{},{session:this.userLoginToken}).then(res => {
        if(res.data.code == 200){
          this.id = res.data.data;
          this.loading = true;
          this.getPics()
          this.USER_SIGNIN(res.data.session)
        }else if(res.data.code == 401){
          this.$vux.toast.text(res.data.msg, 'top');
          this.USER_SIGNOUT();
          setTimeout(()=>{
            this.$router.push('/login');
          },1000)
        }else{
          this.$vux.toast.text(res.data.msg, 'bottom');
        }
      })
    },
    editIssue(){
      var type_id = null;
      for(var i in  this.types){
        ((j)=>{
          if(this.types[j] == this.type){ 
            type_id = j
          }
        })(i)
       
      }

      if(!this.dis || !this.phone){
        this.$vux.toast.text('请填写相关信息', 'bottom');
        return false
      }

      var regPhone = /^1(3|4|5|7|8)\d{9}$/;
      if (!regPhone.test(this.phone)) {
          this.$vux.toast.text('手机号码格式不正确');
          return false
      }
      const form = {
        session:this.userLoginToken,
        issue_id:this.id,
        type_id:type_id,
        body:this.dis,
        tel:this.phone,

      }
      API.post(API.editIssue.url,{},form).then(res => {
        if(res.data.code == 200){
          this.addIssue();
          this.getPics();
          this.dis = '';
          this.phone = '';
          this.$vux.toast.text('提问成功','top');
        }else if(res.data.code == 401){
          this.$vux.toast.text(res.data.msg,'top');
          this.USER_SIGNOUT();
          setTimeout(()=>{
            this.$router.push('/login');
          },1000)
        }else{
          this.$vux.toast.text(res.data.msg,'top');
        }
      })
    },
    del(id,issue_id){
      var form = {
        session:this.userLoginToken,
        issue_id:issue_id,
        image_id:id
      }
      API.post(API.delIssueImage.url,{},form).then(res => {
        if(res.data.code == 200){
          this.getPics()
          this.$vux.toast.text('删除成功','top');
        }
      })
    },
    adImage(){
      var issue_id = this.id;
      var session = this.userLoginToken
      var url = "/1/issue/upload-image";
      var formData = new FormData();
      var file = document.getElementById('image').files[0]
        formData.append('image', file);
        formData.append('issue_id', issue_id);
        formData.append('session', session);
      axios.post(
        url,
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        }
      ).then(res => {
        if(res.data.code == 200){
          this.getPics()
          this.$vux.toast.text('上传成功','top');
        }
      })
    }
  },
  created(){
    this.types = stateType
    this.baseUrl = url.urlBase
    this.addIssue()
  },
  mounted(){
    console.log(url)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    margin:15px auto;
    left:0;
    right:0;
}
.file input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}

.question{
  padding-top:20px;
}
.question a.back{
  padding:3px 10px;
  border:1px solid #333;
  color:#000;
  border-radius:3px;
}
.fontSize{
  font-size:14px;
}
.type-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin: 5px;
  line-height: 18px;
  border-radius: 15px;
}
.type-item-selected {
  background-color: #FF3B3B;
  color: #fff;
}
.toQuestion{
  width:100%;
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding:0 10px;
}
.imageList p{
  margin:10px 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around
}
.imageList h4{
  height:30px;
  line-height: 30px;
  padding-left:15px;
  font-size:14px;
  color:#333;
  border-bottom:1px solid #efefef
}
.imageList p img{
  width:150px;
  height:80px;
  display: inline-block;
}
.imageList p span{
  width:80px;
  line-height: 30px;
  height:30px;
  font-size:14px;
  text-align: center;
  background:red;
  color:#fff;
  border-radius:5px;
}
</style>
