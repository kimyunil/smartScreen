<template>
  <div class="home">
    <div class="dashboard">
      <div class="header-cont">
        <div class="wrapper" :class="{'squeeze-header': (isRemoteEnabled && !headerFocus)}">
        <home-header v-if="isRemoteEnabled" :navItems="navItems" :focus="headerFocus" @movefocus="movefocus" :selectedIdx="nav_selected"/>
        </div>
      </div>
      <div class="content-body" :class="{'shrink':isRemoteEnabled}">
      <div class="grid-container"
        :class="{'shrink':isRemoteEnabled, 'listing': !slideshow, 'squeeze-header': (isRemoteEnabled && !headerFocus)}"
        @transitionend="shrinkTransitionCB"
      >
        <template v-if="slideshow">
        <transition :name="transitionName">
        <div class="grid-templates" :key="index">
          <grid :details="pages[index]" :focus="false"/>
        </div>
        </transition>
        </template>
          <div class="grid-list" v-else :style="{'transform': `translateY(${translateY}vw)`}">
          <div class="grid-templates" v-for="(page, index) in pages" :key="page.title">
            <grid :details="page" :focus="(gridFocus && pageIdx === index)" @movefocus="movefocus"/>
          </div>
          <div class="recent-apps">
              <div class="apps-list">
                <div class="apps" v-for="(i, index) in appsItems" :key="i.title" :class="{'focus': (focus === 'apps' && appIdx == index)}">
                  {{i.title}}
                </div>
              </div>
          </div>
          </div>
      </div>
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
              v-for="(i, idx) in pages"
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
import grid from './subcomps/grid';
import homeHeader from './subcomps/header';
import Messages from '../../services/Messages';

export default {
  name: 'home',
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapGetters('home', [
      'navs',
    ]),
    ...mapGetters('home', {
      pages: 'GET_PAGES',
      navItems: 'GET_NAVS',
      nav_selected: 'GET_SELECTED_NAV',
      appsItems: 'GET_APPS',
    }),
    translateY() {
      return ((this.translate * 100) / window.innerWidth);
    },
    gridFocus() {
      if (this.active && (this.focus === 'grid')) {
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
    this.stopSlideShow();
    this.startSlideShow();
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    this.stopSlideShow();
    Messages.$off('button_down', this.handleKeyDown);
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
    }),
    movefocus(param) {
      if (param.from === 'header') {
        this.focus = 'grid';
      } else if (param.from === 'grid') {
        if (param.dir === 'up') {
          if (this.pageIdx > 0) {
            this.pageIdx -= 1;
            const top = this.$el.querySelectorAll('.grid-list .grid-templates')[this.pageIdx].offsetHeight;
            this.scroll('up', top);
          } else {
            this.focus = 'header';
          }
        } else if (param.dir === 'down') {
          if (this.pageIdx < this.pages.length - 1) {
            this.pageIdx += 1;
            const top = this.$el.querySelectorAll('.grid-list .grid-templates')[this.pageIdx].offsetHeight;
            this.scroll('down', top);
          } else if (this.focus !== 'apps') {
            const top = this.$el.querySelector('.recent-apps').offsetHeight;
            this.scroll('down', top);
            this.focus = 'apps';
          }
        }
      }
    },
    scroll(dir, delta) {
      console.log(dir, delta);
      if (dir === 'up') {
        this.translate += delta;
      } else {
        this.translate -= delta;
      }
    },
    shrinkTransitionCB() {
      if (this.isRemoteEnabled) {
        this.slideshow = false;
      } else {
        this.slideshow = true;
      }
    },
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'VOICE_SEARCH':
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
    startSlideShow() {
      this.transitionName = 'slideshow';
      this.intervalId = setInterval(() => {
        this.index = (((this.index) + 1) % this.pages.length);
      }, 3000);
    },
    stopSlideShow() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.transitionName = '';
    },
  },
  data() {
    return {
      remote: true,
      showHeader: false,
      transitionName: 'slideshow',
      focus: 'header',
      pageIdx: 0,
      index: 0,
      translate: 0,
      appIdx: 0,
      intervalId: null,
      slideshow: true,
    };
  },
  components: {
    grid,
    homeHeader,
  },
  watch: {
    isRemoteEnabled(val, old) {
      console.log(val, old);
      if (!val) this.startSlideShow();
      else this.stopSlideShow();
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
      overflow: hidden;
      width: 100%;
      z-index: 2;
      .wrapper {
         transform: translateY(#{110 * $s});
         transition: transform 0.3s ease;
        &.squeeze-header {
          transform: translateY(#{40 * $s});
        }
      }

    }
    .grid-container {
      position: absolute;
      width: 1900 * $s;
      margin: 10 * $s;
      height: 940 * $s;
      overflow: hidden;
      left:0;
      transition: margin 0.3s ease, width 0.3s ease, left 0.3s ease;
      .grid-list {
        transition: transform 0.4s ease;
        .recent-apps {
         position: relative;
         height: 400 * $s;
         width: 100%;
         .apps-list {
           position: absolute;
           width: 100%;
           height: 400 * $s;
           display: flex;
           justify-content: space-around;
           .apps {
             position: relative;
             height: 300 * $s;
             width: 300 * $s;
             border: 20 * $s solid transparent;
             &.focus {
               border-image: url(https://www.w3schools.com/cssref/border.png) 30 round;
               border-width: 20 * $s;
             }
           }
         }
        }
      }
      .grid-templates {
        position: absolute;
        height: 940 * $s;
        width: 100%;
        transition: height 0.3s ease;
        &.slideshow-enter {
          opacity: 0;
        }
        &.slideshow-leave-to {
          opacity: 0;
        }
        &.slideshow-enter-active{
          transition: opacity 1.3s ease;
        }
        &.slideshow-leave-active {
          transition: opacity 1.3s ease;
      }
      }
      &.shrink {
        margin: 40 * $s;
        margin-top: 290 * $s;
        left: 60 * $s;
        width: 1720 * $s;
        .grid-templates {
          height: 880 * $s;
        }
      }
      &.listing {
        .grid-templates {
          position: relative;
        }
      }
      &.squeeze-header {
        margin-top: 150 * $s;
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
