<template>
  <div class="bixby">
    <div class="bixby-lottie">
      <lottie v-if="defaultOptions.animationData !== undefined" :options="defaultOptions" v-on:animCreated="handleAnimation"></lottie>
    </div>
    <div class="bixby-speech-text" :class="{'hideText': !showSpeechText}">
      <speech-text :sText="sText"></speech-text>
    </div>
    <div class="result-container">
      <result v-if="showResult"/>
    </div>
  </div>
</template>
<script>

import lottie from '../common/lottie';
import { mapState, mapMutations } from 'vuex';
import Messages from '../../services/Messages';
import result from './result/result';
import speechText from './speechText';

export default {
  name: 'bixyby',
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
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
    handleKeyDown(type) {
      console.log('Handle Key Down', type);
      switch (type) {
        case 'ONE':
          this.showResult = false;
          this.showSpeechText = true;
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
        case 'FOUR':
          this.updateBixby('wipeoff');
          this.showSpeechText = false;
          break;
        case 'FIVE':
          this.updateBixby('standby1');
          break;
        case 'SIX':
         this.updateBixby('standby2');
          break;
      }
    },
    handleAnimation(anim) {
      this.anim = anim;
      this.anim.addEventListener('complete', this.onCompleteAnim)
    },
    onCompleteAnim() {
      if(this.bixbyState === 'wipeoff') {
          this.updateBixby('reveal');
          this.showResult = true;
      }
    },
    changeAnimation(btn) {
      this.defaultOptions.animationData = undefined;
      this.$nextTick(() => {
        console.log(this.bixbyState, this.lottie);
        this.$set(this.defaultOptions, 'animationData', this.lottie[this.bixbyState].data.animationData);
      });
    },
  },
  data() {
    return {
      text: '',
      showResult: false,
      showSpeechText: false,
      defaultOptions: {
        animationData: undefined,
        loop: false,
      },
    };
  },
  watch: {
    bixbyState(value, old) {
      if (value !== '') {
        this.changeAnimation(value);
      }
    },
  },
  components: {
    lottie,
    result,
    speechText,
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
  .bixby-lottie {
    position: absolute;
    z-index:99;
  }
  .bixby-speech-text {
    position: absolute;
    bottom: 0 * $s;
    width: 100%;
    height: 250 * $s;
    font-size: 90 * $s;
    color: white;
    padding-left: 100 * $s;
    font-family: SamsungOneUI400;
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
  }
}
</style>
