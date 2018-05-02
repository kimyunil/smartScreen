<template>
    <div class="result">
      <div class="h-list">
        <div class="list">
          <div v-for="item in resultData.dataList" class="item" :key="item.url">
            <div class="item-wrapper" :style="{'background-image': `url(${item.url})`}">
            </div>
            <div class="title" v-if="item.title">{{item.title}}</div>
            <div class="sub-title" v-if="item.subtitle">{{item.subtitle}}</div>
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
      margin-top: 50 * $s;
      .item {
        position: relative;
        width: auto;
        height: auto;
        .sub-title {
          font-family: Helvetica;
          font-size: 25 * $s;
          text-align: left;
          margin-top: 10 * $s;
          color: rgba(216,216,216, 0.4);
        }
        .title {
          font-family: Helvetica;
          font-size: 35 * $s;
          text-align: left;
          margin-top: 20 * $s;
          color: white;
        }
      }
    }
  }
  &.movies {
    .item {
        margin-right: 18 * $s;
      .item-wrapper {
        position: relative;
        width: 267 * $s;
        height: 400 * $s;
        background-size: 100% 100%;
        img {
          height: 100%;
        }
      }
    }
  }
    &.music {
    .item {
       margin-right: 95 * $s;
      .item-wrapper {
        position: relative;
        width: 269 * $s;
        height: 269 * $s; //269 - 150 sticking to bixby
        background-size: 100% 100%;
        img {
          height: 100%;
        }
      }
    }
  }
  .drivers {
    // position: relative;
    // height: 140 * $s;
  }
 }

</style>
