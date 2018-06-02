<template>
  <div class="smart-screen">
    <div class="backdrop" :class="{'blur': topView !== 'screensaver'}">
    </div>
    <transition-group :name="transition" tag="div" class="component">
      <template v-for="(comps, index) in viewStack">
        <component :active="topView === comps && !isBixbyActive && active" :style="{'z-index': (index + 1)}" :is="gConfig.components[comps].vType === 'screenshot' ? 'screenshot': comps" :key="comps" @exit="exitCB" @return="returnCB"></component>
      </template>
    </transition-group>
    <bixby v-show="isBixbyActive && active" :active="isBixbyActive"/>
    <music-player></music-player>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import bixby from './bixby/bixby';
import home from './home/home';
import screensaver from './screensaver/screensaver';
import screenshot from './screenshot/screenshot';
import musicPlayer from './common/musicplayer';
import spotify from './spotify/spotify';
import hbo from './hbo/hbo';
import hulu from './hulu/hulu';
import volume from './system/volume';
import result from './result/result';
// import result from './result/result';
import Messages from '../services/Messages';

export default {
  name: 'smartscreen',
  mounted() {
    this.stopSlideShow();
    if (!this.isRemoteEnabled) {
      this.startSlideShow();
    }
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
    ...mapGetters('home', {
      homeSuggest: 'GET_SUGGESTIONS',
    }),
    ...mapGetters([
      'visibleComp',
    ]),
    ...mapState([
      'isRemoteEnabled',
      'gConfig',
      'transition',
      'screenshot',
      'viewStack',
      'suggestions',
      'isBixbyActive',
    ]),
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
      toggleVideo: 'TOGGLE_VIDEO_AUTO',
    }),
    ...mapActions('source', {
      updateVolume: 'UPDATE_VOLUME',
      toggleMute: 'TOGGLE_MUTE',
    }),
    ...mapMutations('bixby', {
      updateBixby: 'UPDATE_BIXBY',
    }),
    ...mapActions({
      removeComponent: 'REMOVE_COMPONENT',
      toggleMedia: 'TOGGLE_MEDIA',
      switch_comp: 'SWITCH_COMPONENT',
      launchVoice: 'LAUNCH_VOICE',
      resetVoiceTimer: 'RESET_VOICE_TIMER',
      closeVoice: 'CLOSE_VOICE',
    }),
    exitCB() {
      this.removeComponent();
    },
    startSlideShow() {
      // clearInterval(this.intervalId);
      // this.intervalId = setInterval(() => {
      //   this.index = (((this.index) + 1) % this.bSuggestions.length);
      // }, 5000);
    },
    stopSlideShow() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    returnCB() {
    },
    handleKeyDown(type) {
      console.log('Handle Key dowb', type);
      if (!this.active) return;
      this.resetVoiceTimer();
      switch (type) {
        case 'VOICE':
          if (this.isBixbyActive) {
            this.closeVoice();
          }
          this.heyBixby();
          break;
        case 'SMART_HUB':
          this.switch_comp({ replace: true, name: 'home' });
          break;
        case 'ONE':
          this.toggleVideo();
          break;
        case 'PLAY':
          this.toggleMedia();
          break;
        case 'VOLUME_UP':
          this.switch_comp({ name: 'volume' });
          this.updateVolume('++');
          break;
        case 'VOLUME_DOWN':
          this.updateVolume('--');
          break;
        case 'MUTE':
          this.toggleMute();
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
      intervalId: null,
      index: 0,
    };
  },
  components: {
    bixby,
    hbo,
    hulu,
    home,
    volume,
    result,
    spotify,
    screensaver,
    musicPlayer,
    screenshot,
    // result,
  },
  watch: {
    isRemoteEnabled(val) {
      if (!val) this.startSlideShow();
      else this.stopSlideShow();
    },
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
  .component {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .backdrop {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 1;
    width: 100%;
    height: 100%;
    background-image: url('/static/Images/background.png');
    transition: 0.5s -webkit-filter linear;
    &.blur {
      filter: blur(50px);
      -webkit-filter: blur(50px);
    }
    // background-image: url('/static/bgbg.png');
    background-size: 100%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s linear;
    &.bixby {
      transition: none;
    }
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: transform 1.2s ease, opacity 0.4s ease;
  }
  .slide-leave-to {
    opacity: 0;
  }
  .slide-enter {
    transform: translateX(#{200 * $s});
    opacity: 0;
  }
}
</style>
