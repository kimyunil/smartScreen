// Requires:
// this.player - html video/audio player element
// this.volume - vuex getter

// APIs
// Use this.setPlayer to setup initial player volume where it's appropriate in your component

export default {
  destroyed() {
    if (this.player) {
      this.pause();
      this.player.src = '';
    }
  },
  props: {
    playerMute: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    volume: {
      handler() {
        if (!this.player) return;
        this.player.volume = this.volume.value / 100;
        this.player.muted = this.playerMute || this.player.localMuted || this.volume.muted;
      },
      deep: true,
    },
    power() {
      if (this.power) {
        this.play();
      } else {
        this.pause();
      }
    },
    playerMute(val) {
      if (!this.player) return;
      if (val) {
        this.player.muted = true;
      } else {
        this.player.muted = this.volume.muted;
      }
    },
  },
  methods: {
    setPlayer() {
      if (!this.player) return;
      this.player.volume = this.volume.value / 100;
      this.player.muted = this.playerMute || this.volume.muted;
      this.player.load();
    },
    play() {
      if (!this.player) return;
      this.player.play();
    },
    pause() {
      if (!this.player) return;
      this.player.pause();
    },
    toggle() {
      if (!this.player) return;
      if (this.player.paused) this.play();
      else this.pause();
    },
  },
};
