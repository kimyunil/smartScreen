<template>
  <div class="smart-screen">
    <template v-for="(comps, index) in viewStack">
      <component :active="topView === comps" :style="{'z-index': (index + 1)}" :is="comps" :key="comps" @exit="exitCB" @return="returnCB"></component>
    </template>
    <v-source class="video-source" :config="videoconfig"></v-source>
    <!-- <div class="result-container">
      <result v-if="showResult"/>
    </div> -->
     <!-- <bixby @toggle-result="toggleResult"/> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import vSource from './common/videoSource';
import bixby from './bixby/bixby';
import home from './home/home';
import screensaver from './screensaver/screensaver';
// import result from './result/result';
import Messages from '../services/Messages';

export default {
  name: 'smartscreen',
  mounted() {
    console.log(this);
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
    topView() {
      return this.viewStack[this.viewStack.length - 1];
    },
    ...mapState('source', [
      'selectedSourceURL',
    ]),
    ...mapState([
      'isRemoteEnabled',
      'viewStack',
    ]),
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
    }),
    exitCB() {
    },
    returnCB() {
    },
    handleKeyDown(type) {
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
    setComplete() {
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
    screensaver,
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
