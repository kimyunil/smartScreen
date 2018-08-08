<template>
  <div class="bixby">
    <div class="bixby-wrapper" :class="[bixbyState,utilClass]"
      :style="{'transform': `translateY(${translateY}vw)`}"
      @transitionend="transitionEndCB($event)"
      >
      <div class="bixby-lottie">
        <weblottie
        v-if="defaultOptions.animationData !== undefined"
        :options="defaultOptions"
        v-on:animCreated="handleAnimation"
        ></weblottie>
      </div>
      <div class="bixby-speech-text" :class="{'hideText': !showSpeechText}">
        <speech-text :sText="speechText"></speech-text>
      </div>
      <div class="bixby-response-text" :class="{'hideText': !showResponseText}" v-if="response !== ''">
        <response :response="response" :isSpeechEnabled="speechText!==''"></response>
      </div>
    </div>
    <div class="result-container" :class="{'show-result': resultTransition}"
    :style="[{'transform': `translateY(${resTrans}vw)`}, {'clip-path': clippath}]"
    >
      <div class="result-data">
        <component v-if="localResult && localResult.data" :class="localResult.data.contentType" :is="localResult.data.template" :resultData="localResult" class="result-template"> </component>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
// import lottie from 'lottie-web';
import weblottie from '../common/lottie';
import Messages from '../../services/Messages';
import speechText from './speechText';
import response from './responseText';
import listeners from './listeners';
import list from './result/list';
import info from './result/infocard';

