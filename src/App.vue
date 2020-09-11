<template>
  <div id="app">
    <keep-alive>
        <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition" :css="!!direction">
          <keep-alive include="home,mys,recommend,user">
            <router-view  :class="viewTransition"/>
          </keep-alive>
        </transition>

    </keep-alive>
    <tabbar v-show="showTabbar"></tabbar>
    <audioPlayer></audioPlayer>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

import Tabbar from '@/components/Tabbar'
import AudioPlayer from '@/pages/player/AudioPlayer'

export default {
  name: 'app',
  components: {
    tabbar: Tabbar,
    audioPlayer: AudioPlayer
  },
  computed: {
    ...mapGetters([
      'showTabbar',
      'direction'

    ]),
    viewTransition () {
      if (!this.direction) return ''
      console.log(this.direction)
      if (this.showTabbar && this.direction !== 'reverse') {
        return ''
      }
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }

  }

}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active{
    animation: leftOneScreen 500ms linear forwards-mode;
    position: relative;
}
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  // transition: all 2500ms;
  // height: 100%;
    position: relative;
      animation: rightOneScreen 500ms linear forwards-mode;

}
// .vux-pop-out-enter {
//   opacity: 1;
//   animation: leftOneScreen 500ms linear forwards-mode;
// }
// .vux-pop-out-leave-active {
//   opacity: 1;
//   animation: rightOneScreen 500ms linear forwards-mode;
// }
// .vux-pop-in-enter {
//   opacity: 1;
//   animation: rightOneScreen 500ms linear forwards-mode;
// }
// .vux-pop-in-leave-active {
//   opacity: 1;
//   animation: leftOneScreen 500ms linear forwards-mode;
// }

@keyframes leftOneScreen {
  0%{
    left: 0;
  }
  100%{
    left: -750px;
  }
}
@keyframes rightOneScreen {
  0%{
    left: 0;
  }
  100%{
    left: 750px;
  }
}
</style>
