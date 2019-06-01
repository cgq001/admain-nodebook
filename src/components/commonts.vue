<template>
    <div class="tables-box">
        <breadcrumb :breadcrumbs='breadcrumb'></breadcrumb>
        <!-- 全部评论 -->
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
            prop="names"
            label="昵称"
            >
            </el-table-column>
            <el-table-column
            prop="texts"
            label="内容"
            >
            </el-table-column>
            <el-table-column
            prop="strs"
            label="类型"
            >
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="handleClickB(scope.row)" type="text" size="small">预览</el-button>
                <el-button @click="handleClickAX(scope.row)" type="text" size="small">同意展示</el-button>
                <el-button @click="handleClickB(scope.row)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-row class="foots">
                <el-col :xs="{span: 24}" :sm="{span: 18}" :md="{span: 12, offset: 8}" :lg="{span: 8, offset: 12}" :xl="{span: 6, offset: 16}" justify="end">
                    <div class="grid-content bg-purple-dark">
                            <el-pagination
                                background
                                layout="prev, pager, next"
                                :total="AllNum"
                                :page-size= 'numA'
                                @current-change="handleCurrentChange"
                                :hide-on-single-page="AllNum/Number>1 ? false : true ">
                            </el-pagination>
                    </div>
                </el-col>
        </el-row>
    </div>
</template>

<script>
import Breadcrumb from './breadcrumb/Breadcrumb'
export default {
    data() {
      return {
        breadcrumb:['评论管理','文章评论'],
        tableData: [],  //初始化数据
        Number: 10,  //每页条数
        num:1,  //页码
        numA:10,  //页码
        AllNum:0  //全部条数
      }
    },
    created:function(){
        // 初始化查询标签数据
         this.reverseUser()
            this.$http({
                    url:'searchCommontsAllNumber',
                    method:'POST'
                })
                .then(res=>{
                  
                    this.AllNum=res.data.data
                }).catch(()=>{
                    console.log('错了')
                })
    },
    methods:{
        handleCurrentChange:function(val){
                this.num=val
                this.reverseUser()
        },
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
            this.$confirm('此操作将永久删除该评论, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    
                    this.$http({
                        url:'removesCommonts',
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
         handleClickAX:function(row){  //删除按钮
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
            this.$confirm('此操作将永久同意该评论展示, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    
                    this.$http({
                        url:'updataCommonts',
                        method:"POST",
                        data:{
                            userid:row._id
                        }
                    }).then(res=>{
                        if(res.data.code==0){
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });  
                            for(let i=0;i<this.tableData.length;i++){
                                    if(this.tableData[i]['_id']==row._id){
                                        this.tableData[i].strs='已同意' 
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
                url:'searchCommonts',
                method:'POST',
                data:{
                    num:this.num,
                    Number:this.Number
                }
            })
            .then(res=>{
                
                this.tableData=res.data.data
                if(res.data.data.length>0){
                    
                    for(let i=0;i<res.data.data.length;i++){
                       
                        this.tableData[i].strs=res.data.data[i].types== '1' ? '未同意' : '已同意'
                    }
                  
                }
            }).catch(()=>{
                console.log('错了')
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
.foots{
    margin-top: 30px;
}
</style>
