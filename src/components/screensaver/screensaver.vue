<template>
  <div class="screensaver" :class="{'enabled': powerEnabled, 'blur': !active}">
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
    Messages.$on('horizon-news.get-articles-result', this.getArticle);
    Messages.send('horizon-news.get-articles', {
      sources: ['bbc-news'],
      shuffle: true,
      maxSourceResults: 5,
    });
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
    Messages.$off('horizon-weather.forecast', this.handleForecast);
    Messages.$off('horizon-news.get-articles-result', this.getArticle);
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
    getArticle() {
      console.log('getArticle');
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
  // background-image: url('./static/Images/background.png');
  .backdrop {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.4;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,1);
    transition: opacity 0.4s ease;
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
    transition: color 0.3s ease;
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
    transition: color 0.3s ease;
    font-family: SamsungOneUI600;
  }
  &.enabled {
    .backdrop {
      opacity: 0;
    }
    .weather {
      color: grey;
    }
    .time {
      color: grey;
    }
  }
  &.blur {
    .backdrop {
      opacity: 0;
    }
    .weather {
      opacity: 0;
    }
    .time {
      opacity: 0;
    }
  }
}
</style>
