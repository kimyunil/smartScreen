<template>
  <div class="bixby">
    <div class="bixby-wrapper" :class="[bixbyState]" :style="{'transform': `translateY(${translateY}vw)`}">
      <div class="bixby-lottie">
        <lottie
        v-if="defaultOptions.animationData !== undefined"
        :options="defaultOptions"
        v-on:animCreated="handleAnimation"
        ></lottie>
      </div>
      <div class="bixby-speech-text" :class="{'hideText': !showSpeechText}">
        <speech-text :sText="sText"></speech-text>
      </div>
      <div class="result-container" v-show="showResult">
        <result/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import lottie from '../common/lottie';
import Messages from '../../services/Messages';
import speechText from './speechText';
import listeners from './listeners';
import result from './result/result';

export default {
  name: 'bixyby',
  mixins: [listeners],
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.translate = this.default;
    this.$nextTick(() => {
      this.changeAnimation();
    });
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    translateY() {
      return ((this.translate * 100) / window.innerWidth);
    },
    sText() {
      return this.text.split(' ');
    },
    ...mapState('animation', [
      'lottie',
    ]),
    ...mapState([
      'bixbyState',
    ]),
  },
  methods: {
    ...mapMutations({
      updateBixby: 'UPDATE_BIXBY',
    }),
    ...mapActions({
      closeVoice: 'CLOSE_VOICE',
    }),
    ...mapActions('result', {
      set_result: 'SET_RESULT',
    }),
    handleKeyDown(type) {
      switch (type) {
        case 'ONE':
          this.showSpeechText = true;
          this.$emit('toggle-result', false);
          this.text = '';
          this.updateBixby('invoke');
          break;
        case 'TWO':
          this.text = 'Show me movies with Tom Hanks';
          this.updateBixby('listen');
          break;
        case 'THREE':
          this.updateBixby('think');
          break;
        case 'FOUR': {
          const ret = this.set_result({ category: 'movies', starrer: 'tom_hanks' });
          if (ret) {
            this.defaultOptions.loop = false;
            this.translate = 0;
            this.updateBixby('wipeoff');
            this.showSpeechText = false;
          } else {
            // bixby Nagging
          }
          break;
        }
        case 'FIVE':
          this.updateBixby('standby1');
          break;
        case 'SIX':
          this.updateBixby('standby2');
          break;
        case 'BACK':
          this.closeBixby();
          break;
        default:
          break;
      }
    },
    closeBixby() {
      this.closeVoice();
      Messages.send('audio-input.stop');
      this.loop = false;
    },
    handleAnimation(anim) {
      this.anim = anim;
      this.anim.addEventListener('complete', this.onCompleteAnim);
    },
    onCompleteAnim() {
      if (this.bixbyState === 'wipeoff') {
        // alert();
        this.updateBixby('reveal');
        console.log(this.$el.querySelector('.h-list').offsetHeight);
        this.showResult = true;
        this.$emit('toggle-result', true);
      }
    },
    changeAnimation() {
      if (this.bixbyState !== '') {
        this.defaultOptions.animationData = undefined;
        this.$nextTick(() => {
          console.log(this.bixbyState, this.lottie);
          this.$set(this.defaultOptions, 'animationData', this.lottie[this.bixbyState].data.animationData);
        });
      }
    },
  },
  data() {
    return {
      text: '',
      showSpeechText: false,
      showResult: false,
      translate: 0,
      default: -240,
      timeout: null,
      defaultOptions: {
        animationData: undefined,
        loop: false,
      },
    };
  },
  watch: {
    bixbyState(value) {
      console.log(console.log(value));
      if (value !== '') {
        console.log(value);
        this.changeAnimation(value);
      }
    },
  },
  components: {
    lottie,
    speechText,
    result,
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';
.bixby {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background: linear-gradient(to top, rgba(0,0,0,0.4), rgba(255,255,255,0.1));
  overflow: scroll;
  .bixby-wrapper {
    top: 100%;
    width: 100%;
    position: absolute;
    .bixby-lottie {
      position: relative;
      height: auto;
      width: 100%;
    }
    &.wipeoff {
      transition: transform 0.5s cubic-bezier(.33,0,.83,1);
    }
    &.reveal {
      
    }
  }
  .bixby-speech-text {
    position: absolute;
    width: 100%;
    top: 0;
    height: 100%;
    font-size: 64 * $s;
    color: white;
    left: 90 * $s;
    font-family: TTNormsLight;
    transition: transform 0.8s ease, opacity 0.8s ease;
    &.hideText {
      transform: translateY(150px);
      opacity: 0;
    }
  }
  .result-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
}
</style>
