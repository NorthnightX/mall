<template>
  <div class="address">

    <!-- Navigation, logo, user menu, etc. -->
    <div>
      <Header></Header>
    </div>
    <div style="width: 100%;height: 60px;margin-top: 5px" class="addressLabor">
      <div style="margin-left: 120px;height: 100%;align-items: center;justify-content: left;display: flex">
        <span style="font-size: 20px">收货地址</span>
      </div>
    </div>
    <div style="width: 100%;height: 50px;background-color: #f7f7f7"></div>
    <div style="height: 600px;background: white">

    </div>

    <!-- Footer -->
    <div style="display: flex;justify-content: center;align-items: center">
      <div class="footer-content" style="display: flex">
        <div class="footer-copy">
          &copy; 2023 小米公司 版权所有
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../component/Header.vue';
export default {
  name: "",
  components: {
    Header
  },
  data() {
    /* 定义初始化变量 */

    return {


    }
  },
  computed: {
  },
  /* 定义事件函数 */
  methods: {

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
.addressLabor {
  width: 100%;
  height: 60px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  border: 1px solid #ccc; /* 添加边框效果 */
  background-color: white;
  opacity: 0.9; /* 调整透明度 */
  position: relative; /* 设置相对定位，为后面的偏移效果做准备 */
  z-index: 1; /* 设置堆叠顺序，使其位于下一个盒子之上 */
}
</style>
