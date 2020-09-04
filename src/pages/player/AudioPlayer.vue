<template>
  <div class="player">
    <transition name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave">
      <!--播放页面全屏-->
      <div class="normal-player" v-show="fullScreen" ref="cdWrapper">
        <!--背景 模糊-->
        <img class="view-back" :src="currentBookInfo.Imageurl" alt="">
        <!-- <div class="view-back" :style="'background: url(' + currentBookInfo.Imageurl + ')no-repeat center center fixed;'"> -->
        <!-- </div> -->
        <!--顶部-->
        <div class="player-nav-base">
          <div class="player_back_base" >
            <img class="play-back-img" src="@/images/playaudio/player_back.png" alt="" @click.prevent="back()">
          </div>
          <div id="chapterName" class="chapterName">{{currentBookInfo.bookname}}</div>
          <div class="player_back_base"></div>
        </div>
        <!--中间cd部分-->
        <div class="content_player_cdView"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
          ref="wapper" >
          <img :src="currentBookInfo.Imageurl" alt="" class="cdView_img" :class="cdCss">
        </div>
        <!--底部按钮控制部分-->
        <div class="player-bar">
          <div class="p_b_c">
            <img  class="play_icon icon-small-size" src="@/images/playaudio/back15s.png" alt="">
            <img  class="play_icon icon-small-size" src="@/images/playaudio/previous.png" alt="">
            <img  class="play_icon icon-play-size" v-show="playStatus === 1" @click.prevent="togglePlaying"  src="@/images/playaudio/play_pause.png" alt="">
            <img  class="play_icon icon-play-size" v-show="playStatus !== 1" @click.prevent="togglePlaying"  src="@/images/playaudio/play_restar.png" alt="">
            <img  class="play_icon icon-small-size" src="@/images/playaudio/next.png" alt="">
            <img  class="play_icon icon-small-size" src="@/images/playaudio/forward15s.png" alt="">
           </div>
        </div>
      </div>
   </transition>
        <!--播放页面小屏 底部-->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
          <img class="mini-img" alt="" :src="currentBookInfo.Imageurl" :class="cdCss">
      </div>
    </transition>

    <audio :src="currentUrl"
      ref="audio"
      @play="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="ended"
    >
    </audio>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { prefixStyle } from '@/util/dom'
import animations from 'create-keyframe-animation'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
      duration: 0,
      radius: 32,
      currentShow: 'cd',
      playIndex: 0,
      chapterList: [],
      currentUrl: '',
      showAlert: false,
      currentSong: {},
      alertMenus: [{
        label: '0.75倍',
        type: 'default'
      }, {
        label: '1倍',
        type: 'warn'
      }, {
        label: '1.25倍',
        type: 'default'
      }, {
        label: '1.5倍',
        type: 'default'
      }, {
        label: '1.75倍',
        type: 'default'
      }, {
        label: '2倍',
        type: 'default'
      }]
    }
  },
  components: {
  },
  // 滑动touch
  created () {
  },
  // 填充歌曲信息 控制歌曲播放
  computed: {
    cdCss () {
      return this.playStatus === 1 ? 'image-rotate' : 'image-pause'
    },
    percent () {
      return this.currentTime / this.duration
    },
    ...mapGetters([
      'fullScreen',
      'playStatus',
      'currentBookInfo'
    ])
  },
  watch: {
    currentBookInfo (newSong, oldSong) {
      this.getSongInfo()
    },
    playStatus (newPlaying) {
      const audio = this.$refs.audio
      console.log('watch newPlaying')
      console.log(newPlaying)
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    },
    fullScreen () {
      // this.getgetSongInfo()
      console.log('fullScreen')
    },
    currentIndex (index) {
      console.log('index' + index)
      this.getSongInfo()
    }
  },
  methods: {
    getSongInfo () {
      console.log('getSongInfo')
      console.log(this.currentBookInfo)
      this.$api.bookApi.getAudioUrl(this.currentBookInfo.bookid, this.currentBookInfo.chapterlist[0].cid).then(res => {
        console.log(res)
        this.currentUrl = res.data.data.audiourl
      }).catch((e) => {

      })
    },
    // 监听progressBar派发的事件
    onProgressBarChange (percent) {
      const currentTime = this.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (this.this.playStatus !== 1) {
        this.togglePlaying()
      }
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
      this.duration = e.target.duration
    },
    // 格式化时间
    format (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    // 防止快速点击 产生错误
    ready () {
      console.log('ready')
      this.songReady = true
      // this.savePlayHistory(this.currentSong)
    },
    error () {
      this.songReady = true
    },
    // 歌曲前进后退
    prev () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      this.setCurrentIndex(index)
      if (this.playStatus !== 1) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    /// 更改播放速率
    changeRate () {
      this.showAlert = true
      // if (this.$refs.audio.playbackRate === 2) {
      //   this.$refs.audio.playbackRate = 1
      // } else {
      //   this.$refs.audio.playbackRate = 2
      // }
    },
    /// 打开播放列表
    gotoChapterList () {

    },
    back15 () {

    },
    forward15 () {

    },
    next () {
      if (!this.songReady) {
        return
      }
      // 列表只有一首歌曲则单曲循环
      let index = this.currentIndex + 1
      this.setCurrentIndex(index)
      if (this.playStatus !== 1) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    ended () {
      this.next()
    },
    back () {
      console.log('-------')
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    // 设置playing状态 watch playing的变化 实现播放暂停
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      if (this.playStatus === 1) {
        this.setPlayStatus(0)
      } else {
        this.setPlayStatus(1)
      }
    },

    middleTouchStart (e) {
      this.touch.initiated = true
      // 用来判断是否是一次移动
      this.touch.moved = false
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove (e) {
      // 没有touchstart 返回
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      // y轴距离大于x轴距离 => 纵向滚动 => 返回
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      // 滚动的距离  最大是0
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.wapper.style.opacity = 1 - this.touch.percent
      this.$refs.wapper.style[transitionDuration] = 0
    },
    middleTouchEnd () {
      if (!this.touch.moved) {
        return
      }
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
        if (offsetWidth) {

        }
      }
      // 动画缓冲时间
      const time = 300
      this.$refs.wapper.style.opacity = opacity
      this.$refs.wapper.style[transitionDuration] = `${time}ms`
      this.touch.initiated = false
    },

    // vue transition 动画钩子
    enter (el, done) {
      const {x, y, scale} = this._getPosAndScale()

      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter () {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave () {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    // vue transition 动画钩子结束

    // 获取动画起始位置
    _getPosAndScale () {
      // 左下角小图片初始位置
      const targetWidth = 64
      const paddingLeft = window.innerWidth / 2
      const paddingBottom = 18
      // 中间大图片距离顶部位置
      const paddingTop = 80
      // 中间图片宽度
      const width = window.innerWidth * 0.8
      // 缩放尺度
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    },
    ...mapActions([
      'setFullScreen',
      'setPlayStatus',
      'setCurrentBookInfo'
    ])
  }
}
</script>
<style lang="scss" scoped>
  @import './css/player.scss';

</style>
