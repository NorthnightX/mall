<template>
  <div>
    <div class="header"
         style="background-color: #333333; width: 100%; height: 40px; align-items: center;display: flex;justify-content: center">
      <div style="width: 80%; height: 100%; display: flex;justify-content: space-between;align-items: center">
        <div>
          <el-button type="text" style="color: gainsboro; ; font-size: 12px">小米商城 |</el-button>
          <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">小米官网 |</el-button>
          <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">MIUI |</el-button>
          <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">loT |</el-button>
          <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">云服务 |</el-button>
          <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">新品 |</el-button>
          <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">小爱开放平台 |
          </el-button>
        </div>
        <div v-if="login">
          <!--          <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px">{{user.nickName}}</el-button>-->
          <el-dropdown placement="bottom">
              <el-button type="text" style="color:gainsboro; font-size: 13px;" class="el-dropdown-link">
                  {{ user.nickName }}
              </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="myInfo()">用户信息</el-dropdown-item>
              <el-dropdown-item @click.native="browsingHistory()">浏览记录</el-dropdown-item>
              <el-dropdown-item @click.native="myOrder()">购买记录</el-dropdown-item>
              <el-dropdown-item @click.native="showLogoutConfirm()">登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 10px" @click="toCart">购物车
          </el-button>
          <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px">消息通知</el-button>
        </div>
        <div v-if="!login">
          <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px" @click.native="toLogin()">登录</el-button>
          <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px">注册</el-button>
          <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px">消息通知</el-button>
        </div>
      </div>
    </div>
    <div>
      <div style="display: flex; justify-content: center;align-items: center;">
        <div style="align-items: center;justify-content: center;display: flex">
          <img src="../../assets/img/img_1.png" style="width: 55px;height: 55px" @click="toHome">
          <el-button type="text" style="color : #333333;font-size: 16px;margin-left: 300px">小米手机</el-button>
          <el-button type="text" style="color : #333333;font-size: 16px;">路由器</el-button>
          <el-button type="text" style="color : #333333;font-size: 16px">Redmi手机</el-button>
          <el-button type="text" style="color : #333333;font-size: 16px">电视</el-button>
          <el-button type="text" style="color : #333333;font-size: 16px">笔记本</el-button>
          <el-button type="text" style="color : #333333;font-size: 16px">平板</el-button>
          <el-button type="text" style="color : #333333;font-size: 16px">家电</el-button>
          <el-button type="text" style="color : #333333;font-size: 16px;">服务支持</el-button>
          <el-button type="text" style="color : #333333;font-size: 16px">社区</el-button>
        </div>
        <div style="margin-left: 10%">
          <el-form :inline="true" :model="formInline" class="user-search">
            <el-form-item>
              <el-input v-model="formInline.keyword" style="margin-top: 14px" placeholder="请输入查询的商品或分类">
                <!-- 在搜索栏中添加一个图标按钮 -->
                <el-button slot="append" icon="el-icon-search" size="small" circle
                           @click="searchProduct()"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>


</template>
<script>
export default {
  name: "",
  data() {
    /* 定义初始化变量 */
    return {
      user: {},
      login: false,
      formInline: {
        keyword: ''
      },
    }
  },
  /* 定义事件函数 */
  methods: {
    toLogin(){
      this.$router.push({path: '/login'});
    },
    myInfo(){
      this.$router.push({path: '/mall/userInfo'});
    },
    myOrder(){
      this.$router.push({path: '/mall/myOrder'});
    },
    toHome(){
      this.$router.push({path: '/mall/home'});
    },
    browsingHistory(){
      this.$router.push({path: '/mall/browsingHistory'});
    },
    getUser() {
      if (localStorage.getItem("user") != null) {
        this.login = true;
        this.user = JSON.parse(localStorage.getItem("user"))
      }
    },
    searchProduct() {
      if(this.formInline.keyword === ''){
        this.$message.warning("请输入您想要查询的商品名或分类")
        return;
      }
      this.$router.push({path: '/mall/search', query: {keyword: this.formInline.keyword}});
    },
    toCart() {
      this.$router.push({path: '/mall/cart'});
    },
    showLogoutConfirm() {
      this.$confirm('确定要登出吗？', '确认登出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 用户点击确定按钮，执行登出操作
        this.logout();
      }).catch(() => {
        // 用户点击取消按钮，不执行任何操作
      });
    },
    logout() {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      this.user = ''
      this.$router.push({path: '/login'});
    },
  },

  mounted() {
    this.getUser()
  }
}
</script>

<style>

</style>
