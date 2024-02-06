<template>
  <div class="cart">
    <div>
      <div style="display: flex;align-items: center;justify-content: left">
        <div style="margin-top: 20px;margin-left: 110px;margin-bottom: 20px">
          <img src="../../assets/img/img_1.png" style="width: 50px;height: 50px" @click="goHome()">
        </div>
        <div style="margin-left: 40px">
          <span style="color: #333333;font-size: 27px">我的购物车</span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
          <span style="color: #888888;font-size: 12px">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 3px;background-color: orangered"></div>
    <div
        style="background-color: #f7f7f7;width: 100%; height: 900px;display: flex;align-items: center;;flex-direction: column">

      <div style="width: 85%;background-color: white;margin-top: 50px">
        <div style="height: 70px;width: 100%;display: flex">
          <div class="item-select" style="display: flex;align-items: center;justify-content: center;margin-left: 10px">
            <!--            全选-->
            <el-checkbox v-model="isAllSelected" @change="selectAll" size="medium"></el-checkbox>
          </div>
          <div style="margin-left: 55px;height: 100%;display: flex;align-items: center;justify-content: center">全选
          </div>
          <div style="margin-left: 150px;height: 100%;display: flex;align-items: center;justify-content: center">
            商品名称
          </div>
          <div style="margin-left: 420px;height: 100%;display: flex;align-items: center;justify-content: center">单价
          </div>
          <div style="margin-left: 135px;height: 100%;display: flex;align-items: center;justify-content: center">数量
          </div>
          <div style="margin-left: 130px;height: 100%;display: flex;align-items: center;justify-content: center">小计
          </div>
          <div style="margin-left: 120px;height: 100%;display: flex;align-items: center;justify-content: center">操作
          </div>
        </div>
        <div style="width: 100%;height: 0.5px;background-color: #e6e3e3"></div>
        <!--        购物车商品信息-->
        <el-checkbox-group v-model="checkList" v-if="cart.length > 0">
          <div v-for="product in cart" :key="product.id" style="width: 100%;height: 120px;">
            <div style="height: 120px;width: 100%;display: flex;align-items: center;">
              <div class="item-select"
                   style="align-items: center;justify-content: center;display: flex;margin-left: 10px">
                <el-checkbox :label="product.id" @change="selectOne(product.id)">
                  <br></el-checkbox>
              </div>
              <div style="margin-left: 100px;width: 100px">
                <img :src=product.productImage style="width: 100px;height: 100px">
              </div>
              <div style="margin-left: 20px;width: 400px">
                {{ product.productName }}
              </div>
              <div style="margin-left: 90px;width: 100px">
                {{ product.productPrice }}
              </div>
              <div style="margin-left: 1px;width: 100px">
                <el-input-number v-model="product.quantity" :min="1" :max="100"
                                 @change="updateCount(product.id)"></el-input-number>
              </div>
              <div style="margin-left: 120px;width: 100px">
                {{ product.productPrice * product.quantity }}
              </div>
              <div style="margin-left: 65px">
                <el-button type="text" @click="deleteProductFormCart(product.id)">X</el-button>
              </div>
            </div>
            <div style="width: 100%;height: 0.5px;background-color: #e6e3e3"></div>
          </div>
        </el-checkbox-group>
        <div v-else style="display: flex;align-items: center;justify-content: center">
          <div style="display: flex;flex-direction: column;align-items: center">
            <img src="../../assets/img/img_2.png">
            <div style="margin-bottom: 20px">
              <span style="color: #888888;font-size: 20px">购物车是空的</span>
            </div>
          </div>
        </div>
      </div>

      <div
          style="height: 60px; width: 85%;background-color: white;margin-top: 20px;display: flex;align-items: center;justify-content: space-between">
        <div>
          <span style="font-size: 14px;color: #888888;margin-left: 20px">已选择{{ this.checkList.length }}件</span>
        </div>
        <div style="height: 100%">
          <span style="margin-right: 120px;color: orangered">合计 {{ totalAmount }}元</span>
          <el-button style="height: 100%;width: 250px;background-color: orangered;color: white;font-weight: bold" @click="goPay()">
            去结算
          </el-button>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column">
      <div class="footer-content">
        <div class="footer-navigation">
          <router-link to="/home">首页</router-link>
          <router-link to="/products">产品列表</router-link>
          <router-link to="/about">关于我们</router-link>
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
      isAllSelected: false, // 是否全选状态
      checkList: [],
      cart: [],
      cartCheckForm:{
        id: '',
        checked :''
      },
      cartCountForm:{
        id: '',
        quantity :''
      }
    }
  },
  computed: {
    totalAmount() {
      let total = 0;
      this.cart.forEach(product => {
        if (product.checked === 1) {
          total += product.productPrice * product.quantity;
        }
      });
      return total;
    }
  },
  /* 定义事件函数 */
  methods: {
    goPay(){
      if(this.cart.length === 0){
        this.$message.warning("您的购物车是空的")
        return;
      }
      this.$router.push({path: '/mall/pay'})
    },
    goHome(){
      this.$router.push({path: '/mall/home'});
    },
    updateCount(id){
      this.cart.forEach(product => {
        if(product.id === id){
          this.cartCountForm.id = id
          this.cartCountForm.quantity = product.quantity
          this.$axios.put("/cart/updateCartCount",this.cartCountForm).then(res => {
            if(res.data.code !== 200){
              this.$message.warning("网络异常")
            }
          })
        }
      })
    },
    //用户选择某件商品
    selectOne(id) {
      this.cart.forEach(product => {
        if (product.id === id) {
          product.checked = product.checked === 0 ? 1 : 0;
          this.cartCheckForm.id = id
          this.cartCheckForm.checked = product.checked
          this.$axios.put("/cart/updateCartCheck", this.cartCheckForm).then(res => {
            if(res.data.code !== 200){
              this.$message.warning("网络异常")
            }
          })
        }
      });
      if (this.checkList.length < this.cart.length) {
        this.isAllSelected = false
      }
    },
    selectAll() {
      this.cart.forEach(product => {
        product.checked = this.isAllSelected ? 1 : 0;
        this.cartCheckForm.id = product.id
        this.cartCheckForm.checked = product.checked
        this.$axios.put("/cart/updateCartCheck", this.cartCheckForm).then(res => {
          if(res.data.code !== 200){
            this.$message.warning("网络异常")
          }
        })
      });
      this.updateCheckList();
    },
    getCart() {
      this.$axios.get("/cart/getCart").then(res => {
        if (res.data.code === 200) {
          this.cart = res.data.data
          this.updateCheckList();
        }
        else if(res.data.code !== 200){
          this.$message.warning("网络异常")
        }
      })
    },
    deleteProductFormCart(id) {
      this.$axios.delete(`/cart/deletedFormCart/${id}`).then(res => {
        if (res.data.code === 200) {
          this.getCart()
        } else {
          this.$message.warning("网络开小差了")
        }
      })
    },
    updateCheckList() {
      this.checkList = this.cart.filter(product => product.checked === 1).map(product => product.id);

    }
  }
  ,
  /* vue的生命周期函数
  当页面加载完毕就会执行created里面的函数
  */
  created() {
    this.getCart()
  }
}
</script>

<style scoped>
:deep(.el-checkbox-group) {
  font-size: 14px;
}
</style>
