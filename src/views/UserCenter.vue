<template>
  <Nav/>
  <div class="profile-container">
    <div class="avatar-editor" @mouseenter="showBtn('photo')" @mouseleave="hideBtn('photo')">
      <div class="avatar-container">
        <el-avatar shape="square" :size="150" fit="scale-down" :src="photoURL"></el-avatar>
      </div>
      <button @click="selectImage()" v-show="btnShow.photo">修改头像</button>
      <!-- 不显示 -->
      <input class="avatar-input" type="file" @change="pickFile" ref="fileInput" hidden/>
    </div>
    <div class="profile-content">
      <div class="profile-header" v-if="!canChange.username" @mouseenter="showBtn('username')" @mouseleave="hideBtn('username')">
        <span class="profile-username">
          {{ userProfile.username }}
        </span>
        <button @click="change('username')" v-show="btnShow.username">修改</button>
      </div>
      <div class="profile-edit-fields">
        <!-- 修改用户名, 用户名比较特殊，单独拿出来显示 -->
        <div class="field" v-if="canChange.username">
          <h3 class="field-label">用户名</h3>
          <div v-if="canChange.username">
            <!-- <input type="text" v-model="changedProfile.username"/> -->
            <el-input
              type="text"
              v-model="changedProfile.username"
              maxlength="30"
              minlength="1"
              class="edit-area"
            >
            </el-input>
            <button @click="saveChange('username')" :disabled="!changedProfile.username">保存</button>
            <button @click="revokeChange('username')">取消</button>
          </div>
        </div>
        <!-- 邮箱不能修改 -->
        <div class="field">
          <h3 class="field-label">邮箱</h3>
          <div>
            <span class="field-content">{{ userProfile.email }}</span>
          </div>
        </div>
        <div class="field" @mouseenter="showBtn('intro')" @mouseleave="hideBtn('intro')">
          <h3 class="field-label">一句话介绍</h3>
          <div v-if="canChange.intro">
            <el-input
              type="text"
              v-model="changedProfile.intro"
              maxlength="50"
              minlength="0"
              class="edit-area"
            >
            </el-input>
            <button @click="saveChange('intro')">保存</button>
            <button @click="revokeChange('intro')">取消</button>
          </div>
          <div v-else>
            <span class="field-content">{{ userProfile.intro }}</span>
            <button @click="change('intro')" v-show="btnShow.intro">修改</button>
          </div>
        </div>
        <!-- 修改国家 -->
        <div class="field" @mouseenter="showBtn('country')" @mouseleave="hideBtn('country')">
          <h3 class="field-label">国家</h3>
          <div v-if="canChange.country">
            <el-input
              type="text"
              v-model="changedProfile.country"
              maxlength="50"
              minlength="0"
              class="edit-area"
            >
            </el-input>
            <button @click="saveChange('country')">保存</button>
            <button @click="revokeChange('country')">取消</button>
          </div>
          <div v-else>
            <span class="field-content">{{ userProfile.country }}</span>
            <button @click="change('country')" v-show="btnShow.country">修改</button>
          </div>
        </div>
        <!-- 修改城市 -->
        <div class="field" @mouseenter="showBtn('city')" @mouseleave="hideBtn('city')">
          <h3 class="field-label">城市</h3>
          <div v-if="canChange.city">
            <el-input
              type="text"
              v-model="changedProfile.city"
              maxlength="50"
              minlength="0"
              class="edit-area"
            >
            </el-input>
            <button @click="saveChange('city')">保存</button>
            <button @click="revokeChange('city')">取消</button>
          </div>
          <div v-else>
            <span class="field-content">{{ userProfile.city }}</span>
            <button @click="change('city')" v-show="btnShow.city">修改</button>
          </div>
        </div>
        <!-- 修改邮政编码 -->
        <div class="field" @mouseenter="showBtn('zip')" @mouseleave="hideBtn('zip')">
          <h3 class="field-label">邮政编码</h3>
          <div v-if="canChange.zip">
            <el-input
              type="text"
              v-model="changedProfile.zip"
              maxlength="20"
              minlength="0"
              class="edit-area"
            >
            </el-input>
            <button @click="saveChange('zip')">保存</button>
            <button @click="revokeChange('zip')">取消</button>
          </div>
          <div v-else>
            <span class="field-content">{{ userProfile.zip }}</span>
            <button @click="change('zip')" v-show="btnShow.zip">修改</button>
          </div>
        </div>
        <!-- 修改地址 -->
        <div class="field" @mouseenter="showBtn('address')" @mouseleave="hideBtn('address')">
          <h3 class="field-label">地址</h3>
          <div v-if="canChange.address">
            <el-input
              type="text"
              v-model="changedProfile.address"
              maxlength="50"
              minlength="0"
              class="edit-area"
            >
            </el-input>
            <button @click="saveChange('address')">保存</button>
            <button @click="revokeChange('address')">取消</button>
          </div>
          <div v-else>
            <span class="field-content">{{ userProfile.address }}</span>
            <button @click="change('address')" v-show="btnShow.address">修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <el-button class="change-pass-btn" @click="handleChangePass">
      修改密码
    </el-button>
    <!-- 修改密码的表单 -->
    <el-dialog title="修改密码" v-model="dialogFormVisible">
      <el-form>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="changePasswordForm.newPassword" autocomplete="off" show-password>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="changePasswordForm.confirmPassword" autocomplete="off" show-password>
          </el-input>
          <p v-if="changePasswordForm.newPassword != changePasswordForm.confirmPassword" class="prompt">密码不一致</p>
          <p v-else class="prompt"></p>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clearDialog()">取 消</el-button>
          <el-button type="primary" @click="changePass()" 
                  :disabled="changePasswordForm.newPassword != changePasswordForm.confirmPassword || 
                  changePasswordForm.newPassword == '' ">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <Footer theme="light"/>
