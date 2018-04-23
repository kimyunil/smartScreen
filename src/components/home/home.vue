<template>
  <div class="home">
    <div class="dashboard">
      <transition name="show">
      <div class="header-cont" :class="{'squeeze-header': (!headerFocus)}" v-if="isRemoteEnabled">
          <div class="wrapper">
          <home-header :navItems="navItems" :focus="headerFocus" @movefocus="movefocus" :selectedIdx="nav_selected"/>
          </div>
      </div>
      </transition>
      <!-- <div class="title">
        {{navItems[nav_selected].title}}
      </div> -->
      <div class="content-body" :class="{'shrink':isRemoteEnabled,'squeeze-header': (isRemoteEnabled && !headerFocus)}">
        <transition :name="direction">
          <component :is="navItems[nav_selected].template" :active="contentFocus" @movefocus="movefocus"></component>
        </transition>
      </div>
    </div>
     <transition name="show">
        <div class="bixby-suggestions" v-if="!isRemoteEnabled">
          <div class="text-suggestion">
            <span class="text"> Say</span>
            <span class="suggestions">" Hey Bixby, show me more..."</span>
          </div>
          <div class="pagination-dots">
            <div class="dots"
              v-for="(i, idx) in grid_info(nav_selected)"
              :key="i.title"
              :class="{'selected': index === idx}"
            >
            </div>
          </div>
        </div>
     </transition>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import foryou from './foryou';
import health from './health';
import homeHeader from './common/header';
import Messages from '../../services/Messages';

export default {
  name: 'home',
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapGetters('home', [
      'navs',
    ]),
    ...mapGetters('home', {
      navItems: 'GET_NAVS',
      grid_info: 'GET_CAT_GRID',
      nav_selected: 'GET_SELECTED_NAV',
    }),
    contentFocus() {
      if (this.active && (this.focus === 'content')) {
        return true;
      }
      return false;
    },
    headerFocus() {
      if (this.active && (this.focus === 'header')) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
    }),
    movefocus(param) {
      if (param.from === 'header') {
        this.focus = 'content';
      } else if (param.from === 'content') {
        this.focus = 'header';
      }
    },
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'NOTIFICATION':
          this.updateMode(!this.isRemoteEnabled);
          break;
        case 'UP':
          if (this.isRemoteEnabled) {
            this.showHeader = true;
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
          if (this.isRemoteEnabled) {
            this.showHeader = true;
          }
          break;
        case 'LEFT':
          if (this.focus === 'apps') {
            if (this.appIdx > 0) {
              this.appIdx -= 1;
            }
          }
          break;
        case 'BACK':
          this.$emit('exit');
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      remote: true,
      showHeader: false,
      direction: 'left',
      index: 0,
      focus: 'content',
    };
  },
  components: {
    homeHeader,
    foryou,
    health,
  },
  watch: {
    nav_selected(old, nw) {
      if (old > nw) {
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
  background-image: url('/static/bgbg.png');
  background-color: grey;
  background-size: 100%;
  background-repeat: no-repeat;
  .dashboard {
    position: absolute;
    width: 100%;
    height: 100%;
    .header-cont {
      position: absolute;
      height: 230 * $s;
      display: flex;
      align-items: center;
      width: 100%;
      z-index: 2;
      transition: height 0.3s ease;
      .wrapper {
        position: relative;
        top: 35 * $s;
        width: 100%;
        overflow: hidden;
      }
      &.squeeze-header {
        height: 100 * $s;
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
      position: absolute;
      width: 1920 * $s;
      // margin: 10 * $s;
      height: 940 * $s;
      // overflow: hidden;
      transform: translate(#{0 * $s}, #{100 * $s});
      transition: transform 0.3s ease;
      left:0;
      &.shrink {
        transform: translate(#{80 * $s}, #{230 * $s});
        width: 1760 * $s;
        &.squeeze-header {
          transform: translate(#{80 * $s}, #{130 * $s});
        }
      }
      .left-enter-active, .left-leave-active {
        transition: transform 0.4s ease, opacity 0.3s ease;
      }
      .left-enter {
        transform: translateX(#{-1920 * $s});
        opacity: 0;
      }
      .left-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(#{1920 * $s});
        opacity: 0;
      }
      .right-enter-active, .right-leave-active {
        transition: transform 0.4s ease, opacity 0.3s ease;
      }
      .right-enter {
        transform: translateX(#{1920 * $s});
        opacity: 0;
      }
      .right-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(#{-1920 * $s});
        opacity: 0;
      }
    }
  }
  .bixby-suggestions {
    position: absolute;
    bottom: 0;
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
        font-family: SamsungOneUI300;
      }
      .suggestions {
        font-size: 31 * $s;
        font-family: SamsungOneUI700;
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
