<template>
  <div class="swiperContent">
    <swiper loop auto height="4rem">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in items" :key="index">
        <router-link to="/swiper/detail">
          <img :src="item.img">
        </router-link>
        
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
import { Swiper,SwiperItem } from 'vux'
export default {
  name: 'temp',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[]
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    getList(){
      API.get(API.swiperList.url,{},{}).then(res => {
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
.swiperContent{
  height: 150px;
}
.swiperContent .vux-slider{
  height: 100%;
}

.swiperContent .vux-slider .vux-swiper img{
  width:100%;
  height:100%;
}
</style>
