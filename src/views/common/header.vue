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
                      width="600"
                      trigger="click">
                      <el-table :data="gridData">
                        <el-table-column width="150" property="date" label="日期"/>
                        <el-table-column width="100" property="name" label="姓名"/>
                        <el-table-column width="300" property="address" label="地址"/>
                      </el-table>
                      <span slot="reference">购物车</span>
                    </el-popover>
                  </el-menu-item>
                  <el-menu-item index="/login"><router-link to="/login">用户</router-link></el-menu-item>
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
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
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
    search() {
      if (this.input !== '') {
        const keyword = this.input
        this.$router.push({ path: '/goodsSearch', query: { keyword }})
      }
    },
    test(goodsCatChild) {
      this.$router.push({ path: '/goodsCat', query: { goodsCatChild }})
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
