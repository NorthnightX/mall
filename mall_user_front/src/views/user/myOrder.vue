<template>
  <div class="order">

    <!-- Navigation, logo, user menu, etc. -->
    <div>
      <div style="display: flex;align-items: center;justify-content: left">
        <div style="margin-top: 20px;margin-left: 110px;margin-bottom: 20px">
          <img src="../../assets/img/img_1.png" style="width: 50px;height: 50px" @click="goHome()">
        </div>
        <div style="margin-left: 40px">
          <span style="color: #333333;font-size: 27px">我的订单</span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 3px;background-color: orangered"></div>
    <div style="height: auto;background: #f7f7f7;display: flex;flex-direction: column;align-items: center;margin-top: 10px">
      <div style="width: 85%">
        <div v-for="item in myOrderList" :key="item.id" class="orderCard"
             style="background-color: white;;margin-top: 10px; border-radius: 10px; height: auto">
          <div style="display: flex;align-items: center;margin-left: 20px">
            <div style="padding-top: 10px">
              <span style="color: black;font-size: 18px">订单号：{{ item.orderNo }}</span>
            </div>
            <div style="margin-left: 600px;padding-top: 5px;align-items: center">
              <span style="color: #888888">订单时间：{{item.gmtCreate}}</span>
              <el-button style="margin-left: 10px" v-show="item.status === 40" type="text" @click="harvest(item.orderNo)">收货</el-button>
              <el-button style="margin-left: 10px" v-show="item.status === 20 || item.status === 40" type="text" @click="refund(item.orderNo)">退款</el-button>
              <el-button style="" type="text" @click="deleteOrder(item.orderNo)">删除</el-button>
            </div>
          </div>
          <div style="display: flex;align-items: center;margin-left: 720px;margin-top: 20px">
            <div>
              <span style="color: #888888;margin-left: 70px"> 支付方式：{{item.paymentTypeName}}</span>
            </div>
            <div>
              <span style="color: orangered;margin-left: 50px">支付金额：{{ item.payment }}元</span>
            </div>
            <div>
              <span style="color: #888888;margin-left: 50px"> 支付状态：{{item.statusName}}</span>
            </div>
          </div>
          <div style="margin-left: 20px;padding-bottom: 10px;margin-top: 20px">
            <span style="color: #888888;font-size: 17px">购物物品</span>
            <div style="width: 100%;height: 1px;background-color: #888888;"></div>
            <div v-for="item in item.orderItemList" style="margin-top: 10px;display: flex;">
              <div style="display: flex;align-items: center">
                <div>
                  <img :src="item.productImage" style="width: 50px;height: 30px">
                </div>
                <div style="width: 150px;margin-left: 10px">
                  <span style="margin-left: 10px;color: #888888">{{item.productName}}</span>
                </div>
                <div style="width: 150px">
                  <span style="margin-left: 50px;color: #888888">数量：{{item.quantity}}</span>
                </div>
                <div style="width: 250px">
                  <span style="margin-left: 50px;color: #888888">实际金额：{{item.totalPrice}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="pagination" style="margin-top: 20px;">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 15, 20, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
      </div>
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
      myOrderList: [],
      pageNum: 1, // 当前页码
      pageSize: 5, // 每页显示的数量
      total: 0, // 总数

    }
  },
  computed: {},
  /* 定义事件函数 */
  methods: {
    refund(id){
      this.$axios.put(`order/refund/${id}`).then(res => {
        if(res.data.code === 200){
          this.$message.success("退款成功")
          this.myOrder()
        }
        else{
          this.$message.warning(res.data.message)
        }
      })
    },
    harvest(id){
      this.$axios.put(`order/harvest/${id}`).then(res => {
        if(res.data.code === 200){
          this.$message.success("收货成功")
          this.myOrder()
        }
        else{
          this.$message.warning(res.data.message)
        }
      })
    },
    deleteOrder(id){
      this.$axios.delete("/order/deleteOrder", {params : {orderId : id}}).then(res => {
        if(res.data.code === 200){
          this.$message.success("删除成功")
          this.myOrder()
        }
      })
    },
    goHome(){
      this.$router.push({path: '/mall/home'});
    },
    myOrder() {
      this.$axios.get("/order/myOrder", {
        params: {
          pageNum : this.pageNum,
          pageSize : this.pageSize
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.myOrderList = res.data.data.records
          this.total = res.data.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.userHistory();
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.userHistory()
    },
  }
  ,
  /* vue的生命周期函数
  当页面加载完毕就会执行created里面的函数
  */
  created() {
    this.myOrder()
  }
}
</script>

<style scoped>

.orderCard {
  transition: transform 0.3s, box-shadow 0.3s;
}
.orderCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

}
</style>
