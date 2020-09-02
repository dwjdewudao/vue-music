<template>
  <div class="detail">
    <DetailHeader :title="playlist.name"></DetailHeader>
    <DetailMiddle :path="playlist.coverImgUrl" ref="imgH" class="Dm"></DetailMiddle>
    <div class="bottom">
      <Iscroll ref="scroll">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </Iscroll>
    </div>
  </div>
</template>

<script>
import DetailHeader from '../components/Detail/DetailHeader'
import DetailMiddle from '../components/Detail/DetailMiddle'
import DetailBottom from '../components/Detail/DetailBottom'
import Iscroll from '../components/Iscroll'
import { getPlayList, getAlbumList, getSingerSongUrl } from '../api/index'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Detail',
  metaInfo: MetaInfo.detail,
  components: {
    DetailHeader,
    DetailMiddle,
    DetailBottom,
    Iscroll
  },
  data: function () {
    return {
      playlist: {}
    }
  },
  created () {
    // console.log(this.$route.params.type)
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'albums') {
      getAlbumList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') {
      getSingerSongUrl({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'rank') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl,
            tracks: data.playlist.tracks
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    const ImgHeight = this.$refs.imgH.$el.offsetHeight
    // console.log(ImgHeight)
    this.$refs.scroll.scrolling((offsetY) => {
      // console.log(offsetY)
      if (offsetY < 0) {
        // console.log('向上滚动')
        const scale = Math.abs(offsetY) / ImgHeight
        this.$refs.imgH.changeMask(scale)
        // this.$refs.imgH.$el.style.filter = `blur(${scale}px)`
      } else {
        // console.log('向下滚动')
        const scale = 1 + offsetY / ImgHeight
        // console.log(scale)
        this.$refs.imgH.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
.detail{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  @include bg_sub_color();
  .bottom{
    position: fixed;
    top: 500px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
