<template>
  <div id="app">
    <smartscreen v-show="setup" :active="setup"/>
    <!-- <videosource/> -->
    <div class="screenshot" v-show="!setup || localsetup">
      <div class="page" :style="{'background-image': `url('${screens[page]}')`}">
        <div class="screen" v-show="page === 0" :style="{'background-image': `url('${screens[0]}')`}"></div>
        <div class="screen" v-show="page === 1" :style="{'background-image': `url('${screens[1]}')`}"></div>
      </div>
      <!-- <div class="power" v-else></div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import smartscreen from './components/smartscreen';
import Messages from './services/Messages';
import globalListener from './listeners/index';
// import videosource from './components/common/videoSource';


export default {
  name: 'App',
  mounted() {
    globalListener.init();
    Messages.$on('smartscreen.setup', this.setupScreen);
    Messages.$on('button_down', this.handleButton);
    Messages.send('smartscreen.setupscreen', { from: 'smartscreen' });
    if (window.sessionStorage.getItem('oobe') !== null) {
      this.setUpcomplete(true);
    }
  },
  destroyed() {
    globalListener.destroyed();
    Messages.$off('smartscreen.setup', this.setupScreen);
  },
  data() {
    return {
      setupInProcess: true,
      page: 0,
      localsetup: false,
      screens: ['/static/Images/tv setup 01.png', '/static/Images/tv setup 02.png'],
    };
  },
  computed: {
    ...mapState([
      'setup',
    ]),
  },
  methods: {
    ...mapActions({
      setUpcomplete: 'COMPLETE_SETUP',
      switch_comp: 'SWITCH_COMPONENT',
    }),
    setupScreen(param) {
      console.log(param);
      if (param.page === 'home' || param.page === 'page0') {
        this.page = 0;
        this.setupInProcess = true;
      } else if (param.page === 'page8') {
        window.sessionStorage.setItem('oobe', 'true');
        // document.cookie = "oobe=true";
        this.switch_comp({ replace: true, name: 'home' });
        this.setUpcomplete(true);
        this.page = 0;
        this.setupInProcess = false;
      } else {
        this.page = 1;
        this.setupInProcess = true;
      }
    },
    handleButton(param) {
      console.log('param key: ', param);
      if (param === 'PLAY' && this.setupInProcess) {
        window.sessionStorage.setItem('oobe', 'true');
        this.setupInProcess = false;
        this.switch_comp({ replace: true, name: 'home' });
        this.setUpcomplete(true);
        this.page = 0;
      }
      if (param === 'NINE') {
        if (window.sessionStorage.getItem('oobe') !== null) {
          window.sessionStorage.getItem('oobe');
        }
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
      // background: black;
      background: transparent;
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
