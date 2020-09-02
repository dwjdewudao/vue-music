<template>
  <swiper :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
      <div class="middle-img" ref="img">
        <img :src="this.currentSong.picUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <IScroll ref="Iscroll">
        <ul>
          <li v-for="(value, index) in Lyric" :key="index" :class="{'active' : currentLineNum === index}">{{value}}</li>
        </ul>
      </IScroll>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import IScroll from '../Iscroll'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMiddle',
  data () {
    return {
      swiperOptions: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0'
    }
  },
  components: {
    swiper,
    swiperSlide,
    IScroll
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'Lyric'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.img.classList.add('active')
      } else {
        this.$refs.img.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      /*
      // 1. 歌词高亮同步
      const value = Math.floor(newValue) + ''
      const res = this.Lyric[value]
      if (res !== undefined && res !== '') {
        this.currentLineNum = value
        // 2. 歌词滚动同步
        const currentLyricTop = document.querySelector('li.active').offsetTop
        // console.log(currentLyricTop)
        const lyricHeight = this.$refs.lyric.$el.offsetHeight
        if (currentLyricTop > lyricHeight / 2) {
          // console.log('开始滚动')
          this.$refs.Iscroll.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
        }
      }
      */
      // 1. 歌词高亮同步
      const value = Math.floor(newValue) + ''
      this.currentLineNum = this.getActiveLineNum(value)
      // 2. 歌词滚动同步
      const currentLyricTop = document.querySelector('.lyric .active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.Iscroll.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.Iscroll.scrollTo(0, 0, 100)
      }
    },
    Lyric (newValue, oldValue) {
      for (const value in newValue) {
        this.currentLineNum = value
        return
      }
    }
  },
  methods: {
    getFirstLyric () {
      for (const key in this.Lyric) {
        return this.Lyric[key]
      }
    },
    getActiveLineNum (value) {
      if (value < 0) {
        return this.currentLineNum
      }
      const res = this.Lyric[value + '']
      if (res === undefined || res === '') {
        value--
        return this.getActiveLineNum(value)
      } else {
        return value + ''
      }
    }
  },
  props: {
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
.banner{
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd{
    .middle-img{
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      animation: sport 4s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      text-align: center;
      @include font_color();
      @include font_size($font_medium);
      margin-top: 50px;
    }
  }
  .lyric{
    li{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type{
        padding-bottom: 50%;
      }
      &.active{
        color: #fff;
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
<style lang="scss">
  @import "../../assets/css/mixin";
  .my-bullet{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    margin: 0 20px;
  }
  .my-bullet-active{
    width: 60px;
    @include bg_color();
  }
</style>
