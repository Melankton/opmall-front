<template>
  <div>
    <Header/>
    <el-row :gutter="0">
      <el-col :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content bg-purple"/></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <div class="left-nav">
          <el-row class="tac">
            <el-col :span="4" style="min-height:calc(100vh - 200px);">
              <h5 style="margin-left: 20px">个人中心</h5>
              <el-menu
                default-active="1"
                open="1"
                class="el-menu-vertical-demo"
                background-color="#ffffff"
                text-color="#909399"
                active-text-color="#ec1f23"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="0">
                  <i class="el-icon-document"/>
                  <span slot="title"><router-link to="/home">个人中心</router-link></span>
                </el-menu-item>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"/>
                    <span>待处理订单</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1"><router-link to="/noPay">未支付</router-link></el-menu-item>
                    <el-menu-item index="1-2"><router-link to="/Paying">处理中</router-link></el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"/>
                    <span>已完成订单</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">已完成订单</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="3">
                  <i class="el-icon-document"/>
                  <span slot="title">已取消订单</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-document"/>
                  <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <i class="el-icon-setting"/>
                  <span slot="title">收货地址</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="0">&nbsp;</el-col>
            <el-col :span="20">
              <router-view/>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <Footer/>
  </div>
</template>

<script>
import Header from '../common/header'
import Footer from '../common/footer'
export default {
  name: 'Index',
  components: {
    Header,
    Footer
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .grid-content {
    min-height: 1px;
  }
.left-nav {
  background-color: #ffffff;
}
</style>
