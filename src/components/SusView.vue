
<template>
  <div class="sus-view">
      <img class="book-cover" src="@/images/playaudio/play.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'sus-view',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
$susWidth : 64;
$left: (750 - $susWidth)/2 + 'px';
.sus-view{
    width: 64px;
    height: 64px;
    position: fixed;
    left: 343px;
    bottom: 18px;
    z-index: 999;
    border-radius: 32px;
}
.book-cover{
    width: 64px;
    height: 64px;
}
</style>
