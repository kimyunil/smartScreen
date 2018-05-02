<template>
  <div class="foryou">
    <div class="grid-container"
      :class="{'shrink':isRemoteEnabled, 'squeeze-header': (isRemoteEnabled && !active)}"
      @transitionend="shrinkTransitionCB"
    >
      <transition name="fade">
        <!-- <template > -->
        <div class="grid-templates grid-templates-slideshow" v-show="slideshow">
          <transition :name="transitionName">
            <div class="slideshow-wrapper" :key="index">
              <grid v-show="grids[index].template !== 'ignore'" class="grid-wrapper" :details="grids[index]" :focus="false"/>
              <artinfo ref="infoart" v-show="grids[index].template === 'ignore'" :img="grids[index][grids[index].content[infoArtIdx]].img"/>
            </div>
          </transition>
        </div>
        <!-- </template> -->
      </transition>
      <transition name="fade">
        <div class="grid-list" v-show="!slideshow" :style="{'transform': `translateY(${translateY}vw)`}">
          <div class="grid-templates grid-templates-list" v-for="(page, index) in getGrids" v-if="page.template !== 'ignore'" :key="page.title">
            <grid :details="page" :focus="(gridFocus && pageIdx === index)" @movefocus="movefocus" @select="selectedGridItem"/>
          </div>
          <div class="recent-apps">
              <div class="apps-list">
                <div class="apps" v-for="(item, index) in appsItems" :key="item.title" :class="{'focus': (focus === 'apps' && appIdx == index)}">
                  <img :src="item.img"/>
                </div>
              </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- <transition name="show"> -->
      <div class="bixby-suggestions" v-if="!isRemoteEnabled && !isBixbyActive && toggleSuggest">
        <div class="pagination-dots">
          <div class="dots"
            v-for="(i, idx) in grids"
            :key="i.title"
            :class="{'selected': index === idx}"
          >
          </div>
        </div>
      </div>
    <!-- </transition> -->
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import grid from './common/grid';
import artinfo from './common/artInfo';
import Messages from '../../services/Messages';

