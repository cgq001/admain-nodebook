import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store.js'

import Load from './views/Load.vue'  //登录页
import Register from './views/register.vue'  //登录页

import Write from './components/Write.vue' //新增文章页
import Addtable from './components/addtable.vue'  //新增标签页
import Addcls from './components/Addcls.vue'  //新增分类
import Tablebox from './components/Tablebox'  //全部标签页
import Cls from'./components/Cls.vue'  //全部分类页
import Userlist from './components/Userlist.vue'  //全部用户
import Aboutbook from './components/aboutbook.vue'  //本站信息
import Adduser from './components/Adduser.vue'  //添加用户
import Abouts from './components/abouts'  //关于本站
import Case from './components/case.vue'  //添加项目
import CaseAll from './components/caseAll.vue'  //全部项目
import userimg from './components/userimg.vue'  //个人中心
import markdowns from './components/markdowns.vue' //MarkDown编辑器
import commonts from './components/commonts.vue'  //评论

import Textlist from './components/Textlist.vue'  //文章列表
import Draft from './components/Draft.vue'  //草稿箱 容器

import UndateMark from './components/mack/updatedowns.vue'  //MarkDown修改文件

import DraftLi from './components/draft/Drafts.vue' //草稿箱 列表
import Drafttxts from './components/draft/Drafttxts.vue' //草稿箱 写作

import Textlistbox from './components/txts/Textlistbox.vue' //文章 列表

import Clslist from './components/cls/Clslist.vue'   //全部分类页
import ClsTextlist from './components/cls/ClsTextlist.vue'   //某分类下的文章

import Tablelist from './components/tables/Tablelist.vue' //全部标签页
import TableTextlist from './components/tables/TabTextlist.vue'  //某标签下的文章

import Casealllist from './components/casealls/casealllist.vue'  //全部项目
import Casetxt from './components/casealls/casetxt.vue'   //修改项目
Vue.use(Router)

let routers=new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      redirect:'write',
      children:[ 
        {  //MarkDown编辑器
          path:'markdowns',
          name:'markdowns',
          component:markdowns,
          meta:{
            requiresAuth:2
          }
        },
        {  //MarkDown编辑器commonts
          path:'commonts',
          name:'commonts',
          component:commonts,
          meta:{
            requiresAuth:2
          }
        },
        { //新增文章
          path:'write',
          name:'write',
          component:Write,
          meta:{
            requiresAuth:2
          }
        },
        { //新增标签
          path:'addtable',
          name: 'Addtable',
          component:Addtable,
          meta:{
            requiresAuth:2
          }
        },
        { //新增分类
          path:'addcls',
          name: 'Addcls',
          component:Addcls,
          meta:{
            requiresAuth:2
          }
        },
        { //文章列表
          path:'textlist',
          component:Textlist,
          meta:{
            requiresAuth:2
          },
          children:[
            {
              path:'',  //文章列表
              name: Textlistbox,
              component:Textlistbox,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'edit',  //富文本修改文章undate
              name: 'Drafttxts',
              component:Drafttxts,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'undatemark/:userid',  //MarkDown修改文章
              name: 'UndateMark',
              component:UndateMark,
              meta:{
                requiresAuth:2
              }
            }
          ]
        },
        { //草稿箱
          path:'draft',
          component:Draft,
          meta:{
            requiresAuth:2
          },
          children:[
            {
              path:'',  //草稿文章页
              name: 'DraftLi',
              component:DraftLi,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'edit',  //草稿编辑页
              name: 'Drafttxts',
              component:Drafttxts,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'undatemark/:userid',  //MarkDown修改文章
              name: 'UndateMark',
              component:UndateMark,
              meta:{
                requiresAuth:2
              }
            }
          ]
        },
        {
          path:'tablebox',  //全部标签页
          component:Tablebox,
          meta:{
            requiresAuth:2
          },
          children:[
            {
              path:'',  //全部标签
              name:Tablelist,
              component:Tablelist,
              meta:{
                requiresAuth:2
              }
            },
            {  
              path:'tableTextlist/:userid', //包含某一标签
              name:'TableTextlist',
              component:TableTextlist,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'edit',  //修改文章
              name: 'Drafttxts',
              component:Drafttxts,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'undatemark/:userid',  //MarkDown修改文章
              name: 'UndateMark',
              component:UndateMark,
              meta:{
                requiresAuth:2
              }
            }
          ]
        },
        {
          path:'cls',  //全部分类页
          component:Cls,
          meta:{
            requiresAuth:2
          },
          children:[
            {
              path:'',   //全部分类
              name:'Clslist',
              component:Clslist,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'clstextlist/:userid?',
              name:'ClsTextlist',
              component:ClsTextlist,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'edit',  //修改文章
              name: 'Drafttxts',
              component:Drafttxts,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'undatemark/:userid',  //MarkDown修改文章
              name: 'UndateMark',
              component:UndateMark,
              meta:{
                requiresAuth:2
              }
            }
          ]
        },
        {
          path:'adduser',  //添加用户
          name:Adduser,
          component:Adduser,
          meta:{
            requiresAuth:1
          }
        },
        {
          path:'userlist',  //用户列表
          name: 'Userlist',
          component:Userlist,
          meta:{
            requiresAuth:1
          }
        },
        {
          path: 'aboutbook',  //本站信息
          name:'Aboutbook',
          component:Aboutbook,
          meta:{
            requiresAuth:1
          }
        },
        {
          path:'abouts',   //关于本站
          name:'Abouts',
          component:Abouts,
          meta:{
            requiresAuth:2
          }
        },
        {
          path:'case',   //添加项目
          name:'Case',
          component:Case,
          meta:{
            requiresAuth:2
          }
        },
        {
          path:'caseall',  //所有项目
          component:CaseAll,
          meta:{
            requiresAuth:2
          },
          children:[
            {
              path:'', //所有项目
              name:'Casealllist',
              component:Casealllist,
              meta:{
                requiresAuth:2
              }
            },
            {
              path:'casetxt/:userid',  //修改项目
              name:'casetxt',
              component:Casetxt,
              meta:{
                requiresAuth:2
              }
            }
          ]
        },
        {
          path:'userimg',
          name:'userimg',
          component:userimg,
          meta:{
            requiresAuth:2
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:'/load',
      name:'Load',
      component:Load
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    }
  ]
})
// 全部钩子
routers.beforeEach((to,from,next)=>{
  let path=from.path
      if (to.path === '/load'|| to.path === '/about' || to.path==='/register') {
            next();
          } else {
            let desc= store.state.user.desc;
            if(!desc) {
              next('/load')
            }else{
                if(desc<=to.meta.requiresAuth){
                  next()
                }else{
                  next(path)
                }
            }
              
          }
    
})
// 公出路由
export default routers
