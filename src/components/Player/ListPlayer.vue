<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="list-player" v-show="this.isListPlayer">
      <div class="player-warpper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <p v-if="this.isModeType === 0">顺序播放</p>
            <p v-if="this.isModeType === 1">单曲循环</p>
            <p v-if="this.isModeType === 2">随机播放</p>
          </div>
          <div class="top-right">
            <div class="del" @click="delAll"></div>
          </div>
        </div>
        <div class="player-middle">
          <Iscroll ref="Iscroll">
            <ul ref="play">
              <li class="item" v-for="(value,index) in this.isSongs" :key="value.id" @click="selectMusic(index)">
                <div class="item-left">
                  <div class="item-play" @click.stop="playing" v-show="currentIndex === index"></div>
                  <p>{{value.name}}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite" @click.stop="favorite(value)" :class="{'active': isFavorite(value)}"></div>
                  <div class="item-del" @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
          </Iscroll>
        </div>
        <div class="player-bottom" @click.stop="hiddle">
          <p>关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Iscroll from '../Iscroll'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex'
import mode from '../../store/ModeTpye'
export default {
  name: 'ListPlayer',
  components: {
    Iscroll
  },
  methods: {
    ...mapActions([
      'setPlaying',
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex',
      'setFavoriteSong'
    ]),
    show () {
      this.isShow = true
    },
    hiddle () {
      this.setListPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: 650 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.perspectiveUpOut', { duration: 650 }, function () {
        done()
      })
    },
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
    del (index) {
      this.setDelSong(index)
      // this.isSongs.splice(index, 1)
    },
    delAll () {
      this.setDelSong()
      // this.isSongs.splice(0, this.isSongs.length)
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
    },
    favorite (value) {
      this.setFavoriteSong(value)
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
      'isListPlayer',
      'isSongs',
      'currentIndex',
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
    isListPlayer (newValue, oldValue) {
      this.$refs.Iscroll.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.list-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-warpper{
    .player-top{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left{
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode{
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop{
            @include bg_img('../../assets/images/small_loop');
          }
          &.one{
            @include bg_img('../../assets/images/small_one');
          }
          &.random{
            @include bg_img('../../assets/images/small_shuffle');
          }
        }
        p{
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .top-right{
        .del{
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/small_del')
        }
      }
    }
    .player-middle{
      ul{
        &.active{
          .item{
            .item-play{
              @include bg_img('../../assets/images/small_pause');
            }
          }
        }
      }
      height: 700px;
      overflow: hidden;
      .item{
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left{
          display: flex;
          align-items: center;
          .item-play{
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_play');
            margin-right: 20px;
          }
          p{
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right{
          display: flex;
          align-items: center;
          .item-favorite{
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_un_favorite');
            &.active{
              @include bg_img('../../assets/images/small_favorite');
            }
          }
          .item-del{
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img('../../assets/images/small_close')
          }
        }
      }
    }
    .player-bottom{
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p{
        text-align: center;
        color: #ffff;
        @include font_size($font_medium);
      }
    }
  }
}
</style>
