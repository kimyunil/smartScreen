<template>
  <div class="source">
    <video :src="selectedSourceURL" :autoplay="false" class="video" :loop="true"></video>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'videoSource',
  mounted() {
  },
  props: ['config'],
  computed: {
    ...mapState('source', [
      'selectedSourceURL',
    ]),
  },
};
</script>
<style lang="scss" scoped>

.video {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;

}
</style>
