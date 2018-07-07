const fun  = {
  isLogin(session){
   return  API.get(API.isLogin.url+`?session=${session}`,{},{}).then(res => {
     if(res.data.code == 200){
       return true
     }else{
       return false
     }
   })
  }
}

module.exports = fun