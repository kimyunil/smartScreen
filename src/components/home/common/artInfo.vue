<template>
  <div class="art-info">
    <div class="time-weat-info">
      <div class="time">
          {{time}}
      </div>
      <div class="weather" v-if="info.todays !== null" :style="{'background-image': `url('${info.todays.img}')`}">
      </div>
    </div>
    <div class="infocard">
    </div>
    <div class="img-container" :style='{"background-image": `url(${img})`}'>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  mounted() {
    this.time = moment().format('LT');
    this.interval = setInterval(() => {
      this.time = moment().format('LT');
    }, 1000);
  },
  props: {
    img: {
      type: String,
    },
  },
  destroyed() {
    clearTimeout(this.interval);
  },
  data() {
    return {
      interval: null,
      time: 0,
    };
  },
  computed: {
    ...mapState([
      'info',
    ]),
  },
};
</script>
<style lang="scss" scoped>
@import '../../../mixins/scss/main';

.art-info {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/static/Images/background.png');
  background-size: 100%;
  .time-weat-info {
    .time {
      position: absolute;
      top: 0;
      width: auto;
      height:auto;
      padding: 50 * $s;
      font-size: 120 * $s;
      color:white;
      font-family: SamsungOneUI600;
      transition: color 0.3s ease;
    }
    .weather {
      position: absolute;
      top: 200 * $s;
      // top: relative;
      width: 130 * $s;
      height: 130  *$s;
      background-size: 100% 100%;
      padding: 50 * $s;
      left: 50 * $s;
      font-size: 60 * $s;
      color:white;
      transition: color 0.3s ease;
      font-family: SamsungOneUI600;
    }
  }
  .img-container {
    right: 120 * $s;
    width: 930 * $s;
    height: 100%;
    position: absolute;
    background-size: 800 * $s 525 * $s;
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>
