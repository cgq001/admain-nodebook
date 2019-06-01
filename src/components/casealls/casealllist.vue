<template>
    <div class="txtbox">
        <breadcrumb :breadcrumbs='breadcrumb'></breadcrumb>
        <!-- 全部项目 -->
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                type="index"
                width="50"
                label="序号">
            </el-table-column>
            <el-table-column
            prop="name"
            label="标题">
            </el-table-column>
            <el-table-column
            prop="addressA"
            label="预览地址">
            </el-table-column>
            <el-table-column
            prop="addressB"
            label="GitHub">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button type="text"  @click="githubClickA(scope.row)" size="small">预览</el-button>
                    <el-button type="text" @click="githubClick(scope.row)" size="small">GitHub</el-button>
                    <el-button @click="handleClick(scope.row)"  type="text" size="small">编辑</el-button>
                    <el-button @click="removeClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="foots">
                <el-col :xs="{span: 24}" :sm="{span: 18}" :md="{span: 12, offset: 8}" :lg="{span: 8, offset: 12}" :xl="{span: 6, offset: 16}" justify="end">
                    <div class="grid-content bg-purple-dark">
                            <el-pagination
                                background
                                layout="prev, pager, next"
                                :total="Numbers"
                                :page-size='NumStr'
                                @current-change="handleCurrentChange"
                                :hide-on-single-page="Numbers/NumStr>1 ? false : true ">
                            </el-pagination>
                    </div>
                </el-col>
        </el-row>
    </div>
</template>

<script>
import { log } from 'util';
import moment from 'moment'

import Breadcrumb from '../breadcrumb/Breadcrumb'
export default {
    data() {
      return {
        breadcrumb:['项目管理','全部项目'],
        tableData: [],
        Numbers:1,  //总条数
        NumStr:10 ,  //每页显示条数
      }
    },
     methods: {
      handleClick(row) {   //点击查看
         this.$router.push({path:'/caseall/casetxt/'+row._id})
      },
      handleCurrentChange:function(val){  //当前页码
       //  console.log(`当前页: ${val}`);
         this.secrchTxtsLi(val)
      },
      githubClick:function(val){
         
         window.location.href=val.tableData.addressB
      },
      githubClickB:function(val){
         
         window.location.href=val.tableData.addressA
      },
      secrchTxtsLi:function(nums=1){ // 查询文章列表
         
            this.$http({  
                method:'POST',
                url:'searchCase',
                data:{
                    num:nums,  //页码
                    NumStr:this.NumStr
                }
            }).then(res=>{
                //console.log(res)
                if(res.data.code==0){
                // console.log(res.data)
                    this.tableData=res.data.data
                }
            })
      },
      removeClick(row){  //删除按钮
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
          this.$confirm('此操作将永久删除该项目, 是否继续?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
            this.$http({
                method:'POST',
                url:'removeCase',
                data:{
                    ids:row._id
                }
            }).then(res=>{
                if(res.data.code==0){
                        for(let i=0;i<this.tableData.length;i++){
                            if(this.tableData[i]['_id']==row._id){
                                this.tableData.splice(i,1)
                            }
                        }
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                }else{
                    this.$message.error('未知错误');
                }
            })
         
         
                
                
            
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
      }
    },
    created:function(){
        //console.log(this.$store.state.user)
        // 查询全部标签
        // this.$http({  
        //         method:'POST',
        //         url: 'searchtable'
        //     }).then((res)=>{
        //        // console.log(res.data.data)
        //         this.tablesList=res.data.data
        //     })
        // // 查询全部分类
        // this.$http({
        //         method:'POST',
        //         url: 'searchcls'
        //     }).then((res)=>{
        //        // console.log(res.data.data)
        //         this.clsList=res.data.data
        //     })
        
        this.secrchTxtsLi() //原始表个数据

        // 查询文章总条数
        this.$http({
            method:'POST',
            url:'searchCaseAllNumber'
        }).then(res=>{
            //console.log(res)
            if(res.data.code==0){
                
                this.Numbers=res.data.data
                //console.log(this.Numbers)
            }
        })

         
    },
    computed:{
    },
    components:{
        Breadcrumb
    }
}
</script>

<style scoped>
.txtbox{
    overflow-y:scroll;
}
.foots{
    margin-top: 30px;
}
</style>
