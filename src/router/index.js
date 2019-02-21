import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import Layout from '@/views/layout'
import Home from '@/views/home'
import Login from '@/views/login'
import Register from '@/views/register'
import Pc28Hall from '@/views/pc28hall'
import LyHall from '@/views/lyhall'
import Drawing from '@/views/drawing'
import Pc28PlayerRule from '@/views/pc28PlayerRule'
import LyPlayerRule from '@/views/lyPlayerRule'
import NoticeAdd from '@/views/noticeAdd'
import Findpwd from '@/views/findpwd'
import MyselfInfo from '@/views/myselfInfo'
import ModifyHeadimg from '@/views/modifyheadimg'
import ModifyPwd from '@/views/modifypwd'

//待修改------------
import Wealth from '@/views/wealth'
import CustomService from '@/views/customservice'
import Mine from '@/views/mine'
import Charge from '@/views/charge'
import WithdrawCash from '@/views/withdrawcash'
import Cashcard from '@/views/cashcard'
import Searchmoney from '@/views/searchmoney'
import PcPastseach from '@/views/pcpastseach'
import LyPastseach from '@/views/lypastseach'
import MineCathectic from '@/views/mine_cathectic'
import MineInvite from '@/views/mine_invite'
import MineSet from '@/views/mine_set'
import CathecticDetail from '@/views/cathectic_detail'
import UpdateVersion from '@/views/updateversion'
import AboutMe from '@/views/aboutme'






export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        { path: '/drawing',
          component: Drawing ,
          name: 'drawing'
        },
        { path: '/wealth',
          component: Wealth ,
          name: 'wealth'
        },
        { path: '/mine',
          component: Mine ,
          name: 'mine'
        },
        { path: '/', 
          redirect: { path: 'home' ,query:{title:'首页'}}
        }
      ]
    },
    //------------------首页路由-------------------------
    {
      path: '/login',
      //query:{},  //路由参数
      name: 'login',
      component: Login
    },
    { path: '/register',
      component: Register,
      name: 'register'
    },
    {   path: '/pc28hall',
        component: Pc28Hall ,
        name: 'pc28hall'
    },
    {   path: '/lyhall',
        component: LyHall ,
        name: 'lyhall'
    },
    //------------------首页路由-------------------------
    { path: '/customservice',
      component: CustomService ,
      name: 'customservice'
    },
    {
    	path: '/findpwd',
    	component: Findpwd,
    	name: 'findpwd'
    },
    { path: '/modifyheadimg/:title',
      component: ModifyHeadimg,
      name: 'modifyheadimg'
    },
    { path: '/modifypwd/:title',
      component: ModifyPwd,
      name: 'modifypwd'
    },
    { path: '/myselfInfo',
      component: MyselfInfo,
      name: 'myselfInfo'
    },
    { path: '/pc28PlayerRule/:title',
      component: Pc28PlayerRule,
      name: 'pc28PlayerRule'
    },
    { path: '/lyPlayerRule/:title',
      component: LyPlayerRule,
      name: 'pc28PlayerRule'
    },
    { path: '/noticeAdd/:title',
      component: NoticeAdd,
      name: 'noticeAdd'
    },
    { path: '/charge/:title',
      component: Charge,
      name: 'charge',
    },
    { path: '/withdrawcash/:title',
      component: WithdrawCash ,
      name: 'withdrawcash'
    },
    { path: '/cashcard/:title',
      component: Cashcard ,
      name: 'cashcard'
    },
    { path: '/searchmoney/:title',
      component: Searchmoney ,
      name: 'searchmoney'
    },
    { path: '/pcpastseach',
      component: PcPastseach,
      name: 'pcpastseach'
    },
    { path: '/lypastseach',
      component: LyPastseach,
      name: 'lypastseach'
    },
    { path: '/mine_cathectic/:title',
      component: MineCathectic,
      name: 'mine_cathectic'
    },
	  { path: '/mine_invite/:title',
      component: MineInvite,
      name: 'mine_invite'
    },
    { path: '/mine_set/:title',
      component: MineSet,
      name: 'mine_set'
    },
    { path: '/cathectic_detail',
      component: CathecticDetail,
      name: 'cathectic_detail'
    },
    { path: '/updateversion/:title',
      component: UpdateVersion,
      name: 'updateversion'
    },
    { path: '/aboutme/:title',
      component: AboutMe,
      name: 'aboutme'
    },
    
  ]
})
