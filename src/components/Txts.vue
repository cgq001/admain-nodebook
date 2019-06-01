<template>
    <div :class="[split.D==1 ? 'txts' : 'txtsB']">
        <!-- 富文本编辑器 -->
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark txt-title">
                   <el-col :xs="{span: 12, offset: 12}" :sm="{span: 8, offset: 16}" :md="{span: 6, offset: 18}" :lg="{span: 4, offset: 20}" :xl="{span: 3, offset: 21}">
                       <div class="grid-content bg-purple-light btns">
                           <i class="iconfont icon-quanping btns-icon" title="全屏" @click="splitD"></i>
                           <i class="iconfont icon-xie btns-icon" title="写作" @click="splitA"></i>
                           <i class="iconfont icon-wenbentext72 btns-icon" title="分屏" @click="splitB"></i>
                           <i class="iconfont icon-yulan btns-icon" title="预览" @click="splitC"></i>
                       </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="split.A">
                <div class="grid-content bg-purplet">
                    <quill-editor
                        :class="[split.D==1 ? 'txt-left' : 'txt-leftB']" 
                        v-model="content" 
                        ref="myQuillEditor" 
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </div>
            </el-col>
            <el-col :span="split.B" class="txt-ls">
                <div class="grid-content bg-purple-light txt-right">
                    <el-container>
                        <el-header class="add-heads" v-bind:style="{borderLeft: split.B===24 ? '1px solid #ccc' : ' 0px solid #ccc' }">实时效果</el-header>
                        <el-main  :class="[split.D==1 ? 'add-main' : 'add-mainB']"  v-bind:style="{borderLeft: split.B===24 ? '1px solid #ccc' : ' 0px solid #ccc' }">
                           <div class="ql-container ql-snow">
                                <div class="ql-editor">
                                    <div v-html="content"></div>
                                </div>
                            </div>
                        </el-main>
                    </el-container>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
 import '../assets/fontsize/fonttxt.css';
 import '../assets/css/vue-quill.css'
 import { quillEditor } from 'vue-quill-editor'
 import * as Quill from 'quill'  //引入编辑器

    import "quill/dist/quill.core.css";//
    import "quill/dist/quill.snow.css";
 //设置字体
    let fonts = ['SimSun'];  
    let Font = Quill.import('formats/font');  
    Font.whitelist = fonts; //将字体加入到白名单 
    Quill.register(Font, true);

//设置图片推拽上传
import { ImageDrop } from 'quill-image-drop-module';
import { request } from 'http';
    
Quill.register('modules/imageDrop', ImageDrop);

//quill图片可拖拽改变大小
// const ImageResize = require('../../node_modules/_quill-image-resize-module@3.0.0@quill-image-resize-module/image-resize.min.js')
    // import  ImageResize  from 'quill-image-resize-module'
    
    // Quill.register('modules/imageResize', ImageResize)

// 菜单工具栏配置
let toolbarList=[
    ['bold','italic','underline','strike','blockquote','code-block'],
    [{'header':1},{'header':2}],
    [{ 'list': 'ordered'}, { 'list': 'bullet' },{ 'indent': '-1'}, { 'indent': '+1' },{ 'color': [] }, { 'background': [] },{ 'align': [] }],
    ['image','clean'],
    [{ 'font': fonts }]
]

// 上传图片配置
/*富文本编辑图片上传配置*/
const uploadConfig = {
    action:  'http://api.nodebook.top/bookadmin/src-imgs',  // 必填参数 图片上传地址
    methods: 'POST',  // 必填参数 图片上传方式
    // token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    name: 'imgstr',  // 必填参数 文件的参数名
    size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'  // 可选 可上传的图片格式
};

