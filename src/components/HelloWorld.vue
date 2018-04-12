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
import { mapState } from 'vuex';

export default {
  name: 'demo',
  computed: {
    ...mapState('animation', [
      'lottie',
    ]),
  },
  data () {
    return {
      btns: [ 'invokeData', 'listenData', 'thinkData', 'wipeoffData', 'revealData', 'standby1Data', 'standby2Data', ],
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
        console.log(this.lottie[btn].animationData);
        Vue.set(this.defaultOptions, 'animationData', this.lottie[btn].data.animationData);
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
