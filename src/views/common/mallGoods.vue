<template>
  <div class="good-item">
    <div>
      <div class="good-img">
        <router-link :to="'goodsShow?goodsId='+msg.productId">
          <img v-lazy="msg.productImageBig" :alt="msg.productName">
        </router-link>
      </div>
      <h6 class="good-title">{{ msg.productName }}</h6>
      <h3 class="sub-title ellipsis">{{ msg.sub_title }}</h3>
      <div class="good-price pr">
        <div class="ds pa">
          <router-link :to="'goodsShow?goodsId='+msg.productId">
            <y-button text="查看详情" style="margin: 0 5px"/>
          </router-link>
          <y-button
            text="加入购物车"
            style="margin: 0 5px"
            class-style="main-btn"
            @btnClick="addCart(msg.productId,msg.salePrice,msg.productName,msg.productImageBig)"
          />
        </div>
        <p><span style="font-size: 16px">￥</span>
          {{ msg.salePrice }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import YButton from '/components/YButton'
import { addCart } from '/api/goods'
import { mapMutations, mapState } from 'vuex'
export default {
  props: {
    msg: { type: [Object, Array] }
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
    goodsDetails(id) {
      this.$router.push({ path: 'goodsDetails/productId=' + id })
    },
    addCart(id, price, name, img) {
      console.log(id)
    }
  },
  computed: {
    ...mapState(['login', 'showMoveImg', 'showCart'])
  },
  mounted() {
  },
  components: {
    YButton
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";

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