export default {
  name: 'bixyby',
  mixins: [listeners],
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    // setting the default height
    this.translate = this.default;
    if (!document.getElementById('clipmotion_result')) {
      const div = document.createElement('div');
      div.setAttribute('id', 'clipmotion_result');
      div.classList.add('clipmotion_result');
      document.body.appendChild(div);
    }
    this.$nextTick(() => {
      this.changeAnimation();
    });
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    default() {
      return (-240 * window.innerWidth) / 1920;
    },
    translateY() {
      return (((this.translate) * 100) / window.innerWidth);
    },
    topView() {
      return this.viewStack[this.viewStack.length - 1];
    },
    resTrans() {
      return ((this.resTranslate * 100) / window.innerWidth);
    },
    sText() {
      return this.speechText.split(' ');
    },
    ...mapState('animation', [
      'lottieanim',
    ]),
    ...mapState('bixby', [
      'result',
      'bixbyState',
    ]),
  },
  methods: {
    ...mapActions({
      closeVoice: 'CLOSE_VOICE',
      resetVoiceTimer: 'RESET_VOICE_TIMER',
    }),
    ...mapMutations('bixby', {
      resetResult: 'RESET_RESULT',
      updateBixby: 'UPDATE_BIXBY',
    }),
    ...mapActions('bixby', {
      setResult: 'SET_RESULT',
    }),
    clipAnimation(anim) {
      window.anim = anim;
    },
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'ONE':
          this.showSpeechText = true;
          this.$emit('toggle-result', false);
          this.speechText = '';
          this.updateBixby('invoke');
          break;
        case 'TWO':
          this.showSpeechText = true;
          this.speechText = 'Show me funny Movies';
          this.updateBixby('listen');
          break;
        case 'THREE':
          this.updateBixby('think');
          break;
        case 'FOUR': {
          this.showSpeechText = false;
          this.showResponseText = true;
          this.defaultOptions.loop = false;
          this.translate = this.default;
          this.updateBixby('wipeoff');
          this.translate = 0;
          break;
        }
        case 'FIVE':
          this.resetBixby();
          break;
        case 'SIX':
          this.wipeResult();
          break;
        case 'BACK':
          this.closeBixby(false);
          break;
        default:
          break;
      }
    },
    resetBixby() {
      this.resetResult();
      this.utilClass = '';
      this.isResult = false;
      this.resTranslate = 0;
      this.clippath = '';
      this.speechText = '';
      this.response = '';
      this.defaultOptions.loop = false;
      if (this.clipAnim) {
        this.clipAnim.goToAndStop(0);
      }
      this.translate = this.default;
    },
    handleAnimation(anim) {
      this.anim = anim;
      // this.anim.addEventListener('complete', this.transitionEndCB);
    },
    revealResult() {
      console.log('this.result:::::::');
      this.response = this.localResult.data.response;
      this.revealId = setTimeout(() => {
        const temp = this.$el.querySelector('.result-data').offsetHeight;
        this.isResult = true;
        const bixbyHeight = this.$el.querySelector('.bixby-lottie').offsetHeight;
        const fact = parseInt(bixbyHeight / 2, 10);
        this.resTranslate = (temp + fact) * -1;
        this.translate = (temp + fact) * -1;
        console.log('this.result:::::::', this.translate, fact, temp);
        this.showResponseText = true;
        this.updateBixby('reveal');
      }, 10);
      // if (this.clipAnim === null) {
      //   this.clipAnim = lottie.loadAnimation({
      //     container: document.getElementById('clipmotion_result'), // the dom element
      //     renderer: 'svg',
      //     loop: false,
      //     autoplay: false,
      //     animationData: this.result.data.clipanim.animationData, // the animation data
      //   });
      // }
      // window.anim = this.clipAnim;
      // const clip = document.querySelector('#clipmotion_result svg g g').getAttribute('clip-path');
      // this.clippath = clip;
    },
    noResultWipe() {
      this.revealResult();
    },
    wipeResult() {
      this.utilClass = 'clear';
      this.showResponseText = false;
      this.showSpeechText = false;
      this.resTranslate = (0) * -1;
      this.translate = (0) * -1;
      this.isResult = false;
      this.updateBixby('wipeoff');
      // this.clipAnim.goToAndStop(0);
      // setTimeout(() => {
      //   this.clipAnim.play(0);
      // }, 100);
    },
    listening() {
      this.speechText = '';
      this.showResponseText = true;
    },
    showResults(resultData) {
      Messages.send('audio-input.stop');
      console.log(resultData);
      console.log('showResults:::::::::::');
      this.resetResult();
      if (resultData !== null) {
        this.setResult(resultData);
        this.utilClass = 'clear';
      }
      this.updateBixby('wipeoff');
      this.showResponseText = false;
      this.showSpeechText = false;
      this.resultTransition = false;
      this.resTranslate = 0;
      this.translate = 0;
    },
    closeBixby(restart) {
      clearTimeout(this.closeTimeout);
      Messages.send('audio-input.stop');
      this.restartBixby = restart;
      this.showResults(null);
    },
    transitionEndCB() {
      if (this.bixbyState === 'wipeoff') {
        this.speechText = '';
        this.utilClass = '';
        if (this.result !== null) {
          this.localResult = this.result;
          this.resultTransition = true;
          this.revealResult();
        } else if (this.restartBixby) {
          this.updateBixby('invoke');
          this.resetBixby();
        } else {
          this.updateBixby('initial');
          this.resetBixby();
          this.closeVoice();
        }
      }
    },
    closeTimer() {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = setTimeout(() => {
        if (this.isBixbyActive) {
          this.closeBixby(false);
          if (this.bixbyResult) {
            const param = this.bixbyResult.param.category;
            if (param === 'info' || param === 'movies') {
              if (this.topView === 'screensaver') {
                this.switch_comp({ replace: true, name: 'home' });
              }
            }
          }
        }
      }, 10000);
    },
    changeAnimation() {
      if (this.bixbyState !== 'initial') {
        if (this.bixbyState === 'listen') {
          this.defaultOptions.loop = false;
        }
        this.defaultOptions.animationData = undefined;
        console.log(this.bixbyState);
        this.$nextTick(() => {
          this.$set(this.defaultOptions, 'animationData', this.lottieanim[this.bixbyState].data.animationData);
        });
      }
    },
  },
  data() {
    return {
      speechText: '',
      restartBixby: false,
      resultTransition: false,
      localResult: null,
      revealId: null,
      response: '',
      clipAnim: null,
      closeTimeout: null,
      showSpeechText: false,
      showResponseText: false,
      translate: 0,
      utilClass: '',
      clippath: '',
      resTranslate: 0,
      bixbyResult: null,
      timeout: null,
      defaultOptions: {
        animationData: undefined,
        loop: false,
      },
    };
  },
  watch: {
    bixbyState(value) {
      console.log(value);
      if (value !== 'initial') {
        this.changeAnimation(value);
      }
    },
  },
  components: {
    weblottie,
    speechText,
    info,
    response,
    list,
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
  background-image: url('/static/Images/results/BGBG.png');
  background-size: 100% 100%;
  .bixby-wrapper {
    top: 100%;
    width: 100%;
    position: absolute;
    .bixby-lottie {
      position: relative;
      height: 300 * $s;

      width: 100%;
      // background: red;
    }
    &.wipeoff {
      transition: transform 0.5s cubic-bezier(.33,0,.83,1);
      &.clear {
        transition: transform 0.5s cubic-bezier(.33,0,.83,1);
      }
    }
    &.reveal {
      transition: transform 0.5s cubic-bezier(.33,0,.83,1);
    }
  }
  .bixby-speech-text {
    position: absolute;
    width: 100%;
    top: 20 * $s;
    height: 150 * $s;
    font-size: 64 * $s;
    color: white;
    left: 90 * $s;
    font-family: TTNormsLight;
    transition: opacity 0.8s ease;
    &.hideText {
      opacity: 0;
    }
  }
  .bixby-response-text {
    position: absolute;
    width: 100%;
    top: 20 * $s;
    height: 150 * $s;
    font-size: 64 * $s;
    color: white;
    left: 90 * $s;
    font-family: TTNormsLight;
    transition: opacity 0.8s ease;
    &.hideText {
      opacity: 0;
    }
  }
  .result-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: (540 + 150) * $s;
    // background: red;
    // overflow: hidden;
    transition: transform 0.5s cubic-bezier(.33,0,.83,1);
    // background: url('/static/bg 2.png');
    background-size: 100%;
      .result-data {
        position: absolute;
        // background: blue;
        top: 540 * $s;
        // top: 50%;
        width: 100%;
        // height: 100%;
        overflow: hidden;
        // background: red;
        .result-template {
          position: relative;
          transform: translateY(-80%);
          transition: transform 0.5s cubic-bezier(.33,0,.83,1);
          // background: blue;
        }
      }
      &.show-result {
        // .result-data {
        // }
        .result-template {
          transform: translateY(0%);
          transition: transform 0.5s cubic-bezier(.33,0,.83,1);
        }
    }
  }
}
</style>
<style lang="scss">
@import '../../mixins/scss/main';
.clipmotion_result {
  position: absolute;
  width: 100%;
  width: 1920 * $s;
  height: 1080 * $s;
  /* z-index:999; */
  top: 0;
  opacity: 0;
}
</style>
