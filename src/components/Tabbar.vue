<template>
    <div class="tabbar">
      <div class="tabbar-item" @click.prevent="selectTabbar(0)">
        <img v-if="selectIndex !== 0" class="tabbar-item-icon" src="@/images/tabbar/tab_home.png" alt="">
        <img v-if="selectIndex === 0" class="tabbar-item-icon" src="@/images/tabbar/tab_home_select.png" alt="">
        <div class="tabbar-item-title" :class="selectIndex === 0?'select':'unselect'">首页</div>
      </div>
      <div class="tabbar-item" @click="selectTabbar(1)">
        <img v-if="selectIndex !== 1" class="tabbar-item-icon" src="@/images/tabbar/tab_recommnd.png" alt="">
        <img v-if="selectIndex === 1" class="tabbar-item-icon" src="@/images/tabbar/tab_recommnd_select.png" alt="">
        <div class="tabbar-item-title" :class="selectIndex === 1?'select':'unselect'">推荐</div>
      </div>
      <!-- 占位 -->
      <div class="tabbar-item">
     </div>

      <div class="tabbar-item" @click="selectTabbar(2)">
        <img v-if="selectIndex !== 2" class="tabbar-item-icon" src="@/images/tabbar/tab_account.png" alt="">
        <img v-if="selectIndex === 2" class="tabbar-item-icon" src="@/images/tabbar/tab_account_select.png" alt="">
        <div class="tabbar-item-title" :class="selectIndex === 2?'select':'unselect'">我的</div>
      </div>
      <div class="tabbar-item" @click="selectTabbar(3)">
        <img v-if="selectIndex !== 3" class="tabbar-item-icon" src="@/images/tabbar/tab_mys.png" alt="">
        <img v-if="selectIndex === 3" class="tabbar-item-icon" src="@/images/tabbar/tab_mys_select.png" alt="">
        <div class="tabbar-item-title" :class="selectIndex === 3?'select':'unselect'">账号</div>
      </div>

    </div>
</template>

<script>

export default {
  components: {
  },
  name: 'Tabbar',
  data () {
    return {
      selectIndex: 0
    }
  },
  methods: {
    selectTabbar (index) {
      if (this.selectIndex === index) {
        return
      }
      this.selectIndex = index
      switch (this.selectIndex) {
        case 0:
          this.$router.replace('/')
          break
        case 1:
          this.$router.replace('/recommend')
          break
        case 2:
          this.$router.replace('/mys')
          break
        case 3:
          this.$router.replace('/user')
          break

        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$tabbarHeight : 100;
$themeRed :#EC1C26;
$themeBlack :#333333;
$themeGray :#666666;
$themeLightGray :#999999;
$iconSize:50px;

.tabbar{
  width: 750px;
  height: $tabbarHeight;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  background: #ffffff;
  z-index: 500;
}
.tabbar-item{
  height: $tabbarHeight;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

}
.tabbar-item-icon{
  width: $iconSize;
  height: $iconSize;
}
.tabbar-item-title{
  font-size: 26px;
}
.tabbar-item-title.select{
  color: $themeRed;
}
.tabbar-item-title.unselect{
  color: $themeGray;
}
</style>
