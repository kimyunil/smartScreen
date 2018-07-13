<template>
  <div class="ytplayer-wrapper">
    <transition name="fade">
      <splash v-if="showSplash" :details="details" @exit="exitCB"></splash>
      <player v-else :active="!showSplash&&active" class="ytplayer-content" :name="'ytplayer'">
      </player>
    </transition>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import splash from '../common/splash';
import player from '../common/player';
import Messages from '../../services/Messages';

export default {
  name: 'ytplayer',
  created() {
  },
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    setTimeout(() => {
      // this.showSplash = false;
      // this.setPlayer({ url: '/resources/videos/smartscreen/Movies_2_COCO.mp4' });
    }, 3000);
  },
  destroyed() {
    // hack
    this.$el.querySelector('video').muted = true;
    setTimeout(() => {
      this.$el.querySelector('video').src = '';
    }, 1000);
    Messages.$off('button_down', this.handleKeyDown);
  },
  data() {
    return {
      showSplash: true,
      details: {
        splashBG: '/static/Images/app/yt.png',
      },
    };
  },
  methods: {
    ...mapMutations('source', {
      setPlayer: 'UPDATE_PLAYER',
    }),
    exitCB(param) {
      console.log('player:::');
      if (param.from === 'splash') {
        this.showSplash = false;
        this.setPlayer({ url: '/resources/videos/smartscreen/Movies_2_COCO.mp4' });
      }
    },
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'UP':
          break;
        case 'RIGHT':
          break;
        case 'DOWN':
          break;
        case 'LEFT':
          break;
        case 'BACK':
          break;
        default:
          break;
      }
    },
  },
  components: {
    splash,
    player,
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';
.ytplayer-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  .ytplayer-content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s ease;
    &.bixby {
      transition: none;
    }
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
