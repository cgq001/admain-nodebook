<template>
    <div class="loads">
        <div class="loads-box">
            <!-- 注册 -->
            <el-form ref="TabForm" :model="formTab" label-width="0" :rules="formTabs">
                <el-form-item  prop="users">
                    <el-input v-model="formTab.users" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="formTab.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="passwords">
                    <el-input  v-model="formTab.passwords" placeholder="请输入密码"  show-word-limit></el-input>
                </el-form-item>
                <el-form-item prop="desc">
                    <el-select v-model="formTab.desc" placeholder="请选择权限">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="numbers">
                    <el-input v-model="formTab.numbers" placeholder="请输入授权码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('TabForm')">注册</el-button>
                </el-form-item>
            </el-form>    
        </div>
    </div>
</template>

<script>
import axios from '../axios.js'
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
                            if(res.data.data>0){
                                callback(new Error('用户名已存在'));
                            }else{
                                callback();
                                
                            }
                        }else{
                            callback(new Error('未知错误2'));
                        }
                  }).catch(error=>{
                       callback(new Error('未知错误1'));
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
            formTab:{
                users:'',
                name:'',
                passwords:'',
                desc:'',
                numbers:''
            },
            formTabTsxt:{
                name:'test',
                passwords:'test1234',
                checked:false
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
                ],
                numbers:[
                    { required: true, message: '请输入授权码', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http({
                        method:'POST',
                        url: 'adduser',
                        data:this.formTab
                    }).then((res)=>{
                       
                        if(res.data.code==0){
                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$router.push('/')
                        }else if(res.data.code==2){
                            this.$message.error('授权码错误');
                        }else{
                            this.$message.error('未知错误');
                        }
                        this.formTab.users=''
                        this.formTab.name=''
                        this.formTab.passwords=''
                        this.formTab.numbers=''
                    }).catch(()=>{

                    })
                }else{

                }

            })
        }
        
    },
    components:{

    },
    created:function(){ 
            
            
  }
}
</script>

<style scoped>
.loads{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loads-box{
    width: 420px;
    height: 400px;
    padding: 20px 20px;
}
.loads-box .el-button--primary{
    width: 100%;
}
.texts{
    text-align: center;
}
.passwords{
    text-align: right;
}
</style>
