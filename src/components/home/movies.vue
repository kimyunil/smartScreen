<template>
  <div class="movies">

  </div>
</template>
<script>
import Messages from '../../services/Messages';

export default {
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'UP':
          this.$emit('movefocus', { dir: 'up', from: 'content' });
          break;
        case 'RIGHT':
          break;
        case 'DOWN':
          break;
        case 'BACK':
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.movies {
  position: relative;
  width: 100%;
  height: 100%;
  background:red;
}
</style>
