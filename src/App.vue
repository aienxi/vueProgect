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
        <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition" :css="!!direction">
          <router-view v-if="$route.meta.keepAlive"/>
        </transition>

    </keep-alive>
        <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition" :css="!!direction">
          <router-view v-if="!$route.meta.keepAlive"/>
        </transition>

    <tabbar v-show="showTabbar"></tabbar>
    <audioPlayer></audioPlayer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tabbar from '@/components/Tabbar'
import AudioPlayer from '@/pages/player/AudioPlayer'

export default {
  name: 'App',
  components: {
    tabbar: Tabbar,
    audioPlayer: AudioPlayer
  },
  data () {
    return {
      selected: 'tab_home'
    }
  },
  computed: {
    ...mapGetters([
      'showTabbar'
    ]),
    // showTabbar (newValue) {
    //   var show = true
    //   var arrNavPage = ['home', 'mys', 'recommend', 'user']

    //   if (arrNavPage.indexOf(this.currentPage) !== -1) {
    //     show = true
    //   } else {
    //     show = false
    //   }
    //   return show
    // },
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
// .slide-enter-active,.slide-leave-active{
//           transition: all 0.3s;
//     }

// .slide-enter,.slide-leave-to{
//       transform: translate3d(100%,0,0);

// }
.slide-enter{
    transform:  translate3d(-750px,0,0);
}
.slide-enter-active{
    transition: all .3s;
}

.slide-leave-to {
    transform:  translate3d(-750px,0,0);
}
.slide-leave-active {
    transition: all .3s;
}
@keyframes fadeinR {
  0% {
    opacity: 0;
    transform: translateX(150px);
  }
  100% {
    opacity:1;
    transform:translateX(0);
  }
}
.vux-header-fade-in-right-enter-active {
  animation: fadeinR .5s;
}
.vux-header-fade-in-left-enter-active {
  animation: fadeinL .5s;
}

@keyframes fadeinL{
  0% {
    opacity: 0;
    transform: translateX(-150px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

</style>
