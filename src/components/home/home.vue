<template>
  <div class="home">
    <div class="backdrop blur">
    </div>
    <div class="dashboard">
      <transition :name="headerTransition">
      <div class="header-cont" :class="{'hideHeader': (isRemoteEnabled && !showHeader),'squeeze-header': (!headerFocus), 'subtitle': (!isRemoteEnabled && nav_selected != 0)}">
          <div class="wrapper">
          <home-header v-show="isRemoteEnabled || nav_selected != 0" :navItems="navItems" :focus="headerFocus" @movefocus="movefocus" :selectedIdx="nav_selected"/>
          </div>
      </div>
      </transition>
      <div class="content-body" :class="[{'push-down':isRemoteEnabled && showHeader,'squeeze-header': (isRemoteEnabled && !headerFocus)}, navItems[nav_selected].template]">
        <transition :name="direction">
          <component @showHeader="headerVisible" :is="navItems[nav_selected].template" :active="contentFocus" @movefocus="movefocus"></component>
        </transition>
      </div>
      <drivers :theme="'light'" :drivers="suggest" :toggle="!isRemoteEnabled" :loop="true"></drivers>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import foryou from './foryou';
import movies from './movies';
import health from './health';
import tvshows from './tvshows';
import drivers from '../common/drivers';
import homeHeader from './common/header';
import Messages from '../../services/Messages';

export default {
  name: 'home',
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapGetters('home', {
      suggest: 'GET_SUGGESTIONS',
      navItems: 'GET_NAVS',
      grid_info: 'GET_CAT_GRID',
      nav_selected: 'GET_SELECTED_NAV',
    }),
    headerTransition() {
      if (this.isRemoteEnabled) return 'show';
      return 'none';
    },
    contentFocus() {
      if (this.active && (this.focus === 'content') && this.isRemoteEnabled) {
        return true;
      }
      return false;
    },
    headerFocus() {
      if (this.active && (this.focus === 'header') && this.isRemoteEnabled) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.resetVoiceTimer();
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
    }),
    ...mapActions({
      resetVoiceTimer: 'RESET_VOICE_TIMER',
    }),
    movefocus(param) {
      if (param.from === 'header') {
        this.focus = 'content';
      } else if (param.from === 'content') {
        this.focus = 'header';
      }
    },
    headerVisible(bool) {
      this.showHeader = bool;
    },
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'EXTRA':
          this.updateMode(!this.isRemoteEnabled);
          break;
        case 'UP':
          if (this.isRemoteEnabled) {
            if (this.focus === 'apps') {
              const top = this.$el.querySelector('.recent-apps').offsetHeight;
              this.scroll('up', top);
              this.focus = 'grid';
            }
          }
          break;
        case 'RIGHT':
          if (this.focus === 'apps') {
            if (this.appIdx < this.appsItems.length - 1) {
              this.appIdx += 1;
            }
          }
          break;
        case 'DOWN':
          // if (this.isRemoteEnabled) {
          //   this.showHeader = false;
          // }
          break;
        case 'LEFT':
          if (this.focus === 'apps') {
            if (this.appIdx > 0) {
              this.appIdx -= 1;
            }
          }
          break;
        case 'BACK':
          if (this.isRemoteEnabled) {
            if (!this.showHeader) {
              this.showHeader = true;
            } else {
              this.$emit('exit');
              this.showHeader = true;
            }
          }
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      remote: true,
      showHeader: true,
      direction: 'left',
      index: 0,
      focus: 'content',
    };
  },
  components: {
    homeHeader,
    foryou,
    movies,
    drivers,
    tvshows,
    health,
  },
  watch: {
    nav_selected(old, nw) {
      if (!this.isRemoteEnabled) {
        this.direction = '';
      } else if (old > nw) {
        this.direction = 'left';
      } else {
        this.direction = 'right';
      }
    },
  },
};
</script>
<style scoped lang="scss">
  @import '../../mixins/scss/main';

