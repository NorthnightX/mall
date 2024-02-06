<template>
  <div class="home">

    <!-- Navigation, logo, user menu, etc. -->
    <div>
      <Header></Header>
    </div>
    <div style="width: 100%;height: 60px;" class="floating-box">
      <div style="margin-left: 120px;height: 100%;align-items: center;justify-content: left;display: flex">
        <span style="font-size: 20px">{{ productMessage.name }}</span>
      </div>
    </div>
    <div style="width: 100%;height: 50px;background-color: #f7f7f7"></div>
    <div style="background-color: white; width: 100%;display: flex;align-items: center;justify-content: center">
      <div style="width: 88%;;display: flex;align-items: center;justify-content: center">
        <!--          放图片-->
        <div style="width: 45%;height: 550px;display: flex;align-items: center;justify-content: center">
          <img :src=productMessage.mainImage style="width: 93%;height: 93%">
        </div>
        <div style="width: 3%;height: 1px;">

        </div>
        <!--          数据-->
        <div style="width: 50%;height: 550px">
          <!--          商品名-->
          <div style="width: 100%;height: 15%;align-items: center;justify-content: left;display: flex;margin-top: 15px">
            <div>
              <span style="font-size: 25px">{{ productMessage.name }}</span><br>
              <div style="height: 5px"></div>
              <span style="color: #888888;font-size: 14px">{{ productMessage.subtitle }}</span>
            </div>
          </div>
          <!--          价格-->
          <div>
            <span style="color: orangered;font-size: 18px">{{ productMessage.price }} 元</span>
          </div>
          <div style="height: 1px;background-color: gainsboro;margin-top: 15px"></div>

          <div style="width: 100%;height: 80px;">
            <div>
              <div style="margin-top: 20px">
                <div style="display: flex">
                  <div style="width: 100px">
                    <span style="font-size: 17px;color: #888888">总销量</span>
                  </div>
                  <div style="margin-left: 50px">
                    <span style="font-size: 17px;color: #888888">{{ productMessage.saleCount }}</span>
                  </div>
                </div>
                <div style="display: flex;margin-top: 30px">
                  <div style="width: 100px">
                    <span style="font-size: 17px;color: #888888">库存</span>
                  </div>
                  <div style="margin-left: 50px">
                    <span style="font-size: 17px;color: #888888">{{ productMessage.stock }}</span>
                  </div>
                </div>

                <br>
              </div>
            </div>
          </div>
          <!--          结算-->
          <div
              style="width: 100%;height: 150px;margin-top: 35px;background-color: #f7f7f7;display: flex;justify-content: left;flex-direction: column">
            <div style="margin-top: 20px;margin-left: 30px">
              <span style="color: #888888">{{ productMessage.name }}</span>
            </div>
            <div style="margin-top: 20px;margin-left: 30px">
              <span style="color:gray;">数量： </span>
              <el-input-number v-model="productCount" :min="1" :max="100" @change="updateCount"></el-input-number>
            </div>
            <div style="margin-top: 20px;margin-left: 30px">
              <span style="color: orangered;font-size: 20px"> 总计：{{ totalCount }}元</span>
            </div>
          </div>
          <!--          加入购物车-->
          <div style="width: 100%; margin-top: 35px">
            <el-button style="width: 50%;height: 70px;color: white;background-color: orangered" @click="toCart()">
              加入购物车
            </el-button>
            <el-button style="width: 25%;height: 70px;color: white;background-color: gray">喜欢</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--    商品介绍-->
    <div
        style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 10px;background-color: #f7f7f7">
      <div style="width: 84%">
        <div v-html="parsedProductDetail"></div>
      </div>
    </div>
    <div style="width: 100%;height: auto;display: flex;flex-direction: column;align-items:center;margin-top: 20px;">
      <div class="editor" style="margin-top: 50px;width: 84%" v-show="isBuyProduct">
        <div>
          <span style="font-size: 20px;font-weight: bold">发布评论</span>
          <hr class="gray-hr"/>
        </div>
        <div style="margin-top: 10px">
          <mavon-editor v-model="commentForm.content"
                        ref=md
                        @imgAdd="$imgAdd"></mavon-editor>
          <div style="margin-top: 10px">
            <el-button type="primary" style="color: white; background-color: steelblue" @click="submitComment()">发布
            </el-button>
            <el-button type="text">取消</el-button>
          </div>
        </div>
      </div>
      <div style="width: 84%;margin-top: 20px">
        <span style="font-size: 20px;font-weight: bold">商品评论</span>
        <div style="width: 100%;height: 1px;background: #888888;margin-top: 5px"></div>
      </div>
      <div style="width: 84%;height: 1px;background: #888888" v-if="commentList.length > 0">
        <div v-for="(comment, index) in commentList" :key="comment.id" style="margin-top: 10px">
          <div class="comment-item">
            <div>
              <span style="font-weight: bold;color: cornflowerblue;">#{{index + 1}}楼</span>
              <span style="color: #888888; margin-left: 10px; font-size: 14px">{{comment.gmtModified}}</span>
            </div>
            <div style="margin-top: 15px; display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <div style="display: flex; align-items: center;">
                <div class="block"><el-avatar shape="square" :size="50" :src="comment.userImage"></el-avatar></div>
                <span style="font-weight: bold;color: cornflowerblue;margin-left: 10px">{{comment.userName}}:</span>
                <span style="margin-left: 10px">{{ comment.content }}</span>
              </div>
              <div>
                <el-button v-if="comment.commentParentId === 0" type="text" style="color: #3366cc;font-size: 10px"
                           @click="showFollow(comment.id)">更多</el-button>
                <el-button v-if="comment.commentParentId === 0" type="text" style="color: #3366cc;font-size: 10px" @click="toggleCommentInput(comment.id)">评论</el-button>
                <el-button  type="text"  style="color: #3366cc;font-size: 10px"
                            v-show="user != null && (comment.userId === user.id)"
                            @click="deleteComment(comment.id)">删除</el-button>
              </div>
            </div>
            <div v-if="showCommentInput && activeCommentId === comment.id">
              <el-input
                  v-model="newCommentText"
                  placeholder="输入你的评论..."
              />
              <div style="display: flex;justify-content: right">
                <el-button type="text" style="margin-right: 10px" @click="submitFollowComment(comment.id)">提交评论</el-button>
              </div>
            </div>
