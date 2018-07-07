<template>
  <div id="navv">
    <ul>
      <router-link to="/" tag="li" active-class="u-link--Active" exact>首页</router-link>
      <router-link to="/sell" tag="li" active-class="u-link--Active" exact>所有夺宝</router-link>
      <router-link to="/winner/list" tag="li" active-class="u-link--Active" exact>开奖记录</router-link>
      <router-link to="/invite" tag="li" active-class="u-link--Active" exact>邀请有奖</router-link>
      <router-link to="/guide" tag="li" active-class="u-link--Active" exact>新手指南</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navv',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #navv{
    height: 35px;
    width: 100%;
    background:#666666;
    top:45px;
    position: fixed;
    left:0;
    z-index:99;
    max-width: 500px;
    right:0;
    margin:auto;
  }
  #navv ul {
    width:100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content:space-around;
    align-items: center
  }
  #navv ul li{
    height: 35px;
    line-height: 35px;
    color: #fff;
    cursor: pointer;
  }
  #navv ul li.u-link--Active{
    color:#00bfff
  }
</style>
