<template>
  <div class="gray-box">
    <div class="title">
      <h2>热销商品</h2>
      <div>
        <slot name="right"/>
      </div>
    </div>
    <!--内容-->
    <div>
      <slot name="content"/>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .gray-box {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
    background: #f1f1f1;
    border-color: #f1f1f1;
    border: 1px solid #f1f1f1;
    box-shadow: 0 3px 8px -6px #f1f1f1;
    .title {
      padding-left: 30px;
      position: relative;
      z-index: 10;
      height: 60px;
      padding: 0 10px 0 24px;
      border-bottom: 1px solid #f1f1f1;
      border-radius: 8px 8px 0 0;
      box-shadow: #f1f1f1 0 1px 7px;
      background: #f1f1f1;
      line-height: 60px;
      font-size: 18px;
      color: #f1f1f1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 18px;
        font-weight: 400;
        color: #626262;
        display: inline-block;
      }
    }
  }
</style>
