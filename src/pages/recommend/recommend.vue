<template>
  <div>当前页面{{currentPage}}</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  computed: {
    ...mapGetters([
      'currentPage'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
