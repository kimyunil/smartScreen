<template>
  <div class="player-fullscreen">
    <player :active="active"></player>
  </div>
</template>
<script>
import player from '../common/player';
import Messages from '../../services/Messages';

export default {
  name: 'homeplayer',
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
    const video = this.$el.querySelector('video');
    if (video) {
      video.muted = true;
      setTimeout(() => {
        video.src = '';
      }, 100);
    }
  },
  methods: {
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'BACK':
          this.$emit('exit', { from: 'result' });
          break;
        default:
          break;
      }
    },
  },
  components: {
    player,
  },
};
</script>
<style scoped lang="scss">
  @import '../../mixins/scss/main';
  .player-fullscreen {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
