<template>
<div class="info" :class="[resultData.data.type]">
  <template v-if="resultData.data.type==='everest'">
    <!-- <div class="everest-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div> -->
  </template>
  <template v-if="resultData.data.type==='fitbit'">
    <div class="fitbit-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div>
  </template>
   <template v-if="resultData.data.type==='lostmovie'">
    <!-- <div class="lostin-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div> -->
  </template>
  <template v-if="resultData.data.type==='measure'">
    <!-- <div class="measure-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div> -->
  </template>
  <template v-if="resultData.data.type==='weather'">
    <div class="weather-img bgImg" :style="{'background-image': `url(${resultData.data.img})`}">
    </div>
  </template>
  <drivers :theme="'dark'" :sayWord = "'Try Saying'" :drivers="resultData.data.suggestions" :toggle="true"></drivers>
</div>
</template>
<script>
import drivers from '../../common/drivers';

export default {
  mounted() {
    console.log(this.resultData.suggestions);
  },
  props: {
    resultData: {
      type: Object,
      require: true,
    },
  },
  components: {
    drivers,
  },
};
</script>
<style scoped lang="scss">
 @import '../../../mixins/scss/main';
.info {
  position: relative;
  width: 100%;
  height: 150 * $s;
  &.lostmovie {
     height: 640 * $s;
  }
  &.weather {
    height: 540 * $s;
  }
  &.fitbit {
    height: 540 * $s;
  }
  .bgImg {
    position: relative;
    width: calc(100% - #{80 * $s});
    height: 100%;
    top: 100 * $s;
    background-repeat: no-repeat;
    background-size: 100%;
    left: 80 * $s;
    &.everest-img {
      background-position: left top;
      background-size: 1400 * $s 240 * $s;
    }
    &.measure-img {
      background-position: left top;
      background-size: 603 * $s 168 * $s;
    }
    &.lostin-img  {
      background-size: 940 * $s 360 * $s;
    }
  }
}
</style>
