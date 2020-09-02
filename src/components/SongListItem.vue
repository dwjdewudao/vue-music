<template>
    <div class="song">
      <ul class="song-bottom">
        <li v-for="value in songs" :key="value.id" @click.stop="showNormalPlayer(value.id)">
          <img v-lazy="value.picUrl" alt="">
          <div>
            <h3>{{value.name}}</h3>
            <p>{{value.name}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongListItem',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
  .song-bottom{
    width: 100%;
    li{
      width: 100%;
      height: 175px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
      img{
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div{
        h3{
          @include font_size($font_large);
          @include font_color();
          @include no-wrap();
        }
        p{
          @include font_size($font_medium_s);
          @include font_color();
          @include no-wrap();
          margin-top: 20px;
          opacity: 0.7;
        }
      }
    }
  }
</style>
