<template>
    <ul class="detail-bottom">
      <li class="bottom-top" @click="PlayAllSongs">
        <div class="bottom-icon"></div>
        <div class="bottom-title">播放全部</div>
      </li>
      <li v-for="value in playlist" :key="value.id" class="item" @click="changeNormalPlayer(value.id)">
        <h3>{{value.name}}</h3>
        <p>{{value.ar[0].name}} - {{value.al.name}}</p>
      </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setNomalPlayer',
      'setMiniPlayer',
      'setSongs',
      'getLyric',
      'setCurrentIndex'
    ]),
    changeNormalPlayer (id) {
      // this.$store.dispatch('setNomalPlayer', true)
      this.setNomalPlayer(true)
      this.setSongs([id])
    },
    PlayAllSongs () {
      this.setNomalPlayer(true)
      const ids = this.playlist.map(function (value) {
        return value.id
      })
      // console.log(ids)
      this.setSongs(ids)
      this.setCurrentIndex(0)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.detail-bottom{
  width: 100%;
  li{
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #cccccc;
  }
  .bottom-top{
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon{
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 20px;
    }
    .bottom-title{
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item{
    h3{
      @include font_size($font_medium);
      @include font_color();
      @include no-wrap();
    }
    p{
      @include font_size($font_samll);
      @include font_color();
      opacity: 0.7;
      margin-top: 5px;
    }
  }
}
</style>
