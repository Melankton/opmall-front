<template>
  <div>
    <Header />
    <!-- 商品列表 -->
    <el-row :gutter="0" style="margin-top: 20px">
      <el-col :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content bg-purple"/></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16"><div class="grid-content">
        <section class="w clearfix">
          <y-shelf title="商品列表">
            <div slot="content" class="floors" >
              <div v-for="goodsCat in goodsCats" :key="goodsCat.text" class="good-item">
                <div>
                  <div class="good-img">
                    <router-link :to="'goodsShow?goodsId='+ goodsCat.id">
                      <img :src="goodsCat.image" :alt="goodsCat.title">
                    </router-link>
                  </div>
                  <h6 class="good-title">{{ goodsCat.title }}</h6>
                  <h3 class="sub-title ellipsis">{{ goodsCat.keyword }}</h3>
                  <div class="good-price pr">
                    <div class="ds pa">
                      <router-link :to="'goodsShow?goodsId='+goodsCat.id">
                        <el-button type="primary" size="mini" style="margin: 15px" >查看详情</el-button>
                      </router-link>
                      <el-button type="primary" size="mini" icon="el-icon-shopping-cart" @click="addCart(goodsCat.id,goodsCat.title,goodsCat.price)">加入购物车</el-button>
                    </div>
                    <p><span style="font-size: 16px">￥</span>
                      {{ goodsCat.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </y-shelf>
        </section>
      </div></el-col>
    </el-row>
    <el-row :gutter="0" style="margin-bottom: 40px">
      <el-col :span="8" :offset="8">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[8, 16, 24]"
          :page-size="20"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getGoodsByCatId } from '@/api/index'
import Header from '../common/header'
import YShelf from '../common/shelf'
import YButton from '../common/YButton'
export default {
  name: 'GoodsCat',
  components: {
    Header,
    YShelf,
    YButton
  },
  data() {
    return {
      currentPage4: 8,
      total: 8,
      goodsCats: {},
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
    addCart(id, title, price) {
      const item = {
        id: id,
        title: title,
        price: price,
        num: 1
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
    goodsCatInit: function(params) {
      getGoodsByCatId(params.goodsCatId, params.nums, params.page).then(response => {
        this.goodsCats = response.data
        this.total = parseInt(response.status)
      })
    },
    handleSizeChange(val) {
      this.params.nums = val
      this.goodsCatInit(this.params)
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.goodsCatInit(this.params)
    }
  }
}
</script>

<style scoped>
  .grid-content {
    min-height: 80px;
  }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
  .banner, .banner span, .banner div {
    font-family: "Microsoft YaHei";
    transition: all .3s;
    -webkit-transition: all .3s;
    transition-timing-function: linear;
    -webkit-transition-timing-function: linear;
  }

  .banner {
    perspective: 3000px;
    position: relative;
    z-index: 19;
  }

  .bg {
    position: relative;
    width: 1220px;
    height: 500px;
    margin: 20px auto;
    background: url("/static/images/banner-3d-item.png") center no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    transform-style: preserve-3d;
    -webkit-transform-origin: 50% 50%;
    -webkit-transform: rotateY(0deg) rotateX(0deg);
  }

  .img {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 5px;
    left: 0;
    background: url("/static/images/banner-3d.png") center no-repeat;
    background-size: 95% 100%;
  }

  .text {
    position: absolute;
    top: 20%;
    right: 10%;
    font-size: 30px;
    color: #fff;
    text-align: right;
    font-weight: lighter;
  }

  .copyright {
    position: absolute;
    bottom: 10%;
    right: 10%;
    font-size: 10px;
    color: #fff;
    text-align: right;
    font-weight: lighter;
  }

  .a {
    -webkit-transform: translateZ(40px);
  }

  .b {
    -webkit-transform: translateZ(20px);
  }

  .c {
    -webkit-transform: translateZ(0px);
  }

  .sk_item {
    width: 170px;
    height: 225px;
    padding: 0 14px 0 15px;
    > div {
      width: 100%;
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;
      &:hover {
        transform: translateY(-5px);
      }
    }
    img {
      width: 130px;
      height: 130px;
      margin: 17px 0;
    }
    .sk_item_name {
      color: #999;
      display: block;
      max-width: 100%;
      _width: 100%;
      overflow: hidden;
      font-size: 12px;
      text-align: left;
      height: 32px;
      line-height: 16px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .sk_item_price {
      padding: 3px 0;
      height: 25px;
    }
    .price_new {
      font-size: 18px;
      font-weight: 700;
      margin-right: 8px;
      color: #f10214;
    }
    .price_origin {
      color: #999;
      font-size: 12px;
    }
  }

  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 29px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);

  }

  ul.box {
    display: flex;
    li {
      flex: 1;
      img {
        display: block;
        width: 305px;
        height: 200px;
      }
    }
  }

  .mt30 {
    margin-top: 30px;
  }

  .hot {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }

  .floors {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .imgbanner {
      width: 50%;
      height: 430px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .good-item {
    background: #fff;
    width: 25%;
    transition: all .5s;
    height: 430px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .good-price p {
        display: none;
      }
      .ds {
        display: flex;
      }
    }
    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }

    .good-img {
      img {
        margin: 50px auto 10px;
        @include wh(206px);
        display: block;
      }
    }
    .good-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #e4393c;
      font-size: 20px;
    }
    .good-title {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }
    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 10px;
    }

  }
</style>

