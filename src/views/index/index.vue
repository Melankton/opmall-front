<template>
  <div>
    <Header />
    <div>
      <el-carousel :interval="5000" arrow="always" height="650px">
        <el-carousel-item v-for="item in carousel" :key="item">
          <h3><img :src="item"></h3>
        </el-carousel-item>
      </el-carousel>
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
              <el-col :lg="6" :md="8" :sm="12">
                <el-card class="box-card" style="text-align:center" shadow="hover">
                  <img
                    src="https://image01.oneplus.cn/ebp/201706/22/317/6e9d4458ee0f0f86c9e5dcfd2d577ee1_200_200.png"
                    alt="">
                  <br>
                  <span>一加旅行双肩包</span>
                  <br>
                  <span>￥:500</span>
                  <br>
                  <el-button type="text">查看详情</el-button>

                </el-card>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12">
                <el-card class="box-card" style="text-align:center" shadow="hover">
                  <img
                    src="https://image01.oneplus.cn/ebp/201706/22/317/6e9d4458ee0f0f86c9e5dcfd2d577ee1_200_200.png"
                    alt="">
                  <br>
                  <span>一加旅行双肩包</span>
                  <br>
                  <span>￥:500</span>
                  <br>
                  <el-button type="text">查看详情</el-button>

                </el-card>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12">
                <el-card class="box-card" style="text-align:center" shadow="hover">
                  <img
                    src="https://image01.oneplus.cn/ebp/201706/22/317/6e9d4458ee0f0f86c9e5dcfd2d577ee1_200_200.png"
                    alt="">
                  <br>
                  <span>一加旅行双肩包</span>
                  <br>
                  <span>￥:500</span>
                  <br>
                  <el-button type="text">查看详情</el-button>

                </el-card>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12">
                <el-card class="box-card" style="text-align:center" shadow="hover">
                  <img
                    src="https://image01.oneplus.cn/ebp/201706/22/317/6e9d4458ee0f0f86c9e5dcfd2d577ee1_200_200.png"
                    alt="">
                  <br>
                  <span>一加旅行双肩包</span>
                  <br>
                  <span>￥:500</span>
                  <br>
                  <el-button type="text">查看详情</el-button>

                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import Header from '../common/header'
export default {
  name: 'Index',
  components: {
    Header
  },
  data() {
    return {
      currentDate: new Date(),
      carousel: [
        'https://image01.oneplus.cn/shop/201901/25/1079/2377762d17e6978bc64b2932c3927a56.jpg',
        'https://image01.oneplus.cn/shop/201901/25/796/dddc1c2ac1fac2d70ea9d0472fdb6d65.jpg',
        'https://image01.oneplus.cn/shop/201811/05/1019/c74b8230e09be33bc3c2dfbd6d966c21.jpg'
      ]
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
    min-height: 80px;
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
