<template>
  <div class="bm" ref="wrapper"></div>
</template>

<script>
import lottie from 'lottie-web';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.wrapper,
      renderer: 'svg',
      loop: this.options.loop,
      autoplay: true,
      animationData: this.options.animationData,
    });
    this.$emit('animCreated', this.anim);
  },
};
</script>

<style scoped lang="scss">
.bm {
  width: 100%;
  height: 100%;
  display:block;
  overflow: hidden;
  transform: translate3d(0,0,0);
  text-align: center;
  opacity: 1;
}
</style>
