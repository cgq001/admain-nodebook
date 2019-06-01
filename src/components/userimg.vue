<template>
    <div>
        <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :fit="fit">
        </el-image>
    </div>
</template>

<script>
export default {
     data() {
      return {
        url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        fit:'fill'
      };
    },
    methods: {
      
      submits:function(){
          console.log('1')
      }
    }
    
}
</script>

<style scoped>

</style>
