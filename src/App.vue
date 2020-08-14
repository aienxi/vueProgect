<template>
  <div id="app">
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item id="tab_home">
        <img
          slot="icon"
          src="@/images/tabbar/tab_home.png"
        />
        首页
      </mt-tab-item>
      <mt-tab-item id="tab_recommnd">
        <img
          slot="icon"
          src="@/images/tabbar/tab_recommnd.png"
        />
        推荐
      </mt-tab-item>
      <mt-tab-item id="tab_mys">
        <img
          slot="icon"
          src="@/images/tabbar/tab_mys.png"
        />
        我的
      </mt-tab-item>
      <mt-tab-item id="tab_account">
        <img
          slot="icon"
          src="@/images/tabbar/tab_account.png"
        />
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
  methods: {}
}
</script>

<style></style>
