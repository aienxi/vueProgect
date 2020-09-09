<template>
  <div class="continer">
    <!-- 背景图片 -->
    <img
      class="view-back"
      :src="bookInfo.Imageurl"
      alt=""
    />
    <!-- 黑色半透明遮罩 -->
    <div class="viewBack-mask"></div>
    <div class="book-info-base">
      <div class="book-top-base">
        <!-- 封面 -->
        <img
          class="book-cover"
          :src="bookInfo.Imageurl"
          alt=""
        />
        <!-- 右侧的信息两块 -->
        <div class="book-info">
          <div class="book-info-title book-info-margin">
            {{ bookInfo.bookname }}
          </div>
          <!-- 所属分类 -->
          <div class="book-info-class book-info-margin">
            <div
              v-for="(item, index) in classList"
              :key="index"
            >
              {{ classList[index].className }}
            </div>
          </div>
          <div class="book-info-author-base book-info-margin">
            <div class="book-info-text">作者：{{ bookInfo.author }}</div>
            <label class="book-info-text1">{{ 10000 }}}</label>
          </div>
          <div class="book-info-text book-info-margin">
            共{{ bookInfo.chaptercount }}章
          </div>
          <div class="book-info-text book-info-margin">{{ 1111 }}</div>
        </div>
      </div>
    </div>
    <!-- 相关资料 -->
    <div
      class="book-about"
      v-if="false"
    >
      <div class="about-title">相关资料：</div>
      <div class="about-button">查阅纸书</div>
    </div>
    <!-- 播者 -->
    <div class="book-aothor-base">
      <div class="book-aothor">播者：{{ bookInfo.author }}</div>
      <div class="aothorLookMoore">
        <div class="lookMoreText">查看更多</div>
        <img
          class="lookMoreArrowImg"
          alt=""
          src="@/images/arrow_right.png"
        />
      </div>
    </div>
    <!-- 简介 -->
    <div class="book-summaryr-base">
      <div class="book-summaryr-title">简介</div>
      <div class="book-summaryr">
        {{ bookInfo.summary }}
      </div>
    </div>

    <div class="chapter-content" :style="'top:' + chapterTop + 'px'" >
      <!-- 触控条 -->
      <div  class="touchBar"
      @touchstart.prevent="touchstart"
      @touchmove.prevent="touchmove"
      @touchend.prevent="touchend"
      >
        <div class="touch-bar">
          <div class="touch-icon"></div>
        </div>

        <div class="segment-view">
          <div class="segment-item activity" @click="clickSegmentButton(0);">章节</div>
          <div id="segment1" class="segment-item"  @click="clickSegmentButton(1);">相似</div>
        </div>

      </div>
      <div class="indicate-block"></div>
      <div class="sp-line"></div>
      <!-- 播放按钮 -->
      <div class="chapter-play-view">
        <div class="play-button">
          <img class="play-button-img" alt="" src="@/images/playaudio/play.png" />
          <div  id="continuePlayButton" class="play-button-title" @click="continuePlay()" >开始播放</div>
          <div class="play-button-chapter-size">（共{{bookInfo.chaptercount}}章）</div>
        </div>
      </div>
      <!-- 滑动内容 -->
      <div class="wrapper" ref="wrapper" >
        <div class="scr-content">
            <div class="page-base">
              <div class="chapter-wrapper">
                <div class="chapter-wrapper-div">
                  <div  v-for="(item , index) in chapterList"  :key="index" >
                    <div :id="item.cid" >
                      <div class="chapter-base">
                        <div :id="'ctitle' + item.cid" class="chapter-title" >{{item.title}}</div>
                        <div class="capter-info">
                          <img class="capter-icon" alt="" src="@/images/book/bookrach_booksize.png" >
                          <div class="capter-text">{{item.size}}</div>
                          <img class="capter-icon" style="margin-left: 20px;" alt="" src="@/images/book/bookrack_during.png" >
                          <div class="capter-text"> {{item.times}} </div>
                        </div>
                      </div>
                    </div>
                    <div class="chapter-sp-line"></div>
                  </div>
                </div>
              </div>

            </div>
          <div>
            <!-- 相似推荐 -->
            <div class="page-base">
              <div class="sim-wrapper">
                <div class="sim-wrapper-div">
                  <div
                    v-for=" (item , index) in similaryList"
                    :key="index"
                  >

                    <div class="book-base">
                      <img
                        class="book-cover"
                        src=""
                        alt=""
                      />
                      <div class="content-base">
                        <div class="book-like-title">{{item.bookname}}</div>
                        <div class="book-like-author">作者：{{item.author}}</div>
                        <div class="book-like-author">播者：{{item.aochor}}</div>
                        <div class="book-like-summary">{{item.summary}}</div>
                      </div>
                    </div>
                    <!-- <div class="sp-line"></div> -->
                    <div class="chapter-sp-line"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BScroll from 'better-scroll'
import util from '@/util/util'
export default {
  data () {
    return {
      bookInfo: {},
      classList: [],
      similaryList: [],
      contentScroll: null,
      chapterList: [],
      touchBegin: 0,
      screenHeight: window.innerHeight,
      pandBotton: 100,
      chapterTop: 300
    }
  },
  created () {
    this.$api.bookApi
      .getBookInfo(this.$route.params.bookid)
      .then((res) => {
        console.log(res)
        var code = res.data.code
        if (code === 1) {
          this.bookInfo = res.data.data

          this.chapterList = util.chapterListDeal(this.bookInfo.chapterlist)
        } else {
        }
      })
      .catch(() => {})
  },
  mounted () {
    this.contentScroll = new BScroll(this.$refs.wrapper, {
      scrollX: true,
      scrollY: false,
      click: true,

      snap: { // 滑动切换的一些配置
        speed: 300, // 滑动切换的速度
        easing: { // 滑动切换的动画效果
          style: 'ease-in'
        },
        threshold: 0.5, // 滑动切换到超过一半时切换到下一屏
        stepX: 750 // 横向切换距离为轮播图宽度
      }

    })
    this.contentScroll.on('scrollEnd', (e) => {
      if (e.x === 0) {
        this.clickSegmentButton(0)
      } else {
        this.clickSegmentButton(1)
      }
    })
  },
  computed: {
    ...mapGetters(['fullScreen'])
  },
  methods: {
    ...mapActions(['setFullScreen', 'setCurrentBookInfo']),
    showPlayer (index) {
      this.setFullScreen(true)
      this.setCurrentBookInfo(this.bookInfo)
    },
    clickSegmentButton (index) {
      console.log(this.contentScroll)
      if (index === 0) {
        this.contentScroll.goToPage(0, 0, 300)
      } else {
        this.contentScroll.goToPage(1, 0, 300)
      }
    },
    continuePlay () {
      this.showPlayer()
    },
    touchstart (e) {
      var touch = e.touches[0]
      this.touchBegin = parseInt(touch.pageY)
    },
    touchmove (e) {
      e.preventDefault()
      var touch = e.touches[0]
      var top = parseInt(touch.pageY)
      if (top < 88) {
        this.chapterTop = 88
      } else if (top > this.screenHeight - 88) {
        this.chapterTop = this.screenHeight - this.pandBotton
      } else {
        this.chapterTop = top
      }
      console.log(this.chapterTop)

      // $('#chapterContent').attr('style', 'top:' + top + 'px')
    },
    touchend (e) {
      if (this.chapterTop - this.touchBegin < 0) {
        this.chapterTop = 88
      } else {
        this.chapterTop = this.screenHeight - this.pandBotton
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./BookDetail.scss";
</style>
