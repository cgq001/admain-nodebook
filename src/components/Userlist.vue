<template>
    <div class="tables-box">
        <breadcrumb :breadcrumbs='breadcrumb'></breadcrumb>
        <!-- 全部标签 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            label="序号"
            type="index"
            width="60">
            </el-table-column>
            <el-table-column
            prop="users"
            label="昵称"
            >
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="handleClickB(scope.row)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import Breadcrumb from './breadcrumb/Breadcrumb'
export default {
    data() {
      return {
        breadcrumb:['设置','管理控制','全部管理员'],
        tableData: [],  //初始化数据
      }
    },
    created:function(){
        // 初始化查询标签数据
        this.reverseUser()
       
    },
    methods:{
        handleClickB:function(row){  //删除按钮
        if(this.$store.state.user.desc>1){
                 this.$alert('此账号为测试账号,无法进行此操作', '温馨提示', {
                    confirmButtonText: '确定',
                        callback: ()=> {
                            this.$message({
                            type: 'info',
                            message: '取消操作'
                            });
                        }
                    });
                return false;
            }
            this.$confirm('此操作将永久删除该用户, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    
                    this.$http({
                        url:'removeNames',
                        method:"POST",
                        data:{
                            userid:row._id
                        }
                    }).then(res=>{
                        if(res.data.code==0){
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });  
                            for(let i=0;i<this.tableData.length;i++){
                                    if(this.tableData[i]['_id']==row._id){
                                        this.tableData.splice(i,1) 
                                    }
                                }
                        }

                    }).catch(()=>{
                         this.$message({
                                type: 'warning',
                                message: '未知错误'
                            });  
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        reverseUser:function(){
            this.$http({
                url:'allNames',
                method:'POST',
            })
            .then(res=>{
              //  console.log(res)
                this.tableData=res.data.data
            })
        }
    },
    components:{
        Breadcrumb
    }
}
</script>

<style scoped>
.foots{
    margin-top: 30px;
}
.tables-box{
    height: 100%;
    overflow-y: scroll;
}
</style>
