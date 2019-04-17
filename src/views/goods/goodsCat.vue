<template>
  <div>
    <Header />
    <div style="margin-top: 30px"/>
    <el-row>
      <el-col :span="4">
        <div class="grid-content"/>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <div class="clearfix">
            <span>手机</span>
          </div>
          <el-row :gutter="20" style="margin-top: 30px">
            <el-col
              v-for="goods in goodsCat"
              :lg="6"
              :md="8"
              :sm="12"
              :key="goods.title"
              style="margin-top: 20px">
              <el-card class="box-card" style="text-align:center" shadow="hover">
                <img
                  :src="goods.image"
                  alt="">
                <br>
                <span>{{ goods.title }}</span>
                <br>
                <span>$:{{ goods.price }}</span>
                <br>
                <el-button type="text">查看详情</el-button>

              </el-card>
            </el-col>

          </el-row>

        </el-card>
        <el-pagination
          :total="1000"
          background
          layout="prev, pager, next"
          style="text-align: center;margin-top: 30px"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getGoodsByCatId } from '@/api/index'
import Header from '../common/header'
export default {
  name: 'GoodsCat',
  components: {
    Header
  },
  data() {
    return {
      goodsCat: {},
      params: {
        goodsCatId: this.$route.query.goodsCatChild.id,
        nums: 8,
        page: 1
      }
    }
  },
  watch: {
    '$route'() {
      this.params.goodsCatId = this.$route.query.goodsCatChild.id
      this.goodsCatInit(this.params)
    }
  },
  mounted() {
    this.goodsCatInit(this.params)
  },
  methods: {
    goodsCatInit: function(params) {
      getGoodsByCatId(params.goodsCatId, params.nums, params.page).then(response => {
        this.goodsCat = response
      })
    }
  }
}
</script>

<style scoped>
  .grid-content {
    min-height: 80px;
  }
</style>
