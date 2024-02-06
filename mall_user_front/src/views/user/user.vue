<template>
  <el-container style="height: 100%">
    <el-header style="background-color: orange;display: flex;align-items: center;justify-content: space-between"
               class="fixed-header">
      <div style="display: flex;margin-left: 10px">
        <img src="../../assets/img/img_1.png" style="width: 40px" @click="toHome">
        <span style="color: white; padding-top: 10px;padding-left: 10px">账户中心</span>
      </div>
      <div>
        <el-avatar :src="userImage"></el-avatar>
      </div>
    </el-header>
    <el-container>
      <el-aside width="250px" style="flex-direction: column; align-items: center;background-color: whitesmoke"
                class="fixed-aside">
        <div class="sidebar-item" style="width: 100%;color: #888888;height: 8%;margin-top: -3px">账户设置</div>
        <div class="sidebar-item" style="width: 100%;color: #888888;height: 8%">个人资料</div>
        <div class="sidebar-item" style="width: 100%;color: #888888;height: 8%">屏蔽设置</div>
      </el-aside>
      <div style="width: 100%;margin-left: 15%;margin-top: 3%">
        <el-main>
          <div style="flex-direction: column;justify-content: left;align-items: center">
            <div>
              <div style="display: flex;margin-left: 20px;margin-top: 10px">
                <div style="width: 7px;height: 20px;background-color: cornflowerblue"></div>
                <div>&nbsp;&nbsp;&nbsp;账号和安全</div>
              </div>
            </div>
            <div class="wrapper" style="height: auto; margin-top: 45px;margin-left: 45px">
              <div style="width: 70%;display: flex;justify-content: space-between">
                <label style="  color: dimgrey;font-size: 14px;">头像</label>
                <div style="margin-top: -10px;width: 100px;display: flex">
                  <div>
                    <el-avatar shape="square" :src="userImage" :size="50" @click.native="openFileInput"></el-avatar>
                    <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
                  </div>
                </div>
              </div>
              <div style="width: 70%;height: 0.5px;background-color: gainsboro;margin-top: 10px"></div>

              <div class="input-container">
                <span class="input-label">显示昵称</span>
                <el-input @focus="showBorderNickName"  @blur="hideBorder"
                          style="width: 100%;padding-bottom: 10px" v-model="formData.nickName"></el-input>
                <div class="buttons" v-show="showButtonsNickName">
                  <el-button @mousedown.native="updateUserNickName($event)" type="primary">确定</el-button>
                  <el-button @mousedown.native="handleButtonNickName">取消</el-button>
                </div>
              </div>

              <div class="input-container">
                <span class="input-label">手机号</span>
                <el-input @focus="showBorderPhone" @blur="hideBorder"
                          style="width: 100%;padding-bottom: 10px" v-model="formData.phone"></el-input>
                <div class="buttons" v-show="showButtonsPhone">
                  <el-button @mousedown.native="updateUserPhone" type="primary">确定</el-button>
                  <el-button @mousedown.native="handleButtonPhone">取消</el-button>
                </div>
              </div>
              <div class="input-container">
                <span class="input-label">邮箱</span>
                <el-input @focus="showBorderEmail" @blur="hideBorder"
                          style="width: 100%;padding-bottom: 10px" v-model="formData.email"></el-input>
                <div class="buttons" v-show="showButtonsEmail">
                  <el-button @mousedown.native="updateUserEmail" type="primary">确定</el-button>
                  <el-button @mousedown.native="handleButtonEmail">取消</el-button>
                </div>
              </div>
              <div class="input-container" >
                <span class="input-label">密码</span>
                <el-input @focus="showBorderPassword" @blur="hideBorder" type="password"
                          style="width: 100%;padding-bottom: 10px" v-model="formData.password"></el-input>
                <div class="buttons" v-show="showButtonsPassword">
                  <el-button @mousedown.native="updateUserPassword" type="primary">确定</el-button>
                  <el-button @mousedown.native="handleButtonPassword">取消</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      userMsg: {},
      showButtonsPhone: false,
      showButtonsEmail: false,
      showButtonsNickName: false,
      showButtonsPassword: false,
      userImage: "",
      formData: {
        image: '',
        password: "",
        confirmPassword: "",
        phone: '',
        nickName: '',
        email: '',
      }
    };
  },
  methods: {
    hideBorder(){
      this.showButtonsPhone = false
      this.showButtonsEmail =false
      this.showButtonsNickName = false
      this.showButtonsPassword = false
    },
    toHome() {
      this.$router.push('/mall/home');
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const formdata = new FormData();
        formdata.append('image', file);
        this.$axios.post('upload/uploadMallImage', formdata).then(res => {
          if (res.data.code === 200) {
            var url = res.data.data;
            this.userImage = url;
            this.formData.avatar = url;
            this.updateUserAvatar()
          } else {
            this.$message('网络异常');
          }
        });
      }
    },
    updateUserAvatar() {
      this.$axios.put("/user/updateUserAvatar", this.formData).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.data)
          this.queryLoginUser()
        }
      })
    },
    updateUserNickName() {
      this.$axios.put("/user/updateUserNickName", this.formData).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.data)
          this.showButtonsNickName = false
          this.queryLoginUser()
        }
        else{
          this.$message.warning("网络异常")
        }
      })
    },
    updateUserPassword() {
      this.$axios.put("/user/updateUserPassword", this.formData).then(res => {
        if (res.data.code === 200) {
          this.$message.success("修改成功，请重新登录")
          this.showButtonsPassword = false
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          this.$router.push('/login');
        }
      })
    },
    updateUserPhone() {
      this.$axios.put("/user/updateUserPhone", this.formData).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.data)
          this.showButtonsPhone = false
          this.queryLoginUser()
        }
        else{
          this.$message.warning(res.data.message)
        }
      })

    },
    updateUserEmail() {
      this.$axios.put("/user/updateUserEmail", this.formData).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.data)
          this.showButtonsEmail = false
          this.queryLoginUser()
        }
        else{
          this.$message.warning(res.data.message)
        }
      })

    },
    queryLoginUser() {
      this.$axios.get("/user/getLoginUser").then(res => {
        if (res.data.code === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.data))
          let user = JSON.parse(localStorage.getItem("user"))
          this.formData = {...user}
          this.userImage = user.avatar
        } else {
          this.$message.warning("网络异常")
        }
      })
    },
    showBorderPassword() {
      this.showButtonsPassword = true
    },
    showBorderPhone() {
      this.showButtonsPhone = true
    },
    showBorderEmail() {
      this.showButtonsEmail = true
    },
    showBorderNickName() {
      this.showButtonsNickName = true
    },
    handleButtonPhone() {
      // 处理按钮2的点击事件
      this.showButtonsPhone = false
      this.queryLoginUser()
    },
    handleButtonEmail() {
      // 处理按钮2的点击事件
      this.showButtonsEmail = false
      this.queryLoginUser()
    },
    handleButtonPassword() {
      // 处理按钮2的点击事件
      this.showButtonsPassword = false
      this.queryLoginUser()
    },
    handleButtonNickName() {
      // 处理按钮2的点击事件
      this.showButtonsNickName = false
      this.queryLoginUser()
    },
  },
  created() {
    this.queryLoginUser()


  }
};
</script>

<style scoped>

.sidebar-item {
  color: #888888;
  height: 6%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  margin-bottom: -20px;
}

.sidebar-item:hover {
  background-color: #ccc;
  color: #333;
}

.inputDeep >>> .el-input__inner {
  width: 70%;
  border-radius: 0;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
}

.wrapper {
  position: relative;
}

/* Fixed Header */
.fixed-header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}

/* Fixed Aside */
.fixed-aside {
  position: fixed;
  width: 250px;
  height: 100%;
  top: 61px;
  left: 0;
  z-index: 90;
}

.input-container {
  position: relative;
  transition: border 0.3s;
  margin-top: 20px;
}

.input-container:focus-within {
  width: 70%;
  border: 1px solid #1890ff;
  border-radius: 4px;
  padding: 8px;
}

.input-container >>> .el-input__inner {
  width: 70%;
  border-radius: 0;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
}

.input-label {
  color: dimgrey;
  font-size: 14px;
}
</style>
