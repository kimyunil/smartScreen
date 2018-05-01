<template>
  <div class="screensaver" :class="{'enabled': powerEnabled, 'blur': !active}">
    <div class="backdrop">
    </div>
      <div class="time">
          {{time}}
      </div>
      <div class="weather" v-if="info.todays !== null" :style="{'background-image': `url('${info.todays.img}')`}">
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
    window.getWeatherImg = this.getWeatherImg;
    Messages.$on('button_down', this.handleKeyDown);
    this.time = moment().format('LT');
    this.interval = setInterval(() => {
      this.time = moment().format('LT');
    }, 1000);
    Messages.$on('horizon-weather.forecast', this.handleForecast);
    Messages.$on('horizon-news.get-articles-result', this.getArticle);
    // Messages.send('horizon-news.get-articles', {
    //   sources: ['bbc-news'],
    //   shuffle: true,
    //   maxSourceResults: 5,
    // });
    Messages.send('horizon-weather.get-forecast', {
      place: 'Mountain View',
    });
    Messages.send('horizon-weather.get-forecast', {
      place: 'portland',
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
      todayWeather: 'SET_TODAY_WEATHER',
      set_port_weather: 'SET_PORT_WEATHER',
    }),
    setTodaysWeather(condition) {
      const wToday = {};
      wToday.temp = condition.temp;
      wToday.img = `/static/Images/results/weather/${window.getWeatherImg(parseInt(condition.code, 10))}.png`;
      this.todayWeather(wToday);
    },
    handleForecast(param) {
      if (param.location.city.toLowerCase() === 'mountain view') {
        this.set_weather(param);
        this.setTodaysWeather(param.condition);
      } else if (param.location.city.toLowerCase() === 'portland') {
        this.set_port_weather(param);
      }
    },
    getWeatherImg(code) {
      /* eslint-disable no-tabs */
      let img = '';
      switch (code) {
        case 31: // clear (night)
          img = 'clear';
          break;
        case 27: // mostly cloudy (night)
        case 28: // mostly cloudy (day)
        case 26: // cloudy
          img = 'cloudy';
          break;
        case 20: // foggy
          img = 'fog';
          break;
        case 6: // mixed rain and sleet
        case 7: // mixed snow and sleet
        case 18: // sleet
        case 25: // cold
          img = 'ice, sleet, freezing rain';
          break;
        case 11: // showers
        case 12: // showers
          img = 'shower';
          break;
        case 44: // partly cloudy
        case 29: // partly cloudy (night)
        case 30: // partly cloudy (day)
          img = 'partly cloudy';
          break;
        case 37: // isolated thunderstorms
        case 38: // scattered thunderstorms
        case 39: // scattered thunderstorms
        case 47: // isolated thundershowers
        case 3:	// severe thunderstorms
        case 4:	// thunderstorms
          img = 'thunderstorm';
          break;
        case 5:	// mixed rain and snow
          img = 'rain and snow mixed';
          break;
        case 13: // snow flurries
        case 14: // light snow showers
        case 15: // blowing snow
        case 43: // heavy snow
        case 16: // snow
          img = 'snow';
          break;
        case 32: // sunny
          img = 'sunny';
          break;
        case 41: // heavy snow
        case 42: // scattered snow showers
        case 35: // mixed rain and hail
          img = 'rain and snow mixed';
          break;
        case 2:	// hurricane
        case 24: // windy
          img = 'windy';
          break;
        case 8: // freezing drizzle
        case 17: // hail
        case 45: // thundershowers
        case 46: // snow showers
        case 10: // freezing rain
          img = 'thundershowers with hail';
          break;
        case 9: // drizzle
          img = 'rain';
          break;
        case 33: // fair (night)
        case 34: // fair (day)
        case 36: // hot
          img = 'sunny';
          break;
        case 19://  dust
        case 21://  haze
        case 22://  smoky
        case 23://  blustery
          img = 'sandstorm';
          break;
        case 0: // tornado
        case 1:	// tropical storm
          img = 'thundershowers with hail';
          break;
        default:
          break;
      }
      return img;
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
          this.switch_comp({ name: 'home' });
          // if (!this.powerEnabled) {
          //   this.powerEnabled = true;
          //   this.timeOut = setTimeout(() => {
          //     this.powerEnabled = false;
          //   }, 10000);
          // } else if (this.powerEnabled) {
          //   // switch Component
          //   this.reset();
          //   this.switch_comp({ name: 'home' });
          // }
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
      powerEnabled: true,
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
