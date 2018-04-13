<template>
  <div class="smart-screen">
    <bixby/>
    <v-source class="video-source" :config="videoconfig"></v-source>
  </div>
</template>

<script>

import vSource from './common/videoSource';
import lottie from './common/lottie';
import bixby from './bixby/bixby';
import { mapState } from 'vuex';

export default {
  name: 'demo',
  computed: {
    videoconfig() {
      const obj = {};
      obj.url = this.selectedSourceURL;
      obj.loop = true;
      obj.autoplay = true;
      return obj;
    },
    ...mapState('source', [
      'selectedSourceURL',
    ]),
  },
  data() {
    return {
      isResult: false,
    };
  },
  components: {
    lottie,
    vSource,
    bixby,
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
@import '../mixins/scss/main';
.smart-screen {
  position: absolute;
  left: 0;
  top: 0;
  width: 1920 * $s;
  height: 1080 * $s;
  .video-source {
    position: absolute;
    width: 1920 * $s;
    height: 1080 * $s;
    top: 0;
    left: 0;
  }
  .bixby {
    position: absolute;
    top: 0;
    left: 0;
    width: 1920 * $s;
    height: 1080 * $s;
    z-index:22;

  }
}
</style>
