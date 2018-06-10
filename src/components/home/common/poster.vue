<template>
  <div class="poster" :class="[{'selected': selected}]">
    <div class="content-ui" v-if="item.details.full" :class="[(item.details.full !== 'full' ? 'partial-wrapper': 'full-wrapper')]">
      <div class="image-container">
        <div class="content-poster">
            <template v-if="item.details.video && vidAutoplay">
              <transition name="fade">
                <div class="thumb" :style="{'background-image': `url(${item.details.poster})`}"></div>
                </transition>
                <transition name="fade">
                  <div class="video"  v-show="videImgTrans">
                    <video :src="item.details.video" loop muted :autoplay="videoActive"/>
                  </div>
              </transition>
            </template>
            <template v-else>
              <div class="thumb" :style="{'background-image': `url(${item.details.poster})`}"></div>
            </template>
        </div>
      </div>
      <div class="content-metadata">
        <div class="meta-icon">
          <img :src="item.details.logo">
        </div>
        <div class="meta-text">
          <span v-html="item.details.text1"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
    },
    videoActive: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    videImgTrans() {
      return this.item.details.video && this.videoActive;
    },
    ...mapState({
      vidAutoplay: state => state.vidAutoplay,
    }),
  },
  methods: {
    dim(d) {
      return {
        width: `${(d.w * 100) / window.innerWidth}vw`,
        height: `${(d.h * 100) / window.innerWidth}vw`,
      };
    },
  },
  mounted() {
  },
  destroyed() {
  },
  watch: {
    videoActive(val) {
      const ele = this.$el.querySelector('video');
      if (!ele) return;
      if (val) {
        ele.play();
      } else {
        ele.pause();
      }
    },
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../../mixins/scss/main';
.poster {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  .thumb {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    left: 0;
    top: 0;
    background-size: 100% 100%;
  }
  .content-ui {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 4;
    left: 0;
    top: 0;
    background-size: 100% 100%;
    .image-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      .content-poster {
        position: absolute;
        top: 0;
        left: 0;
        height: 600 * $s;
        width: 100%;
        border-radius: 10 * $s;
        overflow: hidden;
        background-size: 100% 100%;
        .thumb {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .video {
          position: absolute;
          width: 100%;
          z-index: 10;
          height: 100%;
          background: black;
          video {
            position: absolute;
            width: 100%;
            z-index: 10;
            left: 0;
            height: 100%;
          }
        }
      }
    }
    .content-metadata {
      position: absolute;
      height: auto;
      top: 600 * $s;
      width: 100%;
      font-size: 48 * $s;
      font-family: TTNormsBold;
      .meta-icon {
        position: relative;
        height: 40 * $s;
        top: 15 * $s;
        background-size: 200 * $s 50 * $s;
        width: 200 * $s;
        img {
          position: absolute;
          left: 0;
          height: 100%;
        }
      }
      .meta-text {
        position: relative;
        width: 90%;
        color: black;
        text-align:left;
        color: rgba(80,80,80,1);
        font-family: TTNormsBold;
        font-size: 48 * $s;
        margin-top: 20 * $s;
      }
    }
    &.full-wrapper {
      .content-poster {
        height: 100%;
      }
      .content-metadata {
        display: none;
      }
    }
  }
  &.selected {
    .image-container {
        position: absolute;
        top: 0;
        left: 0;
        transform: scale(1.03);
        width: 100%;
        transform-origin: 60% center;
        height: 100%;
        box-shadow: 0 20 * $s 40 * $s 0 rgba(0,0,0,0.5);
        border-radius: 10 * $s;
        overflow: hidden;
        border-width: 20 * $s;
        .content-poster {
          border-radius:0;
        }
    }
    .content-wrapper {
      border-image: url("/static/Images/home/border.png") 30 round;
      border-width: 20 * $s;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<style>
.light-text {
  font-family: 'TTNormsLight';
}
</style>
