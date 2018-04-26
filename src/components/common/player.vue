<template>
  <div class="player">
    <video :src="player.url" loop="true" :autoplay="playerState===0"></video>
    <div class="controls">
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Messages from '../../services/Messages';

export default {
  name: 'videoSource',
  created() {
    if (this.playerState === 0) {
      this.autoplay = true;
    } else {
      this.autoplay = false;
    }
  },
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.$nextTick(() => {
      this.playerEle = this.$el.querySelector('video');
    });
  },
  destroyed() {
    this.playerEle = null;
    Messages.$off('button_down', this.handleKeyDown);
  },
  methods: {
    play() {
      if (this.playerEle) {
        this.playerEle.play();
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
      this.playerEle.volume = val;
    },
    playerState(val) {
      if (val) {
        this.play();
      } else {
        this.pause();
      }
    },
    muted(val) {
      if (!this.playerEle) return;
      if (val) {
        this.playerEle.muted = true;
      } else {
        this.playerEle.muted = false;
        this.playerEle.volume = this.volume;
      }
    },
  },
  data() {
    return {
      playerEle: null,
      autoplay: false,
    };
  },
  computed: {
    ...mapState('source', {
      player: state => state.player,
      volume: state => state.player.volume,
      muted: state => state.player.muted,
      playerState: state => state.player.playerState,
    }),
  },
};
</script>
<style lang="scss" scoped>
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
}
</style>
