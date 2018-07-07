<template>
    <div class="items">
      <p class="itemTitle">
       <span class="title">最新开奖</span>
       <router-link class="showMore" to="/winner/list" tag="span">更多··· </router-link>
      </p>
      <div class="itemList">
        <div class="item" v-for="(item,index) in items" :key="index">
              <h4> 1{{coinType[item.coin_type]}}</h4>
              <!-- <p>价值{{item.price}}</p> -->
              <p>恭喜{{item.winner_username}}获得</p>
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
import coinType from '../../utils/coin_type'
export default {
  name: 'temp',
  data () {
    return {
      items:null,
      coinType:null,
    }
  },
  components:{

  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN','USER_SIGNOUT']),
    ...mapActions(['userLogout', 'userLogin']),
    getList(){
      API.get(API.winners.url,{},{}).then(res => {
        if(res.data.code ==200){
          this.items = res.data.data.slice(0,3)
        }
      })
    }
  },
  created(){
    this.coinType = coinType
  },
  mounted(){
    this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .items .itemTitle {
    height: 30px;
    line-height: 30px;
    text-align: center;
    background:#666666;
    padding:0 10px;
    color: #fff;
  }
  .itemTitle span.showMore{
    float: right;
  }
  .itemList{
    width:100%;
    display: flex;
    flex-flow: row nowrap;
    height: 130px;
  }
  .itemList .item{
    flex:1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    padding:5px;
    height: 130px;

  }
  .itemList .item{
    border-right: 2px solid #333
  }
  .itemList .item:nth-child(3){
    border:none
  }
  .itemList .item h4{
    font-size: 18px;
  }
  .price p{
    font-size:12px;
    margin-bottom:3px;
  }
  
    
</style>
