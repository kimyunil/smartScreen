<template>
  <div class="poster">
    <img :src="item.img"/>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  mounted() {
  },
  destroyed() {
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../../mixins/scss/main';
.poster {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    height: 100%;
  }
}
</style>
