<template>
  <div class="thumbnail" :style="{'background-image': `url(${item.img})`}">
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
.thumbnail {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
}
</style>
