<template>
    <div class="tables">
         <breadcrumb :breadcrumbs='breadcrumb'></breadcrumb>
        <!-- 添加管理员 -->
        <el-form ref="TabForm" :model="formTab" label-width="100px" :rules="formTabs">
            <el-form-item label="昵称" prop="users">
                <el-input v-model="formTab.users" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="formTab.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passwords">
                <el-input v-model="formTab.passwords" placeholder="请输入密码"  show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="desc">
                <el-select v-model="formTab.desc" placeholder="请选择权限">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('TabForm')">创建用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from '../axios.js'
import Breadcrumb from './breadcrumb/Breadcrumb'
export default {
    data(){
        let validateName=function(rule, value, callback){  //验证用户名是否存在
              axios({
                  url:'searchNames',
                  method:"POST",
                  data:{
                      name:value
                  }
                  }).then(res=>{
                      if(res.data.code==0){
                            if(res.data.data==0){
                                callback();
                            }else{
                                callback(new Error('用户名已存在'));
                            }
                        }else{
                            callback(new Error('未知错误'));
                        }
                  }).catch(error=>{
                       callback(new Error('未知错误'));
                  })  
                
        };
        let validatereg=function(rule, value, callback){   //验证用户名是否合法
                    let reg=/^[a-zA-Z][a-zA-Z0-9]{3,15}$/;  
                      if(reg.test(value)==true){
                            
                                callback();
                            
                        }else{
                            callback(new Error('用户名不合法(请输入数字或字母,必须以字母开头)'));
                        }
                 
                
        };
         let validatePassReg=function(rule, value, callback){   //验证密码是否合法
                    let reg=/^[a-zA-Z][a-zA-Z0-9]{6,30}$/;  
                      if(reg.test(value)==true){
                            
                                callback();
                            
                        }else{
                            callback(new Error('密码不合法(请输入数字或字母)'));
                        }
                 
                
        };
         let validateUserReg=function(rule, value, callback){   //验证昵称是否合法
                    let reg=/[\u4e00-\u9fa5_a-zA-Z0-9_]{2,15}/;  
                      if(reg.test(value)==true){
                                callback();     
                        }else{
                            callback(new Error('昵称不合法(请输入汉字、字母或数字)'));
                        }     
        };
        return {
            breadcrumb:['设置','管理控制','添加管理员'],
            formTab:{
                users:'',
                name:'',
                desc:'',
                passwords:'',
            },
            formTabs:{  //验证规则
                users:[
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' },
                    { validator: validateUserReg, trigger: 'blur' }
                ],
                name:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
                    { validator: validatereg, trigger: 'blur' },
                    { validator: validateName, trigger: 'blur' }
                ],
                passwords:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
                    { validator: validatePassReg, trigger: 'blur' }
                ],
                desc:[
                    { required: true, message: '请选择权限', trigger: 'blur' }
                ]
            },
             options: [{
                value: '1',
                label: '管理员'
                }, {
                value: '2',
                label: '测试账号'
                }]
            }    
    },
    methods:{
        onSubmit:function(formName){
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http({
                        method:'POST',
                        url: 'adduser',
                        data:this.formTab
                    }).then((res)=>{
                        console.log(res)
                        if(res.data.code==0){
                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            //this.$store.commit('arrClsList',res.data.date)
                            this.formTab.users=''
                            this.formTab.name=''
                            this.formTab.passwords=''
                            this.formTab.desc=''
                             this.$prompt('请输入邮箱', '是否发送用户名以密码到邮箱？', {
                                        confirmButtonText: '发送',
                                        cancelButtonText: '取消',
                                        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                                        inputErrorMessage: '邮箱格式不正确'
                                        }).then(({ value }) => {
                                            this.$message({
                                                type: 'success',
                                                message: '你的邮箱是: ' + value
                                            });
                                        }).catch(() => {
                                        this.$message({
                                            type: 'info',
                                            message: '取消发送'
                                        });       
                                    });
                        }else{
                             this.$message({
                                showClose: true,
                                message: '未知错误',
                                type: 'warning'
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
        
    },
    components:{
        Breadcrumb
    }
}
</script>

<style scoped>

</style>
