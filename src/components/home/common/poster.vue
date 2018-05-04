<template>
  <div class="poster">
    <div class="content">
      <div class="icon" :style="[{'background-image': `url(${item.details.logo})`}]" :class="[item.details.logoType]"></div>
      <div class="bottom-footer">
        <template v-if="item.details.text1">
            <div class="text simple">
              <span v-html="item.details.text1"></span>
            </div>
            <div class="extra-img" v-if="item.details.extraImg" :style="[{'background-image': `url(${item.details.extraImg})`}]">
            </div>
          </template>
      </div>
    </div>
    <template v-if="item.details.video && vidAutoplay">
       <transition name="fade">
        <div class="thumb" :style="{'background-image': `url(${item.details.poster})`}" v-show="!videImgTrans"></div>
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
.poster {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
    height: 100%;
    z-index: 4;
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
  .bottom-footer {
    position: absolute;
    bottom: 0px;
    left: 80 * $s;
    width: calc(90% - #{ 80 * $s });
    .text {
      font-family: Helvetica;
      font-size: 36 * $s;
      font-family: 'TTNormsMedium';
      margin-bottom: 40 * $s;
      text-align: left;
      color: white;
    }
  }
  .icon {
    position: absolute;
    right: 0;
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    bottom: 0;
    width: 120 * $s;
    height: 120 * $s;
    &.big {
      width: 200 * $s;
      height: 120 * $s
    }
  }
  .extra-img {
    position: relative;
    width: 250 * $s;
    margin-bottom: 40 * $s;
    height: 50 * $s;
    bottom: 0 * $s;
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
