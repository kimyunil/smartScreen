<template>
  <div class="splash-screen">
    <div class="bg" :style="{'background-image': `url(${details.splashBG})`}">
    </div>
  </div>
</template>
<script>
export default {
  name: 'splash',
  props: {
    details: {
      type: Object,
      require: true,
    },
  },
  mounted() {
    this.timeoutID = setTimeout(() => {
      this.$emit('exit', { from: 'splash' });
    }, 3000);
  },
  data() {
    return {
      timeoutID: null,
    };
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
.splash-screen {
  position: absolute;
  width: 100%;
  height: 100%;
  background: grey;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
</style>
