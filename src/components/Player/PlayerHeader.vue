<template>
    <div class="header" @click="setThemes">
      <div class="header-left" @click.stop="hiddleNormalPlayer"></div>
      <div class="header-title">
        <h3>{{this.currentSong.name}}</h3>
        <p>{{this.currentSong.singer}}</p>
      </div>
      <div class="header-right"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    ...mapActions([
      'setNomalPlayer',
      'setMiniPlayer'
    ]),
    setThemes () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    hiddleNormalPlayer () {
      this.setNomalPlayer(false)
      this.setMiniPlayer(true)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
  .header{
    width: 100%;
    height: 100px;
    /*background: #000;*/
    //@include bg_color();
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 999;
    .header-left, .header-right{
      width: 84px;
      height: 84px;
      margin-top: 8px;
    }
    .header-left{
      @include bg_img('../../assets/images/down')
    }
  .header-title{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;
    h3{
      @include font_size($font_medium)
    }
    p{
      margin-top: 10px;
      @include font_size($font_samll)
    }
  }
}
</style>
