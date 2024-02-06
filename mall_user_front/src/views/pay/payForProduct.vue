<template>
  <div class="paySuccess">
    <div>
      <div style="display: flex;align-items: center;justify-content: left">
        <div style="margin-top: 20px;margin-left: 110px;margin-bottom: 20px">
          <img src="../../assets/img/img_1.png" style="width: 50px;height: 50px" @click="goHome()">
        </div>
        <div style="margin-left: 40px">
          <span style="color: #333333;font-size: 27px">支付订单</span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
          <span style="color: #888888;font-size: 12px">请在30分钟内完成支付</span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 3px;background-color: orangered"></div>

    <div style="width: 100%; height: 900px;background-color: #f7f7f7;display: flex;align-items: center;justify-content: center">
      <div style="width: 85%;height: 800px;background-color: white;display:flex;justify-content: center;">
        <div style="margin-top: 50px">
          <div style="align-items: center;display: flex;justify-content: center">
            <span style="color: gray;font-size: 20px">你的订单号是</span><br>
          </div>
          <div style="display: flex;align-items: center;justify-content: center">
            <span style="color: gray;font-size: 20px">{{ order }}</span>
          </div>
          <div style="margin-top: 50px;display: flex;align-items: center;justify-content: center;flex-direction: column">
            <div>
              <el-button style="font-size: 20px;color: #3a8ee6" type="text" @click="payForProduct()">点击付款</el-button>
            </div>
            <div>
              <el-button style="font-size: 20px;color: #3a8ee6" type="text" @click="goHome">点击返回主页</el-button>
            </div>
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
      order:'',
      payForm:{
        orderNo:''
      }
    }
  },
  computed: {

  },
  /* 定义事件函数 */
  methods: {
    payForProduct(){
      this.payForm.orderNo = this.order
      this.$axios.post("/order/payForProduct", this.payForm).then(res => {
        if(res.data.code === 200){
          this.$router.push({path: '/mall/paySuccess'})
        }
        else {
          this.$message.warning(res.data.message)
        }
      })
    },
    goHome(){
      this.$router.push({path: '/mall/home'});
    },

  }
  ,
  /* vue的生命周期函数
  当页面加载完毕就会执行created里面的函数
  */
  created() {
    this.order = this.$route.query.orderNumber || ''; // 使用默认值为空字符串
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
