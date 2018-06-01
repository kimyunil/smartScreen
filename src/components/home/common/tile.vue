<template>
  <div class="tile">
    <template v-if="item.details.full">
      <div class="content">
        <div class="content-tile" :style="{'background-image': `url(${item.details.tile})`}">
        </div>
        <div class="content-metadata">
          <div class="meta-icon" :style="[{'background-image': `url(${item.details.logo})`}]">
          </div>
          <div class="meta-text">
             <span v-html="item.details.bottomText"></span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="content">
        <div class="icon" :style="[{'background-image': `url(${item.details.logo})`}]" :class="[item.details.logoType]">
        </div>
        <div class="header-text" >
          <div class="sponsor" v-if="item.details.topLeftText !== null">
            <span v-html="item.details.topLeftText"></span>
          </div>
        </div>
        <div class="bottom-footer">
          <div class="sponsored" v-if="item.details.bottomText">
            <span v-html="item.details.bottomText"></span>
          </div>
        </div>
        <template v-if="item.key === 'hbo' || item.key === 'hulu'">
          <div class="seekbar">
            <div class="progress" :style="{'width': `${item.elapsedTime/item.total * 100}%`}">
            </div>
          </div>
        </template>
      </div>
      <template v-if="item.details.video && vidAutoplay">
          <transition name="fade">
          <div class="thumb" :style="{'background-image': `url(${item.details.tile})`}" v-show="!videImgTrans"></div>
          </transition>
          <transition name="fade">
            <div class="video"  v-show="videImgTrans">
              <video :src="item.details.video" loop muted :autoplay="videoActive"/>
            </div>
        </transition>
      </template>
      <template v-else>
        <div class="thumb" :style="{'background-image': `url(${item.details.tile})`}"></div>
      </template>
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
.tile {
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
    .content-tile {
      position: absolute;
      top: 0;
      left: 0;
      height: 300 * $s;
      width: 100%;
      background-size: 100% 100%;
    }
    .content-metadata {
      position: absolute;
      height: auto;
      bottom: 0;
      width: 100%;
      font-size: 48 * $s;
      font-family: SamsungOneUI400;
      .meta-icon {
        position: relative;
        height: 50 * $s;
        background-size:50 * $s 150 * $s;
        width: 150 * $s;
      }
      .meta-text {
        position: relative;
        width: 90%;
        color: black;
        text-align:left;
        color: rgba(80,80,80,1);
        font-family: SamsungOneUI400;
        font-size: 32 * $s;
        margin-top: 20 * $s;
      }
    }
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
  .header-text {
    position: absolute;
    left: 30 * $s;
    top: 20 * $s;
    .sponsor {
      font-family: 'TTNormsMedium';
      font-size: 30 * $s;
      color: white;
    }
    .time {
     font-family: Helvetica;
      font-size: 50 * $s;
      color: white;
    }
  }
  .bottom-footer {
    position: absolute;
    bottom: 0px;
    left: 20 * $s;
    margin-bottom: 40 * $s;
    width: calc(90% - #{ 30 * $s });
    .sponsored {
      font-family: Helvetica;
      font-size: 40 * $s;
      font-family: 'TTNormsMedium';
      text-align: left;
      color: white;
      .light-text {
        font-family: 'TTNormsLight';
         font-size: 18 * $s;
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
