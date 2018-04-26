<template>
    <div class="result">
      <div class="h-list">
        <!-- <div class="head">
          <template v-for="item in data.heading">
            <span :key="item" :class="(item.split(':').length > 1 ? item.split(':')[0] :'') ">
              {{(item.split(':').length > 1 ? item.split(':')[1] : item.split(':')[0])}}
            </span>
          </template>
        </div> -->
        <div class="list">
          <div v-for="item in data.result" class="item" :key="item">
              <img :src="data[item].url"/>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  mounted() {
  },
  props: ['data'],
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
    .head {
        position: relative;
        margin-top: 135 * $s;
        font-size: 48 * $s;
        line-height: 48 * $s;
        padding-left: 78 * $s;
        color: white;
        text-align: left;
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
        margin-bottom: 60 * $s;
        background: grey;
        img {
          height: 100%;
        }
        &:not(:first-child) {
           margin-left: 10px;
        }
      }
    }
  }
 }

</style>
