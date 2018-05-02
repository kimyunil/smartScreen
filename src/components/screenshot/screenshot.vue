<template>
  <div class="screenshot" :style="{'background-image': `url('${screenshot}')`}">

  </div>
</template>
<script>
import { mapState } from 'vuex';
import Messages from '../../services/Messages';

export default {
  name: 'screenshot',
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    ...mapState([
      'screenshot',
    ]),
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
<style>
.screenshot {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-color: white;
  left: 0;
  top: 0;
}
</style>

