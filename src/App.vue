<template>
  <div id="app">
    <smartscreen v-show="setup" :active="setup"/>
    <!-- <videosource/> -->
    <div class="screenshot" v-show="!setup">
      <div class="page" v-if="page !== -1" :style="{'background-image': `url('${screens[page]}')`}">
        <div class="screen" v-show="page === 0" :style="{'background-image': `url('${screens[0]}')`}"></div>
        <div class="screen" v-show="page === 1" :style="{'background-image': `url('${screens[1]}')`}"></div>
      </div>
      <div class="power" v-else></div>
    </div>
  </div>
</template>

<script>
import smartscreen from './components/smartscreen';
import Messages from './services/Messages';
// import videosource from './components/common/videoSource';


export default {
  name: 'App',
  mounted() {
    Messages.$on('smartscreen.setup', this.setupScreen);
    // Messages.send('text-to-speech.say', 'Sorry, I didn\'t get that');
  },
  destroyed() {
    Messages.$off('smartscreen.setup', this.setupScreen);
  },
  data() {
    return {
      page: -1,
      setup: true,
      screens: ['/static/Images/tv setup 01.png', '/static/Images/tv setup 02.png'],
    };
  },
  methods: {
    setupScreen(param) {
      console.log(param);
      if (param.page === 0) {
        this.page = 0;
      } else if (param.page === 8) {
        this.setup = true;
        this.page = 0;
      } else {
        this.page = 1;
      }
    },
  },
  components: {
    smartscreen,
    // videosource,
  },
};
</script>

<style scoped lang="scss">
@import 'mixins/scss/main';

#app {
  position: relative;
  width: 1920 * $s;
  height: 1080 * $s;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  .screenshot {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .power {
      position: absolute;
      width: 100%;
      height: 100%;
      background: black;
    }
    .page {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
    }
  }
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
}
</style>
