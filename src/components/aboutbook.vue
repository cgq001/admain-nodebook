<template>
    <div class="box">
        <breadcrumb :breadcrumbs='breadcrumb' class="box-title"></breadcrumb>
        <el-tabs type="border-card">
            <el-tab-pane label="后端——关于本站">
                <adminbook></adminbook>
            </el-tab-pane>
            <el-tab-pane label="前端——关于本站">
                <book></book>
            </el-tab-pane>
            <el-tab-pane label="个人简历">
                <author></author>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Adminbook from './aboutbooks/Adminbook'  //后端
import Book from './aboutbooks/book'   //前端
import Breadcrumb from './breadcrumb/Breadcrumb'  //面包屑
import Author from './aboutbooks/author'    //简历
export default {
    data(){
        return {
            breadcrumb:['设置','管理控制','本站信息']
        }
    },
    components:{
        Adminbook,
        Book,
        Breadcrumb,
        Author
    }
}
</script>


<style scoped>
.box{
    overflow-y: scroll;
}
</style>
