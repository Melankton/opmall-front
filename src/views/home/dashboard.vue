<template>
  <div style="margin-left: 20px">
    <h2>个人中心</h2>
    <h4>当前登录用户:{{ this.$store.getters.name }}</h4>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>

</style>
