<template>
<!-- root -->
  <div class="container themeWhite" >
    <!-- history -->
    <div>
      <!-- title -->
      <div  class="tite-base">
        <div class="tite-tite themeBlack" >最近收听</div>
        <div>更多</div>
      </div>
      <div>
        <div ref="history" class="history-content">
          <div class="scroll-content" ref="historyContent">
            <div  v-for="(item,index) in historyList" :key="item.bookid" >
              <div :class="index===0?'book-item0':'book-item'" v-if="index<10">
                <img class="book-cover" :src="item.bookimg" alt="" >
                <div class="book-title">{{item.bookname}}}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div  class="tite-base">
        <div class="tite-tite themeBlack">猜你喜欢</div>
        <div>刷新</div>
      </div>

      <div></div>
    </div>
    <div></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      historyList: []
    }
  },
  computed: {

  },
  mounted () {
    this.getHistory()
    this.scroll = new BScroll(this.$refs.history, {
      scrollX: true,
      click: true,
      bounce: false

    })
  },
  methods: {
    getHistory () {
      this.$toast.showLoading()
      this.$api.mys.getHistory().then(res => {
        var code = res.data.code
        console.log(res)
        this.$toast.hideLoading()

        if (code === 1) {
          this.historyList = res.data.data
          var width = 0

          if (this.historyList.length > 10) {
            width = 75 * 10 + (10 - 1) * 12 + 40
          } else {
            width = 75 * this.historyList.length + (this.historyList.length - 1) * 12 + 40
          }
          this.$refs.historyContent.style.width = width + 'px' // 修改滚动区域的宽度
          this.scroll.refresh()
        } else {

        }
      }).catch(error => {
        console.log(error)
      })
    },
    getYouLike () {

    }
  }

}
</script>

<style lang="scss" scoped>
.tite-base{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100px;
}
.tite-tite{
  margin-left: 40px;
  font-size:32px;
  font-family:PingFang SC;
  font-weight:600;

}
.history-content{
  height: 300px;
  width: 750px;
  overflow:hidden;

}

.scroll-content{
  overflow: hidden;
  padding: 0;
  height:300px ;
  width: 100%;
}
.book-item0{
  height: 300px;
  width: 150px;
  margin-left: 40px;
  float: left;
}

.book-item{
  height: 300px;
  width: 150px;
  margin-left: 24px;
  float: left;
}
.book-cover{
  width:150px;
  height:209px;

}
.book-title{
  width: 100%;
  height: auto;
  font-size:28px;
  font-family:PingFang SC;
  font-weight:400;
  color:#333333;
  text-align: left;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}

</style>