const handlers = {
    image: function image() {
        var self = this;
 
        var fileInput = this.container.querySelector('input.ql-image[type=file]');
        if (fileInput === null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            // 设置图片参数名
            if (uploadConfig.name) {
                fileInput.setAttribute('name', uploadConfig.name);
            }
            // 可设置上传图片的格式
            fileInput.setAttribute('accept', uploadConfig.accept);
            fileInput.classList.add('ql-image');
            // 监听选择文件
            fileInput.addEventListener('change', function () {
                // 创建formData
                var formData = new FormData();
                formData.append(uploadConfig.name, fileInput.files[0]);
                formData.append('object','product');
                // 如果需要token且存在token
                // if (uploadConfig.token) {
                //     formData.append('token', uploadConfig.token)
                // }
                // 图片上传
                var xhr = new XMLHttpRequest();
                xhr.open(uploadConfig.methods, uploadConfig.action, true);
                // 上传数据成功，会触发
                xhr.onload = function (e) {
                    if (xhr.status === 200) {
                        var res = JSON.parse(xhr.responseText);
                        let length = self.quill.getSelection(true).index;
                        //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。 
                       // console.log(res)           
                        self.quill.insertEmbed(length, 'image', res.url);
                        self.quill.setSelection(length + 1)
                    }
                    fileInput.value = ''
                };
                // 开始上传数据
                xhr.upload.onloadstart = function (e) {
                    fileInput.value = ''
                };
                // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
                xhr.upload.onerror = function (e) {
                };
                // 上传数据完成（成功或者失败）时会触发
                xhr.upload.onloadend = function (e) {
                    // console.log('上传结束')
                };
                xhr.send(formData)
            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    }
};



export default {
    data(){
        return{
            content:null,
            editorOption:{
                placeholder:"我们开始写文章吧",
                modules:{
                       
                        toolbar:{
                            container: toolbarList, // 工具栏选项  
                            handlers: handlers  // 事件重写 
                        }, //配置工具栏
                        imageDrop:true //图片拖拽上传
                        // imageResize: {} 
                    }
            },
            theme:'bubble',
            split:{
                A:12,
                B:12,
                D:1
            },
            imgUrl:process.env.VUE_APP_IMGURL
        }
    },
    methods:{
            onEditorBlur:function(ev){//失去焦点事件
               // console.log(ev.html)
            },
            onEditorFocus:function(ev){//获得焦点事件
               // console.log(ev.html)
            },
            onEditorChange:function(ev){//内容改变事件
               // this.$emit('addTxt',ev.html)
               this.$store.commit('addtx',ev.html)

            },
            splitA:function(){  //写作
                    this.split.A=24,
                    this.split.B=0 
            },
            splitB:function(){  //分屏
                    this.split.A=12,
                    this.split.B=12
            },
            splitC:function(){  //预览
                    this.split.A=0,
                    this.split.B=24
            },
            splitD:function(){
                //console.log(this.split.D)
                    this.split.D= -this.split.D
            }
        
    },
    components:{
        quillEditor
    },
    computed:{
        tx:function(){
            return this.$store.state.tx
        }
    },
    watch:{
        tx:function(news,olds){
            if(news.length<1){
                this.content=news
            }
        }
    }
}

</script>

<style scoped>
.txts{
    width: 100%;
    height: 700px;  
}
.txtsB{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0; 
    z-index: 5;
    background: #ffffff; 
}
.add-heads{
    border-top:  1px solid #ccc;
    border-right:  1px solid #ccc;
    border-bottom:  1px solid #ccc;
    height: 58px !important;
    text-align: center;
}
.add-main{
    padding: 0px 10px;
    border-right:  1px solid #ccc;
    border-bottom:  1px solid #ccc;
    overflow-y: scroll;
    height: 600px;
    background: #F7F5F5;
}
.add-mainB{
    padding: 0px 10px;
    border-right:  1px solid #ccc;
    border-bottom:  1px solid #ccc;
    overflow-y: scroll;
    height: calc(100vh - 100px);
    background: #F7F5F5;
}
.txt-title{
    background: #CCCCCC;
    width: 100%;
    height: 40px;
    border-radius: 10px 10px 0 0;
}
.btns{
    height: 40px;
    display: flex;
    justify-content: space-around;
}
.btns-icon{
    display: inline-block;
    cursor: pointer;
    color:#000000;
}
.txt-left{
    height: 600px;
}
.txt-leftB{
    height: calc(100vh - 100px);
}
.ql-container{
    border: none !important;
}
</style>
