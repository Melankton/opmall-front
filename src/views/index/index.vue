<template>
  <div>
    <Header />
    <div>
      <el-carousel :interval="5000" arrow="always" height="650px">
        <el-carousel-item v-for="item in carousel" :key="item">
          <h3><img :src="item" height="100%"></h3>
        </el-carousel-item>
      </el-carousel>
      <!--      热销商品-->
      <el-row :gutter="0" style="margin-top: 20px">
        <el-col :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content bg-purple"/></el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16"><div class="grid-content">
          <section class="w clearfix">
            <y-shelf title="热门商品">
              <div slot="content" class="hot" >
                <div v-for="goodsCat in goodsCats" :key="goodsCat.text" class="good-item">
                  <div>
                    <div class="good-img">
                      <router-link :to="'goodsDetails?productId='+ goodsCat.id">
                        <img :src="goodsCat.image" :alt="goodsCat.title">
                      </router-link>
                    </div>
                    <h6 class="good-title">{{ goodsCat.title }}</h6>
                    <h3 class="sub-title ellipsis">{{ goodsCat.title }}</h3>
                    <div class="good-price pr">
                      <div class="ds pa">
                        <router-link :to="'goodsDetails?productId='+goodsCat.id">
                          <y-button text="查看详情" style="margin: 0 5px"/>
                        </router-link>
                        <y-button
                          text="加入购物车"
                          style="margin: 0 5px"
                          class-style="main-btn"
                          @btnClick="addCart(goodsCat.id,goodsCat.price,goodsCat.title,goodsCat.image)"
                        />
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
      <!--      分类-->
      <el-row :gutter="0" style="margin-top: 20px">
        <el-col :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content bg-purple"/></el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16"><div class="grid-content">
          <section class="w clearfix">
            <y-shelf title="热门商品">
              <div slot="content" class="floors" >
                <div v-for="goodsCat in goodsCats" :key="goodsCat.text" class="good-item">
                  <div>
                    <div class="good-img">
                      <router-link :to="'goodsDetails?productId='+ goodsCat.id">
                        <img :src="goodsCat.image" :alt="goodsCat.title">
                      </router-link>
                    </div>
                    <h6 class="good-title">{{ goodsCat.title }}</h6>
                    <h3 class="sub-title ellipsis">{{ goodsCat.title }}</h3>
                    <div class="good-price pr">
                      <div class="ds pa">
                        <router-link :to="'goodsDetails?productId='+goodsCat.id">
                          <y-button text="查看详情" style="margin: 0 5px"/>
                        </router-link>
                        <y-button
                          text="加入购物车"
                          style="margin: 0 5px"
                          class-style="main-btn"
                          @btnClick="addCart(goodsCat.id,goodsCat.price,goodsCat.title,goodsCat.image)"
                        />
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
    </div>
  </div>
</template>

<script>
import Header from '../common/header'
import YShelf from '../common/shelf'
import YButton from '../common/YButton'
import { upload } from '@/api/goods'
import { getGoodsByCatId } from '@/api/index'
export default {
  name: 'Index',
  components: {
    Header,
    YShelf,
    YButton
  },
  data() {
    return {
      currentDate: new Date(),
      carousel: [
        'https://image01.oneplus.cn/shop/201811/05/1019/c74b8230e09be33bc3c2dfbd6d966c21.jpg',
        'https://image01.oneplus.cn/shop/201901/25/796/dddc1c2ac1fac2d70ea9d0472fdb6d65.jpg',
        'https://resource.smartisan.com/resource/2/2240X1108R1web1.png?x-oss-process=image/format,jpg/quality,Q_100'
      ],
      goodsCats: ''
    }
  },
  mounted() {
    getGoodsByCatId(1195, 8, 1).then(response => {
      this.goodsCats = response
    })
  },
  methods: {
    picUpload(file) {
      const param = new FormData()
      param.append('smfile', file.file)
      param.append('file_id', '0')
      upload(param).then(response => {
        const data = response
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .grid-content {
    min-height: 1px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: auto;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
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
