<template>
  <div class="search">
    <div class="search-box">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search">
    </div>
    <div class="search-suggest" v-if="keywords !== ''">
      <IScroll>
        <ul>
          <li v-for="value in songs" :key="value.id" @click.stop="showNormalPlayer(value.id)">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
            <p>{{value.name}} - {{value.artists[0].name}}</p>
          </li>
        </ul>
      </IScroll>
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="value in hotList" :key="value.first" @click="setHotList(value.first)">{{value.first}}</li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="(value, index) in searchHistory" :key="index">
        <div class="history-left">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
          <p>{{value}}</p>
        </div>
        <div class="history-right">
          <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import IScroll from '../components/Iscroll'
import { getSearchList, getHotSearchList } from '../api/index'
import { mapActions } from 'vuex'
import { setLocalStorage, getLocalStorage } from '../tools/tools'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Search',
  metaInfo: MetaInfo.search,
  components: {
    IScroll
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hotList: [],
      searchHistory: []
    }
  },
  methods: {
    ...mapActions([
      'setNomalPlayer',
      'setSongs'
    ]),
    showNormalPlayer (id) {
      this.setNomalPlayer(true)
      this.setSongs([id])

      if (this.searchHistory.includes(this.keywords)) {
        return
      }
      this.searchHistory.push(this.keywords)
      setLocalStorage('searchHistory', this.searchHistory)
      this.keywords = ''
    },
    search () {
      if (this.keywords === '') {
        return
      }
      getSearchList({ keywords: this.keywords })
        .then((data) => {
          this.songs = data.result.songs
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    setHotList (data) {
      this.keywords = data
      // 如果直接给input赋值, 是无法触发点击事件的, 所以可以手动调用函数触发一下
      this.search()
    },
    delHistory (name) {
      this.searchHistory = this.searchHistory.filter(function (item) {
        return item !== name
      })
      console.log(this.searchHistory)
      setLocalStorage('searchHistory', this.searchHistory)
    }
  },
  created () {
    getHotSearchList()
      .then((data) => {
        this.hotList = data.result.hots
      })
      .catch(function (err) {
        console.log(err)
      })
    if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null) {
      return
    }
    this.searchHistory = getLocalStorage('searchHistory')
  },
  directives: {
    throttle: {
      // 指令的定义
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
.search{
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  @include bg_sub_color();
  .search-box{
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ececec;
    border-radius: 30px;
    img{
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input{
      height: 60px;
      border: none;
      background: transparent;
      outline: none;
      margin-left: 20px;
      @include font_size($font_medium);
      @include font_color();
    }
  }
  .search-suggest{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 300px;
    overflow: hidden;
    @include bg_sub_color();
    li{
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      img{
        width: 40px;
        height: 40px;
      }
      p{
        margin-left: 20px;
        @include font_size($font_medium);
        @include font_color();
      }
    }
  }
  .search-hot{
    h3{
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
      box-sizing: border-box;
    }
    ul{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li{
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        margin: 10px 20px;
        background: #ececec;
        border: 1px solid #cccc;
        border-radius: 30px;
        @include font_color();
        @include font_size($font_medium);
      }
    }
  }
  .search-history{
    li{
      display: flex;
      padding: 20px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cccccc;
      .history-left{
        display: flex;
        img{
          width: 40px;
          height: 40px;
        }
        p{
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium);
        }
      }
      .history-right{
        img{
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
