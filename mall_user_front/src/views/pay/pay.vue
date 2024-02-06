<template>
  <div class="cart" >
    <div>
      <div style="display: flex;align-items: center;justify-content: left">
        <div style="margin-top: 20px;margin-left: 110px;margin-bottom: 20px">
          <img src="../../assets/img/img_1.png" style="width: 50px;height: 50px" @click="goHome()">
        </div>
        <div style="margin-left: 40px">
          <span style="color: #333333;font-size: 27px">订单确认</span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
          <span style="color: #888888;font-size: 12px">请认真填写收货地址</span>
        </div>
        <div style="margin-left: 10px;margin-top: 10px">
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 3px;background-color: orangered"></div>

    <div style="width: 100%; height: 900px;background-color: #f7f7f7;display: flex;align-items: center;justify-content: center">
        <div style="width: 85%;height: 800px;background-color: white">
<!--          收货地址-->
              <div style="margin-left: 45px;margin-top: 35px">
                <span style="color: #888888;font-size: 22px">收货地址</span>
              </div>
            <div class="address-container" style="display: flex;margin-left: 45px;margin-top: 20px">
              <div style="display: flex">
                <div class="address-card" v-for="address in shipping"
                     :key="address.id"
                     :class="{ 'selected': selectedAddressId === address.id }"
                     style="width: 230px;height: 150px;background-color: white;
                     border: 1px solid gainsboro;margin-right: 10px">
                  <div style="height: 20%">
                    <div style="margin-top: 20px;margin-left: 20px">
                      <span style="font-size: 17px">{{ address.receiverName }}</span>
                    </div>
                  </div>
                  <div style="height: 20%">
                    <div style=";margin-left: 20px">
                      <span style="color: #888888;font-size: 15px">{{address.receiverMobile}}</span>
                    </div>
                    <div style=";margin-left: 20px">
                      <span style="color: #888888;font-size: 13px">
                        {{ address.receiverProvince }}&nbsp;{{address.receiverCity}}&nbsp;{{address.receiverDistrict}}
                      </span>
                    </div>
                  </div>
                  <div style="display: flex;align-items: center;justify-content: space-between;margin-top: 23px">
                    <el-button type="text" @click="deleteShipping(address.id)" style="font-size: 17px;margin-left: 20px" class="el-icon-delete"></el-button>
                    <el-radio   class="hide-label" style="margin-left: 30px;margin-top: 5px;" v-model="selectedAddressId" :value="address.id" :label="address.id">
                      {{''}}
                    </el-radio>
                    <el-button type="text" style="font-size: 17px;margin-right: 30px" class="el-icon-edit" @click="editShipping(address)"></el-button>
                  </div>
                </div>
              </div>
              <div style="width: 230px;height: 150px;background-color: white; border: 1px solid gainsboro;
              display: flex;flex-direction : column;align-items: center;justify-content: center" @click="addShipping()">
                <div>
                  <i class="el-icon-circle-plus" style="color: #888888;font-size: 30px"></i>
                </div>
                <div style="margin-top: 5px">
                  <span style="font-size: 15px">添加新地址</span>
                </div>
              </div>
            </div>
<!--          商品-->
          <div style="height: auto;width: 100%">
            <div style="margin-left: 45px;margin-top: 35px">
              <span style="color: #888888;font-size: 22px">商品</span>
            </div>
            <div style="margin-left: 45px;margin-top: 15px;width: 95%;height: 1px;background-color: gainsboro"></div>
            <div v-for="item in cart" :key="item.id" style="display: flex;align-items: center;margin-top: 10px;margin-left: 45px;">
              <img :src="item.productImage" style="width: 40px;height: 40px">
              <div style="width: 300px">
                <span style="margin-left: 10px;color: #888888">{{item.productName}}</span>
              </div>
              <div style="width: 300px;margin-left: 100px">
                <span style="color: #888888;margin-left: 200px">{{item.productPrice}}元 ×</span>
                <span style="color: #888888;margin-left: 10px">{{item.quantity}}</span>
              </div>
              <div  style="width: 300px;margin-left: 200px">
                <span style="margin-left: 100px;color: orangered">{{ item.productPrice * item.quantity }}元</span>
              </div>
            </div>
            <div style="margin-left: 45px;margin-top: 15px;width: 95%;height: 1px;background-color: gainsboro"></div>
          </div>
