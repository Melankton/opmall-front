<template>
  <div class="head">
    <el-row>
      <el-col :span="4">
        <div class="grid-content"/>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <el-row>
            <el-col :span="18">
              <div class="grid-content">
                <el-menu
                  :default-active="activeIndex2"
                  class="el-menu-demo"
                  mode="horizontal"
                  background-color="#f1f1f1"
                  text-color="#909399"
                  active-text-color="#ec1f23"
                >
                  <el-menu-item index="index">
                    <router-link to="/index"><img
                      id="icon"
                      src="/src/icons/oneplus.png"
                      alt=""></router-link>
                  </el-menu-item>

                  <el-submenu
                    v-for="goodsCat in goodsCatlist"
                    :index="goodsCat.id.toString()"
                    :key="goodsCat.text">
                    <template slot="title">{{ goodsCat.text }}</template>

                    <el-menu-item
                      v-for="goodsCatChild in goodsCat.child"
                      :index="'goodsCat/'+goodsCatChild.id.toString()"
                      :key="goodsCatChild.id">
                      <!--                      <router-link-->
                      <!--                        :to="'/goodsCat/'+goodsCatChild.id.toString()"-->
                      <!--                        style="text-decoration: none">-->
                      <!--                        {{ goodsCatChild.text }}-->
                      <!--                      </router-link>-->
                      <a @click="test(goodsCatChild)">{{ goodsCatChild.text }}</a>
                    </el-menu-item>
                  </el-submenu>
                </el-menu>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-menu
                  :default-active="activeIndex2"
                  class="el-menu-demo"
                  mode="horizontal"
                  background-color="#f1f1f1"
                  text-color="#909399"
                  active-text-color="#ec1f23">
                  <el-menu-item index="/search">
                    <el-dropdown :hide-on-click="false" :hide-timeout="300">
                      <span class="el-dropdown-link">
                        <a @click="search">搜索</a><i class="el-icon-arrow-down el-icon--right"/>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <el-input v-model="input" placeholder="请输入内容" style="width: 100%"/>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-menu-item>
                  <el-menu-item index="9">
                    <el-popover
                      placement="top"
                      width="500"
                      trigger="click">
                      <el-table
                        ref="singleTable"
                        :data="cart"
                        highlight-current-row
                        style="width: 100%"
                        @current-change="handleCurrentChange">
                        <el-table-column
                          type="index"
                          label="编号"
                          width="50"/>
                        <el-table-column
                          property="title"
                          label="商品名"
                          width="150"/>
                        <el-table-column
                          property="num"
                          label="数量"
                          width="80"/>
                        <el-table-column
                          property="price"
                          width="100"
                          label="价格"/>
                        <el-table-column
                          fixed="right"
                          label="操作"
                          width="80">
                          <template slot-scope="scope">
                            <el-button
                              type="text"
                              size="small"
                              @click.native.prevent="deleteRow(scope.$index, cart)">
                              移除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div style="margin-top: 20px">
                        <el-button @click="cleanCart()">清空购物车</el-button>
                        <el-button style="float: right" @click="toPay()">结账</el-button>
                      </div>
                      <span slot="reference">购物车</span>
                    </el-popover>
                  </el-menu-item>
                  <el-submenu index="/login">
                    <template slot="title"><router-link to="/login">用户</router-link></template>
                    <span v-if="this.$store.getters.roles ==='user'" >
                      <el-menu-item index="2-1" @click="signOut">注销</el-menu-item>
                    </span>
                  </el-submenu>
                </el-menu>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getNavList } from '@/api/index'
export default {
  name: 'Header',
  data() {
    return {
      cart: this.$store.getters.cart,
      visible2: false,
      goodsCatlist: {},
      input: '',
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  mounted() {
    getNavList().then(response => {
      this.goodsCatlist = response
    })
  },
  methods: {
    cleanCart() {
      this.$store.dispatch('cleanCart')
      this.cart = this.$store.getters.cart
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      })
    },
    signOut() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({ path: this.redirect || '/index' })
        this.success('用户注销成功!')
      })
    },
    search() {
      if (this.input !== '') {
        const keyword = this.input
        this.$router.push({ path: '/goodsSearch', query: { keyword }})
      }
    },
    test(goodsCatChild) {
      this.$router.push({ path: '/goodsCat', query: { goodsCatChild }})
    },
    toPay() {
      if (JSON.stringify(this.$store.getters.cart).length !== 2) {
        if (this.$store.getters.roles === 'user') {
          this.$router.push({ path: '/pay' })
        } else {
          this.$router.push({ path: '/login' })
        }
      } else {
        this.fail('购物车为空')
      }
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    deleteRow(index, rows) {
      this.$store.dispatch('delete', rows[index].id)
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

<style scoped>
  .head {
    background-color: #f1f1f1;
  }
  a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: #909399;
  }

  .router-link-active {
    text-decoration: none;
  }

  .grid-content {
    background-color: #f1f1f1;
    min-height: 60px;
  }
  .el-input__inner {
    background-color: #f1f1f1;
  }
</style>
