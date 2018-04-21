<template>
  <div class="health_well">
    <div class="grid-container"
      :class="{'shrink':isRemoteEnabled, 'listing': !slideshow, 'squeeze-header': (isRemoteEnabled && !active)}"
      @transitionend="shrinkTransitionCB"
    >
    <template v-if="slideshow">
      <transition :name="transitionName">
        <div class="grid-templates" :key="index">
            <grid :details="grids[index]" :focus="true" @movefocus="movefocus"/>
        </div>
      </transition>
    </template>
      <div class="grid-list" v-else :style="{'transform': `translateY(${translateY}vw)`}">
        <div class="grid-templates" v-for="(page) in grids" :key="page.title">
          <grid :details="page" :focus="true" @movefocus="movefocus"/>
        </div>
        <!-- <div class="recent-apps">
            <div class="apps-list">
              <div class="apps" v-for="(item, index) in appsItems" :key="item.title" :class="{'focus': (focus === 'apps' && appIdx == index)}">
                <img :src="item.img"/>
              </div>
            </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import grid from './common/lgrid';
import Messages from '../../services/Messages';

export default {
  mounted() {
    this.stopSlideShow();
    if (!this.isRemoteEnabled) {
      this.startSlideShow();
    }
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    this.stopSlideShow();
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapGetters('home', {
      catGrid: 'GET_CAT_GRID',
      appsItems: 'GET_FORYOU_APPS',
    }),
    grids() {
      const gridPages = this.catGrid(1);
      console.log(gridPages);
      return gridPages;
    },
    translateY() {
      return ((this.translate * 100) / window.innerWidth);
    },
    gridFocus() {
      if (this.active && (this.focus === 'grid')) {
        return true;
      }
      return false;
    },
  },
  methods: {
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
          break;
        case 'LEFT':
          if (this.focus === 'apps') {
            if (this.appIdx > 0) {
              this.appIdx -= 1;
            }
          }
          break;
        default:
          break;
      }
    },
    startSlideShow() {
      this.transitionName = '';
      this.intervalId = setInterval(() => {
        this.index = (((this.index) + 1) % this.grids.length);
      }, 3000);
    },
    stopSlideShow() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.transitionName = '';
      this.slideshow = false;
    },
    scroll(dir, delta) {
      console.log(dir, delta);
      if (dir === 'up') {
        this.translate += delta;
      } else {
        this.translate -= delta;
      }
    },
    movefocus(param) {
      if (param.from === 'lgrid') {
        if (param.dir === 'up') {
         this.$emit('movefocus', { dir: 'up', from: 'content' });
        } else if (param.dir === 'down') {
        }
      }
    },
  },
  data() {
    return {
      transitionName: 'slideshow',
      intervalId: null,
      focus: 'grid',
      pageIdx: 0,
      index: 0,
      translate: 0,
      appIdx: 0,
      slideshow: true,
    };
  },
  components: {
    grid,
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
          img {
            width: 100%;
          }
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
    height: 807 * $s;
    width: auto;
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
        // width: 1720 * $s;
        width: 100%;
        .grid-templates {
          height: 807 * $s;
        }
      }
      &.listing {
        .grid-templates {
          // position: relative;
        }
      }
      &.squeeze-header {
        // margin-top: 150 * $s;
      }
  }
</style>
