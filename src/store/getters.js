export default {
  isNormalPlayer (state) {
    return state.isNormalPlayer
  },
  isMiniPlayer (state) {
    return state.isMiniPlayer
  },
  isListPlayer (state) {
    return state.isListPlayer
  },
  isPlaying  (state) {
    return state.isPlaying
  },
  isModeType  (state) {
    return state.isModeType
  },
  isSongs  (state) {
    return state.isSongs
  },
  currentSong (state) {
    let obj = {
      name: '',
      singer: '',
      picUrl: ''
    }
    if (state.isSongs.length !== 0) {
      obj = state.isSongs[state.currentIndex]
    }
    return obj
  },
  Lyric  (state) {
    return state.Lyric
  },
  currentIndex  (state) {
    return state.currentIndex
  },
  curTime (state) {
    return state.curTime
  },
  favoriteList (state) {
    return state.favoriteList
  },
  historyList (state) {
    return state.historyList
  }
}
