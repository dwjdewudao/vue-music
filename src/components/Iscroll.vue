<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'Iscroll',
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      scrollX: false,
      scrollY: true,
      probeType: 3,
      /* 加入以下三个可解决 */
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })
    // setTimeout(() => {
    //   console.log(this.iscroll.maxScrollY)
    //   this.iscroll.refresh()
    //   console.log(this.iscroll.maxScrollY)
    // }, 100)
    // 1. 添加一个观察者对象
    const observer = new MutationObserver((mutationsList, observer) => {
      // console.log(mutationsList)
      // console.log(this.iscroll.maxScrollY)
      this.iscroll.refresh()
      // console.log(this.iscroll.maxScrollY)
    })
    // 2. 添加配置信息
    const config = {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      subtree: true, // 观察后代节点，默认为 false
      attributeFilter: ['height', 'offsetHeight'] // 添加特定的属性
    }
    // 3. 需要监听的目标和规则信息
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
#wrapper{
  width: 100%;
  height: 100%;
}
</style>
