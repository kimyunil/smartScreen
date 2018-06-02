<template>
  <div class="foryou">
    <div class="grid-container"
      :class="{'shrink':isRemoteEnabled, 'squeeze-header': (isRemoteEnabled && !active)}"
      @transitionend="shrinkTransitionCB"
      :style="translateY"
    >
        <div class="grid-templates grid-templates-slideshow" :style="inlineTranslate">
            <div class="slideshow-wrapper" :key="idx" v-for="(page, idx) in getGrids">
              <grid v-show="grids[idx].template !== 'ignore'" class="grid-wrapper"
              v-if="(slideshow && index === idx || !slideshow)"
              :focus="(gridFocus && pageIdx === idx)" :details="grids[idx]" :videoActive="videoEnabled"
              @movefocus="movefocus" @select="selectedGridItem"
              />
            </div>
        </div>
        <!-- </template> -->
        <div class="grid-list" v-if="isRemoteEnabled">
          <template v-for="(subCat, index) in gridlist">
            <div class="grid-templates template subcategory-template"  :key="index">
              <div class="title" :class="[{'elevate': (rowIdx === index)}]">{{subCat.title}}</div>
              <lgrid :items="subCat.listItems" :itemType="subCat.itemType" :class="[{'elevate': (rowIdx === index)}, subCat.itemType, subCat.name]" :focus="(rowIdx === index)" class="subCategoryList" @movefocus="movefocus"/>
            </div>
          </template>
        </div>
    </div>
    <!-- <transition name="show"> -->
      <div class="bixby-suggestions" v-if="!isRemoteEnabled && !isBixbyActive">
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
import lgrid from './common/lgrid';
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
      'sleep',
      'isBixbyActive',
    ]),
    ...mapState('home', [
      'timeout',
    ]),
    ...mapGetters('home', {
      cat_grid: 'GET_CAT_GRID',
      gridlist: 'GET_FORYOU_LIST',
      suggest: 'GET_SUGGESTIONS',
    }),
    inlineTranslate() {
      return { transform: `translateX(${((this.index * -1700) * 100) / window.innerWidth}vw)` };
    },
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
      console.log(this.translate);
      return { transform: `translateY(${((this.translate * 100) / window.innerWidth)}vw)` };
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
    ...mapMutations('home', {
      updatePageIdx: 'UPDATE_PAGE_IDX',
    }),
    chkSlideShow() {
      this.toggleSuggetion(true);
      if (this.isRemoteEnabled) {
        this.stopSlideShow(true);
      } else {
        this.startSlideShow();
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
            if (this.rowIdx > 0) {
              this.rowIdx -= 1;
              const offset = this.voffset[this.rowIdx].top;
              if ((this.translate * -1) > offset) {
                this.scroll('==', offset * -1);
              }
            } else {
              this.rowIdx = -1;
              this.scroll('==', 0);
              this.focus = 'grid';
            }
          }
          break;
        case 'RIGHT':
          break;
        case 'DOWN':
          if (this.isRemoteEnabled) {
            if (this.focus !== 'grid') {
              if (this.rowIdx < this.gridlist.length - 1) {
                this.rowIdx += 1;
                // const offset = this.voffset[this.rowIdx].top + this.voffset[this.rowIdx].height;
                console.log(this.voffset[this.rowIdx].top);
                // if (this.translate + offset > 1080) {
                this.scroll('==', this.voffset[this.rowIdx].top * -1);
                // }
              }
            }
          }
          break;
        case 'LEFT':
          break;
        default:
          break;
      }
    },
    autoplayeVieo() {
      clearTimeout(this.videoTime);
      this.videoTime = setTimeout(() => {
        console.log(this.videoEnabled);
        this.videoEnabled = true;
      }, 3000);
    },
    startSlideShow() {
      this.slideshow = true;
      this.autoplayeVieo();
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.transitionName = 'slideshow';
        this.videoEnabled = false;
        this.$nextTick(() => {
          this.index = (((this.index) + 1) % this.grids.length);
          this.autoplayeVieo();
        });
      }, this.timeout);
      // this.index = 3;
    },
    stopSlideShow() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.transitionName = '';
      this.videoEnabled = true;
      clearTimeout(this.videoTime);
      this.pageIdx = this.index;
      this.slideshow = false;
      this.updateVOffset();
    },
    updateVOffset() {
      this.$nextTick(() => {
        const temps = this.$el.querySelectorAll('.template');
        for (let i = 0; i < temps.length; i += 1) {
          this.voffset[i] = {};
          this.voffset[i].top = temps[i].offsetTop;
          this.voffset[i].height = temps[i].offsetHeight;
        }
      });
    },
    scroll(dir, delta) {
      console.log(dir, delta);
      if (dir === 'up') {
        this.translate += delta;
      } else if (dir === 'down') {
        this.translate -= delta;
      } else {
        this.translate = delta;
      }
    },
    movefocus(param) {
      if (param.from === 'grid') {
        if (param.dir === 'left') {
          if (this.pageIdx > 0) {
            this.pageIdx -= 1;
            this.index = this.pageIdx;
          }
        } else if (param.dir === 'right') {
          if (this.pageIdx < this.grids.length - 1) {
            this.pageIdx += 1;
            this.index = this.pageIdx;
          }
        } else if (param.dir === 'up') {
          this.$emit('movefocus', { dir: 'up', from: 'content' });
        } else if (param.dir === 'down') {
          this.rowIdx = -1;
          // const offset = this.voffset[this.rowIdx].top + this.voffset[this.rowIdx].height;
          // console.log(this.voffset[this.rowIdx].top);
          // if (this.translate + offset > 1080) {
          //   this.scroll('==', this.voffset[this.rowIdx].top * -1);
          // }
          this.focus = 'apps';
        }
      }
    },
  },
  data() {
    return {
      transitionName: 'slideshow',
      videoTime: null,
      intervalId: null,
      voffset: [],
      infoArtIdx: 0,
      videoEnabled: false,
      focus: 'grid',
      pageIdx: 0,
      rowIdx: -1,
      index: 0,
      translate: 0,
      appIdx: 0,
      slideshow: true,
    };
  },
  components: {
    grid,
    lgrid,
    artinfo,
  },
  watch: {
    rowIdx() {
      console.log('rowIdx Watching');
      if (this.rowIdx >= 0) this.$emit('showHeader', false);
      else this.$emit('showHeader', true);
    },
    timeout() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.$nextTick(() => {
        if (!this.isRemoteEnabled) {
          this.startSlideShow();
        }
      });
    },
    index(val) {
      this.updatePageIdx(val);
    },
    isRemoteEnabled(val) {
      if (!val) {
        this.startSlideShow();
        this.rowIdx = -1;
        this.translate = 0;
      } else {
        this.stopSlideShow(true);
      }
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
  // overflow-y: hidden;
  .grid-container {
    position: relative;
    width: 1920 * $s;
    height: auto;
    // height: 807 * $s;
    // overflow: hidden;
    left:0;
    transition: transform 0.3s ease;
    .grid-list {
      position: static;
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
      position: static;
      margin:0 100 * $s;
      margin-bottom: 60 * $s;
      height: 840 * $s;
      width: 1700 * $s;
      transition: height 0.3s ease;
      &.grid-templates-list {
        position: static;
      }
      &.template {
        position: relative;
        &.subcategory-template {
          position: relative;
          // left: 15 * $s;
          width: calc(100% - #{150 * $s}); // include margin
          padding: 0 15 * $s;
          margin-bottom: 0;
          padding-top: 0;
          height: auto;
          .title {
            text-align: left;
            height: 50 * $s;
            font-family:Helvetica;
            font-size: 36 * $s;
            color: rgb(44,44,44);
            &.elevate {
              transform: translateY(#{-30  *$s});
            }
          }
          .subCategoryList {
            height: 480 * $s;
            box-sizing: content-box!important;
            &.apps {
              height: 420 * $s;
            }
            &.avengers {
              height: 560 * $s;
            }
            &.elevate {
              z-index: 99;
            }
          }
        }
      }
      &.grid-templates-slideshow {
       position: static;
       padding-top:20 * $s;
       transition: transform 0.3s ease;
       white-space: nowrap;
       .slideshow-wrapper {
         position: relative;
         width: 100%;
         vertical-align:top;
         display:inline-block;
         height: 100%;
        .grid-wrapper {
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
