<template>
  <div class="smart-screen">
    <transition-group name="fade" tag="div">
      <template v-for="(comps, index) in viewStack">
        <component :active="topView === comps && !isBixbyActive" :style="{'z-index': (index + 1)}" :is="comps" :key="comps" @exit="exitCB" @return="returnCB"></component>
      </template>
    </transition-group>
    <v-source class="video-source" :config="videoconfig"></v-source>
    <bixby v-show="isBixbyActive" :active="isBixbyActive"/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import vSource from './common/videoSource';
import bixby from './bixby/bixby';
import home from './home/home';
import screensaver from './screensaver/screensaver';
// import result from './result/result';
import Messages from '../services/Messages';

export default {
  name: 'smartscreen',
  mounted() {
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
      'isBixbyActive',
    ]),
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
    }),
    ...mapActions({
      removeComponent: 'REMOVE_COMPONENT',
      switch_comp: 'SWITCH_COMPONENT',
      launchVoice: 'LAUNCH_VOICE',
    }),
    exitCB() {
      this.removeComponent();
    },
    returnCB() {
    },
    handleKeyDown(type) {
      switch (type) {
        case 'VOICE':
          this.heyBixby();
          break;
        default:
          break;
      }
    },
    heyBixby() {
      this.launchVoice();
      Messages.send('audio-input.start');
    },
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s ease;
    &.bixby {
      transition: none;
    }
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
