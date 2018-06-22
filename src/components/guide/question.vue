<template>
  <div class="question">
    <a href="javascript:history.back(-1)">返回</a>
  </div>
</template>

<script>
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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{

  },
  computed:{
    ...mapGetters(['userLoginToken']),
  },
  methods:{
    ...mapMutations(['USER_SIGNIN']),
    ...mapActions(['userLogout', 'userLogin']),
  },
  created(){

  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question{
  margin-top:-75px;
  padding:10px
}
.question a{
  padding:3px 10px;
  border:1px solid #333;
  color:#000;
  border-radius:3px;
}
</style>
