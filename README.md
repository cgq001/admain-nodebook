#### 项目地址：http://admain.nodebook.top
#### 需要配合  后台接口： https://github.com/cgq001/node-nodebook (具体需要自己修该简单的配置参数才能运行，有不明确的欢迎联系：QQ：2927756015)
# nuxt-admin

## 初始化
```
yarn install
```

### 运行
```
yarn serve
```

### 打包
```
yarn run build
```

### 测试
```
yarn run test
```

## element-UI 侧边栏导航
##### 1、侧边栏导航的路由跳转
    <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            active-text-color="#1890FF"
            @open="handleOpen"
            @close="handleClose"
            router  //开启路由模式
            :default-active="routerli"  //..对应路由
            >
            //..需要在要跳转的路由中 通过index指定跳转的地址
            <el-submenu index="2-1" class="acts">
                  <template slot="title">标签管理</template>
                  <el-menu-item index="/tablelist">全部表情</el-menu-item>
                  <el-menu-item index="/addtable">添加标签</el-menu-item>
            </el-submenu>
    </el-menu>
##### 2、关于element-UI 侧边栏导航的高亮无法对应三级路由的问题
    :default-active="routerli" //..element-ui 导航栏配置
    computed:{   //计算属性
        routerli:function(){
        // 对应路由
        let pathStr=this.$route.path.split('/')
            //console.log(pathStr)
            return '/'+pathStr[1]
        }
    }
    //方法分析：既然导航栏是根据返回的路由信息来高亮显示左侧菜单的，那既可以通过改变路由信息的返回值，来对象左侧导航   
##### 3、关于改变 侧边导航栏的 高亮样式
````
    //侧边导航栏，需要给 具体 导航的 父级 加 class "acts" 则可以修改 acts 下一级的is-active Class的样式来实现 高亮状态
    .tac .acts .is-active{
        background: #CFEEFD;
        border-right: 4px solid #06ADFB;
        box-sizing: border-box;
    }
````
##  关于axios 的拦截请求(配合element-UI动画)
    import axios from 'axios'
    import { Message,Loading } from 'element-ui';
    let loading;
    //开始动画
    function startLoading(){
        console.log('开始请求')
        loading=Loading.service({
            lock: true,
            text: '拼命加载中...',
            background: 'rgba(0,0,0,0.7)'
        })
    }
    //结束动画
    function endLoading(){
        console.log('结束请求')
        loading.close()
    }
#### 1、如果指定了名称的拦截请求，需要挂载在该名称上，否则无效(测试所得经验，无理论支持)
    let instance = axios.create({
        baseURL: 'http://127.0.0.1:5000/book/',
        timeout: 5000
    });
#### 2、挂载拦截器
    instance.interceptors.request.use(config=>{
        //加载动画
        startLoading()
        return config
    },error =>{
        return Promise.reject(error)
    })
    instance.interceptors.response.use(response=>{
        endLoading()
        return response;

    },error =>{
    endLoading()
    Message.error(error.response.data)
    return Promise.reject(error)
    })
##  关于element-ui
#### 1、关于element-ui  失去焦点时即刻验证用户名是否存在
    <el-form-item label="用户名" prop="name">
                <el-input v-model="formTab.name" placeholder="请输入用户名"></el-input>
    </el-form-item>
    //数据
        formTab:{
                name:''
            }
    //验证规则
    formTabs:{ 
        name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
            ] 
        }
    // 自定义用户名是否存在的规则validateName(这里的axios需要重新导入，无法使用Vue原型上挂载的this.axios)
    let validateName=function(rule, value, callback){
              axios({
                  url:'Name',
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
##  关于正则表达式
#### 1、验证中文、数字、字母、下划线
    reg=/[\u4e00-\u9fa5_a-zA-Z0-9_]{2,15}/; 
#### 2、验证字母、数字
    reg=/^[a-zA-Z][a-zA-Z0-9]{6,30}$/;
##  关于Token和自定义请求头
####  1、token存储
    //this.formTab.checked为是否选择了七天免登陆，根据此判断 是否永久存储token
     if(this.formTab.checked){
            window.localStorage.setItem('token',res.data.data)
        }else{
            window.sessionStorage.setItem('token',res.data.data)
        }
####  2、验证token
        //从本地存储中获取Toekn
            let token=''
            if(window.localStorage.getItem('token')){
              token=window.localStorage.getItem('token')
            }else if(window.sessionStorage.getItem('token')){
              token=window.sessionStorage.getItem('token')
            }else{
              token=''
            }
        //发送验证请求
        if(token){
         this.$http({
              url:'Token',
              methos: 'POST',
              headers:{   //自定义 请求头(携带Token)
                'Authorization':token
              }
            }).then(res=>{
              console.log(res.data)
            }).catch(error=>{
              console.log('error')
            })
        }
##  关于权限配置，简易版
    //Router路由中：
    {   //新增分类
          path:'addclass,
          name: 'Addclass',
          component:Addclass,
          meta:{
            requiresAuth:2
          }
    }
    //全局导航守卫
````
    routers.beforeEach((to,from,next)=>{
      if (to.path === '/loading') {
            next();
          } else {
            let desc= store.state.power;  //获取本用户的权限
            let meats=to.meta.requiresAuth  //获取路由写入权限
              if(desc>=to.meta.requiresAuth){  //逻辑
                next()
              }else{
                next('/')
              }
              // to.matched.some(
              //   r => {
              //     console.log(r.meta.requiresAuth)  查看是否存在权限
              //   })
          }
    })
````
##  关于MarkDown编辑器 mavon-editor
#### 1、安装：
    npm install mavon-editor --save
#### 2、全局注册
    // 全局注册
    // import with ES6
    import Vue from 'vue'
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    // use
    Vue.use(mavonEditor)
####  3、使用
     <mavon-editor v-model="value"/>
####  4、如何将获取到的MakeDown内容，下载保存之本地文件？(代码参考别人的)
````
    function saveShareContent (content, fileName) {
        let downLink = document.createElement('a')
        downLink.download = fileName
        //字符内容转换为blod地址
        let blob = new Blob([content])
        downLink.href = URL.createObjectURL(blob)
        // 链接插入到页面
        document.body.appendChild(downLink)
        downLink.click()
        // 移除下载链接
        document.body.removeChild(downLink)
    }
````
#####  5、HTML5 原生的download属性
````
 原理：content是需要下载的内容
 fileName是保存的文件的名字
 原理就是利用Blob对象把需要下载的内容转换为二进制，然后借助<a>标签的href属性和download属性，实现下载
````
####  6、仅做展示：
````
<mavon-editor :boxShadow='false' :defaultOpen='previews' :subfield="false" :toolbarsFlag='false'  v-model="txt"/>
````
