<template>
  <transition name="show">
      <div class="bixby-suggestions" v-if="toggle" :class="[theme]">
        <div class="text-container" :class="{'overlap': loop}">
          <template v-if="!loop">
            <div class="text-suggestion" v-for="suggest in drivers" :key="suggest">
              <div class="speakerIcon"></div>
              <div class="text"> {{sayWord}}</div>
              <div class="suggestions">"{{suggest}}"</div>
            </div>
          </template>
          <template v-else>
            <div class="text-suggestion" :key="index">
              <div class="speakerIcon"></div>
              <div class="text"> {{sayWord}}</div>
              <div class="suggestions">"{{drivers[index]}}"</div>
            </div>
          </template>
        </div>
      </div>
  </transition>
</template>
<script>
export default {
  props: {
    drivers: {
      type: Array,
      required: true,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    sayWord: {
      type: String,
      default: 'Say',
    },
    toggle: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.index = 0;
    if (this.loop) {
      this.startTimer();
    }
  },
  destroyed() {
    clearInterval(this.intervalID);
  },
  methods: {
    startTimer() {
      this.intervalID = null;
      clearInterval(this.intervalID);
      this.intervalID = setInterval(() => {
        this.index = ((this.index + 1) % this.drivers.length);
      }, 10000);
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
  },
};
</script>
<style scoped lang="scss">
@import '../../mixins/scss/main';
.bixby-suggestions {
    position: absolute;
    bottom: 0;
    background-size: 40 * $s 40 * $s;
    background-repeat: no-repeat;
    background-position: 80 * $s center;
    height: 135 * $s;
    width: 100%;
    display: flex;
  align-items: center;
  .text-container {
    position: absolute;
    left: 132 * $s;
    width: calc(100% - #{264 * $s});
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .text-suggestion {
      // position: absolute;
      // top: -3 * $s;
      display: flex;
      // width: 100%;
      position: relative;
      font-size: 32 * $s;
        &.slideshow-enter {
          opacity: 0;
          border: 1px solid red;
        }
        &.slideshow-leave-to {
          opacity: 0;
        }
        &.slideshow-enter-active{
          transition: opacity 0.3s ease;
        }
        &.slideshow-leave-active {
          transition: opacity 0.3s ease;
        }
      .speakerIcon {
        position: relative;
        margin-right: 20 * $s;
        display: inline-block;
        background-image: url('/static/Images/system/voice_dark.png');
        background-size: 100% 100%;
        width: 40 * $s;
        height: 40 * $s;
      }
      .text {
        position: relative;
        padding-right: 10 * $s;
        display: inline-block;
        font-size: 31 * $s;
        font-family: TTNormsRegular;
      }
      .suggestions {
        position: relative;
        padding-right: 10 * $s;
        display: inline-block;
        font-size: 31 * $s;
        font-family: TTNormsBold;
      }
    }
    &.overlap {
      justify-content: initial;
      &.text-suggestion {
        position: absolute;
      }
    }
  }
  &.show-enter {
    opacity: 0;
  }
  &.show-leave-to {
    opacity: 0;
  }
  &.show-enter-active{
    transition: opacity 0.3s ease;
  }
  &.show-leave-active {
    transition: opacity 0.3s ease;
  }
  &.dark {
    color: white;
     .speakerIcon {
      background-image: url('/static/Images/system/voice_white.png')!important;
    }
  }
}
</style>
