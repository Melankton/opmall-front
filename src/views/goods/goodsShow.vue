<template>
  <div>
    <Header />
    <el-row :gutter="0" style="margin-top: 100px">
      <el-col :sm="6" :md="6" :lg="6" :xl="6"><div class="grid-content bg-purple"/></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <el-row>
          <el-col :span="6">
            <img :src="goods.image" alt="" style="height: 200px">
          </el-col>
          <el-col :span="14">
            <el-card class="box-card" style="width: 600px" shadow="hover">
              <div slot="header" class="clearfix">
                <span>购买商品</span>
              </div>
              <div class="text item">
                <span style="font-size: xx-large">{{ goods.title }}</span>
              </div>
              <div class="text item">
                <span v-for="word in goods.keyword" :key="word"><el-button type="primary" size="mini" circle>{{ word }}</el-button><el-divider direction="vertical"/></span>
              </div>
              <div class="text item">
                <span style="font-size: large">价格: ￥{{ goods.price }}</span>
              </div>
              <div class="text item">
                <span style="font-size: large">库存:{{ goods.num }}</span>
              </div>
              <div class="text item">
                <span>数量</span>
                <div class="block">
                  <el-slider
                    v-model="num"
                    input-size="mini"
                    show-input/>
                </div>
                <el-button type="primary" round style="float: right;margin-top: 10px;margin-bottom: 10px" @click="addCart(goods.id,goods.title,goods.price)">加入购物车</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '@/views/common/header'
import { getGoodsById } from '@/api/goods'
export default {
  name: 'GoodsShow',
  components: {
    Header
  },
  data() {
    return {
      goods: {
        id: ''
      },
      num: 1
    }
  },
  mounted() {
    this.goods.id = this.$route.query.goodsId
    this.goodsInit(this.goods.id)
  },
  methods: {
    addCart(id, title, price) {
      const item = {
        id: id,
        title: title,
        price: price,
        num: this.num
      }
      this.$store.dispatch('add', item)
      this.success('添加到购物车成功')
    },
    success(value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      })
    },
    goodsInit(id) {
      getGoodsById(id).then(response => {
        this.goods = response
        if (this.goods.keyword !== null) {
          this.goods.keyword = this.goods.keyword.split(' ')
        }
      })
    }
  }
}
</script>

<style scoped>
  .grid-content {
    min-height: 1px;
  }
  .item {
    margin: 20px;
  }
</style>
