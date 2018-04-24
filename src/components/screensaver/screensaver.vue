<template>
  <div class="screensaver" :class="{'enabled': powerEnabled}">
    <div class="backdrop">
    </div>
      <div class="time">
          {{time}}
      </div>
      <div class="weather">
        <span v-if="info.weather !== null">
          {{info.weather.condition.text}}
        </span>
      </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapActions, mapState, mapMutations } from 'vuex';
import Messages from '../../services/Messages';

export default {
  name: 'screensaver',
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.time = moment().format('LT');
    this.interval = setInterval(() => {
      this.time = moment().format('LT');
    }, 1000);
    Messages.$on('horizon-weather.forecast', this.handleForecast);
    Messages.send('horizon-weather.get-forecast', {
      place: 'Mountain View',
    });
  },
  computed: {
    ...mapState([
      'info',
    ]),
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
    clearTimeout(this.interval);
    clearTimeout(this.timeOut);
  },
  methods: {
    ...mapActions({
      switch_comp: 'SWITCH_COMPONENT',
    }),
    ...mapMutations({
      set_weather: 'SET_WEATHER',
    }),
    handleForecast(param) {
      this.set_weather(param);
    },
    reset() {
      clearTimeout(this.interval);
      clearTimeout(this.timeOut);
      this.powerEnabled = false;
    },
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'POWER':
          if (!this.powerEnabled) {
            this.powerEnabled = true;
            this.timeOut = setTimeout(() => {
              this.powerEnabled = false;
            }, 10000);
          } else if (this.powerEnabled) {
            // switch Component
            this.reset();
            this.switch_comp({ name: 'home' });
          }
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      interval: null,
      timeOut: null,
      weather: null,
      powerEnabled: false,
      time: '',
    };
  },
  watch: {
  },
  components: {
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';
.screensaver {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background-size: 100%;
  .backdrop {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.4;
    width: 100%;
    height: 100%;
    transition: opacity 0.4s ease;
    background: rgba(0,0,0,0.4);
  }
  .time {
    position: absolute;
    top: 0;
    width: auto;
    height:auto;
    padding: 50 * $s;
    font-size: 120 * $s;
    color:white;
    font-family: SamsungOneUI600;
  }
  .weather {
    position: absolute;
    top: 200 * $s;
    // top: relative;
    width: auto;
    height:auto;
    padding: 50 * $s;
    left: 50 * $s;
    font-size: 60 * $s;
    color:white;
    font-family: SamsungOneUI600;
  }
  &.enabled {
    .backdrop {
      opacity: 0;
    }
    .time {
      color: grey;
    }
  }
}
</style>
