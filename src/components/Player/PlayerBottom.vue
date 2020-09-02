<template>
    <div class="player-bottom">
      <div class="bottom-progress">
        <span ref="eleCurrentTime">00:00</span>
        <div class="progress-bar" @click="progressClick" ref="bar">
          <div class="progress-line" ref="line" >
            <div class="progress-dot"></div>
          </div>
        </div>
        <span ref="eleTotalTime">00:00</span>
      </div>
      <div class="bottom-controll">
        <div class="mode loop" @click="mode" ref="mode"></div>
        <div class="prev" @click="prev"></div>
        <div class="play" @click="playing" ref="play"></div>
        <div class="next" @click="next"></div>
        <div class="favorite" @click="favorite" :class="{'active': isFavorite(this.currentSong)}"></div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import mode from '../../store/ModeTpye'
import { formartTime } from '../../tools/tools'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'setFavoriteSong',
      'setFavoriteList'
    ]),
    playing () {
      this.setPlaying(!this.isPlaying)
    },
    mode () {
      if (this.isModeType === mode.loop) {
        this.setModeType(mode.one)
      } else if (this.isModeType === mode.one) {
        this.setModeType(mode.random)
      } else if (this.isModeType === mode.random) {
        this.setModeType(mode.loop)
      }
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    progressClick (e) {
      // 1. 计算进度条位置
      // const normalLeft = e.target.offsetLeft
      const normalLeft = this.$refs.bar.offsetLeft
      const eventLeft = e.pageX
      const clickLeft = eventLeft - normalLeft
      // const progressWidth = e.target.offsetWidth
      const progressWidth = this.$refs.bar.offsetWidth
      const value = clickLeft / progressWidth
      this.$refs.line.style.width = value * 100 + '%'

      // 2. 计算播放时间
      const CurrentTime = this.totalTime * value
      // console.log(CurrentTime)
      this.setCurrentTime(CurrentTime)
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite (song) {
      const res = this.favoriteList.find(function (currentValue) {
        return currentValue.id === song.id
      })
      return res !== undefined
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'isModeType',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    isModeType (newValue, oldValue) {
      if (newValue === mode.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === mode.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === mode.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    totalTime (newValue, oldValue) {
      const time = formartTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    currentTime (newValue, oldValue) {
      // 1. 计算总时长
      const time = formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      // 2. 计算进度条的%
      const value = newValue / this.totalTime * 100
      this.$refs.line.style.width = value + '%'
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
  @import "../../assets/css/variable";
.player-bottom{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .bottom-progress{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      @include font_size($font_samll);
      @include font_color();
    }
    .progress-bar{
      width: 100%;
      height: 10px;
      background: #fff;
      margin: 0 10px;
      .progress-line{
        width: 0%;
        height: 100%;
        background: #ccc;
        position: relative;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-controll{
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      width: 84px;
      height: 84px;
    }
    .mode{
      &.loop{
        @include bg_img('../../assets/images/loop');
      }
      &.one{
        @include bg_img('../../assets/images/one');
      }
      &.random{
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev{
      @include bg_img('../../assets/images/prev')
    }
    .play{
        @include bg_img('../../assets/images/play');
      &.active{
        @include bg_img('../../assets/images/pause');
      }
    }
    .next{
      @include bg_img('../../assets/images/next');
    }
    .favorite{
        @include bg_img('../../assets/images/un_favorite');
      &.active{
        @include bg_img('../../assets/images/favorite');
      }
    }
  }
}
</style>
