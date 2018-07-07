import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const fun  = require('../utils/isLogin')

export default new Router({
  mode:'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: resolve => require(['@/components/home/home'], resolve),
      meta:{keepAlive:true}
    },
    {
      path: "/swiper/detail",
      name: "swiperDetail",
      component: resolve => require(['@/components/home/swiperDetail'], resolve),
      meta:{keepAlive:true}
    },
    {
      path: "/login",
      name: "login",
      component: resolve => require(['@/components/account/login'], resolve),
      meta:{keepAlive:true}
    },
    {
      path: "/register",
      name: "register",
      component: resolve => require(['@/components/account/register'], resolve),
      meta:{keepAlive:true}
    },
    {
      path: "/findpwd",
      name: "findpwd",
      component: resolve => require(['@/components/account/findpwd'], resolve),
      meta:{keepAlive:true}
    },
    {
      path: "/invite",
      name: "invite",
      component: resolve => require(['@/components/invite/invite'], resolve),
      meta:{keepAlive:true}
    },
    {
      path: "/question",
      name: "question",
      component: resolve => require(['@/components/my/question/question'], resolve),
      meta:{keepAlive:false}
    },
    {
      path: "/question/list",
      name: "questionList",
      component: resolve => require(['@/components/my/question/questionList'], resolve),
      meta:{keepAlive:false}
    },
    {
      path: "/question/detail/:id",
      name: "questionDetail",
      component: resolve => require(['@/components/my/question/questionDetail'], resolve),
      meta:{keepAlive:false}
    },
    {
      path: "/guide",
      name: "guide",
      component: resolve => require(['@/components/guide/guideIndex'], resolve),
      meta:{keepAlive:true}
    },
    {
      path: "/sell",
      name: "sell",
      component: resolve => require(['@/components/sellList/sell'], resolve),
      meta:{keepAlive:true}
    },
    {
      path: "/winner/list",
      name: "lotteryRecord",
      component: resolve => require(['@/components/lotteryRecord/list'], resolve),
      meta:{keepAlive:true}
    },
    {
      path: "/winner/detail/:id",
      name: "winnerDetail",
      component: resolve => require(['@/components/lotteryRecord/detail'], resolve),
      meta:{keepAlive:false}
    },
    {
      path: "/nearclose/list",
      name: "nearcloseList",
      component: resolve => require(['@/components/home/nearcloseList'], resolve),
      meta:{keepAlive:false}
    },
    {
      path: "/my/orderNumber/:id",
      name: "orderNumber",
      component: resolve => require(['@/components/my/order/myNumber'], resolve),
      meta:{keepAlive:false}
    },
    {
      path: "/my/win",
      name: "myWin",
      component: resolve => require(['@/components/my/order/myWins'], resolve),
      meta:{keepAlive:false}
    },
    {
      path: "/goods/detail/:id",
      name: "goodsDetail",
      component: resolve => require(['@/components/sellList/goodsDetail'], resolve),
      meta:{keepAlive:false},
      beforeEnter: (to, from, next) => {
        let isLogin = fun.isLogin(JSON.parse(localStorage.getItem('winchaintoken')));
        console.log(!isLogin)
        if (!isLogin) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
          } else {
              next()
          }
      }
    },
    {
      path: "/my/order",
      name: "myOrder",
      component: resolve => require(['@/components/my/order/myOrder'], resolve),
      meta:{keepAlive:false},
      beforeEnter: (to, from, next) => {
        let isLogin = fun.isLogin(JSON.parse(localStorage.getItem('winchaintoken')));
        console.log(isLogin)
        if (!isLogin) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
          } else {
              next()
          }
      }
    },
    {
      path: "/accountBalance",
      name: "accountBalance",
      component: resolve => require(['@/components/my/fundManage/accountBalance'], resolve),
      meta:{keepAlive:false},
      beforeEnter: (to, from, next) => {
        let isLogin = fun.isLogin(JSON.parse(localStorage.getItem('winchaintoken')));
        console.log(isLogin)
        if (!isLogin) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
          } else {
              next()
          }
      }
    },
    {
      path: "/accountDetail",
      name: "accountDetail",
      component: resolve => require(['@/components/my/fundManage/accountDetail'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/my/invite",
      name: "myInvite",
      component: resolve => require(['@/components/my/invite/invite'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/my/cashpwd",
      name: "cashpwd",
      component: resolve => require(['@/components/my/cashpwd/cashpwd'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/recharge/:id",
      name: "recharge",
      component: resolve => require(['@/components/my/fundManage/recharge/recharge'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/outside/recharge",
      name: "rechargeOutside",
      component: resolve => require(['@/components/my/fundManage/recharge/rechargeOutside'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/outside/transfer",
      name: "transferOutside",
      component: resolve => require(['@/components/my/fundManage/recharge/transfer'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/withdraw/:id",
      name: "withdraw",
      component: resolve => require(['@/components/my/fundManage/withdrawMoney/withdraw'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/withdrawRecord/:id",
      name: "withdrawRecord",
      component: resolve => require(['@/components/my/fundManage/withdrawMoney/withdrawRecord'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/exchange/:id",
      name: "exchange",
      component: resolve => require(['@/components/my/fundManage/exchange/exchange'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/payment",
      name: "payment",
      component: resolve => require(['@/components/my/fundManage/recharge/payment'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/guide/outRecharge",
      name: "outRecharge",
      component: resolve => require(['@/components/guide/outRecharge'], resolve),
      meta:{keepAlive:false},
    },
    {
      path: "/guide/question",
      name: "question",
      component: resolve => require(['@/components/guide/howtoTreasure'], resolve),
      meta:{keepAlive:false},
    },
    { 
      path: "/guide/treasure",
      name: "treasure",
      component: resolve => require(['@/components/guide/howtoTreasure'], resolve),
      meta:{keepAlive:false},
    },
    { 
      path: "/guide/rmbRecharge",
      name: "rmbRecharge",
      component: resolve => require(['@/components/guide/rmbrecharge'], resolve),
      meta:{keepAlive:false},
    },
    { 
      path: "/guide/winningRules",
      name: "winningRules",
      component: resolve => require(['@/components/guide/winningRules'], resolve),
      meta:{keepAlive:false},
    }
  ]
});
