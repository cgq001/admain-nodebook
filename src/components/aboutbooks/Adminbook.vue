<template>
    <div class="box-books">
        <el-row>
            <el-col :span="24">
                 <div class="grid-content bg-purple-dark">
                     <el-link type="primary">后端-关于本站(添加)</el-link>
                </div>
                <el-divider></el-divider>
            </el-col>
            <el-col :span="24">
                 <el-form  :model="form" label-width="100px" :rules="ruleForm" ref="ruleForms">
                    <el-form-item label="大事记:" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="时间:" prop="desc">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.desc" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForms')">立即添加</el-button>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <el-link type="primary">后端-关于本站(详情)</el-link>
                    </div>
                    <el-divider></el-divider>
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                        type="index"
                        width="80"
                        label="序号">
                        </el-table-column>
                        <el-table-column
                            prop="desc"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="大事记">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClickA(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="handleClickB(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                            </el-table-column>
                    </el-table>
                </el-col>
            </el-col>
        </el-row>
        <el-dialog title="编辑状态" :visible.sync="dialogFormVisible">
          
                <el-form  :model="formB" label-width="100px" :rules="ruleForm" ref="ruleFormsB">
                    <el-form-item label="大事记:" prop="name">
                        <el-input v-model="formB.name"></el-input>
                    </el-form-item>
                    <el-form-item label="时间:" prop="desc">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formB.desc" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-form>
           
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFormB('ruleFormsB')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form:{  //创建状态
                name:'', //大事记
                desc:'',  //日期
                types: '2'  // 1为前端关于 2为后端关于
            },
            ruleForm:{   //验证规则
                name:[
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                desc:[
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ]
            },
            tableData:[],  //初始化 数据
            formB:{  //编辑状态
                name:'', //大事记
                desc:'',  //日期
                types: '2'  // 1为前端关于 2为后端关于
            },
            dialogFormVisible:false  //控制弹出层
        }
    },
    methods:{
        submitForm:function(ruleForms){   //创建大事记
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
            this.$refs[ruleForms].validate((valid) => {
                if (valid) {
                   console.log(this.form)
                    this.$http({
                        url:'addAbout',
                        method:"POST",
                        data:{
                            str:this.form
                        }
                    })
                    .then(res=>{
                        this.tableData.push(res.data.data)
                        this.form.name='',
                        this.form.desc=''
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
        },
        submitFormB:function(ruleForms){   //修改数据
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
            this.$refs[ruleForms].validate((valid) => {
                if (valid) {
                   console.log(this.form)
                    this.$http({
                        url:'undateAbout',
                        method:"POST",
                        data:{
                            str:this.formB
                        }
                    })
                    .then(res=>{
                        // this.tableData.push(res.data.data)
                        if(res.data.code==0){
                            for(let i=0;i<this.tableData.length;i++){
                                   if(this.tableData[i]['_id']==this.formB._id){
                                        this.tableData[i].name=this.formB.name
                                        this.tableData[i].desc=this.formB.desc
                                    }
                                } 
                             this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            this.dialogFormVisible=false
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
        },
        handleClickB:function(row){  //删除
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
                this.$confirm('此操作将永久删除该选择, 是否继续?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            this.$http({
                                    url:'allAbout',
                                    method:'POST',
                                    data:{
                                        id:row._id
                                    }
                                }).then(res=>{
                                   for(let i=0;i<this.tableData.length;i++){
                                        if(this.tableData[i]['_id']==row._id){
                                            this.tableData.splice(i,1) 
                                            }
                                        } 
                                   this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
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
        handleClickA:function(row){  //编辑
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
                this.dialogFormVisible=true
                this.Indexs=''
                this.formB.name=row.name
                this.formB.desc=row.desc
                this.formB._id=row._id
                this.formB.types=row.types
        }
    },
    created:function(){
        this.$http({
            url:'allAbout',
            method:'POST',
            data:{
                types:this.form.types
            }
        }).then(res=>{
            this.tableData=res.data.data
        }).catch(()=>{

        })
    }
}
</script>

<style scoped>
.box-books{
    height: 100%;
}
</style>
