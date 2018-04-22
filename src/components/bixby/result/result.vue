<template>
  <div class="result-data">
    <component v-if="mountResult" :is="result.template" :data="result"> </component>
  </div>
</template>
<script>

import hList from './hList';
import { mapState } from 'vuex';

export default {
  mounted() {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('result', [
      'result',
    ]),
    mountResult() {
      if (this.result && this.result.template) {
        return true;
      }
      return false;
    },
  },
  methods: {
    handleAnimation() {
      console.log('anima:::');
    },
  },
  components: {
    hList,
  },
};
</script>
<style scoped lang="scss">
  @import '../../mixins/scss/main';
  .result-data {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

  }
</style>
