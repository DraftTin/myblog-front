<template>
  <div class="login-header">
    <router-link :to="{name: 'Start'}">
      <img src="@/assets/logo.png" class="" alt="logo"/>
    </router-link>
  </div>
  <main>
    <div class="login-form">
      <h3>登陆账号</h3>
      <div class="form-elem">
        <span class="field-label">邮箱：</span>
        <div class="content-container">
          <el-input
            type="text"
            v-model="loginForm.email"
            maxlength="50"
            minlength="0"
            class="edit-area"
          >
          </el-input>
        </div>
      </div>
      <div class="form-elem">
        <span class="field-label">密码：</span>
        <div class="content-container">
          <el-input
            type="password"
            v-model="loginForm.password"
            maxlength="128"
            minlength="0"
            class="edit-area"
            @keypress.enter="handleLogin"
          >
          </el-input>
        </div>
      </div>
      <div class="form-elem">
        <button @click.prevent="handleLogin">登陆</button>
      </div>
    </div>
  </main>
</template>

<script>
import { ElMessage } from 'element-plus'
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      // 登陆表单，用于提交数据
      loginForm: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    handleLogin () {
      const reg = new RegExp(
        "^[a-z0-9]+[a-z0-9_]*[a-z0-9]@([a-z0-9]+[a-z0-9_]*[a-z0-9]\\.){1,100}[a-z0-9]+$"
      )
      if(this.loginForm.email == '') {
        ElMessage.warning('邮箱不能为空')
        return 
      }
      else if(!reg.test(this.loginForm.email)) {
        ElMessage.warning("邮箱格式不正确")
        return ;
      }
      else if(this.loginForm.password == '') {
        ElMessage.warning("密码不能为空")
        return ;
      }
      this.submitForm()
    },
    async submitForm() {
      axios
        .post('/api/token/', {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
        // 将token存储到本地
        .then(response => {
          const storage = localStorage;
          // access为访问时所携带的token
          const expiredTime = Date.parse(response.headers.date) + 1000 * 60 * 60 * 10;
          storage.setItem('access.myblog', response.data.access);
          storage.setItem('refresh.myblog', response.data.refresh);
          storage.setItem('expiredTime.myblog', expiredTime);
          storage.setItem('email.myblog', this.loginForm.email);
          // 登陆后将用户的username保存到本地
          axios.get('/blog/userinfo/', {
            params: {
              // 通过token获取用户信息
              'token': localStorage.getItem('access.myblog')
            }
          }).then(response=> {
            // 本地保存userid和username方便使用
            localStorage.setItem('userid', response.data.id);
            localStorage.setItem('username', response.data.username);
            this.$router.push({name: 'Home'});
          })
        })
        // 登陆失败捕捉异常
        .catch(err => {
          if(err.response.status == '401') {
            ElMessage.error('账号或密码错误');
          }
          else {
            ElMessage.error('未知错误');
            this.$router.go(0);
          }
        })
    }
  }
}
</script>

<style scoped>

  main {
    text-align: center;
  }

  .form-elem {
      padding: 10px;
      display: flex;
  }
  input {
      height: 25px;
      padding-left: 10px;
  }

  button {
      height: 35px;
      cursor: pointer;
      border: none;
      outline: none;
      background: gray;
      color: whitesmoke;
      border-radius: 5px;
      width: 60px;
  }


  .content-container {
    flex: 4;
  }

  .field-label {
    flex: 1;
  }

  .login-form {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 30%;
    height: 40%;
    box-shadow:
        inset 0 -3em 3em rgba(0,0,0,0.1),
              0 0  0 2px rgb(197, 197, 181),
              0.3em 0.3em 1em rgba(0,0,0,0.3);
  }

  button {
    margin-left: 80%;
  }

  .login-header {
    height: 50%;
    margin: 4rem 0;
    text-align: center;
  }

  .login-header img {
    height: 3rem;
  }
  
</style>