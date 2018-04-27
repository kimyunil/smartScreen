<template>
  <div id="app">
    <smartscreen/>
    <!-- <videosource/> -->
  </div>
</template>

<script>
import smartscreen from './components/smartscreen';
// import videosource from './components/common/videoSource';


export default {
  name: 'App',
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
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
}
</style>
