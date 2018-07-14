<template>
  <div class="hbo-wrapper">
    <transition name="fade">
      <splash v-if="showSplash" :details="hbo.splash" @exit="exitCB"></splash>
      <component v-else :is="topView" :active="!showSplash&&active" class="hbo-content" :name="'hbo'"  :details="hbo[topView]" @exit="exitCB">
    </component>
    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import splash from '../common/splash';
import player from '../common/player';
import home from './home';
import detail from './detail';
import Messages from '../../services/Messages';

export default {
  name: 'hbo',
  created() {
    if (this.hbo.splashActive) {
      this.showSplash = true;
    } else {
      this.showSplash = false;
    }
  },
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    if (this.$el.querySelector('video')) {
      this.$el.querySelector('video').muted = true;
    }
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    ...mapState('source', {
      hbo: state => state.source.hbo,
    }),
    topView() {
      return this.hbo.subComp[this.hbo.idx];
    },
  },
  data() {
    return {
      showSplash: false,
    };
  },
  methods: {
    ...mapMutations('source', {
      updateComponent: 'UPDATE_HBO_COMP',
      returnHBOComp: 'RETURN_HBO_COMP',
    }),
    exitCB(param) {
      if (param.from === 'splash') {
        this.showSplash = false;
      } else if (param.from !== 'home') {
        this.updateComponent('++');
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
    home,
    player,
    detail,
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';
.hbo-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  .hbo-content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
