<template>
  <div id="app">
    <mt-header fixed title="导航栏" v-show="false">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="navBar"></div>
    <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item id="tab_home">
        <img class="icon-style" slot="icon" src="@/images/tabbar/tab_home.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="tab_recommnd">
        <img slot="icon" src="@/images/tabbar/tab_recommnd.png" />
        推荐
      </mt-tab-item>
      <mt-tab-item id="tab_mys">
        <img slot="icon" src="@/images/tabbar/tab_mys.png" />
        我的
      </mt-tab-item>
      <mt-tab-item id="tab_account">
        <img slot="icon" src="@/images/tabbar/tab_account.png" />
        账号
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      selected: 'tab_home'
    }
  },
  created () {
    // 注意，在Chrome浏览器中打印
    console.log(window.navigator)
  },
  mounted () {
  },
  methods: {},
  watch: {
    selected (newValue) {
      console.log(newValue)
      if (newValue === 'tab_home') {
        this.$router.replace('/')
      } else if (newValue === 'tab_recommnd') {
        this.$router.replace('/recommend')
      } else if (newValue === 'tab_mys') {
        this.$router.replace('/mys')
      } else if (newValue === 'tab_account') {
        this.$router.replace('/user')
      } else {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar{
  width: 100%;
  height: 88px;
}
</style>
