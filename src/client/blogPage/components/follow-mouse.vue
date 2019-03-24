<template>
    <div>
      <div class="move"></div>
      <div class="move"></div>
      <div class="move"></div>
      <div class="move"></div>
      <div class="move"></div>
    </div>
</template>

<script>
  export default {
    name: 'follow-mouse',
    mounted: function () {
      function follow (oEvent, dom, size, color, delay) {
        let scrollleft = document.documentElement.clientLeft || document.body.clientLeft
        let scrolltop = document.documentElement.clientTop || document.body.clientTop
        dom.style.width = size + 'px'
        dom.style.height = size + 'px'
        dom.style.background = color
        setTimeout(function() {
          dom.style.left = oEvent.clientX + scrollleft - size / 2 + 'px'
          dom.style.top = oEvent.clientY + scrolltop - size / 2 + 'px'
        }, delay)
      }
      let oTop0 = document.getElementsByClassName('move')[0]
      let oTop1 = document.getElementsByClassName('move')[1]
      let oTop2 = document.getElementsByClassName('move')[2]
      let oTop3 = document.getElementsByClassName('move')[3]
      let oTop4 = document.getElementsByClassName('move')[4]
      document.onmousemove = function(evt) {
        let oEvent = evt || window.event
        follow(oEvent, oTop0, 20, 'rgba(255, 0, 0, 0.5)', 0)
        follow(oEvent, oTop1, 18, 'rgba(255, 255, 0, 0.5)', 60)
        follow(oEvent, oTop2, 16, 'rgba(255, 0, 255, 0.5)', 120)
        follow(oEvent, oTop3, 14, 'rgba(0, 255, 0, 0.5)', 180)
        follow(oEvent, oTop4, 12, 'rgba(0, 0, 255, 0.5)', 240)
      }
    }
  }
</script>

<style scoped>
  .move{
    border-radius: 50%;
    position: fixed;
    z-index: -1;
  }
</style>
