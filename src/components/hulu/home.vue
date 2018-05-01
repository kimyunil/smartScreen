<template>
  <div class="hbo-home">
    <div class="screenshot" :style="{'background-image': `url(${details.screenshot})`}"></div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Messages from '../../services/Messages';

export default {
  name: 'hbo-home',
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  props: {
    details: {
      type: Object,
    },
  },
  computed: {
    ...mapState('source', {
      hbo: state => state.source.hbo,
    }),
  },
  methods: {
    ...mapMutations('source', {
      updateComponent: 'UPDATE_HULU_COMP',
    }),
    ...mapActions('source', {
      setPlayer: 'LOAD_APP_PLAYER',
    }),
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'UP':
          break;
        case 'RIGHT':
          break;
        case 'DOWN':
          break;
        case 'SELECT':
          this.setPlayer({ content: 'handmaids' });
          this.updateComponent('++');
          break;
        case 'BACK':
          this.$emit('exit', { from: 'home' });
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
.hbo-home {
  position: absolute;
  width: 100%;
  height: 100%;
  .screenshot {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: 100%;
  }
}
</style>
