<template>
  <div class="singer">
    <div class="singer-wrapper">
      <IScroll ref="IScroll">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value, index) in keys" :key="index" ref="group">
            <h2 class="group-title">{{value}}</h2>
            <ul>
              <li class="group-item" v-for="(value, i) in list[index]" :key="i" @click.stop="switchSinger(value.id)">
                <img v-lazy="value.img1v1Url" alt="">
                <p>{{value.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </IScroll>
      <ul class="list-keys">
        <li
          v-for="(key, index) in keys"
          :key="key"
          :data-index="index"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          :class="{'active' : currentIndex === index}">{{key}}</li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllSinger } from '../api/index'
import IScroll from '../components/Iscroll'
import MetaInfo from '../../vue-meta-info'
export default {
  name: 'Singer',
  metaInfo: MetaInfo.singer,
  components: {
    IScroll
  },
  methods: {
    _keyDown (index) {
      const offsetY = this.groupTop[index]
      this.currentIndex = index
      this.$refs.IScroll.scrollTo(0, -offsetY)
    },
    touchstart (e) {
      const index = e.target.dataset.index
      this._keyDown(index)
      this.beginOffsetY = e.touches[0].pageY
    },
    touchmove (e) {
      this.moveOffsetY = e.touches[0].pageY
      const offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },
    switchSinger (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  mounted () {
    this.$refs.IScroll.scrolling((y) => {
      this.scrollY = y
      // 1. 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 2. 处理中间区域
      for (let i = 0; i < this.groupTop.length; i++) {
        const preTop = this.groupTop[i]
        const nextTop = this.groupTop[i + 1]
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i

          // 1. 用下一组标题的偏移位 + 当前滚动出去的高度
          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          // 2.判断计算的结果是否是 0 ~ 分组标题高度的值
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            // 满足条件开始移动上一组标题
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            // 不满足条件需要固定在顶部
            fixTitleOffsetY = 0
          }
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      // 3. 处理最后一个区域
      this.currentIndex = this.groupTop.length - 1
    })
  },
  created () {
    getAllSinger()
      .then((result) => {
        // console.log(result)
        this.keys = result.keys
        this.list = result.list
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  data () {
    return {
      keys: [],
      list: [],
      groupTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    }
  },
  watch: {
    list () {
      this.$nextTick(() => {
        this.$refs.group.forEach((group) => {
          this.groupTop.push(group.offsetTop)
        })
        // console.log(this.groupTop)
      })
    },
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
.singer{
  width: 100%;
  height: 100%;
  .singer-wrapper{
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .list-wrapper{
      .list-group{
        .group-title{
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          box-sizing: border-box;
          img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;
          }
          p{
            @include font_size($font_medium);
            @include font_color();
          }
        }
      }

    }
    .list-keys{
      position: fixed;
      right: 10px;
      top: 60%;
      transform: translateY(-50%);
      li{
        @include font_color();
        @include font_size($font_medium_s);
        padding: 3px 0;
        &.active{
          text-shadow: 0 0 10px #000;
        }
      }
    }
    .fix-title{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      padding: 10px 20px;
      box-sizing: border-box;
      color: #fff;
      @include bg_color();
      @include font_size($font_medium);
    }
  }
}

  .v-enter{
    transform: translateX(100%);
  }
  .v-enter-to{
    transform: translateX(0%);
  }
  .v-enter-active{
    transition: all 1s;
  }
  .v-leave{
    transform: translateX(0%);
  }
  .v-leave-to{
    transform: translateX(100%);
  }
  .v-leave-active{
    transition: all 1s;
  }
</style>