<!--            子评论-->
            <div v-for="(item, index) in comment.commentDTOList" :key="index" style="margin-left: 20px">
              <div>
                <span style="font-weight: bold;color: cornflowerblue;font-size: 13px">#{{index + 1}}楼</span>
                <span style="color: #888888; margin-left: 10px; font-size: 13px">{{item.gmtModified}}</span>
              </div>
              <div style="margin-top: 15px; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <div style="display: flex; align-items: center;">
                  <div class="block"><el-avatar shape="square" :size="40" :src="item.userImage"></el-avatar></div>
                  <span style="font-weight: bold;font-size: 13px;color: cornflowerblue;margin-left: 10px">{{item.userName}}:</span>
                  <span style="margin-left: 10px;font-size: 13px">{{ item.content }}</span>
                </div>
                <div>
                  <el-button  type="text"  style="color: #3366cc;font-size: 10px"
                              v-show="user != null && (item.userId === user.id || comment.userId === user.id)"
                              @click="deleteChildComment(item.id)">删除</el-button>
                </div>
              </div>
            </div>
            <hr class="gray-hr" />
          </div>
        </div>
      </div>
      <div v-else style="margin-bottom: 20px">
        <div>
          <span style="color: grey;font-size: 20px">暂时没有评论</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../component/Header.vue';
import {marked} from 'marked'

