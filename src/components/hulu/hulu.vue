<template>
  <div class="hulu-wrapper">
    <transition name="fade">
      <splash v-if="showSplash" :details="hulu.splash" @exit="exitCB"></splash>
      <component v-else :is="topView" :active="!showSplash&&active" class="hulu-content" :details="hulu[hulu.subComp]" @exit="exitCB">
    </component>
    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import splash from '../common/splash';
import player from '../common/player';
import Messages from '../../services/Messages';

export default {
  name: 'hulu',
  created() {
    if (this.hulu.splashActive) {
      this.showSplash = true;
    } else {
      this.showSplash = false;
    }
  },
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    ...mapState('source', {
      hulu: state => state.source.hulu,
    }),
    topView() {
      if (this.hulu.subComp.length > 0) {
        return this.hulu.subComp[this.hulu.subComp.length - 1];
      }
      return 'player';
    },
  },
  data() {
    return {
      showSplash: false,
    };
  },
  methods: {
    ...mapMutations('source', {
      updateComponent: 'UPDATE_HULU_COMP',
      returnHuluComp: 'RETURN_HULU_COMP',
    }),
    exitCB(param) {
      if (param.from === 'splash') {
        this.showSplash = false;
      } else if (this.hulu.subComp.length > 1) {
        this.returnHuluComp();
      } else {
        this.$emit('exit');
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
.hulu-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  .hulu-content {
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
