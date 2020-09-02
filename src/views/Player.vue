<template>
    <div class="player">
      <NomalPlayer :totalTime="totalTime" :currentTime="currentTime"></NomalPlayer>
      <MiniPlayer @showList="showList"></MiniPlayer>
      <ListPlayer ref="ListPlayer"></ListPlayer>
      <audio :src="this.currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="ended"></audio>
    </div>
</template>

<script>
import NomalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/ModeTpye'
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '../tools/tools'
export default {
  name: 'Player',
  components: {
    NomalPlayer,
    MiniPlayer,
    ListPlayer
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setHistorySong',
      'setHistoryList',
      'setFavoriteList'
    ]),
    showList () {
      this.$refs.ListPlayer.show()
    },
    timeupdate (e) {
      // console.log(e.target.currentTime)
      this.currentTime = e.target.currentTime
    },
    ended () {
      if (this.isModeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.isModeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.isModeType === mode.random) {
        const index = getRandomIntInclusive(0, this.isSongs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'isModeType',
      'isSongs',
      'favoriteList',
      'historyList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      setLocalStorage('favoriteList', newValue)
    },
    historyList (newValue, oldValue) {
      setLocalStorage('historyList', newValue)
    }
  },
  created () {
    const favoriteList = getLocalStorage('favoriteList')
    if (favoriteList === null) { return }
    this.setFavoriteList(favoriteList)

    const historyList = getLocalStorage('historyList')
    if (historyList === null) { return }
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  data: function () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  }
}
</script>

<style scoped lang="scss">

</style>
