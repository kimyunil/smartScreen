<template>
  <transition appear name="slide">
    <div class="result-container">
      <div class="h-list">
        <div class="head">
          <template v-for="item in data.heading">
            <span :key="item" :class="(item.split(':').length > 1 ? item.split(':')[0] :'') ">
              {{(item.split(':').length > 1 ? item.split(':')[1] : item.split(':')[0])}}
            </span>
          </template>
        </div>
        <div class="list">
          <div v-for="item in data.result" class="item" :key="item">
              <img :src="data[item].url"/>
          </div>
        </div>
      </div>
      </div>
  </transition>
</template>
<script>
export default {
  mounted() {
    // console.log(this.data);
  },
  props: ['data'],
};
</script>
<style scoped lang="scss">
 @import '../../mixins/scss/main';
 .result-container {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 670 * $s;
    overflow: hidden;
  .h-list {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 670 * $s;
    overflow: hidden;
    .head {
        position: relative;
        margin-top: 135 * $s;
        font-size: 48 * $s;
        line-height: 48 * $s;
        padding-left: 78 * $s;
        color: white;
        font-family: SamsungOneUI200;
      .b-text {
        font-family: SamsungOneUI400;
      }
    }
    .list {
      position: relative;
      display: flex;
      height: auto;
      left: 75 * $s;
      top: 21 * $s;
      .item {
        position: relative;
        width: 800 * $s;
        height: 385 * $s;
        img {
          height: 100%;
        }
        &:not(:first-child) {
           margin-left: 10px;
        }
      }
    }
  }
   &.slide-enter {
     transform: translateY(410px);
     .h-list {
       transform: translateY(-110px);
     }
   }
    &.slide-enter-to {
     transform: translateY(0);
     .h-list {
       transform: translateY(0px);
     }
   }
   &.slide-enter-active {
     .h-list {
       transition: transform 0.5s;
     }
     transition: transform 0.5s;
   }
 }

</style>
