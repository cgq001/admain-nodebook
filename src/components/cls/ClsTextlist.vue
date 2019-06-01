<template>
    <div class="txtbox">
        <breadcrumb :breadcrumbs='breadcrumb'></breadcrumb>
        <!-- 文章列表 -->
        <el-table
            :data="tableDataB"
            stripe
            style="width: 100%"
            :row-class-name='tableRowClassName'
            >
            <el-table-column
                type="index"
                width="50"
                label="序号"
                >
            </el-table-column>
            <el-table-column
            prop="data"
            label="日期"
            width="180"
            >
            </el-table-column>
            <el-table-column
            prop="types"
            label="状态"
            width="100">
            </el-table-column>
            <el-table-column
            prop="name"
            label="标题">
            </el-table-column>
            <el-table-column
            prop="bstName"
            label="类型"
            width="180">
            </el-table-column>
            <el-table-column
            prop="classed"
            label="分类"
            width="180">
            </el-table-column>
            <el-table-column
            prop="checkedA"
            label="标签">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
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
<style scoped>
.txtbox{
    overflow-y:scroll;
}
.foots{
    margin-top: 30px;
}
.el-table .success-row {
    background: #E976FA;
  }
.el-table  .warning-row {
    background: #8AD1F2;
  }
.active-cls{
    background: #8AD1F2;
}
</style>
<script>
import { log } from 'util';
import moment from 'moment'
import Breadcrumb from '../breadcrumb/Breadcrumb'
export default {
    data() {
      return {
        breadcrumb:['标记管理','分类管理','全部分类','分类详情'],
        tableData: [],
        Numbers:1,  //总条数
        NumStr:10 ,  //每页显示条数
        // tablesList:[] , //全部标签
        // clsList:[]   //全部分类
        userid:0
      }
    },
     methods: {
        tableRowClassName({row, rowIndex}) {
        
            if (row.types === '已发布') {
              // console.log(123)
                return "warning-row";
            
            } else if (row.types === '未发布') {
             // console.log(345)
                return 'success-row';
            
            }
         return '';
      },
      handleClick(row) {   //点击查看
        
          if(row.bst==2){
                this.$router.push({path:'/cls/undatemark/'+row.id})
            }else{
                 this.$router.push({path:'/cls/edit',query:{info:row.id}})
            }
      },
      handleCurrentChange:function(val){  //当前页码
       //  console.log(`当前页: ${val}`);
         this.secrchTxtsLi(val)
      },
      
      secrchTxtsLi:function(nums=1){ // 查询文章列表
         
            this.$http({  
                method:'POST',
                url:'searchClsAtxts',
                data:{
                    userid:this.userid,
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
      roverseArr:function(){
          // 查询文章总条数
            this.$http({
                method:'POST',
                url:'searchClstxtsNum',
                data:{
                    userid:this.userid  //分类ID 
                }
            }).then(res=>{
                //console.log(res)
                if(res.data.code==0){
                    
                    this.Numbers=res.data.data
                   // console.log(this.Numbers)
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
          this.$confirm('此操作将永久删除该文章, 是否继续?', '确认操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {

            this.$http({
                method:'POST',
                url:'deletetexsli',
                data:{
                    id:row.id
                }
            }).then(res=>{
                if(res.data.code==0){
                        for(let i=0;i<this.tableData.length;i++){
                            if(this.tableData[i]['_id']==row.id){
                                this.tableData.splice(i,1)
                            }
                        }
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.Numbers-=1
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
      },
      searchNames:function(str,ids){   //根据ID 显示 分类 名字
           let Arrs= str.filter(function(item){
                return item._id==ids
            })
           
            return Arrs
      },
      searchNamesB:function(str,ids){  //根据ID 显示 标签 名字
          
          let strArr=[]
                for(let i=0;i<ids.length;i++){
                    for(let j=0;j<str.length;j++){
                        if(str[j]._id==ids[i]){
                            strArr.push(str[j].name)
                        }
                        
                    }
                }
            return strArr
      }
      
    },
    created:function(){
        this.userid=this.$route.params.userid
        this.secrchTxtsLi() //原始表个数据

        // 查询文章总条数
        this.roverseArr()

         
    },
    computed:{
        tableDataB:function () { //初始化表格数据
            let tableDataStr=[]
              for(let i=0;i<this.tableData.length;i++){
                  
                //console.log(checkedArr)
                  let checkedB=this.tableData[i].checkedA.join(',')
                  let dataB=moment(this.tableData[i].data).format('YYYY-MM-DD')
                   let srcJson={}
                  if(this.clsList.length>0){
                     srcJson.classed= this.searchNames(this.clsList,this.tableData[i].classed)[0].name   
                  }
                  if(this.tablesList.length>0){
                      srcJson.checkedA=this.searchNamesB(this.tablesList,this.tableData[i].checkedA).join('，')  
                  }
                    srcJson.name=this.tableData[i].name
                    srcJson.data=dataB
                    srcJson.types= this.tableData[i].types== 1 ? '已发布' : '未发布'  
                    srcJson.bst=this.tableData[i].bst 
                    srcJson.bstName=this.tableData[i].bst==1? '富文本' : "MarkDown"  
                    
                    srcJson.id=this.tableData[i]._id
                    tableDataStr.push(srcJson)
                  
                 
              }
              //console.log(tableDataStr)
            return tableDataStr
        },
        clsList:function(){  //全部分类
            return this.$store.state.clsList
        },
        tablesList:function(){  //全部标签
            return this.$store.state.tablesList
        }
    },
    components:{
        Breadcrumb
    }
}
</script>


