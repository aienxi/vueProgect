<template>
  <div>
    <div v-for="index in 50" :key="index">
      {{index}}推荐
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'recommend',
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
