<template>
  <div class="thumbnail" :style="{'background-image': `url(${item.details.img})`}" :class="[item.contentType]">
  <div class="icon-label" :style="[{'background-image': `url(${item.details.logo})`},dim(item.details.dim)]" v-if="item.contentType !== 'iot'"></div>
    <template v-if="item.contentType === 'iot-weather'">
      <div class="iot-container" v-if="weather === null">
        <div class="icon">
          <img :src="item.details.icon"/>
        </div>
        <div class="info">
          <div class="measure">
            {{item.details.measure}}<span>&deg;C</span>
            </div>
            <div class="place">
            {{item.details.place}}
            </div>
          </div>
      </div>
      <div class="iot-container"  v-else>
        <div class="icon">
          <img :src="weather.img"/>
        </div>
        <div class="info">
          <div class="measure">
            {{weather.temp}}<span>&deg;C</span>
            </div>
            <div class="place">
            {{item.details.place}}
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="item.contentType.indexOf('iot') !== -1">
      <div class="iot-container">
        <div class="icon">
          <img :src="item.details.icon"/>
        </div>
        <div class="info">
          <div class="measure">
            {{item.details.measure}}<span v-if="item.contentType === 'iot-temp'">&deg;C</span>
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
    <template v-if="item.key==='spotify'">
      <div class="seekbar">
        <div class="progress" :style="{'width': `${item.elapsedTime/item.total * 100}%`}">
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      weather: state => state.info.todays,
    }),
  },
  methods: {
    dim(d) {
      if (!d) return {};
      return {
        width: `${(d.w * 100) / 1920}vw`,
        height: `${(d.h * 100) / 1920}vw`,
      };
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
  .seekbar {
    background: red;
    width: 87%;
    height: 8 * $s;
    margin:0 15 * $s;
    position: absolute;
    bottom: 20 * $s;
    border-radius:20 * $s;
    overflow: hidden;
    background: rgba(255,255,255,0.1);
    .progress {
      position: absolute;
      left: 0;
      width: 20%;
      height: 100%;
      background: white;
    }
  }
  .icon-label {
    position: absolute;
    right: 5%;
    bottom: 30 * $s;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
