<template>
  <div class="audio-player">
    <audio :src="url" @loaderror="loadErrorCB" @loadstart="musicLoad(-1, $event)" @loadeddata="musicLoad(1, $event)" @timeupdate="updateTime($event)"/>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  mounted() {
    this.$nextTick(() => {
      this.audioEle = this.$el.querySelector('audio');
    });
  },
  destroyed() {
  },
  data() {
    return {
      audioEle: null,
    };
  },
  computed: {
    ...mapState('source', {
      musicplayer: state => state.musicplayer,
      volume: state => state.player.volume,
      muted: state => state.player.muted,
      playstate: state => state.musicplayer.playerState,
    }),
    url() {
      if (this.musicplayer.details) return this.musicplayer.details.url;
      return '';
    },
  },
  watch: {
    volume(val) {
      if (!this.audioEle) return;
      this.audioEle.volume = (val * 1) / 16;
    },
    muted(val) {
      if (!this.audioEle) return;
      if (val) {
        this.audioEle.muted = true;
      } else {
        this.audioEle.muted = false;
        this.audioEle.volume = (this.volume * 1) / 16;
      }
    },
    playstate(val) {
      if (val === 0) {
        this.play();
      } else if (val === 1) {
        this.pause();
      }
    },
  },
  methods: {
    ...mapMutations('source', {
      totalDuration: 'SET_MUSIC_DURATION',
      elapsedTime: 'SET_MUSIC_ELAPSED',
      updateState: 'MUSIC_STATE_UPDATE',
    }),
    updateTime(event) {
      this.elapsedTime(event.target.currentTime);
    },
    loadErrorCB() {
      console.log('loadErrorCB');
    },
    musicLoad(status, event) {
      console.log(status, event);
      if (status === -1) {
        this.updateState(-1);
        this.elapsedTime(event.target.currentTime);
        this.totalDuration(event.target.duration);
      } else {
        this.updateState(0);
        this.elapsedTime(event.target.currentTime);
        this.totalDuration(event.target.duration);
      }
    },
    play() {
      if (this.audioEle) {
        this.audioEle.play();
      }
    },
    pause() {
      if (this.audioEle) {
        this.audioEle.pause();
      }
    },
  },
};
</script>
<style lang="scss">
</style>
