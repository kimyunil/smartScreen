<template>
  <div class="smart-screen">
    <bixby @toggle-result="toggleResult"/>
    <v-source class="video-source" :config="videoconfig"></v-source>
    <div class="result-container">
      <result v-if="showResult"/>
    </div>
  </div>
</template>

<script>

import vSource from './common/videoSource';
import bixby from './bixby/bixby';
import result from './result/result';
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
  methods: {
    toggleResult(val) {
      this.showResult = val;
    },
  },
  data() {
    return {
      isResult: false,
      showResult: false,
    };
  },
  components: {
    vSource,
    bixby,
    result,
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
