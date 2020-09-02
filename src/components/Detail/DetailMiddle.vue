<template>
    <div class="detail-middle">
      <div class="detail-img">
        <img :src="path" alt="">
        <div class="mask" ref="mask"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DetailMiddle',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    changeMask (opacity) {
      this.$refs.mask.style.opacity = opacity
    }
  }
}
</script>

<style scoped lang="scss">
.detail-middle{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img{
    width: 100%;
  }
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
