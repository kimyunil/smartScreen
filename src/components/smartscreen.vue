<template>
  <div class="smart-screen">
    <bixby @toggle-result="toggleResult"/>
    <v-source class="video-source" :config="videoconfig"></v-source>
    <!--<div class="result-container">
      <result v-if="showResult"/>
    </div>
    -->
    <home/>
  </div>
</template>

<script>

import vSource from './common/videoSource';
import bixby from './bixby/bixby';
import home from './home/home';
// import result from './result/result';
import { mapState, mapMutations } from 'vuex';
import Messages from '../services/Messages';

export default {
  name: 'smartscreen',
  mounted() {
    Messages.send('audio-input.start');
    Messages.$on('speech-to-text.transcription-complete', this.setComplete);
    Messages.$on('audio-input.begin', this.handleASRBegin);
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
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
    ...mapState([
      'isRemoteEnabled',
    ]),
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
    }),
    handleKeyDown(type) {
      console.log('Handle Key Down', type);
      switch (type) {
        case 'VOICE_SEARCH':
          this.updateMode(!this.isRemoteEnabled);
          break;
        default:
          break;
      }
    },
    toggleResult(val) {
      this.showResult = val;
    },
    handleASRBegin() {
      console.log('handleASRBegin:::::::::::::::');
    },
    setComplete(arg) {
      console.log('SetComplete::::');
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
    home,
    // result,
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
