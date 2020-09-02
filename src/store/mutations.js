import {
  SET_NORMAL_PLAYER,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_PLAYING,
  SET_MODE_TYPE,
  SET_SONGS,
  SET_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type'

export default {
  [SET_NORMAL_PLAYER] (state, flag) {
    state.isNormalPlayer = flag
    if (flag) {
      state.isMiniPlayer = false
      state.isListPlayer = false
    }
  },
  [SET_MINI_PLAYER] (state, flag) {
    state.isMiniPlayer = flag
    if (flag) {
      state.isNormalPlayer = false
      state.isListPlayer = false
    }
  },
  [SET_LIST_PLAYER] (state, flag) {
    state.isListPlayer = flag
  },
  [SET_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [SET_MODE_TYPE] (state, flag) {
    state.isModeType = flag
  },
  [SET_SONGS] (state, list) {
    state.isSongs = list
  },
  [SET_LYRIC] (state, lyric) {
    state.Lyric = lyric
  },
  [SET_DEL_SONG] (state, index) {
    if (index !== undefined) {
      state.isSongs.splice(index, 1)
    } else {
      state.isSongs = []
    }
    if (index < state.currentIndex) {
      state.currentIndex -= 1
    }
    if (state.isSongs.length === 0) {
      state.isNormalPlayer = false
      state.isMiniPlayer = false
      state.isListPlayer = false
    }
  },
  [SET_CURRENT_INDEX] (state, index) {
    if (state.currentIndex < 0) {
      index = state.isSongs.length - 1
    } else if (state.currentIndex > state.isSongs.length - 1) {
      index = 0
    }
    state.currentIndex = index
  },
  [SET_CURRENT_TIME] (state, time) {
    state.curTime = time
  },
  [SET_FAVORITE_SONG] (state, song) {
    const res = state.favoriteList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    if (res === undefined) {
      state.favoriteList.push(song)
    }
  },
  [SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  },
  [SET_HISTORY_SONG] (state, song) {
    const res = state.historyList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    if (res === undefined) {
      if (state.historyList.length > 30) {
        state.historyList.splice(0, 1)
      }
      state.historyList.push(song)
    }
  },
  [SET_HISTORY_LIST] (state, list) {
    state.historyList = list
  }
}
