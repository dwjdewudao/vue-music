<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="nomal-player" v-show="this.isNormalPlayer">
      <div class="player-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="this.currentSong.picUrl" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'NomalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isNormalPlayer',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'getLyric'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 1000 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 1000 }, function () {
        done()
      })
    }
  },
  watch: {
    currentSong (newValue, oldValue) {
      if (newValue.id === undefined) {
        return
      }
      this.getLyric(newValue.id)
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  .nomal-player{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    @include bg_sub_color();
    .player-warpper{
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 999;
    }
    .player-bg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        /*display: block;*/
        /*margin: 0 auto;*/
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        filter: blur(10px);
      }
    }
  }
</style>
