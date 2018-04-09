<template>
  <div>
    <h1 class="text">Animation displays below</h1>
    <lottie v-if="defaultOptions.animationData !== undefined" :options="defaultOptions" v-on:animCreated="handleAnimation"></lottie>
    <div class="btns">
      <button v-for="btn in btns" @click.prevent="changeAnimation(btn)" :key="btn">{{ btn }}</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import lottie from './lottie';
import invokeData from '../animation/01_line_invoke';
import listenData from '../animation/02_line_listening';
import thinkData from '../animation/03_line_thinking';
import wipeoffData from '../animation/04_line_wipe_off';
import revealData from '../animation/05_line_reveal';
import standby1Data from '../animation/06_line_standby_pulse_1';
import standby2Data from '../animation/07_line_standby_pulse_2';

export default {
  name: 'demo',
  data () {
    return {
      btns: ['invokeData', 'listenData', 'thinkData', 'wipeoffData', 'revealData', 'standby1Data', 'standby2Data'],
      data: {
        invokeData,
        listenData,
        thinkData,
        wipeoffData,
        revealData,
        standby1Data,
        standby2Data,
      },
      defaultOptions: {
        animationData: undefined,
        loop: false,
      },
    };
  },
  components: {
    lottie,
  },
  methods: {
    handleAnimation (anim) {
      this.anim = anim;
    },
    changeAnimation (btn) {
      this.defaultOptions.animationData = undefined;
      Vue.nextTick(() => {
        Vue.set(this.defaultOptions, 'animationData', this.data[btn]);
      });
    },
  },
};
</script>

<style scoped>
.text {
  color: aqua;
}

.btns {
  button {
    display: inline-block;
    color: #000;
  }
}
</style>