<!--          详情信息框-->
          <div>
            <div style="margin-left: 45px;margin-top: 35px;display: flex;align-items: center">
              <span style="color: #888888;font-size: 22px">配送方式</span>
              <span style="margin-left: 150px;font-size: 17px;color: orangered">包邮</span>
            </div>
            <div style="margin-left: 45px;margin-top: 35px;display: flex;align-items: center;">
              <span style="color: #888888;font-size: 22px">支付方式</span>
              <div style="margin-left: 150px;display:flex;">
                <img style="width: 30px;margin-left: 30px" src="../../assets/img/支付方式-支付宝.png">
                <el-radio style="margin-left: 8px;margin-top: 5px" v-model="payKind" label=2>{{''}}</el-radio>
              </div>
              <div style="margin-left: 30px;display:flex;">
                <img style="width: 30px;margin-left: 30px" src="../../assets/img/支付方式.png">
                <el-radio style="margin-left: 8px;margin-top: 5px" v-model="payKind" label=1>{{''}}</el-radio>
              </div>
            </div>
            <div style="margin-left: 45px;margin-top: 35px">
              <span style="color: #888888;font-size: 22px">发票</span>
              <span style="margin-left: 193px;font-size: 17px;color: orangered">电子发票</span>
              <span style="margin-left: 10px;font-size: 17px;color: orangered">个人</span>
            </div>
            <div style="width: 100%;display:flex;align-items: center;justify-content: right">
              <div style="">
                <span style="color: orangered;font-size: 20px">总计：{{totalAmount}}元</span><br>
                <el-button style="height: 50px;width: 250px;margin-top: 10px;background-color: orangered;color: white;
                font-weight: bold;margin-right: 30px" @click="pay()" >支付</el-button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <el-dialog :visible.sync="showAddShippingVisible" title="添加新地址" width="50%" @close="closeDialog">
    <el-form :model="shippingForm" label-width="120px" :rules=shippingFormRules>
      <el-form-item label="收货姓名" prop="receiverName">
        <el-input v-model="shippingForm.receiverName"></el-input>
      </el-form-item>
      <el-form-item label="收货固定电话" prop="receiverPhone">
        <el-input v-model="shippingForm.receiverPhone"></el-input>
      </el-form-item>
      <el-form-item label="收货移动电话" prop="receiverMobile">
        <el-input v-model="shippingForm.receiverMobile"></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="receiverProvince">
        <el-select @change="loadCities"  v-model="shippingForm.receiverProvince">
          <el-option
              v-for="province in provinces"
              :key="province.id"
              :label="province.name"
              :value="province.province">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="receiverCity">
        <el-select :disabled = disabledCity  @change="loadDistricts" v-model="shippingForm.receiverCity">
          <el-option
              v-for="city in cities"
              :key="city.id"
              :label="city.name"
              :value="city.city">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区/县" prop="receiverDistrict">
        <el-select :disabled = disabledAreas v-model="shippingForm.receiverDistrict">
          <el-option
              v-for="district in districts"
              :key="district.id"
              :label="district.name"
              :value="district.area">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="receiverAddress">
        <el-input v-model="shippingForm.receiverAddress"></el-input>
      </el-form-item>
      <el-form-item label="邮编" prop="receiverZip">
        <el-input v-model="shippingForm.receiverZip"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button  @click='closeDialog("edit")'>取消</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
