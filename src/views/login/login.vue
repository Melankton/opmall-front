<template>
  <div class="app">
    <div class="back">
      <vue-particles
        :particle-opacity="0.7"
        :particles-number="80"
        :particle-size="4"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.4"
        :lines-distance="150"
        :move-speed="3"
        :hover-effect="true"
        :click-effect="true"
        color="#666"
        shape-type="circle"
        lines-color="#666"
        hover-mode="grab"
        click-mode="push"
      />
    </div>
    <div class="login">
      <el-card class="box-card">
        <div id="login">
          <h2 class="text-center">登录</h2>
          <el-form
            ref="loginForm"
            :model="userForm"
            :rules="loginRules"
            label-position="top"
            label-width="100px"
            class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" type="password" auto-complete="off"/>
            </el-form-item>
            <el-form-item>
              <div id="button">
                <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
                <router-link to="/register">
                  <el-button type="primary">注册</el-button>
                </router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>

</template>
<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
export default {
  data() {
    var usernameCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      userForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { validator: usernameCheck, trigger: 'blur' }
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.userForm).then((response) => {
            if (response.status === 200) {
              this.$router.push({ path: this.redirect || '/' })
              this.success('账号登录成功')
            } else {
              this.loading = false
              this.fail('登录失败,请检查用户名和密码')
            }
          })
        } else {
          this.fail('登录失败,请检查用户名和密码')
        }
      })
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      })
    },
    fail(value) {
      this.$notify({
        title: '失败',
        message: value,
        type: 'warning'
      })
    }
  }
}
</script>
<style>
  .back {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  h2 {
    color: #48576a;
  }

  .login {
    opacity: 0.8;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #48576a;
    position: relative;
    /*margin-top: 250px;*/
    margin-right: auto;
    margin-left: auto;
    top: 100px;
    width: 350px;
    height: 45%;
  }

  #login {
    margin: 10% auto;
    width: 300px;
  }

  .el-form-item__label {
    font-weight: 500;
    /*padding: 20px 12px 20px 0 !important;*/
  }

  .el-input {
    margin-top: 0 !important;
  }

  #button button {
    margin-left: 55px;
  }

  #button a {
    color: #fff !important;
  }
</style>
