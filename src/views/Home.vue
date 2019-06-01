<template>
  <div class="home">
    <el-container>
        <el-aside width="220px" class="home-aside">
           <home-aside></home-aside>
        </el-aside>
        <el-main class="home-main">
          <router-view class="home-box"></router-view>
        </el-main> 
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
export default {
  name: 'home',
  data(){
    return {

    }
  },
  components: {
    homeAside
  },
  computed:{
    
  },
  created:function(){  //验证Token
    //         let token=null
    //         if(window.localStorage.getItem('token')){
    //           token=window.localStorage.getItem('token')
    //         }else if(window.sessionStorage.getItem('token')){
    //           token=window.sessionStorage.getItem('token')
    //         }else{
    //           token=null
    //         }
    //      // console.log(token)

    // if(token){
    //      this.$http({
    //           url:'rulesToken',
    //           methos: 'POST',
    //           headers:{
    //             'Authorization':token
    //           }
    //         }).then(res=>{
              
    //           if(res.data.code==0){
                 
    //               this.$store.commit('adduser',res.data.msg)
    //           }else{
    //              //console.log(res.data.msg)
    //           }
    //         }).catch(error=>{
    //           console.log('error')
    //         })
    // }
   
  }
}
</script>

<style scoped>
.home{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.home-aside{
  height: 100vh;
  /* overflow: hidden; */
  overflow-y: scroll;
  overflow-x: hidden;
}
.home-main{
  height: 100vh;
  overflow: hidden;
  background: #F0F2F5;
  padding: 20px;
  box-sizing: border-box;
}
.home-box{
  background: #ffffff;
  height: calc(100% - 20px);
  padding: 10px;
}
</style>
