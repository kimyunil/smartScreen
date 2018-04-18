<template>
  <div class="tile">
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
.tile {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
