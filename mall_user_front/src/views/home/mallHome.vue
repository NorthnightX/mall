<template>
  <div class="home" v-loading="loading">

    <!-- Navigation, logo, user menu, etc. -->
    <div>
      <Header></Header>
    </div>
    <!--      轮播图-->
    <div style="width: 100%;margin-top: 20px;display: flex;justify-content: center;align-items: center">
      <div style="width: 85%;display: flex;justify-content: space-between;">
        <div style="width: 15%;height: 300px;background-color: #403E3F;margin-right: 10px;display: flex;
          flex-direction: column;justify-content: center;align-items: center">
          <el-popover
              popper-class="label"
              v-for="item in categoryList"
              :key="item.id"
              placement="right"
              width="300"
              @mouseover="showCategory(item.id)"
              v-model="visible[item.id]">
            <div style="display:flex;align-items: center;width: 300px;height: auto;flex-wrap: wrap">
              <div style="margin-left : 10px;
                display: flex;align-items: center;justify-content:center;width: auto;" v-for="child in childList">
                <div style="width: auto;display:flex;align-items: center;justify-content: center">
                  <el-button style="color: #333333;font-size: 13px;text-align: center;" type="text" size="mini" @click="toSearchPage(child.name)">{{ child.name }}</el-button>
                </div>
              </div>
            </div>
            <el-button slot="reference" type="text" @click="showCategory(item.id)" style="color: white">{{item.name}}</el-button>
          </el-popover>
        </div>
        <div class="block" style=" width: 85%;">
          <el-carousel height="300px">
            <el-carousel-item v-for="item in promotionList" :key="item">
              <div>
                <img :src="item.productDTO.mainImage" alt="Carousel Image" style="width: 100%;height: 300px" @click="getProductMessage(item.productDTO.id)"/>
              </div>

            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div style="background-color: #F5F5F5">
      <!--      猜你喜欢-->
      <div style="padding-top:20px;width: 1320px">
        <span style="font-size: 28px;font-weight: bold;margin-left: 110px">猜你喜欢 >></span>
      </div>
      <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
        <div style="width: 85%;height: 1px;background-color: grey;margin-bottom: 20px;margin-top: 10px"></div>
        <div style="width: 100%; max-width: 1320px; display: flex; flex-wrap: wrap; justify-content: center;">
          <div
              class="product-card"
              v-for="(product, index) in guessProductByUserList"
              :key="product.id"
              v-if="index < 10"
              @click="getProductMessage(product.id)"
              style="background-color: white; margin: 10px; text-align: center; width: calc(20% - 20px);height: 300px">
            <div style="display: flex;align-items: center;justify-content: center">
              <div style="width: 200px;height: 230px;display: flex;align-items: center;justify-content: center">
                <img :src=product.mainImage alt="" style="width: 180px; height: 180px;margin-top: 25px">
              </div>
            </div>
            <div>
              <span style="color: black;font-size: 14px">{{ product.name }}</span><br>
            </div>
            <div>
              <span style="color: #888888;font-size: 10px">{{ product.subtitle }}</span><br>
            </div>
            <div>
              <span style="color: orangered;font-size: 14px">{{ product.price }}元起</span>
            </div>
          </div>
        </div>
      </div>
      <!--      分类-->
      <div style="margin-left: 110px;margin-top: 20px">
        <el-button type="text" style="font-weight: bold;color: #333333;font-size: 28px" @click.native="productRecommend">为您推荐 >></el-button>
      </div>
      <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%">
        <div style="width: 85%;height: 1px;background-color: grey"></div>
        <div style="width: 60%;display: flex;align-items: center;justify-content: center;margin-top: 10px">
          <div v-for="category in categoryList" :key="category.id " v-if="category.parentId === 0" class="blog-item"
               style="width: 100%;display: flex;align-items: center;justify-content: center">
            <el-button type="text" @click.native="productRecommendByType(category.id)" style="color: #333333;font-weight: bold">{{ category.name }}</el-button>
            <div style="width: 1px;background-color: #333333;height: 10px;margin-left: 40px"></div>
          </div>
        </div>
      </div>
      <div style="width: 100%; margin-top: 20px; display: flex; flex-direction: column; align-items: center;">
        <div style="width: 100%; max-width: 1320px; display: flex; flex-wrap: wrap; justify-content: center;"
             v-if="productRecommendList.length > 0">
          <div
              class="product-card"
              v-for="(product, index) in productRecommendList"
              @click="getProductMessage(product.id)"
              :key="product.id"
              v-if="index < 10"
              style="background-color: white; margin: 10px; text-align: center; width: calc(20% - 20px);height: 300px">
            <div style="display: flex;align-items: center;justify-content: center" >
              <div style="width: 200px;height: 230px;display: flex;align-items: center;justify-content: center">
                <img :src=product.mainImage alt="" style="width: 180px; height: 180px;margin-top: 25px;">
              </div>
            </div>
            <div>
              <div>
                <span style="color: black;font-size: 14px">{{ product.name }}</span><br>
              </div>
              <div>
                <span style="color: #888888;font-size: 10px">{{ product.subtitle }}</span><br>
              </div>
              <div>
                <span style="color: orangered;font-size: 14px">{{ product.price }}元起</span>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 100%; max-width: 1100px; display: flex; flex-wrap: wrap; justify-content: center;"
             v-else>
          <div>
            <img src="../../assets/img/img_2.png" style="width: 500px">
          </div>
        </div>
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
      loading:false,
      promotionList:[],
      childList :[],
      visible: {},
      productRecommendList:[],
      guessProductByUserList: [],
      categoryList: [],
      list: []

    }
  },
  computed: {
  },
  /* 定义事件函数 */
  methods: {
    toSearchPage(typeName){
      localStorage.setItem("keyword", typeName)
      this.$router.push({path: '/mall/search'});
    },
    showCategory(id){
      this.$axios.get("/category/queryChildCategory", {params : {id : id}}).then(res => {
        if(res.data.code === 200){
          this.visible[id] = true;
          this.childList = res.data.data
        }
      })
    },
    getProductMessage(id){
      this.$router.push({path: '/mall/lookProduct', query: {id: id}});
    },
    queryAllCategory() {
      this.$axios.get("/category/queryInitialCategory").then(res => {
        if (res.data.code === 200) {
          this.categoryList = res.data.data
        }
      })
    },
    guessUserLike() {
      this.$axios.get("/product/guessProductByUser").then(res => {
        if (res.data.code === 200) {
          this.guessProductByUserList = res.data.data
        }
      })
    },
    productRecommend(){
      this.$axios.get("/product/queryProductRecommend").then(res =>{
        if(res.data.code === 200){
          this.productRecommendList = res.data.data
        }
        else {

        }
      })
    },
    productRecommendByType(id){
      this.$axios.get(`/product/queryProductByCategoryId/${id}`).then(res =>{
        if(res.data.code === 200){
          this.productRecommendList = res.data.data
        }
        else {

        }
      })
    },
    productPromotion(){
      this.$axios.get("/advertise/recommend").then(res =>{
        if(res.data.code === 200){
          this.promotionList = res.data.data
        }
        else {

        }
      })
    },
  }
  ,
  /* vue的生命周期函数
  当页面加载完毕就会执行created里面的函数
  */
  created() {
    this.loading = true
    this.queryAllCategory()
    this.guessUserLike()
    this.productRecommend()
    this.productPromotion()
    this.loading = false
  }
}
</script>

<style scoped>
/* Styles for your homepage components */
.product-card {
  background-color: white;
  margin: 10px;
  text-align: center;
  width: calc(25% - 20px);
  height: 400px;
  transition: transform 0.3s, box-shadow 0.3s;

}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

}
</style>
