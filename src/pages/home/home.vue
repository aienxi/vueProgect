<template>
    <div class="container">
        <!-- 顶部渐变背景色 -->
        <div class="top-color-view" >
        </div>
          <!-- 顶部自定义导航栏 -->
        <div class="top-search-view" :class="navStyle">
            <div class='top-search-searchbox' :class="navStyle" @click='gotoSearch'>
              <img class="search-icon-img" src="@/images/index/home_search.png"/>
              <div class="search-title" :class="navStyle">书名/作者/播者/章节</div>
            </div>
        </div>
        <div class="nav-place-view"></div>
            <!-- 顶部banner图下的带圆角的背景图 -->
        <div class="top-white-color-view">
        </div>
        <mt-swipe :auto="4000" class="swipe">
            <mt-swipe-item v-for="(item,index) in swipterList" :key="index">
                <img class="banner-image" :src="item.imageUrl" alt="">
            </mt-swipe-item>
    </mt-swipe>

      <!-- 滑动分类 -->
  <div class='cfylist'>
    <mt-swipe :auto='0' class='class-swiper' :show-indicators='false'  @change='classSwiperChange'>
      <mt-swipe-item class="cfylist-item" v-for="(item,index) in swiperClassArr"  :key="index + 100">
        <div class="class-swiper-item-base" @change='classImageChange'>
          <div class="cfyicon" v-for="(item,index) in swiperClassArr[index]"  :key="index">
            <img class="cfyicon-image" :src="item.classimg" />
            <label class="cfyicon-name">{{item.className}}</label >
          </div>
      </div>
    </mt-swipe-item>
  </mt-swipe>
      <!-- class 自定义指示点dot -->
    <div class="dots">
      <div class="base">
        <div v-for="(item,index) in swiperClassArr" :key="index">
          <div class="dot" :class='classSwiperCurrent == index ? "active" : ""'></div>
        </div>
      </div>
    </div>
  </div>
