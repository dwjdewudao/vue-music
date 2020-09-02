<template>
    <div class="account-bottom">
      <div class="bottom-play" @click="PlayAllSongs">
        <span></span>
        <span>播放全部</span>
      </div>
      <div class="botton-wrapper">
        <IScroll>
          <SongListItem :songs="switchNum === 0 ? this.favoriteList : this.historyList"></SongListItem>
        </IScroll>
      </div>
    </div>
</template>

<script>
import IScroll from '../Iscroll'
import SongListItem from '../SongListItem'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'AccountBottom',
  components: {
    IScroll,
    SongListItem
  },
  props: {
    switchNum: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'historyList'
    ])
  },
  methods: {
    ...mapActions([
      'setNomalPlayer',
      'setSongs',
      'setCurrentIndex'
    ]),
    ...mapMutations([
      'SET_SONGS'
    ]),
    PlayAllSongs () {
      this.setNomalPlayer(true)
      this.setCurrentIndex(0)
      // const ids = []
      if (this.switchNum === 0) {
        // const res = this.favoriteList.map(function (value) {
        //   return value.id
        // })
        // ids.push(res)
        this.SET_SONGS(this.favoriteList)
      } else {
        // const res = this.historyList.map(function (value) {
        //   return value.id
        // })
        // ids.push(res)
        this.SET_SONGS(this.historyList)
      }
      // this.setSongs(ids)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.account-bottom{
  position: fixed;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  @include bg_sub_color();
  .bottom-play{
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    @include border_color();
    border-radius: 30px;
    span{
      display: inline-block;
      &:nth-of-type(1){
        width: 46px;
        height: 46px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;
      }
    }
  }
  .botton-wrapper{
    position: fixed;
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    @include bg_sub_color();
  }
}
</style>
