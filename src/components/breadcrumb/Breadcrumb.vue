<template>
    <div class="box">
        <el-row>
            <el-col :span="24" class="box-bre">
                <div class="grid-content bg-purple-dark">
                    <el-breadcrumb separator-class="el-icon-arrow-right" class=" box-bre-li">
                        <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index">{{item}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
            
        </el-row>
    </div>
</template>

<script>
export default {
    props:['breadcrumbs'],
    created:function(){
     
    }
}
</script>
<style scoped>
.box{
    overflow: hidden;
}
.box-bre{
    height: 60px;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 10px;
}
.box-bre-li{
    line-height: 60px;
}

</style>
