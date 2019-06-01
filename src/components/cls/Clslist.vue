<template>
    <div class="tables-box">
        <breadcrumb :breadcrumbs='breadcrumb'></breadcrumb>
        <!-- 全部分类 -->
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
            prop="name"
            label="分类名"
            >
            </el-table-column>
            <el-table-column
            prop="desc"
            label="描述"
            >
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
                <el-button  @click="handleClickC(scope.row)" type="text" size="small">查看</el-button>
                <el-button  @click="handleClickA(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleClickB(scope.row)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑标签" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleFormX">
                <el-form-item label="标签名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签描述" :label-width="formLabelWidth" prop="desc">
                    <el-input type="textarea" v-model="form.desc" autocomplete="off" maxlength="30" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialog('ruleFormX')">确 定</el-button>
            </div>
        </el-dialog>
         <el-row class="foots">
                <el-col :xs="{span: 24}" :sm="{span: 18}" :md="{span: 12, offset: 8}" :lg="{span: 8, offset: 12}" :xl="{span: 6, offset: 16}" justify="end">
                    <div class="grid-content bg-purple-dark">
                            <el-pagination
                                background
                                layout="prev, pager, next"
                                :total="Numbers"
                                :page-size='NumStr'
                                :pager-count='5'
                                @current-change="handleCurrentChange"
                                :hide-on-single-page="Numbers/NumStr>1 ? false : true ">
                            </el-pagination>
                    </div>
                </el-col>
        </el-row>
    </div>
</template>

<script>
import Breadcrumb from '../breadcrumb/Breadcrumb'
export default {
    data() {
      return {
        breadcrumb:['标记管理','分类管理','全部分类'],
        tableData: [],  //初始化数据
        form: {        //当前编辑标签的数据
          name: '',
          desc: ''
         },
         rules: {
            name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
            ],
            desc: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
            ]
         },
        dialogTableVisible: false,  
        dialogFormVisible: false,
        formLabelWidth: '120px',   //弹层高度
        Index:0,   //获取编辑便签的index
        rowId:0, //获取编辑便签的ID
        Numbers:1, //总页码
        NumStr:10   //每页娴熟数量
      }
    },
    created:function(){
        // 初始化查询标签数据
        this.pageStr()
        // 查询总条数
       this.numbersArr()
    },
    methods:{
        handleClickC:function(row){
            //console.log(row._id)
            this.$router.push('/cls/clstextlist/'+row._id)
        },
        handleClickA:function(row){  //编辑按钮
        //console.log(this.tableData)
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
             for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i]['_id']==row._id){
                             let froms=JSON.stringify(this.tableData[i])
                                this.form=JSON.parse(froms)
                            this.Index=i
                        }
                    }
            this.rowId=row._id
            this.dialogFormVisible = true
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
            this.$confirm('此操作将永久删除该标签, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$http({
                        url:'searchTpyesNum',
                        method:'POST',
                        data:{
                            id:row._id
                        }
                    }).then(res=>{
                        //console.log(res.data)
                        if(res.data.code==0){
                            if(res.data.data>0){
                                this.$confirm('此分类下还有文章，无法删除', '提示', {
                                    confirmButtonText: '查看文章',
                                    cancelButtonText: '知道了',
                                    type: 'warning'
                                    }).then(() => {
                                         this.$router.push('/cls/clstextlist/'+row._id)
                                    }).catch(() => {
                                    this.$message({
                                            type: 'info',
                                            message: '取消删除操作!'
                                        });         
                                });
                            }else{
                                this.$http({
                                    url:'deleteClsli',
                                    method:'POST',
                                    data:{
                                        id:row._id
                                    }
                                }).then(res=>{
                                    if(res.data.code==0){
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
                                            for(let i=0;i<this.tableData.length;i++){
                                                if(this.tableData[i]['_id']==row._id){
                                                    this.tableData.splice(i,1) 
                                                    }
                                                }
                                            this.$store.commit('deleteCls',row._id)
                                            this.numbersArr()
                                    }else{
                                        this.$message.error('未知错误');
                                    }
                                }).catch(()=>{
                                    this.$message.error('未知错误');
                                })
                            }
                        }
                    }).catch(()=>{
                        this.$message.error('未知错误');
                    })
                        
                            
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleDialog:function(formName){  //编辑弹层的确定按钮
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                    
                    this.$http({
                        url:'updateCls',
                        method:'POST',
                        data:{
                            forms:this.form
                        }
                    }).then(res=>{
                        //console.log(res)
                        if(res.data.code==0){
                            this.dialogFormVisible = false
                            this.tableData.splice(this.Index,1,this.form)
                             this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$store.commit('undateClas',this.form)
                            
                        }else{
                            this.dialogFormVisible = false
                            this.$message.error('未知错误');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });  
        },
        pageStr:function(num=1){ // 查询标签
            this.$http({
                method:'POST',
                url: 'searchClsLists',
                data:{
                    NumStr:this.NumStr,
                    num:num
                }
            }).then((res)=>{
                this.tableData=res.data.data
            })
        },
        handleCurrentChange:function(row){  //页码切换
              this.pageStr(row)
        },
        numbersArr:function(){  // 查询总条数
            
            this.$http({
                    method:'POST',
                    url: 'clsNumber'
                }).then((res)=>{
                    this.Numbers=res.data.data
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
</style>