export default {
  mounted() {
    this.chkSlideShow();
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    this.stopSlideShow();
    this.toggleSuggetion(true);
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
      'toggleSuggest',
      'sleep',
      'isBixbyActive',
    ]),
    ...mapState('home', [
      'timeout',
    ]),
    ...mapGetters('home', {
      cat_grid: 'GET_CAT_GRID',
      appsItems: 'GET_FORYOU_APPS',
    }),
    getGrids() {
      const arr = [];
      for (let i = 0; i < this.grids.length; i += 1) {
        const idx = ((this.index + i) % this.grids.length);
        arr[i] = this.grids[idx];
      }
      return arr;
    },
    grids() {
      const gridPages = this.cat_grid(0);
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
    ...mapActions({
      launch: 'LAUNCH_COMPONENT',
    }),
    ...mapMutations({
      toggleSuggetion: 'TOGGLE_SUGGESTION',
      updateFlag: 'UPDATE_SYS_FLAG',
    }),
    chkSlideShow() {
      this.toggleSuggetion(true);
      if (this.index === 0) {
        this.toggleSuggetion(false);
      }
      if (this.sleep) {
        this.index = 0;
        this.slideshow = true;
        // setTimeout(() => {
        //   this.startSlideShow();
        // }, 6000);
      } else {
        if (this.isRemoteEnabled) {
          this.stopSlideShow(true);
          this.index = 1;
        } else {
          this.index = 0;
          this.startSlideShow();
        }
      }
    },
    selectedGridItem(item) {
      console.log(item);
      if (item.details.action) {
        this.launch(item.details.action);
      }
    },
    shrinkTransitionCB() {
      // if (this.isRemoteEnabled) {
      //   this.slideshow = false;
      // } else {
      //   this.slideshow = true;
      // }
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
      this.slideshow = true;
      console.log(this.timeout);
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.transitionName = 'slideshow';
        this.index = (((this.index) + 1) % this.grids.length);
      }, this.timeout);
      // this.index = 3;
    },
    stopSlideShow(from) {
      clearInterval(this.intervalId);
      if (this.index === 0 && from) {
        this.index = 1;
      }
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
      if (param.from === 'grid') {
        if (param.dir === 'up') {
          if (this.pageIdx > 0) {
            this.pageIdx -= 1;
            const top = this.$el.querySelectorAll('.grid-list .grid-templates')[this.pageIdx].offsetHeight;
            this.scroll('up', top);
          } else {
            this.$emit('movefocus', { dir: 'up', from: 'content' });
          }
        } else if (param.dir === 'down') {
          console.log(this.pageIdx, this.grids.length);
          if (this.pageIdx < this.grids.length - 2) {
            this.pageIdx += 1;
            const top = this.$el.querySelectorAll('.grid-list .grid-templates')[this.pageIdx].offsetHeight;
            this.scroll('down', top);
          } else if (this.focus !== 'apps') {
            const top = this.$el.querySelector('.recent-apps').offsetHeight;
            this.scroll('down', top);
            this.focus = 'apps';
          }
        }
        if (this.pageIdx === 0) {
          this.$emit('showHeader', true);
        } else {
          this.$emit('showHeader', false);
        }
      }
    },
  },
  data() {
    return {
      transitionName: 'slideshow',
      intervalId: null,
      infoArtIdx: 0,
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
    artinfo,
  },
  watch: {
    timeout() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.$nextTick(() => {
        if (!this.isRemoteEnabled) {
          this.startSlideShow();
        }
      });
    },
    sleep(val) {
      if (!val) {
        setTimeout(() => {
          console.log('slideshow');
          this.startSlideShow();
        }, 4000);
      }
    },
    index(val) {
      if (val === 0) {
        this.infoArtIdx = (this.infoArtIdx + 1) % this.grids[0].content.length;
        this.toggleSuggetion(false);
      } else {
        this.toggleSuggetion(true);
      }
    },
    isRemoteEnabled(val, old) {
      console.log(val, old);
      if (!val) this.startSlideShow();
      else this.stopSlideShow(true);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';
.foryou {
  position: absolute;
  width: 100%;
  height: 100%;
  .grid-container {
    position: absolute;
    width: 1920 * $s;
    height: 1080 * $s;
    // height: 807 * $s;
    // overflow: hidden;
    left:0;
    transition: margin 0.3s ease, width 0.3s ease, left 0.3s ease;
    .grid-list {
      transition: transform 0.4s ease;
      height: 100%;
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
              border-image: url("/static/Images/home/border.png") 30 round;
              border-width: 20 * $s;
            }
          }
        }
      }
      &.fade-enter-active {
        // transition: opacity 0.3s ease;
      }
      &.fade-leave-active {
        // transition: opacity 0.3s ease;
      }
      &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
    }
    .grid-templates {
      position: absolute;
      height: 940 * $s;
      height: 807 * $s;
      height: 100%;
      width: 100%;
      transition: height 0.3s ease;
      &.grid-templates-list {
        position: relative;
      }
      &.grid-templates-slideshow {
       position: absolute;
       .slideshow-wrapper {
         position: absolute;
         width: 100%;
         height: 100%;
        .grid-wrapper {
          height: 940 * $s;
          margin: 10 * $s;
          width: 1900 * $s;
          transition: margin 0.3s ease, width 0.3s ease, left 0.3s ease;
        }
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
      &.fade-enter-active {
        // transition: opacity 0.1s ease;
      }
      &.fade-leave-active {
        // transition: opacity 0.1s ease;
      }
      &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
      }
    }
    &.shrink {
      width: 1720 * $s;
      height: 880 * $s;
      .grid-templates {
        .grid-templates-list {
        height: 880 * $s;
        }
      }
    }
    &.squeeze-header {
      // margin-top: 150 * $s;
    }
  }
  .bixby-suggestions {
    position: absolute;
    bottom: -140 * $s;
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
      transition: opacity 0.1s ease;
    }
    &.show-leave-active {
      transition: opacity 0.1s ease;
    }
  }
}
</style>
