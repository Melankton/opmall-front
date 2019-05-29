<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <router-link to="/user/table">
          <div class="card-panel-description">
            <div class="card-panel-text">用户数</div>
            <count-to :start-val="0" :end-val="countTotal.userTotal" :duration="2600" class="card-panel-num" />
          </div>
        </router-link>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <router-link to="/comment/comment">
          <div class="card-panel-description">
            <div class="card-panel-text">待审核评论</div>
            <count-to :start-val="0" :end-val="countTotal.commentTotal" :duration="3000" class="card-panel-num" />
          </div>
        </router-link>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <router-link to="/order/paying">
          <div class="card-panel-description">
            <div class="card-panel-text">待发货</div>
            <count-to :start-val="0" :end-val="countTotal.waitExpressOrder" :duration="3200" class="card-panel-num" />
          </div>
      <router-link to="/comment/comment"/></router-link></div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <router-link to="/order/success">
          <div class="card-panel-description">
            <div class="card-panel-text">已完成订单</div>
            <count-to :start-val="0" :end-val="countTotal.successOrderTotal" :duration="3600" class="card-panel-num" />
          </div>
        </router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getDashNotifyCount } from '@/api/goods'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      countTotal: {
        commentTotal: 0,
        successOrderTotal: 0,
        userTotal: 0,
        waitExpressOrder: 0
      }
    }
  },
  created() {
    getDashNotifyCount('').then(response => {
      if (response.status === '200') {
        const data = response.data[0]
        this.countTotal.commentTotal = parseInt(data.commentTotal)
        this.countTotal.successOrderTotal = parseInt(data.successOrderTotal)
        this.countTotal.userTotal = parseInt(data.userTotal)
        this.countTotal.waitExpressOrder = parseInt(data.waitExpressOrder)
      }
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