export default {
  name: "",
  components: {
    Header
  },
  data() {
    /* 定义初始化变量 */
    return {
      isBuyProduct: false,
      showCommentInput: false,
      activeCommentId: null,
      newCommentText: '',
      commentForm: {
        content: '',
        productId:''
      },
      user:[],
      commentList:[],
      productCount: 1,
      productId: '',
      productMessage: [],
      parsedProductDetail: '',
      cartForm: {
        productId: '',
        quantity: ''
      },
      followForm:{
        commentParentId:'',
        content:'',
        productId:''
      }
    }
  },
  computed: {
    totalCount() {
      let price = this.productMessage.price
      return this.productCount * price
    }
  },
  /* 定义事件函数 */
  methods: {
    deleteComment(id){
      this.$axios.delete("comment/deleteComment", {params: {id : id}}).then(res => {
        if(res.data.code === 200){
          this.$message.success("删除成功")
        }
        this.queryComment()
      })
    },
    deleteChildComment(id){
      this.$axios.delete("comment/deleteChildComment", {params: {id : id}}).then(res => {
        if(res.data.code === 200){
          this.$message.success("删除成功")
        }
        this.queryComment()
      })
    },
    toggleCommentInput(commentId) {
      this.activeCommentId = commentId;
      this.showCommentInput = !this.showCommentInput;
      this.newCommentText = '';
    },
    submitFollowComment(id) {
      this.followForm.productId = this.productId
      this.followForm.commentParentId = id
      this.followForm.content = this.newCommentText
      this.$axios.post("comment/addFollowComment", this.followForm).then(res => {
        if (res.data.code === 200) {
          this.$message.success("评论成功")
          this.showCommentInput = false
          setTimeout(() => {
            this.queryComment(this.productMessage.id)
          }, 1000);
        } else {
          this.$message.warning("网络异常")
        }
      })
    },
    submitComment() {
      this.commentForm.productId = this.productId
      this.$axios.post("comment/addComment", this.commentForm).then(res => {
        if (res.data.code === 200) {
          this.commentForm.comment = ""
          this.$message.success("评论成功")
          setTimeout(() => {
            this.queryComment(this.productMessage.id)
          }, 1000);
        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
    queryComment(){
      this.$axios.get("/comment/queryByProduct", {params : {id : this.productId}}).then(res => {
        if(res.data.code === 200){
          this.commentList = res.data.data
        }
      })
    },
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append('image', $file);
      this.$axios.post("upload/uploadMallImage", formdata).then(res => {
        if (res.status === 200) {
          var url = res.data.data;
          this.$refs.md.$img2Url(pos, url)
        } else {
          this.$message("网络异常")
        }
      })
    },
    updateCount() {
      if (this.productCount < 1) {
        this.productCount = 1;
      }
    },
    toCart() {
      this.cartForm.productId = this.productId
      this.cartForm.quantity = this.productCount
      this.$axios.post("cart/addToCart", this.cartForm).then(res => {
        if (res.data.code === 200) {
          this.$message.success("添加成功");
        }
      })
    },
    getProduct() {
      this.$axios.get("/product/productMessage", {params: {id: this.productId}}).then(res => {
        if (res.data.code === 200) {
          this.productMessage = res.data.data
          this.parsedProductDetail = marked(this.productMessage.detail);
        }
      })
    },
    isBuy(){
      this.$axios.get("/orderItem/isBuy", {params : {productId : this.productId}}).then(res => {
        if(res.data.code === 200){
          if(res.data.data === true){
            this.isBuyProduct = true
          }
        }
      })
    }

  }
  ,
  /* vue的生命周期函数
  当页面加载完毕就会执行created里面的函数
  */
  created() {
    this.productId = this.$route.query.id || ''; // 使用默认值为空字符串
    this.user = JSON.parse(localStorage.getItem("user"))
    this.getProduct()
    this.queryComment()
    this.isBuy()
  }
}
</script>

<style scoped>
.floating-box {
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
