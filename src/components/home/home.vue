<template>
  <div class="home">
    <div id="minirefresh" class="minirefresh-wrap">     
      <div class="minirefresh-scroll">
        <swiper ref="swiper"></swiper>
        <notice ref="notice"></notice>
        <winner ref="winner"></winner>
        <near-close ref="near"></near-close>
        <newgoods ref="newgoods"></newgoods>
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
import swiper from './swiper'
import winner from './winner'
import nearClose from './nearclose'
import newgoods from './newgoods'
import notice from './notice'
import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css'
export default {
  name: 'home',
  data () {
    return {
      minirefresh: null,
      maxDataSize: 30,
      requestDelayTime: 600,
      
    }
  },
  components:{
    swiper,
    newgoods,
    nearClose,
    winner,
    notice
  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    downCallback() {
        var self = this;
        setTimeout(() =>{
          self.$refs.swiper.getList();
          self.$refs.notice.getList()
          self.$refs.winner.getList()
          self.$refs.near.getList()
          self.$refs.newgoods.getList()
          self.miniRefresh.endDownLoading(true);
        }, self.requestDelayTime);
    },
    upCallback() {
        var self = this;
        setTimeout(function() {
            self.miniRefresh.endUpLoading(true);
        }, self.requestDelayTime);
    },
  },
  created(){

  },
  mounted(){
    var self = this;
    self.miniRefresh = new MiniRefresh({
      container: '#minirefresh',
      down: {
          callback: self.downCallback
      },
      isScrollBar:false,
      up: {
          isLock:true,
          isAuto: true,
          callback: self.upCallback
      }
  })
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 .home{
  position: relative;
  height: 100%;
 }

  .home .minirefresh-theme-default .minirefresh-upwrap {
    display: none !important;
  }

</style>
