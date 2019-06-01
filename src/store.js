import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      user:{}, //用户信息
      tx:'',  //新增文章内容
      token:'', //token
      txB:'',  //修改文章内容
      clsList:[],  //全部分类
      tablesList:[] //全部标签
  },
  mutations: {
    addtx(state,str){  //设置新增文章内容
      state.tx=str
    },
    addtxB(state,str){  //修改文章内容
      state.txB=str
    },
    addtoken(state,str){  //设置token
      state.token=str
    },
    adduser(state,str){  //设置token
      state.user=str
    },
    addClsList(state,str){  //设置分类
      state.clsList=str
    },
    arrClsList(state,str){  //添加分类
      state.clsList.push(str)
    },
    deleteCls(state,str){  //删除分类
      for(let i=0;i<state.clsList.length;i++){
        if(state.clsList[i]['_id']==str){
          state.clsList.splice(i,1) 
            }
        }
    },
    undateClas(state,str){  //修改分类
      for(let i=0;i<state.clsList.length;i++){
        if(state.clsList[i]['_id']==str._id){
              state.clsList.splice(i,1,str) 
            }
        }
    },
    addTablesList(state,str){  //设置标签
      state.tablesList=str
    },
    arrTableList(state,str){  //添加标签
      state.tablesList.push(str)
    },
    deleteTable(state,str){  //删除标签
      for(let i=0;i<state.tablesList.length;i++){
        if(state.tablesList[i]['_id']==str){
          state.tablesList.splice(i,1) 
            }
        }
    },
    undateTable(state,str){  //修改标签
      for(let i=0;i<state.tablesList.length;i++){
        if(state.tablesList[i]['_id']==str._id){
          state.tablesList.splice(i,1,str) 
            }
        }
    }
  },
  actions: {

  }
})
