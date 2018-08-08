<template>
  <div class="player">
    <video :src="player.url" loop="true" :autoplay="playerState===0" @loaderror="loadErrorCB" @loadstart="musicLoad(-1, $event)" @loadeddata="musicLoad(1, $event)" @timeupdate="updateTime($event)"></video>
   <transition name="fade">
    <div class="wrapper" v-if="!fade">
      <div class="controls">
        <div class="ctrl">
            <div class="pause" v-if="playerState === 0">
            </div>
            <div class="play" v-if="playerState === 1">
            </div>
        </div>
        <div class="elapsedTime">
         {{elapsed}}
        </div>
        <div class="seekbar">
          <div class="progress" :style="{'width': `${progress}%`}">
          </div>
        </div>
        <div class="totalTime">
          {{total}}
        </div>
      </div>
    </div>
   </transition>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Messages from '../../services/Messages';

export default {
  name: 'videoSource',
  created() {
    console.log(this.playerState);
    if (this.playerState === 0) {
      this.autoplay = true;
    } else {
      this.autoplay = false;
    }
  },
  props: {
    name: {
      type: String,
    },
  },
  mounted() {
    this.initiateTimer();
    Messages.$on('button_down', this.handleKeyDown);
    this.$nextTick(() => {
      this.playerEle = this.$el.querySelector('video');
    });
    this.setPlayer({ active: true });
  },
  destroyed() {
    this.playerEle = null;
    Messages.$off('button_down', this.handleKeyDown);
    this.setPlayer({ active: false });
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  },
  methods: {
    ...mapActions({
      saveContinue: 'SAVE_CONTINUE',
      clearVoiceTimer: 'CLEARTIMEOUT',
      resetVoiceTimer: 'RESET_VOICE_TIMER',
    }),
    ...mapMutations('source', {
      setPlayer: 'UPDATE_PLAYER',
    }),
    initiateTimer() {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      console.log(this.fade);
      this.fade = false;
      this.timeoutId = setTimeout(() => {
        this.fade = true;
      }, 5000);
    },
    updateTime(event) {
      this.setPlayer({ elapsedTime: event.target.currentTime });
      // console.log(event.target.duration);
    },
    loadErrorCB() {
      console.log('loadErrorCB');
    },
    musicLoad(status, event) {
      console.log(status, event);
      if (status === -1) {
        this.updateState(-1);
        this.setPlayer({ elapsedTime: event.target.currentTime });
        this.setPlayer({ total: event.target.duration });
      } else {
        this.updateState(0);
        this.setPlayer({ elapsedTime: event.target.currentTime });
        this.setPlayer({ total: event.target.duration });
      }
    },
    updateState(val) {
      this.setPlayer({ playerState: val });
    },
    play() {
      if (this.playerEle) {
        this.playerEle.play();
        console.log('play');
      }
    },
    pause() {
      if (this.playerEle) {
        this.playerEle.pause();
      }
    },
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'UP':
          break;
        case 'RIGHT':
          break;
        case 'DOWN':
          break;
        case 'LEFT':
          break;
        case 'BACK':
          if (this.name === 'hbo' || this.name === 'hulu') {
            // this.saveContinue(this.name);
          }
          this.setPlayer({ playerState: 1, active: false });
          this.$emit('exit', { from: 'player' });
          break;
        default:
          break;
      }
    },
  },
  watch: {
    volume(val) {
      if (!this.playerEle) return;
      this.playerEle.volume = (val * 1) / 16;
    },
    playerState(val) {
      if (val === 0) {
        this.play();
        this.clearVoiceTimer();
        this.initiateTimer();
      } else if (val === 1) {
        this.pause();
        clearTimeout(this.timeoutId);
        this.resetVoiceTimer();
        this.timeoutId = null;
        this.fade = false;
      }
    },
    playerActive(val) {
      if (!val) this.pause();
    },
    muted(val) {
      if (!this.playerEle) return;
      if (val) {
        this.playerEle.muted = true;
      } else {
        this.playerEle.muted = false;
        this.playerEle.volume = (this.volume * 1) / 16;
      }
    },
  },
  data() {
    return {
      playerEle: null,
      autoplay: false,
      fade: false,
    };
  },
  computed: {
    ...mapState('source', {
      player: state => state.player,
      volume: state => state.player.volume,
      playerActive: state => state.player.active,
      muted: state => state.player.muted,
      playerState: state => state.player.playerState,
    }),
    progress() {
      return (this.player.elapsedTime / this.player.total) * 100;
    },
    total() {
      let minutes = parseInt(this.player.total / 60, 10);
      let sec = parseInt((this.player.total % 60), 10);
      if (minutes < 10) minutes = `0${minutes}`;
      if (sec < 10) sec = `0${sec}`;
      return `${minutes}:${sec}`;
    },
    elapsed() {
      let minutes = parseInt(this.player.elapsedTime / 60, 10);
      let sec = parseInt((this.player.elapsedTime % 60), 10);
      if (minutes < 10) minutes = `0${minutes}`;
      if (sec < 10) sec = `0${sec}`;
      return `${minutes}:${sec}`;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';
.player {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  video {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background: black;
  }
  .wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 470 * $s;
    background-size: 100% 100%;
    background-image: url('/static/Images/player/bg.png');
  }
  .controls {
    height: 180 * $s;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .ctrl {
      position: relative;
      width: 50 * $s;
      height: 50 * $s;
      .play {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-size: 40 * $s 40 * $s;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('/static/Images/player/play.png');
      }
      .pause {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('/static/Images/player/pause.png');
      }
    }
    .elapsedTime {
      color: white;
      position: relative;
      width: 100 * $s;
      font-size: 20 * $s;
      font-family: Helvetica;
      text-align: center;
    }
    .totalTime {
      position: relative;
      color: white;
      width: 100 * $s;
      text-align: center;
      font-size: 20 * $s;
      font-family: Helvetica;
    }
    .seekbar{
      position: relative;
      width: 1529 * $s;
      background: rgb(156, 156, 156);
      height: 4 * $s;
      .progress {
        position: absolute;
        top: 0;
        width: 0 * $s;
        background: white;
        left: 0;
        height: 100%;
      &::after {
        content: "";
        left: 100%;
        top: -8 * $s;
        position: absolute;
        height: 20 * $s;
        width: 5 * $s;
        background: white;
      }
      }

    }
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
