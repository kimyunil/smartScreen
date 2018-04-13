<template>
  <div class="result-data">
    <component :is="comps"> </component>
  </div>
</template>
<script>

import hList from './hList';
import { mapState } from 'vuex';

export default {
  mounted() {
    this.comps = 'hList';
  },
  data() {
    return {
      comps: '',
      defaultOptions: {
        animationData: undefined,
        loop: false,
      },
    };
  },
  methods: {
    handleAnimation() {
      console.log('anima:::');
    },
  },
  computed: {
    ...mapState('animation', [
      'lottie',
    ]),
  },
  components: {
    hList,
  },
};
</script>
<style scoped lang="scss">
  @import '../../../mixins/scss/main';
  .result-data {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

  }
</style>
