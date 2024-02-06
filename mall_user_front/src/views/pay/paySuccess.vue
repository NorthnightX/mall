<template>
  <div class="paySuccess">
    <div>
      <div style="display: flex;align-items: center;justify-content: left">
        <div style="margin-top: 20px;margin-left: 110px;margin-bottom: 20px">
          <img src="../../assets/img/img_1.png" style="width: 50px;height: 50px" @click="goHome()">
        </div>
        <div style="margin-left: 40px">
          <span style="color: #333333;font-size: 27px">支付成功</span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
          <span style="color: #888888;font-size: 12px">请耐心等待发货</span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 3px;background-color: orangered"></div>

    <div style="width: 100%; height: 600px;background-color: #f7f7f7;display: flex;align-items: center;justify-content: center">
      <div style="width: 85%;height: 500px;background-color: white;display:flex;justify-content: center;">
          <div style="margin-top: 50px">
            <div style="display: flex;align-items: center;justify-content: center">
              <span style="color: gray;font-size: 20px">支付成功</span><br>
            </div>
            <div style="display: flex;align-items: center;margin-top: 10px">
              <span style="color: gray;font-size: 18px">我们会尽快发货</span><br>
            </div>
            <div style="margin-top: 50px;display: flex;align-items: center;justify-content: center">
              <el-button style="font-size: 20px;color: #3a8ee6" type="text" @click="goHome">点击返回主页</el-button>
            </div>
          </div>
      </div>
    </div>
    <!-- Footer -->
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column">
      <div class="footer-content">
        <div class="footer-navigation">
          <router-link style="margin-left: 10px" to="/home">首页</router-link>
          <router-link style="margin-left: 10px" to="/products">产品列表</router-link>
          <router-link style="margin-left: 10px" to="/about">关于我们</router-link>
        </div>
      </div>
      <div class="footer-content" style="display: flex">
        <div class="footer-copy">
          &copy; 2023 小米公司 版权所有
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
    }
  },
  computed: {

  },
  /* 定义事件函数 */
  methods: {

    goHome(){
      this.$router.push({path: '/mall/home'});
    },

  }
  ,
  /* vue的生命周期函数
  当页面加载完毕就会执行created里面的函数
  */
  created() {
  }
}
</script>

<style scoped>
:deep(.el-checkbox-group) {
  font-size: 14px;
}
.hide-label .el-radio__label {
  display: none;
}
</style>
