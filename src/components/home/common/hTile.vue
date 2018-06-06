
<template>
  <div class="hTile" :class="[{'selected': selected}]">
    <div class="content">
        <div class="full-wrapper" :class="[(item.details.full ? 'fullwrapper': 'partial-wrapper')]">
          <div class="content-hTile">
              <template v-if="item.details.video && vidAutoplay">
                <transition name="fade">
                  <div class="meta-thumb" :style="{'background-image': `url(${item.details.hTile})`}"></div>
                  </transition>
                  <transition name="fade">
                    <div class="video"  v-show="videImgTrans">
                      <video :src="item.details.video" loop muted :autoplay="videoActive"/>
                    </div>
                </transition>
              </template>
              <template v-else>
                <div class="meta-thumb" :style="{'background-image': `url(${item.details.hTile})`}"></div>
              </template>
          </div>
          <div class="metadata">
            <div class="meta-icon">
              <img :src="item.details.logo">
            </div>
            <div class="meta-text">
              <span v-html="item.details.text1"></span>
            </div>
          </div>
        </div>
    </div>
    <!--<template v-else-if="item.details.video && vidAutoplay">
        <transition name="fade">
        <div class="thumb" :style="{'background-image': `url(${item.details.tile})`}" v-show="!videImgTrans"></div>
        </transition>
        <transition name="fade">
          <div class="video"  v-show="videImgTrans">
            <video :src="item.details.video" loop muted :autoplay="videoActive"/>
          </div>
      </transition>
    </template> -->
    <!--<template v-else>
      <div class="thumb" :style="{'background-image': `url(${item.details.tile})`}"></div>
    </template> -->
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
  methods: {
    dim(d) {
      return {
        width: `${(d.w * 100) / 1920}vw`,
        height: `${(d.h * 100) / 1920}vw`,
      };
    },
  },
  mounted() {
  },
  destroyed() {
  },
  computed: {
    videImgTrans() {
      return this.item.details.video && this.videoActive;
    },
    ...mapState({
      vidAutoplay: state => state.vidAutoplay,
    }),
  },
  watch: {
    videoActive(val) {
      console.log('videoActive:::::::::', this.videoActive);
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
.hTile {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  .thumb {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    left: 0;
    top: 0;
    background-size: 100% 100%;
  }
  .content {
    position: absolute;
    width: 100%;
    z-index: 4;
    height: 100%;
    left: 0;
    top: 0;
    background-size: 100% 100%;
  }
  .video {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    left: 0;
    top: 0;
    background-size: 100% 100%;
    background-color: black;
    video {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
  .full-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: 100% 100%;
    .content-hTile {
      position: absolute;
      left: 0;
      height: 100%;
      width: 100%;
      .meta-thumb {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: 100%;
      }
      .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        height: 100%;
      }
    }
    .metadata {
      position: absolute;
      bottom: 35  * $s;
      width: 100%;
      height: 100%;
      z-index: 999;
      height: auto;
      .meta-text {
        padding-left: 20  * $s;
        position: relative;
        width: 90%;
        text-align: left;
        font-family: TTNormsBold;
        font-size: 48 * $s;
        margin-top: 10 * $s;
      }
      .meta-icon {
        position: relative;
        height: 40 * $s;
        background-size:50 * $s 150 * $s;
        width: 150 * $s;
        img {
          height: 100%;
        }
      }
    }
  }
  .partial-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .content-hTile {
      position: absolute;
      left: 0;
      height: 100%;
      width: 100%;
      .meta-thumb {
        position: absolute;
        left: 0;
        border-radius: 10 * $s;
        top: 0;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: 670 * $s;
      }
      .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        height: 100%;
      }
    }
    .metadata {
      position: absolute;
      bottom: 20  * $s;
      width: 100%;
      z-index: 999;
      height: auto;
      .meta-text {
        position: relative;
        width: 90%;
        font-family: TTNormsBold;
        font-size: 48 * $s;
        margin-top: 5 * $s;
      }
      .meta-icon {
        position: relative;
        height: 40 * $s;
        background-size:50 * $s 200 * $s;
        width: 200 * $s;
        img {
          position: absolute;
          left: 0;
          height: 100%;
        }
      }
    }
  }
  &.selected {
    .partial-wrapper {
       .meta-thumb {
         border-radius: 0;
       }
    }
  }
  .seekbar {
    background: red;
    width: 87%;
    height: 8 * $s;
    margin:0 15 * $s;
    position: absolute;
    bottom: 10 * $s;
    border-radius:20 * $s;
    overflow: hidden;
    background: rgba(255,255,255,0.1);
    .progress {
      position: absolute;
      left: 0;
      width: 20%;
      height: 100%;
      background: white;
    }
  }
  .icon {
    position: absolute;
    right: 0;
    bottom: 0 * $s;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    width: 120 * $s;
    height: 120 * $s;
    &.big {
      width: 200 * $s;
      height: 120 * $s
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