.home {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .backdrop {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 1;
    width: 100%;
    height: 100%;
    background-image: url('/static/Images/background.png');
    &.blur {
      filter: blur(50px);
      -webkit-filter: blur(50px);
    }
      // background-image: url('/static/bgbg.png');
      background-size: 100%;
    }
  .dashboard {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('/static/Images/home/home_bg.png');
    .header-cont {
      position: relative;
      height: 120 * $s;
      display: flex;
      align-items: center;
      width: 100%;
      z-index: 2;
      transition: height 0.3s ease, transform 0.3s ease;
      &.subtitle {
        transform: translateX(#{-150 * $s});
      }
      .wrapper {
        position: relative;
        top: 35 * $s;
        width: 100%;
        overflow: hidden;
      }
      &.squeeze-header {
        height: 80 * $s;
      }
      &.show-enter {
        opacity: 0;
        height: 0;
      }
      &.show-leave-to {
        opacity: 0;
        height: 0;
      }
      &.show-enter-active{
        transition: height 0.3s ease, opacity 0.2s ease;
      }
      &.show-leave-active {
        transition: height 0.3s ease, opacity 0.2s ease;
      }
      &.hideHeader {
        opacity: 0;
      }
    }
    .title {
      position: absolute;
      left: 0;
      height: 130 * $s;
      display: flex;
      align-items: center;
      margin-left: 40 * $s;
      padding-top: 10 * $s;
      font-size: 30 * $s;
      font-family: Helvetica;
      justify-content: flex-start;
    }
    .content-body {
      position: relative;
      width: 1920 * $s;
      height: 980 * $s;
      transform: translate(#{0 * $s}, #{0 * $s});
      transition: transform 0.3s ease;
      left:0;
      &.health {
        // transform: translate(#{0 * $s}, #{50 * $s});
      }
      &.movies {
        // transform: translate(#{0 * $s}, #{50 * $s});
      }
      &.push-down {
        transform: translate(#{0 * $s}, #{50 * $s});
      }
      // &.shrink {
      //   transform: translate(#{80 * $s}, #{230 * $s});
      //   &::not(.foryou) {
      //     width: 1760 * $s;
      //   }
      //   &.foryou {
      //     transform: translateY(#{80 * $s});
      //   }
      //   &.squeeze-header {
      //     transform: translateY(#{80 * $s});
      //     &.health {
      //       transform: translate(#{80 * $s}, #{150 * $s});
      //     }
      //   }
      // }
      .right-enter-active, .right-leave-active {
        transition: transform 0.4s ease, opacity 0.3s ease;
      }
      .right-enter {
        transform: translateX(#{-1920 * $s});
        opacity: 0;
      }
      .right-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(#{1920 * $s});
        opacity: 0;
      }
      .left-enter-active, .left-leave-active {
        transition: transform 0.4s ease, opacity 0.3s ease;
      }
      .left-enter {
        transform: translateX(#{1920 * $s});
        opacity: 0;
      }
      .left-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(#{-1920 * $s});
        opacity: 0;
      }
    }
  }
  .bixby-suggestions {
    position: absolute;
    top: calc(100% - #{135 * $s});
    height: 135 * $s;
    width: 100%;
    display: flex;
    align-items: center;
    .text-suggestion {
      position: relative;
      left: 132 * $s;
      top: -3 * $s;
      font-size: 32 * $s;
      .text {
        font-size: 31 * $s;
        font-family: TTNormsRegular;
      }
      .suggestions {
        font-size: 31 * $s;
        font-family: TTNormsBold;
      }
    }
    .pagination-dots {
      position: absolute;
      right: 70 * $s;
      display: flex;
      width: 84 * $s;
      justify-content: space-between;
      .dots {
        height: 10* $s;
        width: 10* $s;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.2);
        &.selected {
          background-color: rgba(0,0,0,1)
        }
      }
    }
    &.show-enter {
      opacity: 0;
    }
    &.show-leave-to {
      opacity: 0;
    }
    &.show-enter-active{
      transition: height 0.3s ease, opacity 0.3s ease;
    }
    &.show-leave-active {
      transition: height 0.3s ease, opacity 0.3s ease;
    }
  }
}
</style>
