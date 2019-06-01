<template>
  <div class="hello">
    <!-- 侧边导航栏，需要给 具体 导航的 父级 加 class "acts" 则可以修改高亮状态 -->
    <!-- 关于 三级路由  不匹配侧边栏的问题，需要 对 返回的路由对象 进行重新改写,见 computed=> routerli -->
      <el-row class="tac">
        <el-col :span="24">
          <div class="names">
            <div class="names-A">{{names}}</div>
            <div class="names-B" @click="escUser">退出</div>
          </div>
         
          <el-menu
            class="el-menu-vertical-demo"
            active-text-color="#1890FF"
            @open="handleOpen"
            @close="handleClose"
            router 
            :default-active="routerli">
            <el-submenu index="1" class="acts">
              <template slot="title">
                <i class="el-icon-collection"></i>
                <span>文章管理</span>
              </template>
                <el-menu-item index="/textlist">文章列表</el-menu-item>
                <el-menu-item index='/draft'>草稿箱</el-menu-item>
                <el-menu-item index='/markdowns'>MarkDown编辑</el-menu-item>
                <el-menu-item index="/write">富文本编辑</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-collection-tag"></i>
                <span>标记管理</span>
              </template>
                <el-submenu index="2-1" class="acts">
                  <template slot="title">标签管理</template>
                  <el-menu-item index="/tablebox">全部标签</el-menu-item>
                  <el-menu-item index="/addtable">添加标签</el-menu-item>
                </el-submenu>
                <el-submenu index="2-2" class="acts">
                  <template slot="title">分类管理</template>
                  <el-menu-item index="/cls">全部分类</el-menu-item>
                  <el-menu-item index="/addcls">添加分类</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="4" class="acts">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>评论管理</span>
              </template>
                <el-menu-item index="/commonts">文章评论</el-menu-item>
            </el-submenu>
            <el-submenu index="5" class="acts">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>项目管理</span>
              </template>
                <el-menu-item index="/caseall">全部项目</el-menu-item>
                <el-menu-item index="/case">新增项目</el-menu-item>
            </el-submenu>
             <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>设置</span>
                </template>
                <el-submenu index="6-1" class="acts">
                  <template slot="title">个人中心</template>
                  <el-menu-item index="/userimg">个人资料</el-menu-item>
                </el-submenu>
                <el-submenu index="6-2" class="acts">
                  <template slot="title">管理控制</template>
                  <el-menu-item index="/userlist">全部管理员</el-menu-item>
                  <el-menu-item index="/aboutbook">本站信息</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="7" class="acts">
              <template slot="title">
                <i class="el-icon-info"></i>
                <span>关于本站</span>
              </template>
                <el-menu-item index="/abouts">关于本站</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  props: {
    
  },
  methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
       //console.log(key, keyPath);
      },
      escUser:function(){
          window.localStorage.clear()
          window.sessionStorage.clear()
          this.$router.push('/load')
      }
  },
  computed:{
    routerli:function(){
      // 对应路由
      let pathStr=this.$route.path.split('/')
           //console.log(pathStr)
           return '/'+pathStr[1]
      
    },
    names:function(){
      return this.$store.state.user.users
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-menu-vertical-demo{
  border: 0px solid #ffffff;
}
.tac .acts .is-active{
  background: #CFEEFD;
  border-right: 4px solid #06ADFB;
  box-sizing: border-box;
}
.names{
  width: 100%;
  height: 60px;
  text-align: center;
  color: black;
  border-bottom: 1px solid #C6C8C9;
}
.names-A{
  width: 100%;
  height: 35px;
  text-align: center;
  padding-right: 10px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 35px;
 
}
.names-B{
  width: 100%;
  height: 25px;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
  font-size: 12px;
  cursor: pointer;
  line-height: 25px;
}
</style>