<!--    修改地址-->
    <el-dialog :visible.sync="editAddressFormVisible" title="修改地址" width="50%"@close="closeDialog">
      <el-form :model="addressForm" label-width="120px" :rules=shippingFormRules>
        <el-form-item label="收货姓名" prop="receiverName">
          <el-input v-model="addressForm.receiverName"></el-input>
        </el-form-item>
        <el-form-item label="收货固定电话" prop="receiverPhone">
          <el-input v-model="addressForm.receiverPhone"></el-input>
        </el-form-item>
        <el-form-item label="收货移动电话" prop="receiverMobile">
          <el-input v-model="addressForm.receiverMobile"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="receiverProvince">
          <el-select @change="loadCitiesUpdate"  v-model="addressForm.receiverProvince">
            <el-option
                v-for="province in provinces"
                :key="province.id"
                :label="province.name"
                :value="province.province">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="receiverCity">
          <el-select :disabled = disabledCity  @change="loadDistrictsUpdate" v-model="addressForm.receiverCity">
            <el-option
                v-for="city in cities"
                :key="city.id"
                :label="city.name"
                :value="city.city">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区/县" prop="receiverDistrict">
          <el-select :disabled = disabledAreas v-model="addressForm.receiverDistrict">
            <el-option
                v-for="district in districts"
                :key="district.id"
                :label="district.name"
                :value="district.area">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="receiverAddress">
          <el-input v-model="addressForm.receiverAddress"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="receiverZip">
          <el-input v-model="addressForm.receiverZip"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpdateForm">提交</el-button>
          <el-button  @click='closeDialog("edit")'>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      addressForm:{
        receiverName: '',
        receiverPhone: '',
        receiverMobile: '',
        receiverProvince: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverAddress: '',
        receiverZip: ''
      },
      editAddressFormVisible: false,
      payKind:null,
      selectedAddressId: null,
      cart:[],
      shippingFormRules: {
        receiverName: [{ required: true, message: '请输入收货姓名', trigger: 'blur' }],
        receiverPhone: [{ required: true, message: '请输入收货固定电话', trigger: 'blur' }],
        receiverMobile: [{ required: true, message: '请输入收货移动电话', trigger: 'blur' }],
        receiverProvince: [{ required: true, message: '请选择省份', trigger: 'change' }],
        receiverAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        receiverZip: [{ required: true, message: '请输入邮编', trigger: 'blur' }]
      },
      disabledCity: true,
      disabledAreas: true,
      shippingForm: {
        receiverName: '',
        receiverPhone: '',
        receiverMobile: '',
        receiverProvince: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverAddress: '',
        receiverZip: ''
      },
      payForm : {
        shippingId:'',
        paymentType:''
      },
      shipping:[],
      provinces: [], // 中国省份数据
      cities: [], // 中国城市数据
      districts: [], // 区/县数据
      showAddShippingVisible : false,
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
    submitUpdateForm(){
      this.$axios.put("/shipping/updateShipping", this.addressForm).then(res => {
        if(res.data.code === 200){
          this.$message.success("修改成功")
        }
        else{
          this.$message.warning(res.data.message)
        }
        this.editAddressFormVisible = false
        this.provinces =[]
        this.cities = []
        this.districts = []
        this.getProvinces()
        this.getShipping()
      })
    },
    editShipping(address){
      this.addressForm = address
      this.editAddressFormVisible = true
      this.addressForm = {...address}
    },
    pay(){
      if(this.selectedAddressId === null || this.payKind === null){
        this.$message.warning("请认真填写收货信息")
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: '订单提交中，请勿关闭',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.payForm.shippingId = this.selectedAddressId
      this.payForm.paymentType = this.payKind
      this.$axios.post("/order/payOrder", this.payForm).then(res => {
          if(res.data.code === 200){
            this.$message.success("提交成功")
            this.$router.push({path: '/mall/payForProduct',query: {orderNumber: res.data.data}} )
          }
          else {
            this.$message.warning(res.data.message)
          }
          loading.close()
      })
    },

    deleteShipping(id){
      this.$axios.delete(`/shipping/deleteShipping/${id}`).then(res => {
        if(res.data.code === 200){
          this.$message.success(res.data.data)
          this.getShipping()
        }
      })
    },
    loadCities() {
      this.$axios.get(`/province/getCities/${this.shippingForm.receiverProvince}`).then(res => {
        if(res.data.code === 200){
          this.cities = res.data.data
          this.disabledCity = false
          this.shippingForm.receiverCity = ''
          this.shippingForm.receiverDistrict = ''
        }
      })
    },
    loadCitiesUpdate() {
      this.$axios.get(`/province/getCities/${this.addressForm.receiverProvince}`).then(res => {
        if(res.data.code === 200){
          this.cities = res.data.data
          this.disabledCity = false
          this.addressForm.receiverCity = ''
          this.addressForm.receiverDistrict = ''
        }
      })
    },
    loadDistrictsUpdate(){
      this.$axios.get(`/province/getAreas`,
          {params: {cityId : this.addressForm.receiverCity, provinceId : this.addressForm.receiverProvince}}).then(res => {
        if(res.data.code === 200){
          this.districts = res.data.data
          this.disabledAreas = false
          this.addressForm.receiverDistrict = ''
        }
      })
    },
    loadDistricts() {
      this.$axios.get(`/province/getAreas`,
          {params: {cityId : this.shippingForm.receiverCity, provinceId : this.shippingForm.receiverProvince}}).then(res => {
        if(res.data.code === 200){
          this.districts = res.data.data
          this.disabledAreas = false
          this.shippingForm.receiverDistrict = ''
        }
      })
    },
    closeDialog() {
      this.showAddShippingVisible = false
      this.editAddressFormVisible =false
      this.disabledCity = true
      this.disabledAreas = true
      this.shippingForm.receiverCity = ''
      this.shippingForm.receiverDistrict = ''
      this.shippingForm.receiverProvince = ''
    },
    submitForm() {
      // 在这里提交表单数据到后端
      this.$axios.post("/shipping/addShipping", this.shippingForm).then(res => {
        if(res.data.code === 200){
          this.$message.success("添加成功")
        }
        else {
          this.$message.warning(res.data.message)
        }
        this.showAddShippingVisible = false
        this.resetForm()
        this.provinces =[]
        this.cities = []
        this.districts = []
        this.getProvinces()
        this.getShipping()
      })
    },
    resetForm() {
      this.shippingForm = {
        receiverName: '',
        receiverPhone: '',
        receiverMobile: '',
        receiverProvince: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverAddress: '',
        receiverZip: ''
      };
    },
    addShipping(){
      this.showAddShippingVisible = true
    },
    goHome(){
      this.$router.push({path: '/mall/home'});
    },
    getProvinces(){
      this.$axios.get("/province/getProvinces").then(res => {
        if(res.data.code === 200){
          this.provinces = res.data.data
        }
      })
    },
    getShipping(){
      this.$axios.get("/shipping/getShipping").then(res => {
        if(res.data.code === 200){
          this.shipping = res.data.data
        }
      })
    },
    getCart() {
      this.$axios.get("/cart/getCartToPay").then(res => {
        if (res.data.code === 200) {
          this.cart = res.data.data
        }
      })
    },
  }
  ,
  /* vue的生命周期函数
  当页面加载完毕就会执行created里面的函数
  */
  created() {
    this.getProvinces();
    this.getShipping()
    this.getCart()
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
