<template>
  <div class="tile">
    <div class="slide-show">
      <div class="slide">
        <transition name="fade" mode="in-out">
          <img :src="currentTile.img" :key="index" class="slide-image">
        </transition>
      </div>
      <div class="details">
        <div class="category"><span>{{slideData.title}}</span></div>
          <transition name="fade" mode="in-out">
            <div class="slide-text" :key="index">
              <span v-for="text in currentTile.text.split(';')" :key="text">
                {{text}}
              </span>
            </div>
          </transition>
        <div class="brand">
          <img :src="slideData.brand.Icon"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['slideData'],
  mounted() {
    const t = parseInt((Math.random() * (6 - 4) + 4)) * 1000;
    this.intervalId = setInterval(() => {
      this.index = ((this.index + 1) % this.slideData.slides.items.length);
    }, t);
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
  computed: {
    currentTile() {
      const key = this.slideData.slides.items[this.index];
      return this.slideData.slides[key];
    },
  },
  data() {
    return {
      intervalId: null,
      index: 0,
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../../mixins/scss/main';
.tile {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .slide-show {
    position: absolute;
    width: 100%;
    height: 100%;
    .slide {
      position: relative;
      width: 100%;
      height: 100%;
      opacity: 1;
      .slide-image {
        width: 100%;
      }
    }
    .details {
      position: absolute;
      top: 210 * $s;
      left: 30 * $s;
      height: 240 * $s;
      width: auto;
      .category {
        position: absolute;
        display: flex;
        min-width: 170 * $s;
        padding: 0 10 * $s;
        white-space: nowrap;
        height: 40 * $s;
        width: auto;
        font-family: SamsungOneUI600;
        background: white;
        font-size: 28 * $s;
        justify-content: center;
        align-items: center;
      }
      .slide-text {
        position: absolute;
        top: 60 * $s;
        padding: 8*$s 10 * $s;
        font-family: SamsungOneUI200;
        color: white;
         white-space: nowrap;
         display: flex;
         flex-direction: column;
        font-size: 36 * $s;
      }
      .brand {
        position: absolute;
        bottom: 0;
        img {
          width: 110 * $s
        }
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
