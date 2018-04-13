<template>
  <div class="source">
    <video :src="config.url" :autoplay="config.autoplay" class="video" :loop="config.loop"></video>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'videoSource',
  mounted() {
    console.log(this.config);
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
