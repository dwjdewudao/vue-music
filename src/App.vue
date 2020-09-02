<template>
  <div id="app">
    <mainHeader></mainHeader>
    <Tabbar></Tabbar>
    <keep-alive include="Singer, Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>
<script>
import mainHeader from './components/mainHeader'
import Tabbar from './components/Tabbar'
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    mainHeader,
    Tabbar,
    Player
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  @import "assets/css/variable";

</style>