</template>

<script>
import axios from 'axios'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import authorization from '@/utils/authorization.js'
import { ElMessage } from 'element-plus'

export default {
  name: 'UserCenter',
  components: {Nav, Footer},
  data() {
    return {
      userProfile: {
        username: '',
        email: '',
        address: '',
        country: '',
        city: '',
        zip:'',
        intro: '',
        photo: '',                // photo的URL用于显示图片
      },
      canChange: {},
      changedProfile: '',
      btnShow: {},                // 显示'修改按钮',
      // dialogFormVisible: false,   // 显示修改密码的模态框
      dialogFormVisible: false,
      changePasswordForm: {
        newPassword: '',
        confirmPassword: ''
      },
      formLabelWidth: '120px'
    }
  },
  beforeCreate() {
    // 设置页面的body尺寸
    document.body.style.width = '70%';
  },
  computed: {
    // 返回图片请求的地址
    photoURL() {
      if(this.userProfile) {
        if(this.userProfile.photo){
          return this.userProfile.photo;
        }
      }
      return '#';
    }
  },
  mounted() {
    // 验证当前token是否有效，如果无效
    let hasLogin = true;
    authorization()
        .then(response => {
          hasLogin = response[0];
        })
    if(!hasLogin) {
      ElMessage.error('账号登陆过期，请重新登录');
      this.$router.push({name: 'loginInterface'});
      return;
    }
    // 获取用户信息
    axios.get('/blog/userinfo/', {
      params: {
        'token': localStorage.getItem('access.myblog')
      }
    })
    .then(response => {
      // 读取服务器返回的信息
      this.userProfile.username = response.data.username
      this.userProfile.email = response.data.email
      this.userProfile.intro = response.data.profile.intro
      this.userProfile.address = response.data.profile.address
      this.userProfile.city = response.data.profile.city
      this.userProfile.zip = response.data.profile.zip
      this.userProfile.country = response.data.profile.country
      this.userProfile.photo = response.data.profile.photo.value
      console.log(this.userProfile)
    })
    .catch (error => {
      ElMessage.error('err', error)
    })
  },
  methods: {
    change(item) {
      // 打开修改对应item的修改框
      // 非嵌套引用可直接使用assign
      this.changedProfile = Object.assign({}, this.userProfile);
      this.canChange[item] = true;
    },
    revokeChange(item) {
      // 撤回未提交的修改
      this.canChange[item] = false;
    },
    saveChange(item) {
      // 提交修改的profile
      // 通过token获取user_id
      let data = {};
      if(item === 'username') {
        data['username'] = this.changedProfile.username;
      }
      else {
        console.log(item)
        data['profile'] = {};
        data['profile'][item] = this.changedProfile[item];
      }
      let userid = localStorage.getItem('userid');
      axios.patch('/blog/user/' + userid + '/', 
                data, 
                { headers: {Authorization: 'Bearer ' + localStorage.getItem('access.myblog') }} )
      .then(() => {
        this.userProfile[item] = this.changedProfile[item];
        this.revokeChange(item);
        ElMessage.success('修改已保存')
      })
      .catch(err => {
        if(err.response.data.username) {
          ElMessage.error('该用户名已经存在');
        }
        else {
          ElMessage.error('发生未知错误, 请重新修改');
        }
      });
    },
    showBtn(item) {
      this.btnShow[item] = true;
    },
    hideBtn(item) {
      this.btnShow[item] = false;
    },
    noNewline(e) {
      console.log(e)
    },
    // 点击修改头像后触发，调用selectImage方法
    selectImage() {
      this.$refs.fileInput.click();
    },
    // 获取上传图片的url然后返回存储到变量中
    pickFile() {
      const fileInput = this.$refs.fileInput;
      let files = fileInput.files;
      if(files && files[0]) {
        let avatarFile = files[0];
        let formData = new FormData();
        formData.append("value", avatarFile);
        // 上传图片
        axios
          .post('photo/', formData, {
            // 表明发送数据的类型
            headers: { 'Content-Type': 'multipart/form-data'}
          })
          .then(response => {
            // 将本地存储的photo替换成更新的图片
            this.userProfile.photo = response.data.value;
            const photoID = response.data.id;
            const userID = localStorage.getItem('userid');
            // 更新用户的photo信息, photo是后端的数据接口
            axios.patch('/blog/user/' + userID + '/', 
              {
                profile: {
                  photo_id: photoID
                }
              }, 
              { 
                headers: {Authorization: 'Bearer ' + localStorage.getItem('access.myblog') }
              }
            )
            .catch(err => {
              console.log(err + "errrrr");
            });
            ElMessage.success('图片上传成功')
          })
      }
    },
    // 点击'修改密码'按钮触发
    async handleChangePass() {
      this.$prompt('请输入当前密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        inputErrorMessage: '输入不能为空',
        inputType: 'password'
      }).then(({ value }) => {
        // 如果输入密码正确则显示修改密码的模态框
        this.validatePass(value)
          .then((response) => {
            const passRight = response[0];
            if(passRight) {
              this.dialogFormVisible = true;
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    // 验证password是否正确
    async validatePass(password) {
      let flag = true;
      await axios
          .post('/api/token/', {
            email: localStorage.getItem('email.myblog'),
            password: password
          })
          .catch((err) => {
            if(err.response.status == '401') {
              ElMessage.warning('密码错误');
              flag = false;
            }
          })
      return [flag];
    },
    // 提交密码的修改
    changePass() {
      const userid = localStorage.getItem('userid');
      axios.
        patch('/blog/user/' + userid + '/', {
          password: this.changePasswordForm.newPassword
        }, { 
          headers: {Authorization: 'Bearer ' + localStorage.getItem('access.myblog') }
        })
        .then(() => {
          this.clearDialog();
          ElMessage.success('修改成功');
        })
        .catch((err) => {
          ElMessage.error(err.response.status);
        })
    },
    // 清空对话框的状态
    clearDialog() {
      this.changePasswordForm.newPassword = '';
      this.changePasswordForm.confirmPassword = '';
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style scoped>

.profile-username {
  display: inline-block;
  overflow: hidden;
  /* 连续的空白符会被合并，换行符无效 */
  white-space: nowrap;
  font-weight: bold;
  font-size: 2rem;
  line-height: 3rem;
}

.field {
  padding: 3rem 0;
  display: flex;
  border-bottom: 1px solid #d3d3d3;
}

.field-content {
  padding-left: 2rem;
  font-size: 1.4rem;
}

button {
  outline: none;
  border: 0;
  cursor: pointer;
  background-color: #4e8cdd;
  color: #fff;
  margin: 0 0.5rem;
  border-radius: 0.2rem;
}

.profile-container {
  padding: 1rem;
  margin-bottom: 3rem;
  display: flex;
}

.profile-content {
  flex: 4;
}

.avatar-editor {
  flex: 1;
  text-align: center;
}

.edit-area {
  margin-bottom: 0.5rem;
}

.field h3 {
  flex: 1;
  padding-left: 1rem;
  margin: 0;
}

.field div {
  flex: 5;
}

.avatar-container {
  width: 5rem;
  margin-bottom: 0.5rem;
}

.change-pass-btn {
  margin-left: 80%;
}

.prompt {
  font-size: small;
  color: red;
  padding: 0;
  margin: 0;
}

</style>