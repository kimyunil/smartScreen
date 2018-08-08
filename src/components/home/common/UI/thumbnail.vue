<template>
  <div class="thumbnail" :class="[{'selected': selected}]">
      <div class="content-ui" v-if="item.details.full" :class="[(item.details.full === 'full' ? 'full-wrapper': 'partial-wrapper')]">
        <div class="image-container">
          <template v-if="item.details.video && vidAutoplay">
            <transition name="fade">
              <div class="content-tile" :style="{'background-image': `url(${item.details.img})`}" v-show="!videImgTrans"></div>
            </transition>
              <transition name="fade">
                <div class="video"  v-show="videImgTrans">
                  <video :src="item.details.video" loop muted :autoplay="videoActive"/>
                </div>
            </transition>
          </template>
          <template v-else>
            <div class="content-tile" :style="{'background-image': `url(${item.details.img})`}">
            </div>
          </template>
        </div>
        <div class="content-metadata">
          <div class="meta-icon">
            <img :src="item.details.logo">
          </div>
          <div class="meta-text">
             <span v-html="item.details.bottomText"></span>
          </div>
        </div>
      </div>
    <template v-else>
      <div class="content-wrapper">
        <div class="content" :class="[item.contentType]">
          <div class="icon-label" :style="[{'background-image': `url(${item.details.logo})`}]" :class="[item.details.logoType]" v-if="item.contentType !== 'iot'"></div>
          <template v-if="item.contentType === 'iot-weather'">
            <div class="iot-container" v-if="weather === null">
              <div class="icon">
                <img :src="item.details.icon"/>
              </div>
              <div class="info">
                <div class="measure">
                  {{item.details.measure}}<span>&deg;</span>
                  </div>
                  <div class="place">
                  {{item.details.place}}
                  </div>
                </div>
            </div>
            <div class="iot-container"  v-else>
              <div class="icon">
                <img :src="weather.img"/>
              </div>
              <div class="info">
                <div class="measure">
                  {{weather.temp}}<span>&deg;</span>
                  </div>
                  <div class="place">
                  {{item.details.place}}
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="item.contentType.indexOf('iot') !== -1">
            <div class="iot-container">
              <div class="icon">
                <img :src="item.details.icon"/>
              </div>
              <div class="info">
                <div class="measure">
                  {{item.details.measure}}<span v-if="item.contentType === 'iot-temp'">&deg;</span>
                  </div>
                  <div class="place">
                  {{item.details.place}}
                  </div>
                </div>
            </div>
          </template>
          <template v-if="item.details.topLeftText">
            <div class="text simple">
              <span v-html="item.details.topLeftText"></span>
            </div>
          </template>
          <template v-if="item.details.bottomText">
            <div class="bottom-footer" :class="[item.contentType, item.details.logoType]">
              <div class="text simple">
                <span v-html="item.details.bottomText"></span>
              </div>
            </div>
          </template>
          <template v-if="item.key==='spotify'">
            <div class="seekbar">
              <div class="progress" :style="{'width': `${item.elapsedTime/item.total * 100}%`}">
              </div>
            </div>
          </template>
        </div>
        <template v-if="item.details.video && vidAutoplay">
          <transition name="fade">
            <div class="thumb" :style="{'background-image': `url(${item.details.img})`}" v-show="!videImgTrans"></div>
          </transition>
            <transition name="fade">
              <div class="video"  v-show="videImgTrans">
                <video :src="item.details.video" loop muted :autoplay="videoActive"/>
              </div>
          </transition>
        </template>
        <template v-else>
          <div class="thumb" :style="{'background-image': `url(${item.details.img})`}"></div>
        </template>
      </div>
    </template>
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
      weather: state => state.info.todays,
      vidAutoplay: state => state.vidAutoplay,
    }),
  },
  methods: {
    dim(d) {
      if (!d) return {};
      return {
        width: `${(d.w * 100) / 1920}vw`,
        height: `${(d.h * 100) / 1920}vw`,
      };
    },
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
  mounted() {
  },
  destroyed() {
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../../../mixins/scss/main';
.thumbnail {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  border-radius: 10 * $s;
  background-size: 100% 100%;
  .content-ui {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 4;
    background-size: 100% 100%;
    top: 0;
    .image-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .content-tile {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 10 * $s;
        height: 240 * $s;
        width: 100%;
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
    }
    .content-metadata {
      position: relative;
      height: auto;
      top: 250 * $s;
      width: 100%;
      font-size: 48 * $s;
      font-family: TTNormsBold;
      .meta-icon {
        position: relative;
        height: 40 * $s;
        background-size:50 * $s 150 * $s;
        width: 150 * $s;
        img {
          position: absolute;
          left: 0;
          height: 100%;
        }
      }
      .meta-text {
        position: relative;
        width: 100%;
        color: black;
        text-align:left;
        color: rgba(80,80,80,1);
        font-family: TTNormsBold;
        font-size: 32 * $s;
      }
    }
    &.full-wrapper {
      border-radius: 10 * $s;
      // overflow: hidden;
      .content-tile {
        height: 100%;
      }
      .content-metadata {
        top: 320 * $s;
        left: 20 * $s;
      }
    }
  }
  &.selected {
    .content-ui {
      &.full-wrapper {
        &.content-ui {
          transform: scale(1.09);
          box-shadow: 0 20 * $s 40 * $s 0 rgba(0,0,0,0.5);
          border-radius: 10 * $s;
          border-width: 20 * $s;
          background: white;
        }
      }
      &.partial-wrapper {
        border-radius: 10 * $s;
        // overflow:hidden;
        .image-container {
          position: absolute;
          top: 0;
          left: 0;
          background: white;
          transform: scale(1.12);
          width: 100%;
          transform-origin: 60% center;
          height: 100%;
          // overflow: hidden;
          box-shadow: 0 20 * $s 40 * $s 0 rgba(0,0,0,0.5);
          border-radius: 10 * $s;
          .content-tile {
            border-radius: 0 * $s;
            border-top-left-radius: 10 * $s;
            border-top-right-radius: 10 * $s;
          }
        }
      }
    }
    .content-wrapper {
      border-image: url("/static/Images/home/border.png") 30 round;
      border-width: 20 * $s;
    }
  }
  .content-wrapper {
    position: absolute;
    border: 20 * $s solid transparent;
    left: -20 * $s;
    top: -20 * $s;
    width: calc(100% + #{40 * $s});
    height: calc(100% + #{40 * $s});
    .content {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 22;
      top: 0;
    }
    .thumb {
      position: absolute;
      width: 100%;
      z-index: 3;
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
    .iot-container {
      position: absolute;
      width: 100%;
      height: 100%;
      background: transparent;
      display: flex;
      border-top: 2px solid grey;
      border-bottom: 2px solid grey;
      justify-content: center;
      align-items: center;
      .icon {
        position: absolute;
        top: 40 * $s;
        height: 40%;
        width: 100%;
        text-align: center;
        img {
          height: 100%;
        }
      }
      .info {
        position: absolute;
        bottom: 11%;
        height: 120 * $s;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .measure {
          font-family: Helvetica;
          font-size: 40 * $s;
          position: relative;
          color: black;
        }
        .place {
          font-family: Helvetica;
          font-size: 30 * $s;
          color: black;
        }
      }
    }
    .bottom-footer {
      position: absolute;
      bottom: 0px;
      left: 20 * $s;
      margin-bottom: 40 * $s;
      width: calc(100% - #{ 30 * $s });
    .text {
        font-family: Helvetica;
        font-size: 36 * $s;
        text-align: left;
        font-family: 'TTNormsMedium';
        text-align: left;
        color: white;
        .light-text {
          font-family: 'TTNormsLight';
          font-size: 18 * $s;
        }
    }
      &.big {
        margin-bottom: 80 * $s;
      }
      &.text-big {
        margin-bottom: 80 * $s;
      }
    }
    .seekbar {
      background: red;
      width: 87%;
      height: 8 * $s;
      margin:0 15 * $s;
      position: absolute;
      bottom: 20 * $s;
      border-radius:10 * $s;
      // overflow: hidden;
      background: rgba(255,255,255,0.1);
      .progress {
        position: absolute;
        left: 0;
        width: 20%;
        height: 100%;
        background: white;
      }
    }
    .icon-label {
      position: absolute;
      right: 0%;
      bottom: 0 * $s;
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 120 * $s;
      height: 120 * $s;
      &.big {
        width: 200 * $s;
        height: 120 * $s
      }
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
