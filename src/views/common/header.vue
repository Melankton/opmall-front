<template>
  <div>
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
                  <el-menu-item index="8">搜索</el-menu-item>
                  <el-menu-item index="9">购物车</el-menu-item>
                  <el-menu-item index="/"><router-link to="/">用户</router-link></el-menu-item>
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
    test(goodsCatChild) {
      this.$router.push({ path: '/goodsCat', query: { goodsCatChild }})
    }
  }
}
</script>

<style scoped>
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
</style>
