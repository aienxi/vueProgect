<template>
  <div >
<!-- 分类栏 -->
<div class="class-wrapper">
    <div class="class-base">
        <div v-for='(item,index) in classList' :key="index">
            <div :id="'navItem'+item.classId" :ref="'navItem'+item.classId"   @click="clickClassButton(item.classId)"  :class="currentClassId===item.classId?'activity':''" class="class_item " >{{item.className}}</div>
        </div>

    </div>
    <div class="coverView"></div>

    <div class="class-button"  @click="showClassPageButton(true)">
        <img class="class-button-img" alt="" src="@/images/index/class.png">
    </div>
</div>

<!--主容器-->
<div class="content">
    <div class="wrapper" ref="wrapper">
        <div class="course">
                <div class="book-row" @click="clickBookItem(item.bookId)" v-for='(item) in bookList' :key="item.bookId">
                    <img class="img-view" :src="item.Imageurl" />
                    <img v-if='item.isfine' class="imgSingle" alt="" :src="item.isfine">
                    <div class="right" >
                        <div class="title">{{item.bookName}}</div>
                        <div class="text">作者：{{item.author}}</div>
                        <div class="text">播者：{{item.aothor}}</div>
                        <div class="summary">{{item.summary}}</div>
                    </div>
                </div>
            <div class="bottom-view" id="bottomView">{{moreText}}</div>
        </div>
    </div>
</div>
<!--  <div class="nav_bar"></div>
 -->
 <div class="class-sus-base" :class="isAppear">
     <div class="sus-nav-base">
         <div class="sus-back-button" @click="showClassPageButton(false)">
             <img class="sus-back-button-img" alt="" src="@/images/index/close.png">
         </div>

         <div class="sus-title"></div>
         <div class="sus-back-button"></div>
     </div>

     <div class="sus-class-base">
         <div class="sus-class-content" >
             <div v-for='(item) in classList' :key="item.classId">
            <div :id="'susItem'+item.classId" :ref="'susItem'+item.classId"   @click="clickPageClassButton(item.classId)"   class="sus_class_item " >{{item.className}}</div>
        </div>
         </div>
     </div>
 </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      classList: [],
      bookList: [],
      currentClassId: 0,
      classId: 0,
      moreText: '',
      scroll: null,
      isAppear: ''

    }
  },
  created () {
    this.currentClassId = this.$route.params.classId

    this.getClass()
  },
  mounted () {
    let that = this
      // 使用ref配合refs获取dom元素
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,  // 元素可触发点击事件
      scrollY: true,  // 纵向可滑动，默认为true
      bounce: true,
    //   useTransition: false,
      pullUpLoad: {
        threshold: -80 // 当上拉距离超过80px时触发 pullingUp 事件
      },
      pullDownRefresh: true
    })
    that.scroll.on('pullingUp', () => {
      that.pageIndex ++
      that.getClassList(this.currentClassId, that.pageIndex)
    })
    that.scroll.on('pullingDown', () => {
      console.log('pullingDown')

      that.scroll.finishPullDown() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
    })
  },
  methods: {
    getClass () {
      console.log(this.currentClassId)

      this.$api.homeApi.getHomeInfo().then(res => {
        var code = res.data.code
        if (code === 1) {
          this.classList = res.data.classList
          if (this.currentClassId > 0) {
            this.getClassList(this.currentClassId, 1)
          }
        } else {
        }
      }).catch((fail) => {

      })
    },
    getClassList (classid, page) {
      this.$nextTick(() => {
        console.log(this.$refs[`navItem${classid}`])
        if (page === 1 && this.$refs[`navItem${classid}`]) {
          this.$refs[`navItem${classid}`][0].scrollIntoView({behavior: 'auto', block: 'center', inline: 'center'})
        }
      })
      this.$api.homeApi.getClassList(classid, page).then(res => {
        var code = res.data.code
        if (code === 1) {
          if (page === 1) {
            this.bookList = res.data.data
          } else {
            this.bookList = this.bookList.concat(res.data.data)
          }
        }
        this.scroll.refresh()

        if (code === 1) {
          this.scroll.finishPullUp() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        } else {
          this.moreText = '全部加载完毕'
        }
      }).catch((fail) => {

      })
    },
    clickClassButton (classId) {
      this.pageIndex = 1
      this.scroll.scrollTo(0, 0, 0)
      this.currentClassId = classId
      this.getClassList(this.currentClassId, 1)
      this.moreText = '加载中...'
    },
    clickPageClassButton (classId) {
      let that = this
      that.showClassPageButton(false)
      that.clickClassButton(classId)
    },
    clickBookItem (bookId) {
      window.location.href = '../detail/detail.jsp?bookid=' + bookId + '&action=classlist'
    },
    showClassPageButton (isShow) {
      if (isShow) {
        this.isAppear = 'class-sus-show'
      } else {
        this.isAppear = 'class-sus-hide'
      }
    }
  }
}
</script>

