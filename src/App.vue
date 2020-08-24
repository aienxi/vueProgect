<template>
  <div id="app">
    <mt-header fixed title="导航栏" v-show="false">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div  :class="showNavbar?'show-nav-bar':'not-show-nav-bar'"></div>
    <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <tabbar v-show="showTabbar"></tabbar>
    <susview></susview>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tabbar from '@/components/Tabbar'
import SusView from '@/components/SusView'

export default {
  name: 'App',
  components: {
    tabbar: Tabbar,
    susview: SusView
  },
  data () {
    return {
      selected: 'tab_home'
    }
  },
  computed: {
    ...mapGetters([
      'currentPage'
    ]),
    showTabbar (newValue) {
      var show = true
      console.log('showNavbar')
      var arrNavPage = ['home', 'mys', 'recommend', 'user']

      if (arrNavPage.indexOf(this.currentPage) !== -1) {
        show = true
      } else {
        show = false
      }
      return show
    },
    showNavbar (showNavbar) {
      return false
    }

  },
  created () {
    // 注意，在Chrome浏览器中打印
  },
  mounted () {
  },
  methods: {},
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.show-nav-bar{
  width: 100%;
  height: 88px;
}
.not-show-nav-bar{
  width: 100%;
  height: 0;
}

</style>
