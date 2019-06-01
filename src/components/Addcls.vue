<template>
    <div class="tables">
        <breadcrumb :breadcrumbs='breadcrumb'></breadcrumb>
        <el-form ref="TabForm" :model="formTab" label-width="100px" :rules="formTabs">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="formTab.name" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item label="描述信息" prop="desc">
                <el-input type="textarea" v-model="formTab.desc" placeholder="请输入分类的描述信息"  maxlength="30" show-word-limit></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('TabForm')">创建分类</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Breadcrumb from './breadcrumb/Breadcrumb'
export default {
    data(){
        return {
            breadcrumb:['标记管理','分类管理','添加分类'],
            formTab:{
                name:'',
                desc:''
            },
            formTabs:{
                name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                ],
                desc:[
                    { required: true, message: '请输入分类的描述信息', trigger: 'blur' },
                    { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
                ]
            }
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
                        url: 'addcls',
                        data:this.formTab
                    }).then((res)=>{
                        console.log(res)
                        if(res.data.code==0){
                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$store.commit('arrClsList',res.data.date)
                            this.formTab.name=''
                            this.formTab.desc=''
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
