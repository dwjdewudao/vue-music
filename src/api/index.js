import Network from './network'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getAlbum = () => Network.get('album/newest')
export const getNewSong = () => Network.get('personalized/newsong')
export const getPlayList = (id) => Network.get('playlist/detail', id)
export const getAlbumList = (id) => Network.get('album', id)
export const getSongs = (id) => Network.get('song/detail', id)
export const getLyric = (id) => Network.get('lyric', id)
export const getMusicUrl = (id) => Network.get('song/url', id)
export const getHotSinger = () => {
  return new Promise(function (resolve, reject) {
    Network.get('top/artists?offset=0&limit=5')
      .then(function (result) {
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getLetterSinger = (letter) => {
  return new Promise(function (resolve, reject) {
    const letterSingers = []
    Network.all([
      Network.get(`artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=69&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=2&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=2&area=69&initial=${letter}`)
    ])
      .then(function (result) {
        // resolve(result)
        result.forEach(function (item) {
          letterSingers.push(...item.artists)
        })
        resolve(letterSingers)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllSinger = () => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getHotSinger()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      // console.log(char)
      keys.push(char)
      list.push(getLetterSinger(char))
    }
    // console.log(keys)
    Network.all(list)
      .then(function (result) {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getSingerSongUrl = (id) => Network.get('artists', id)
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    const category = {
      officialList: [
        { name: '云音乐飙升榜', id: 3 },
        { name: '云音乐新歌榜', id: 0 },
        { name: '网易原创歌曲榜', id: 2 },
        { name: '云音乐热歌榜', id: 1 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '抖音排行榜', id: 26 },
        { name: '云音乐ACG音乐榜', id: 22 },
        { name: '云音乐古典音乐榜', id: 24 }
      ],
      globalList: [
        { name: '美国Billboard周榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon数字单曲周榜', id: 10 },
        { name: 'iTunes榜', id: 8 },
        { name: '英国Q杂志中文版周榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '新声榜', id: 27 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '电竞音乐榜', id: 30 },
        { name: '云音乐欧美热歌榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then(function (data) {
        data.list.forEach(function (obj) {
          let flag = false
          for (const key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getSearchList = (data) => Network.get('search?type=1', data)
export const getHotSearchList = () => Network.get('search/hot')
