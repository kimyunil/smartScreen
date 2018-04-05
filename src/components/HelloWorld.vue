<template>
  <div>
    <lottie :options="defaultOptions" v-on:animCreated="handleAnimation"></lottie>
  </div>
</template>

<script>
import lottie from './lottie';
import animationData from '../animation/data';

export default {
  name: 'demo',
  data () {
    return {
      defaultOptions: {
        animationData,
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
  },
};
</script>
