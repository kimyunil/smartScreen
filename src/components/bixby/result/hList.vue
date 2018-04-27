<template>
    <div class="result">
      <div class="h-list">
        <div class="list">
          <div v-for="item in resultData.dataList" class="item" :key="item.url" :style="{'background-image': `url(${item.url})`}">
          </div>
        </div>
      </div>
      <div class="drivers">
      </div>
    </div>
</template>
<script>
export default {
  mounted() {
  },
  props: {
    resultData: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
 @import '../../../mixins/scss/main';
 .result {
    position: relative;
    width: 100%;
    bottom: 0;
    height: auto;
    overflow: hidden;
  .h-list {
    position: relative;
    width: 100%;
    bottom: 0;
    height: auto;
    overflow: hidden;
    .list {
      position: relative;
      display: flex;
      height: auto;
      left: 80 * $s;
      top: 50 * $s;
      .item {
        position: relative;
        width: 267 * $s;
        height: 400 * $s;
        margin-bottom: 60 * $s;
        background: grey;
        img {
          height: 100%;
        }
        &:not(:first-child) {
           margin-left: 10 * $s;
        }
      }
    }
  }
  .drivers {
    position: relative;
    height: 140 * $s;
  }
 }

</style>
