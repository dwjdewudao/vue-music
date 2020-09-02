<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="mini-player" v-show="this.isMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="showNormalPlayer">
          <img :src="this.currentSong.picUrl" ref="img">
          <div class="player-title">
            <h3>{{this.currentSong.name}}</h3>
            <p>{{this.currentSong.singer}}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="playing" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setNomalPlayer',
      'setMiniPlayer',
      'setListPlayer',
      'setPlaying'
    ]),
    showList () {
      this.setListPlayer(true)
    },
    showNormalPlayer () {
      this.setNomalPlayer(true)
      this.setMiniPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 1000 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 1000 }, function () {
        done()
      })
    },
    playing () {
      this.setPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'isMiniPlayer',
      'isPlaying',
      'currentSong'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.img.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.img.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    .player-left {
      display: flex;
      padding-left: 30px;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        animation: sport 4s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
      }

      .player-title {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3 {
          @include font_size($font_medium);
          color: #fff;
        }

        p {
          @include font_size($font_medium_s);
          color: #fff;
        }
      }
    }

    .player-right {
      display: flex;
      align-items: center;

      .play {
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }

      .list {
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list')
      }
    }
  }
}
  @keyframes sport {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
