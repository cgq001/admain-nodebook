<template>
    <div class="box">
        <breadcrumb :breadcrumbs='breadcrumb' class="box-title"></breadcrumb>
        <!-- 新建文章页面 -->
        <el-row class="conts">
            <!-- <el-col class="write-btns" :xs="{span: 8, offset: 8}" :sm="{span: 6, offset: 12}" :md="{span: 4, offset: 16}" :lg="{span: 3, offset: 18}" :xl="{span: 2, offset: 20}">
                <div class="grid-content bg-purple-dark">
                    <el-button type="success" @click="submitForm('ruleForm')">保存草稿</el-button>
                </div>
            </el-col>
            <el-col class="write-btns" :xs="{span: 8, offset: 16}" :sm="{span: 6, offset: 18}" :md="{span: 4, offset: 20}" :lg="{span: 3, offset: 21}" :xl="{span: 2, offset: 22}" justify="end">
                <div class="grid-content bg-purple-dark">
                    <el-button type="success" @click="submitForm('ruleForm')">发布文章</el-button>
                </div>
            </el-col> -->
            <el-col class="write-btns" :xs="{span: 8, offset: 8}" :sm="{span: 6, offset: 12}" :md="{span: 4, offset: 16}" :lg="{span: 3, offset: 18}" :xl="{span: 2, offset: 20}" justify="end">
                <div class="grid-content bg-purple-dark">
                    <el-button type="info" @click="submitForm('ruleForm','2')">保存草稿</el-button>
                </div>
            </el-col>
            <el-col class="write-btns" :xs="{span: 8}" :sm="{span: 6}" :md="{span: 4}" :lg="{span: 3}" :xl="{span: 2}" justify="end">
                <div class="grid-content bg-purple-dark">
                    <el-button type="success" @click="submitForm('ruleForm','1')">发布文章</el-button>
                </div>
            </el-col>
        </el-row>
        <el-form ref="ruleForm" :model="form" label-width="100px" :rules="rulesform">
            <el-form-item label="文章标题:" prop="name">
                <el-input v-model="form.name" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章描述:" prop="introduction">
                <el-input type="textarea" v-model="form.introduction" placeholder="请简要描述文章内容"  maxlength="150" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="文章分类:" prop="classed">
                <el-select v-model="form.classed" placeholder="请选择文章分类">
                    <el-option v-for="(item,index) in clsList" :key="index"  :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="贴个标签:" prop="checkedA">
            <!-- <div class="write-table"> -->
                    <!-- <span class="write-table-list">标签一</span> -->
                    <!-- <el-checkbox-group v-model="form.checkedA" class="write-table">
                        <el-checkbox  v-for="(item,index) in tablesList" :key="index" :label="item.name" border class="checkli" :value="item.name"></el-checkbox>
                    </el-checkbox-group> -->
                    
                    <el-select
                        v-model="form.checkedA"
                        multiple
                        :size="modes"
                        allow-create
                        class="selectCls"
                        :multiple-limit="multipleLimit"
                        default-first-option
                        placeholder="贴个标签">
                        <el-option
                        v-for="item in tablesList"
                        :key="item.value"
                        :label="item.name"
                        :value="item._id">
                        </el-option>
                    </el-select>
                    
            <!-- </div> -->
            </el-form-item>
            <el-form-item label="文章内容:" prop="tx">
                <div class="write-texts">
                    <write-txts v-model="form.tx"></write-txts>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import writeTxts from '@/components/Txts'
import Breadcrumb from './breadcrumb/Breadcrumb'
export default {
    data(){
        return {
            breadcrumb:['文章管理','添加文章'],
            form:{  //表单数据
                name:'',  //文章名称
                introduction:'',  //文章简介
                classed:'',  //文章分类
                checkedA:[],  //文章标签
                tx:'' ,  //文章内容
                bst: 1 //1为富文本编辑器，2为markDown
            },
            rulesform:{ //校验规则
                name:[
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                introduction:[
                    { required: true, message: '请输入文章简介', trigger: 'blur' },
                    { min: 10, max: 150, message: '长度在 10 到 150 个字符', trigger: 'blur' }
                ],
                classed:[
                    { required: true, message: '请选择文章分类', trigger: 'change' }
                ],
                checkedA:[
                    { type: 'array', required: true, message: '请至少选择一个文章标签', trigger: 'change' }
                ],
                tx:[
                    { required: true, message: '请输入文章内容', trigger: 'blur' }
                ]
            },
            // clsList:[], //分类列表
            // tablesList:[], //标签列表
            modes:'mini',
            multipleLimit:5  //标签最多选择个数
        }
    },
    components:{
        writeTxts,
        Breadcrumb
    },
    methods:{
        // txts:function(tx){
        //     this.form.tx=tx
        // },
        submitForm(formName,tp) {  //提交表单
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
             // console.log(this.form)
            // 存储文章
            this.$http({  
                method:'POST',
                url: 'addwrite',
                data:{
                    forms:this.form,
                    types:tp
                }
            }).then((res)=>{
                //console.log(res.data)
                if(res.data.code==0){
                    this.$notify({
                        title: '成功',
                        message: '文章发布成功',
                        type: 'success'
                        });
                    this.form.name=''
                    this.form.introduction=''
                    this.form.classed=''
                    this.form.checkedA=[]
                    this.$store.commit('addtx','')
                }else{
                    this.$notify.error({
                        title: '错误',
                        message: '未知错误'
                    });
                }
            })
          } else {
            //console.log(this.form);
            return false;
          }
        });
      }
    },
    created:function(vm){
        // // 查询全部分类
        // this.$http({  
        //         method:'POST',
        //         url: 'searchtable'
        //     }).then((res)=>{
        //         //console.log(res.data.data)
        //         this.tablesList=res.data.data
        //     })
        // // 查询全部标签
        // this.$http({
        //         method:'POST',
        //         url: 'searchcls'
        //     }).then((res)=>{
        //         //console.log(res.data.data)
        //         this.clsList=res.data.data
        //     })
      
    },
    computed:{
        formtx :function(){
            return this.$store.state.tx
        },
        clsList:function(){
            return this.$store.state.clsList
        },
        tablesList:function(){
            return this.$store.state.tablesList
        }
    },
    watch:{
        formtx:function(news,olds){
            this.form.tx=news
        }
    }
}
</script>

<style scoped>
.box{
    overflow-y:scroll;
}
.write-table{
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    padding: 10px 10px;
}
.write-table-list{
    padding: 0px 20px;
    font-size: 12px;
    border: 1px solid #DCDFE6;
    border-radius: 20px;
    cursor: pointer;
    margin-right: 15px;
    display: inline-block;
    margin-bottom: 10px;
    background: #DCDFE6;
    line-height: 25px;
}
.write-texts{
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    padding: 10px 10px;
}
.write-btns{
    margin-bottom: 5px;
}
.checkli{
    border-radius: 10px;
    margin-bottom: 10px;
}

.selectCls{
    width: 100%;
}


.box-title{
    overflow-y: hidden;
}
</style>
