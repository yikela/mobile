<template>
  <div class="notice">
   <!-- <img src="../../assets/voice.png"><span>公告：{{item.title}}{{index}}</span> -->
   <img src="../../assets/voice.png">
   <marquee>
      <marquee-item v-for="(i,index) in items" :key="index"  class="align-middle">公告：{{i.title}}{{index}}</marquee-item>
    </marquee>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
import {  Marquee, MarqueeItem} from 'vux'

export default {
  name: 'temp',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      item:'',
      items:[],
      index:0
    }
  },
  components:{
    Marquee,
    MarqueeItem
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
    getList(){
      API.get(API.noticeList.url,{},{}).then(res => {
      if(res.data.code == 200){
        this.items = res.data.data;
      }
      })
    },
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
 .notice{
    width:100%;
    height: 25px;
    display: flex;
    padding-left: 8px;
    flex-flow: row nowrap;
    align-items: center;
  }
.notice img{
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

</style>
