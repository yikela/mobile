<template>
  <div class="exchange">

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
  name: 'exchange',
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

</style>
