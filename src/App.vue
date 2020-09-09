<template>
  <div id="app">
    <keep-alive>
        <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition" :css="!!direction">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"/>
        </transition>

    </keep-alive>
      <!-- <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="viewTransition" :css="!!direction">
        <router-view />
      </transition> -->
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
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>
