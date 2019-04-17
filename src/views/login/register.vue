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
          <h2 class="text-center">用户注册</h2>
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
            <el-form-item label="密码确认" prop="passcon">
              <el-input v-model="userForm.passcon" type="password" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userForm.phone" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" auto-complete="off"/>
            </el-form-item>
            <el-form-item>
              <div id="button">
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="primary" @click="registerForm">注册</el-button>
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
import { register } from '@/api/login'
export default {
  data() {
    var checkPasscon = (rule, value, callback) => {
      if (value !== this.userForm.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    var usernameCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
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
      userForm: {
        username: '',
        password: '',
        passcon: '',
        email: '',
        phone: ''
      },
      loginRules: {
        username: [
          { validator: usernameCheck, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
        ],
        passcon: [
          { validator: checkPasscon, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.userForm.username = ''
      this.userForm.password = ''
      this.userForm.email = ''
      this.userForm.phone = ''
      this.userForm.passcon = ''
    },
    registerForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          register(this.userForm).then(response => {
            const data = response
            if (data.status !== 400) {
              this.success('账号注册成功')
              this.$router.push({ path: this.redirect || '/login' })
            } else {
              this.fail(data.msg)
            }
          })
        } else {
          this.fail('请检查注册信息!')
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
