<template>
  <div class="vevo-wrapper">
    <transition name="fade">
      <splash v-if="showSplash" :details="details" @exit="exitCB"></splash>
    </transition>
    <div class="vevo-content" v-if="name === 'player' && !showSplash">
      <player :key="'vevo'" :active="!showSplash&&!killPlayer" class="vevo-content" :name="'vevo'">
      </player>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import splash from '../common/splash';
import player from '../common/player';
import Messages from '../../services/Messages';

export default {
  name: 'vevo',
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
    Messages.$off('button_down', this.handleKeyDown);
  },
  data() {
    return {
      showSplash: true,
      killPlayer: false,
      name: 'player',
      details: {
        splashBG: '/static/Images/app/vevo.png',
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
        this.setPlayer({ url: '/resources/videos/smartscreen/new/sasha_sloan-normal.mp4' });
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
.vevo-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  .vevo-content {
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
