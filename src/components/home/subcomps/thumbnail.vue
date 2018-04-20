<template>
  <div class="thumbnail" :style="{'background-image': `url(${item.img})`}" :class="[item.contentType]">
   <img class="icon-label" :src="item.logo" v-if="item.contentType !== 'iot'"/>
   <template v-if="item.contentType === 'iot'">
     <div class="iot-container">
       <div class="icon">
         <img :src="item.details.icon"/>
      </div>
       <div class="info">
        <div class="measure">
          {{item.details.measure}}
          </div>
          <div class="place">
          {{item.details.place}}
          </div>
        </div>
     </div>
   </template>
   <template v-if="item.details.bottomText">
    <div class="bottom-footer" :class="[item.contentType]">
      <div class="text simple">
        <template v-for="text in item.details.bottomText.split('$')"> 
        <div :key="text">{{text}}</div>
        </template>
      </div>
    </div>
   </template>
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
  .iot-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    border-top: 2px solid grey;
    border-bottom: 2px solid grey;
    justify-content: center;
    align-items: center;
    .icon {
      position: absolute;
      top: 40 * $s;
      height: 40%;
      width: 100%;
      text-align: center;
      img {
        height: 100%;
      }
    }
    .info {
      position: absolute;
      bottom: 11%;
      height: 120 * $s;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .measure {
        font-family: Helvetica;
        font-size: 40 * $s;
        position: relative;
        color: black;
      }
      .place {
        font-family: Helvetica;
        font-size: 30 * $s;
        color: black;
      }
    }
  }
  .bottom-footer {
    position: absolute;
    bottom: 0px;
    left: 30 * $s;
    margin-bottom: 30 * $s;
   .text {
      font-family: Helvetica;
      font-size: 36 * $s;
      text-align: left;
      color: white;
    }
    &.cp-type-1 {
      margin-bottom: 70 * $s;
    }
  }
  .icon-label {
    position: absolute;
    right: 5%;
    bottom: 30 * $s;
  }
}
</style>
