<template>
    <div class="loads">
        <div class="loads-box">
            <!-- 登陆 -->
            <el-form ref="TabForm" :model="formTab" label-width="0" :rules="formTabs">
                <el-form-item prop="name">
                    <el-input v-model="formTab.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="passwords">
                    <el-input  v-model="formTab.passwords" placeholder="请输入密码"  show-word-limit></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="8">    
                        <el-checkbox v-model="formTab.checked">七天免登陆</el-checkbox>
                    </el-col>
                    <el-col :span="8" class="texts">
                        <el-link :underline="false" type="primary" @click="onTest"  icon="el-icon-finished">测试登陆</el-link>
                    </el-col>
                    <el-col :span="8" class="passwords">
                        <el-link :underline="false" type="danger" @click="onForget">忘记密码？</el-link>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('TabForm')">登陆</el-button>
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
                                callback();
                            }else{
                                callback(new Error('用户名不存在'));
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
        return {
            formTab:{
                name:'',
                passwords:'',
                checked:false
            },
            formTabTsxt:{
                name:'test',
                passwords:'test1234',
                checked:false
            },
            formTabs:{  //验证规则
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
                ]
            }
            }    
    },
    methods:{
        onSubmit:function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http({
                        method:'POST',
                        url: 'loadUser',
                        data:this.formTab
                    }).then((res)=>{
                        //console.log(res)
                        if(res.data.code==0){   
                                if(this.formTab.checked){
                                    window.localStorage.setItem('token',res.data.data)
                                }else{
                                    window.sessionStorage.setItem('token',res.data.data)
                                }
                            this.formTab.name=''
                            this.formTab.passwords=''
                            this.formTab.checked=false
                           // this.$store.commit('addtoken',res.data.date)
                           // this.$router.push('/')
                            this.onLoading()
                          
                        }else{
                             this.$message({
                                showClose: true,
                                message: '用户名或密码错误',
                                type: 'warning'
                            });
                            // this.formTab.name=''
                            this.formTab.passwords=''
                        }
                    })
                } else {
                   // console.log('error submit!!');
                    return false;
                }
            });
        },
        onTest:function(){   //测试登陆
                this.$http({
                        method:'POST',
                        url: 'loadUser',
                        data:this.formTabTsxt
                    }).then((res)=>{
                        //console.log(res)
                        if(res.data.code==0){   
                                if(this.formTabTsxt.checked){
                                    window.localStorage.setItem('token',res.data.data)
                                }else{
                                    window.sessionStorage.setItem('token',res.data.data)
                                }
                           
                           // this.$store.commit('addtoken',res.data.date)
                           // this.$router.push('/')
                            this.onLoading()
                          
                        }else{
                             this.$message({
                                showClose: true,
                                message: '用户名或密码错误',
                                type: 'warning'
                            });
                            // this.formTab.name=''
                            this.formTab.passwords=''
                        }
                    })
        },
        onLoading:function(){
                let token=null
                     if(window.localStorage.getItem('token')){
                            token=window.localStorage.getItem('token')
                        }else if(window.sessionStorage.getItem('token')){
                            token=window.sessionStorage.getItem('token')
                        }else{
                            token=null
                        }
                    // console.log(token)

                        if(token){
                            this.$http({
                                url:'rulesToken',
                                methos: 'GET',
                                headers:{
                                    'Authorization':token
                                }
                                }).then(res=>{
                                
                                    if(res.data.code==0){
                                        this.$message({
                                                showClose: true,
                                                message: '登陆成功',
                                                type: 'success'
                                            });
                                        this.$store.commit('adduser',res.data.msg)
                                        this.$router.push('/')

                                    }else{
                                        this.$message({
                                                showClose: true,
                                                message: '登陆失败',
                                                type: 'success'
                                            });
                                        window.localStorage.clear()
                                        window.sessionStorage.clear()
                                    }
                                }).catch(error=>{
                                      //   this.$message.error('Token过期，请重新登陆');
                                   /// this.$router.push('/load')
                                   window.localStorage.clear()
                                   window.sessionStorage.clear()
                                })
                        }
        },
        onForget:function(){
            this.$router.push('/register')
        }
        
    },
    components:{

    },
    created:function(){  //验证Token
            
            this.onLoading()
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
    height: 300px;
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
