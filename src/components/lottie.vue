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
  mounted () {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bm {
  background-color:#000;
  width: 1000px;
  height: 540px;
  display:block;
  overflow: hidden;
  transform: translate3d(0,0,0);
  text-align: center;
  opacity: 1;
}
</style>
