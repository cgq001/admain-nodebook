<template>
    <div class="tables">
         <breadcrumb :breadcrumbs='breadcrumb'></breadcrumb>
        <!-- 添加项目 -->
        <el-form ref="TabForm" :model="formTab" label-width="150px" :rules="formTabs">
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="formTab.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目描述" prop="desc">
                <el-input v-model="formTab.desc" placeholder="请输入项目描述"></el-input>
            </el-form-item>
            <el-form-item label="项目预览地址" prop="addressA">
                <el-input v-model="formTab.addressA" placeholder="请输入项目预览地址"  show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="项目github地址" prop="addressB">
                <el-input v-model="formTab.addressB" placeholder="请输入项目github地址"  show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="" prop="icons">
                    <el-button-group>
                        <el-button v-for="(item,index) in options" :key="index" :icon="'iconfont '+item" @click="onIcon(index)"  :type="index==formTab.indexs ? 'primary' : ''"></el-button>
                    </el-button-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('TabForm')">创建项目</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import Breadcrumb from './breadcrumb/Breadcrumb'
export default {
    data(){
        return {
            breadcrumb:['项目管理','新增项目'],
            formTab:{
                name:'',
                desc:'',
                addressA:'',
                addressB:'',
                icons:'',
                indexs:-1,
            },
            formTabs:{  //验证规则
                name:[
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                    { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                ],
                desc:[
                    { required: true, message: '请输入项目描述', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                addressA:[
                    { required: true, message: '请输入项目预览地址', trigger: 'blur' }
                ],
                addressB:[
                    { required: true, message: '请输入项目github地址', trigger: 'blur' }
                ],
                icons:[
                    { required: true, message: '请选择图标', trigger: 'blur' }
                ]
            },
             options: ['icon-socialjavascript','icon-nodejs','icon-vuejs','icon-react','icon-app','icon-houtaishezhi','icon-jquery','icon-shengchengdaima','icon-css','icon-html5']
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
                    console.log(this.formTab)
                    this.$http({
                        method:'POST',
                        url: 'addCase',
                        data:this.formTab
                    }).then((res)=>{
                        if(res.data.code==0){
                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            //this.$store.commit('arrClsList',res.data.date)
                            this.formTab.name=''
                            this.formTab.desc=''
                            this.formTab.addressA=''
                            this.formTab.addressB=''
                            this.formTab.icons=''
                           
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
        },
        onIcon:function(index){
            this.formTab.indexs=index
            this.formTab.icons=this.options[index]
        }
        
    },
    components:{
        Breadcrumb
    }
}
</script>

<style scoped>

</style>
