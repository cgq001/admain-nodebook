<template>
    <div class="box-books">
        <breadcrumb :breadcrumbs='breadcrumb' class="box-title"></breadcrumb>
          <el-timeline :reverse="reverse">
            <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.desc">
            {{activity.name}}
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
import Breadcrumb from './breadcrumb/Breadcrumb'  //面包屑
export default {
    data(){
        return {
            breadcrumb:['关于本站'],
            reverse: true,
           activities: []  
        }
    },
    methods:{
        
       
    },
    components:{
        Breadcrumb
    },
    created:function(){
        this.$http({
            url:'allAbout',
            method:'POST',
            data:{
                types:'2'
            }
        }).then(res=>{
            this.activities=res.data.data
        }).catch(()=>{

        })
    }
}
</script>

<style scoped>
.box-books{
    height: 100%;
    overflow-y: scroll;
}
</style>
