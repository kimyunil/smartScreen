<template>
  <div class="home">
    <div class="dashboard">
      <div class="header">
        <!-- <basic-button class='watch'
              :focused="true">
              {{ item.text }}
            </basic-button> -->
      </div>
      <div class="grid-container">
        <div class="grid">
            <div class="health-tile grid-item" :class="{'shrink': shrink}">
              <tile :slideData="GET_DATA('health')"/>
            </div>
            <div class="education-tile grid-item">
              <tile :slideData="GET_DATA('education')"/>
            </div>
            <div class="entertainment-tile grid-item">
              <thumbnail :slideData="GET_DATA('game')"/>
            </div>
            <div class="game-tile grid-item">
              <thumbnail :slideData="GET_DATA('entertainment')"/>
            </div>
        </div>
      </div>
    </div>
    <div class="grid">
    </div>
  </div>
</template>
<script>
// import Lumi from '@samsung/lumi';
// const { BasicButton, } = Lumi.Ui;
import tile from './subcomps/tile';
import thumbnail from './subcomps/thumbnail';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('home', [
      'GET_DATA',
    ]),
  },
  data() {
    return {
      shrink: false,
    };
  },
  components: {
    // BasicButton,
    tile,
    thumbnail,
  },
};
</script>
<style scoped lang="scss">
@import '../../mixins/scss/main';
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-image: url('/static/bg.png');
  background-color: grey;
  background-size: 100%;
  background-repeat: no-repeat;
  .dashboard {
    position: relative;
    width: 100%;
    height: 1080 * $s;
    .header {
      position: absolute;
      height: 150 * $s;
      width: 100%;
    }
    .grid-container {
      position: absolute;
      width: 100%;
      height: 940 * $s;
      overflow: hidden;
      .grid{
         position: relative;
         width: 100%;
         display: grid;
         padding: 20 * $s;
         grid-row-gap: 25 * $s;
          grid-column-gap: 15 * $s;
         grid-template-columns: 1fr 1fr 1fr 1fr;
         height: 100%;
         .health-tile {
          position: relative;
           grid-row: 1 / span 2;
           grid-column: 1 / span 2;
         }
         .education-tile {
          position: relative;
           grid-row: 1 / span 2;
         }
         .game-tile {
          position: relative;
           grid-row: 2 / 2;
         }
         .entertainment-tile {
          position: relative;
           grid-row: 1 / 1;
         }
         .grid-item {
           position: relative;
          &.shrink {
            padding: 20 * $s;
          }
         }
      }
    }
  }
}
</style>
