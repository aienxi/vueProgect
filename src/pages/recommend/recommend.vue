<template>
  <div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {

    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'fullScreen'
    ])
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })

  }
}
</script>

<style lang="scss" scoped>

</style>
