<template>
  <div class="volume">
    <div class="icon" :style="{'background-image': `url(${volumeImg})`}">
    </div>
    <div class="v-tuner">
      <div class="indicator-box" v-if="!muted">
        <template v-if="maxVolume !== volumeCnt">
          <div class="wrapper">
            <div class="indicator" :key="i" :class="{'filled': volumeCnt >= i}" v-for="i in maxVolume">
            </div>
          </div>
        </template>
        <div  class="vol-text" v-else>
          Max Volume
        </div>
      </div>
      <div class="vol-text" v-else>
        Muted
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Messages from '../../services/Messages';

export default {
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    ...mapState('source', {
      volume: state => state.player.volume,
      isDim: state => state.player.isDimVol,
      bckVol: state => state.player.bckVol,
      muted: state => state.player.muted,
      maxVolume: state => state.player.maxVol,
    }),
    volumeCnt() {
      if (this.isDim) {
        return this.bckVol;
      }
      return this.volume;
    },
    volumeImg() {
      if (this.muted) {
        return '/static/Images/system/mute.png';
      }
      return '/static/Images/system/volume.png';
    },
  },
  methods: {
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'BACK':
          this.$emit('exit');
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';
  .volume {
    position: absolute;
    bottom: 46 * $s;
    width: 100%;
    height: 216 * $s;
    display: flex;
    flex-direction: column;
    .icon {
      position: relative;
      background-size: contain;
      width: 100%;
      height: 87 * $s;
      background-position: center;
      background-repeat: no-repeat;

    }
    .vol-text {
      position: relative;
      font-family: Helvetica;
      top: 10 * $s;
      font-size: 40 * $s;
      color: white;
    }
    .v-tuner {
      height: 70 * $s;
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .indicator-box {
        position: relative;
        width: auto;
        // top: 18 * $s;
        margin-left:16 * $s;
        .wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .indicator {
          position: relative;
          height: 18 * $s;
          margin-right:16 * $s;
          width: 18 * $s;
          background: rgba(0,0,0,0.4);
          // border: 1 * $s solid grey;
          &.filled {
            background: white;
            // border: 1 * $s solid white;
          }
        }
      }
    }
  }
</style>
