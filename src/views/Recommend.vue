<template>
<div class="recommend">
  <div class="recommend-wapper">
    <Iscroll>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelcetItem" :type="'personalized'"></Personalized>
        <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelcetItem" :type="'albums'"></Personalized>
        <NewSongs :songs="songs"></NewSongs>
      </div>
    </Iscroll>
  </div>
  <transition>
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import { getBanner, getPersonalized, getAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import NewSongs from '../components/Recommend/NewSongs'
import Iscroll from '../components/Iscroll'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Recommend',
  metaInfo: MetaInfo.recommend,
  components: {
    Banner,
    Personalized,
    NewSongs,
    Iscroll
  },
  methods: {
    fatherSelcetItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created () {
    getBanner()
      .then((data) => {
        this.banners = data.banners
      })
      .catch(function (err) {
        console.log(err)
      })
    getPersonalized()
      .then((data) => {
        // console.log(data)
        this.personalized = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
    getAlbum()
      .then((data) => {
        // console.log(data.albums.splice(0, 6))
        this.albums = data.albums.splice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewSong()
      .then((data) => {
        // console.log(data.result)
        // this.songs = data.result
        const list = []
        data.result.forEach((value) => {
          const obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.picUrl
          let singer = ''
          for (let i = 0; i < value.song.artists.length; i++) {
            if (i === 0) {
              singer = value.song.artists[i].name
            } else {
              singer += '-' + value.song.artists[i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch(function (err) {
        console.log(err)
      })
  }

}
</script>

<style scoped lang="scss">
.recommend{
  position: fixed;
  top: 184px;
  left: 0;
  bottom: 0;
  right: 0;
  /*overflow: hidden;*/
  .recommend-wapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
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
