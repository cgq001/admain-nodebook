<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style scoped>

#app{
 width: 100%;
  
} 
</style>

<script>
export default {
  data(){
    return {
      token:''
    }
  },
  created:function(){
    this.$http({  
                method:'GET',
                url: ''
            }).then((res)=>{
                // console.log(res.data)
               if(res.data.code==0){
                 this.$store.commit('addtoken',res.data.token)
               }
            })
     // 查询全部分类
      this.$http({  
                method:'POST',
                url: 'searchcls'
            }).then((res)=>{
               // console.log(res.data)
                this.$store.commit('addClsList',res.data.data)
            })
        // 查询全部标签
      this.$http({
                method:'POST',
                url: 'searchtable'
            }).then((res)=>{
                //console.log(res.data)
                this.$store.commit('addTablesList',res.data.data)
               // this.$store.state.tablesList=res.data.data
            })  
  }
}
</script>
