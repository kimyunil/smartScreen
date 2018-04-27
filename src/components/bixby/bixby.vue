<template>
  <div class="bixby">
    <div class="bixby-wrapper" :class="[bixbyState,utilClass]" :style="{'transform': `translateY(${translateY}vw)`}">
      <div class="bixby-lottie">
        <weblottie
        v-if="defaultOptions.animationData !== undefined"
        :options="defaultOptions"
        v-on:animCreated="handleAnimation"
        ></weblottie>
      </div>
      <div class="bixby-speech-text" :class="{'hideText': !showSpeechText}">
        <speech-text :sText="sText"></speech-text>
      </div>
      <div class="bixby-response-text" :class="{'hideText': !showResponseText}" v-if="response !== ''">
        <response :response="response" :isSpeechEnabled="text!==''"></response>
      </div>
    </div>
    <div class="result-container" :class="{'show-result': isResult}" :style="[{'transform': `translateY(${resTrans}vw)`}, {'clip-path': clippath}]">
      <div class="result-data">
        <component v-if="result && result.data" :is="result.data.template" :resultData="result" class="result-template"> </component>
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
import hList from './result/hList';

export default {
  name: 'bixyby',
  mixins: [listeners],
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.translate = this.default;
    console.log(document.getElementById('clipmotion_result'));
    if (!document.getElementById('clipmotion_result')) {
      const div = document.createElement('div');
      div.setAttribute('id', 'clipmotion_result');
      div.classList.add('clipmotion_result');
      console.log(document.body);
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
    translateY() {
      return (((this.translate) * 100) / window.innerWidth);
    },
    resTrans() {
      return ((this.resTranslate * 100) / window.innerWidth);
    },
    sText() {
      return this.text.split(' ');
    },
    ...mapState('animation', [
      'lottieanim',
    ]),
    ...mapState('bixby', [
      'result',
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
    ...mapMutations('bixby', {
      resetResult: 'RESET_RESULT',
    }),
    ...mapActions('bixby', {
      set_result: 'SET_RESULT',
    }),
    clipAnimation(anim) {
      window.anim = anim;
    },
    handleKeyDown(type) {
      switch (type) {
        case 'ONE':
          this.showSpeechText = true;
          this.$emit('toggle-result', false);
          this.text = '';
          this.updateBixby('invoke');
          break;
        case 'TWO':
          this.showSpeechText = true;
          this.text = 'Show me movies with Tom Hanks';
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
    resetBixby() {
      this.resetResult();
      this.utilClass = '';
      this.isResult = false;
      this.updateBixby('invoke');
      this.resTranslate = 0;
      this.clippath = '';
      this.response = '';
      if (this.clipAnim) {
        this.clipAnim.goToAndStop(0);
      }
      this.translate = this.default;
    },
    handleAnimation(anim) {
      this.anim = anim;
      this.anim.addEventListener('complete', this.onCompleteAnim);
    },
    showResult() {
      this.showSpeechText = false;
      this.showResponseText = true;
      this.defaultOptions.loop = false;
      this.translate = this.default;
      this.updateBixby('wipeoff');
      this.translate = 0;
      this.isResult = false;
    },
    revealResult() {
      this.utilClass = '';
      this.showResponseText = true;
      this.set_result({ category: 'movies', subcategory: 'action' });
      this.response = this.result.data.response;
      this.updateBixby('reveal');
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
      setTimeout(() => {
        const temp = this.$el.querySelector('.result-data').offsetHeight;
        this.isResult = true;
        this.resTranslate = (temp + 150) * -1;
        this.translate = (temp + 150) * -1;
      }, 10);
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
    onCompleteAnim() {
      if (this.bixbyState === 'wipeoff') {
        // alert();
        this.text = '';
        if (!this.isResult) {
          this.noResultWipe();
        }
      }
    },
    changeAnimation() {
      if (this.bixbyState !== '') {
        this.defaultOptions.animationData = undefined;
        this.$nextTick(() => {
          console.log(this.bixbyState, this.lottieanim);
          this.$set(this.defaultOptions, 'animationData', this.lottieanim[this.bixbyState].data.animationData);
        });
      }
    },
  },
  data() {
    return {
      text: '',
      response: '',
      clipAnim: null,
      showSpeechText: false,
      showResponseText: false,
      isResult: false,
      translate: 0,
      utilClass: '',
      clippath: '',
      resTranslate: 0,
      default: -220,
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
    weblottie,
    speechText,
    response,
    hList,
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
  .bixby-wrapper {
    top: 100%;
    width: 100%;
    position: absolute;
    .bixby-lottie {
      position: relative;
      height: auto;
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
    overflow: hidden;
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
