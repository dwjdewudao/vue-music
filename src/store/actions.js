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

import { getSongs, getLyric, getMusicUrl } from '../api/index'

export default {
  setNomalPlayer ({ commit }, flag) {
    commit(SET_NORMAL_PLAYER, flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  setPlaying ({ commit }, flag) {
    commit(SET_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  async setSongs ({ commit }, ids) {
    const res = await getSongs({ ids: ids.join(',') })
    const urls = await getMusicUrl({ id: ids.join(',') })
    // console.log(urls)
    // console.log(res)
    const list = []
    res.songs.forEach(function (value, index) {
      const obj = {}
      // obj.url = urls.data[index].url
      for (let j = 0; j < urls.data.length; j++) {
        const item = urls.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.id = value.id
      obj.name = value.name
      let singer = ''
      value.ar.forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value.al.picUrl
      list.push(obj)
    })
    commit(SET_SONGS, list)
  },
  async getLyric ({ commit }, id) {
    const res = await getLyric({ id: id })
    // console.log(res.lrc.lyric)
    const obj = parseLyric(res.lrc.lyric)
    // console.log(obj)
    commit(SET_LYRIC, obj)
  },
  setDelSong ({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCurrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurrentTime ({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  setFavoriteSong ({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  setFavoriteList ({ commit }, song) {
    commit(SET_FAVORITE_LIST, song)
  },
  setHistorySong ({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList ({ commit }, song) {
    commit(SET_HISTORY_LIST, song)
  }
}

// 格式化歌词方法
function parseLyric (lrc) {
  const lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  const reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  const lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    const minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    const secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    const text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
