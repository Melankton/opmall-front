<template>
  <div v-html="htmlRAW">
    <h1>Pay</h1>
  </div>
</template>

<script>
export default {
  name: 'PayPage',
  props: {
    html: { type: String, default: '' }
  },
  data() {
    return {
      htmlRAW: ''
    }
  },
  mounted() {
    this.htmlRAW = this.$store.state.cart['url']
    document.forms[0].submit()
  },
  created() {
    this.htmlRAW = this.$store.state.cart['url']
    document.forms[0].submit()
  }
}
</script>

<style scoped>

</style>
