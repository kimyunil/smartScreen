<template>
<div class="info">
  <template v-if="resultData.data.type==='everest'">
    <div class="everest-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div>
  </template>
  <template v-if="resultData.data.type==='fitbit'">
    <div class="fitbit-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div>
  </template>
   <template v-if="resultData.data.type==='lostmovie'">
    <div class="lostin-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div>
  </template>
  <template v-if="resultData.data.type==='measure'">
    <div class="measure-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div>
  </template>
  <template v-if="resultData.data.type==='weather'">
    <div class="weather-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div>
  </template>
</div>
</template>
<script>
export default {
  props: {
    resultData: {
      type: Object,
      require: true,
    },
  },
};
</script>
<style scoped lang="scss">
 @import '../../../mixins/scss/main';
.info {
  position: relative;
  width: 100%;
  height: auto;
  .bgImg {
    position: relative;
    width: 100%;
    height: 450 * $s;
    background-position: top left;
    background-size: contain;
    background-repeat: no-repeat;
    background-size: 100%;
    left: 80 * $s;
    margin-top: 90 * $s;
    &.everest-img {
      background-position: center;
      background-size: 1400 * $s 240 * $s;
    }
    &.measure-img {
      background-position: center;
      background-size: 603 * $s 168 * $s;
    }
    &.lostin-img  {
      background-size: 940 * $s 360 * $s;
      height: 590 * $s;
    }
  }
}
</style>
