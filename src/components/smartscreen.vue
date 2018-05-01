<template>
  <div class="smart-screen">
    <div class="backdrop" :class="{'blur': viewStack.length > 1}">
    </div>
    <transition-group name="fade" tag="div" class="component">
      <template v-for="(comps, index) in viewStack">
        <component :active="topView === comps && !isBixbyActive && active" :style="{'z-index': (index + 1)}" :is="comps" :key="comps" @exit="exitCB" @return="returnCB"></component>
      </template>
    </transition-group>
    <bixby v-show="isBixbyActive && active" :active="isBixbyActive"/>
    <transition name="show">
        <div class="bixby-suggestions" v-if="!isRemoteEnabled && visibleComp.suggestion" :style="{'z-index': (viewStack.length + 1)}" >
          <transition name="slideshow">
            <div class="text-suggestion" :key="index">
              <span class="text"> Say</span>
              <span class="suggestions">" Hey Bixby, <span>{{bSuggestions[index]}}</span>"</span>
            </div>
          </transition>
        </div>
    </transition>
    <music-player></music-player>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import bixby from './bixby/bixby';
import home from './home/home';
import screensaver from './screensaver/screensaver';
import musicPlayer from './common/musicplayer';
import spotify from './spotify/spotify';
import hbo from './hbo/hbo';
import hulu from './hulu/hulu';
import volume from './system/volume';
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
    bSuggestions() {
      if (this.topView === 'home') {
        return this.homeSuggest;
      }
      return this.suggestions;
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
      'viewStack',
      'suggestions',
      'isBixbyActive',
    ]),
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
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
      switch_comp: 'SWITCH_COMPONENT',
      launchVoice: 'LAUNCH_VOICE',
      resetVoiceTimer: 'RESET_VOICE_TIMER',
      closeVoice: 'CLOSE_VOICE',
    }),
    exitCB() {
      this.removeComponent();
    },
    startSlideShow() {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.index = (((this.index) + 1) % this.bSuggestions.length);
      }, 5000);
    },
    stopSlideShow() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    returnCB() {
    },
    handleKeyDown(type) {
      if (!this.active) return;
      // this.resetVoiceTimer();
      switch (type) {
        case 'VOICE':
          if (this.isBixbyActive) {
            this.closeVoice();
          }
          this.heyBixby();
          break;
        case 'ONE':
          if (!this.isBixbyActive) {
            this.switch_comp({ name: 'spotify' });
          }
          break;
        case 'TWO':
          if (!this.isBixbyActive) {
            this.switch_comp({ name: 'hulu' });
          }
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
    spotify,
    screensaver,
    musicPlayer,
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
    .bixby-suggestions {
      position: absolute;
      bottom: 0;
      height: 135 * $s;
      width: 100%;
      display: flex;
    align-items: center;
    .text-suggestion {
      position: absolute;
      top: 35%;
      left: 132 * $s;
      // top: -3 * $s;
      font-size: 32 * $s;
        &.slideshow-enter {
          opacity: 0;
        }
        &.slideshow-leave-to {
          opacity: 0;
        }
        &.slideshow-enter-active{
          transition: opacity 0.3s ease;
        }
        &.slideshow-leave-active {
          transition: opacity 0.3s ease;
        }
      .text {
        font-family: SamsungOneUI300;
      }
      .suggestions {
        font-size: 31 * $s;
        font-family: SamsungOneUI700;
      }
    }
    .pagination-dots {
      position: absolute;
      right: 70 * $s;
      display: flex;
      width: 84 * $s;
      justify-content: space-between;
      .dots {
        height: 10* $s;
        width: 10* $s;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.2);
        &.selected {
          background-color: rgba(0,0,0,1)
        }
      }
    }
    &.show-enter {
      opacity: 0;
    }
    &.show-leave-to {
      opacity: 0;
    }
    &.show-enter-active{
      transition: height 0.3s ease, opacity 0.3s ease;
    }
    &.show-leave-active {
      transition: height 0.3s ease, opacity 0.3s ease;
    }
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
}
</style>