<!-- 书籍列表 -->
  <div  v-for="(item) in classList" :key="item.classId">
  <!-- 分割线 -->
    <div class="cut-view"></div>
    <!-- 卡片视图 -->
    <div class="book-card-view">
      <div class="classfy">
        <div class='cfytitle'>{{item.className}}</div>
        <div class="more-view themeGray">
          <div class="morecfy">更多</div>
          <img class="more-image" src="/images/index/btn_arrow_right.png" />
        </div>
    </div>
    <!-- 横向排列的书籍 -->
    <div class="booklist">
      <div class="book-item" v-for="(bookItem) in item.classDetail" :key="bookItem.bookid">
          <div class='boolk-detail' @click="clickBook(bookItem)">
            <img class='item-cover' :src="bookItem.imageUrl" />
            <img v-if='bookItem.isfine' class='isfine-image' :src='bookItem.isfine' />
            <div class="item-name themeBlack">{{bookItem.bookname}}</div>
          </div>
      </div>
    </div>
    </div>
  </div>

  <div class="foot-placeholder"></div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      navStyle: '',
      swipterList: [],
      swiperClassArr: [],
      classList: [],
      classSwiperCurrent: 0,
      navOpacity: 0
    }
  },
  created () {

  },
  mounted () {
    this.$toast.showLoading()
    let that = this
    this.$api.homeApi.getHomeInfo().then(res => {
      console.log(res)
      this.$toast.hideLoading()
      var code = res.data.code
      if (code === 1) {
        that.swipterList = res.data.slide
        var arrCla = res.data.classList.slice(0)
        var arrClass = []
        for (var i = 0; i < arrCla.length / 10; i++) {
          arrClass.push([])
          for (var j = 0; j < arrCla.length; j++) {
            var row = Math.trunc(j / 10)
            if (row === i) {
              arrClass[i].push(arrCla[j])
            }
          }
        }
        that.swiperClassArr = arrClass
        that.classList = arrCla
      }
    }).catch((e) => {
      console.log(e)
    })

    window.addEventListener('scroll', this.onPageScroll)
  },

  methods: {
    gotoSearch () {

    },
    classImageChange () {

    },
    classSwiperChange (e) {
      this.classSwiperCurrent = e
    },
    backScrollr (e) {
      console.log(e)
    },
    clickBook (bookItem) {
      this.$router.push({name: 'bookDetail', params: {bookid: bookItem.bookid}})
    },
    onPageScroll (e) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      if (scrollTop <= 100) {
        if (scrollTop <= 50) {
          this.navStyle = 'top'

          this.setNavBarStyle(0)
        } else {
          this.navStyle = 'bottom'
          this.setNavBarStyle(1)
        }

        this.navOpacity = scrollTop / 100
      } else {
        this.navOpacity = 1
        this.navStyle = 'bottom'
        this.setNavBarStyle(1)
      }
    },
    //  style 1 黑色 else 白色
    setNavBarStyle (style) {
      if (style === 1) {
      } else {
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.top-color-view{
  width: 750px;
  height: 418px;
  position: absolute;
  // z-index: 0;
  background: gray;
  top: 0;
  left: 0;
}
.top-search-view{
  width: 750px;
  position: fixed;
  z-index: 10;
  top:0;
  height:100px;
  background:rgba(255,255,255,0)
}
.top-search-view.top{
  background:rgba(255,255,255,0)
}
.top-search-view.bottom{
  background:rgba(255,255,255,1)

}
.top-search-searchbox {
  background-color: rgba(255,255,255,0.1);
  border-radius: 30px;
  left: 25px;
  right: 25px;
  height: 60px;
  bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
} .top-search-searchbox.top{
  background-color: rgba(255,255,255,0.1);
} .top-search-searchbox.bottom{
  background-color: rgba(0,0,0,0.1);

} .search-title.top{
  color:#FFFFFF;

}
 .search-title.bottom{
  color:#333333;

}
.search-icon-img{
  width: 28px;
  height: 28px;
  margin-left: 30px;

}
.search-title{
  margin-left: 30px;
  font-size:26px;
  color:rgba(255,255,255,1);

}
.nav-place-view{
  width: 750px;
  height: 112px;
  position: relative;
}
.top-white-color-view{
  position: absolute;
  // z-index: 0;
  background: #FFFFFF;
  border-radius: 25px 25px 0 0;
  width: 750px;
  height: 300px;
  top:253px;
}
.swipe{
 width: 100%;
 height: 300px;
 position: relative;
 top:0;
}
.banner-image{
  margin-left: 25px;
  width: 700px;
  height: 300px;
  border-radius: 25px;

}
.cfylist{
    position: relative;
    background: white;
    top: 0;
}
.class-swiper{
  height: 270px;
  width: 750px;
}
.cfylist-item{
  height: 270px;
  width: 750px;
}
.class-swiper-item-base{
  margin-left: 25px;
  width: 701px;
}
.cfyicon{
    width:140px;
    float:left;
    margin-top: 20px;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.cfyicon-image{
    height:76px;
    width: 76px;
}
.cfyicon-name{
  font-weight:500;
  font-size:24px;
  color: #333333;
  margin-top: 15px;
  height: 24px;
  line-height: 24px;
}
.dots {
    position: relative;
    background: #ffffff;
    top: 0;
    left: 0;
    width: 750px;
    height: 40px;
}
.dots .base{
  background: #ffffff;
  display: flex;
  justify-content: center;
  height: 6px;
  border-radius: 3px;
  align-items: center;
  width: auto;
}
.dot{
  margin-top: 17px;
  width: 30px;
  height: 6px;
  background-color: #EEEEEE;
  border-radius: 3px;

}
.dot.active {
  height: 6px;
  background: #EC1C26;
}
.cut-view{
  width:100%;
  height:15px;
  background-color:#efeff5;
}
.book-card-view{
  margin-left: 25px;
  width: 700px;
  border-radius: 25px;
  box-shadow:0px 0px 27px 0px rgba(0, 0, 0, 0.03);
  background-color:#ffffff;

}

.cfytitle{
  float: left;
  font-size: 32px;
  margin-left: 30px;
  margin-top: 29px;
}

.classfy{
    width:100%;
    height:90px;
    margin:23px 0 0 0;
}
.more-view{
    float: right;
    font-size: 26px;
    display: flex;
    flex-direction: row;
    margin-top: 0;
    align-items: center;
    height: 90px;
    width: 350px;
    justify-content: flex-end;
}
.morecfy{
    margin-right: 10px;
    font-size: 26px;

}
.more-image{
  width:12px;
  height:22px;
  margin-right: 30px;
}
.booklist{
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin-left: 18px;
    margin-right: 18px;
}
.book-item{
    width:166px;

}
.boolk-detail{
    position:relative;
    width:166px;
}
.item-cover{
    height:200px;
    width: 142px;
    // z-index: 50;
    margin-left: 12px;
}
.item-name{
  text-align: center;
  font-size: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.isfine-image{
  width: 60px;
  height: 60px;
  position:absolute;
  top: 0;
  left: 12px;
  z-index: 9;
}

</style>