<style>
.app{
    height:100Vh;
}
.class-banner-base{
  width: 100%;
  height: 88px;
  position: fixed;
  top: 88px;
  left: 0;
  background: #FFFFFF;
}
.listModel {
  width: 750px;
  float: left;
  background-color: #FFFFFF;
  margin-bottom: 96px;
  padding-bottom: env(safe-area-inset-bottom);

}
.book-row{
  width: 100%;
  height: 287px;
  overflow: hidden;
  position: relative;
}
 .course {
  width: 750px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}
 .img-view {
  width: 160px;
  height: 225px;
  float: left;
  margin-top: 30px;
  margin-left: 40px;

}
 .course .imgDiv .ic {
  width: 57px;
  height: 57px;
  /* background-image: url(../img/ic.png); */
  float: left;
  margin-top: 90px;
  margin-left: 64px;
}
 .right {
  float: right;
  width: 490px;
  height: 225px;
  overflow: hidden;
  margin-top: 30px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;

}
 .right .title {
  width: 100%;
  overflow: hidden;
  color: #333333;
  font-size:32px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;

}
 .right .text {
  width: 100%;
  font-size: 24px;
  color: #999999;
  margin-top: 10px;
}
.summary{
  width: 100%;
  font-size:24px;
  font-weight:400;
  color:#999999;
  line-height:36px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
}
.classfy{
  text-decoration:none;
  color: #000000;
}
.book-block{
  width: 100%;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
    overflow: hidden;

}
.class_item {

  border-bottom: 5px solid #ffffff;
  color: #999999;
  margin-right: 22px;
  font-size: 30px;
  padding: 4px 18px;
  list-style: none;
  white-space: nowrap;
  height: 60px;
  line-height: 60px;;
}
.class_item.activity{
  border-bottom: 5px solid #E30611;
  color: #333333;
  font-size: 30px;
}
.class-wrapper{
  width: 750px;
  height: 88px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;

}
.class-base{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  height: 88px;
  width: 660px;
  overflow: scroll;
  position: relative;
  top: 0;
  background: #FFFFFF;
}
.class-base::-webkit-scrollbar {
  display: none;/*隐藏滚动条*/
}
.class-button{
  width: 90px;
  height: 88px;
  background:#FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;

}
.class-button-img{
  height: 40px;
  width: auto;
}
.content{
    height: 100%;
    width: 100%;
}
.wrapper{
  position: absolute;
  left: 0;
  top: 88px;
  bottom: 0;
  width: 100%;
  overflow:hidden;

}
.bottom-view{
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 28px;
  color: #999999;
}

.class-sus-base{
  position: fixed;
  top: 0;
  left: 750px;
  right: 0;
  bottom: 0;
  z-index: 991;

}
.class-sus-show{
  animation: sushow 0.3s linear forwards;
}
.class-sus-hide{
  animation: sushide 0.3s linear forwards;
}
@keyframes sushow {
from {left: 750px;}
to {left: 0;}
}
@keyframes sushide {
from {left: 0;}
to {left: 750px;}
}
.sus-nav-base{
  width: 100%;
  height: 88px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #FFFFFF;
}
.sus-back-button{
  width: 88px;
  height: 88px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.sus-back-button-img{
  width: 36px;
  height: 36px;
}
.sus-title{
  width: 574px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  font-size:34px;
  color:rgba(51,51,51,1);

}
.sus-class-base{
  position: absolute;
  top: 88px;
  left: 0;
  bottom: 0;
  width: 750px;
  overflow: scroll;
  background-color:#F5F5F5;
}
.sus-class-content{
  width: 710px;
  margin-left: 20px;
}
.sus_class_item{
  height: 90px;
  margin-left: 20px;
  min-width: 152px;
  margin-top: 20px;
  float: left;
  font-size:28px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height: 90px;
  background: #FFFFFF;
  text-align: center;

}
.coverView{
  width:40px;
  height:88px;
  background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,1));
  position: absolute;
  right: 90px;
  top: 0;
}
.imgSingle{
  position: absolute;
  top: 30px;
  left: 40px;
  width: 60px;
  height: 60px;
}
</style>
