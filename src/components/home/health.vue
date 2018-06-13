<template>
  <div class="foryou">
    <div class="grid-container"
      :class="{'shrink':isRemoteEnabled, 'squeeze-header': (isRemoteEnabled && !active)}"
      @transitionend="shrinkTransitionCB"
      :style="translateY"
    >
        <div class="grid-templates grid-templates-slideshow"  :style="inlineTranslate" :class="[{'translateAnim': !slideshow}]">
            <div class="slideshow-wrapper" :key="idx" :data-key="idx" v-for="(page, idx) in getGrids"
             :style="{'left': `${setLeft(idx)}vw`}"
            v-if="!slideshow && index > idx">
              <grid :colIdx="colIdx" v-show="grids[idx].template !== 'ignore'" class="grid-wrapper"
                ref="previous"
              :focus="(gridFocus && pageIdx === idx)" :details="grids[idx]" :videoActive="videoEnabled"
              @movefocus="movefocus" @select="selectedGridItem"
              />
            </div>
          <transition :name="transitionName">
              <div class="slideshow-wrapper" :key="index">
                <grid v-show="grids[index].template !== 'ignore'" class="grid-wrapper" :colIdx="colIdx"
                :focus="(gridFocus && pageIdx === index)" :details="grids[index]" :videoActive="videoEnabled"
                @movefocus="movefocus" @select="selectedGridItem"
                />
              </div>
          </transition>
            <div class="slideshow-wrapper" :colIdx="colIdx" :key="idx" :data-key="idx" v-for="(page, idx) in getGrids" v-if="!slideshow & index < idx">
              <grid v-show="grids[idx].template !== 'ignore'" class="grid-wrapper"
              :style="{'left': `${setLeft(idx)}vw`}"
              :focus="(gridFocus && pageIdx === idx)" :details="grids[idx]" :videoActive="videoEnabled"
              @movefocus="movefocus" @select="selectedGridItem"
              />
            </div>
        </div>
        <!-- </template> -->
        <!-- <div class="grid-list" v-if="isRemoteEnabled">
          <template v-for="(subCat, index) in gridlist">
            <div class="grid-templates template subcategory-template"  :key="index">
              <div class="title" :class="[{'elevate': (rowIdx === index)}]">{{subCat.title}}</div>
              <lgrid :items="subCat.listItems" :itemType="subCat.itemType" :class="[{'elevate': (rowIdx === index)}, subCat.itemType, subCat.name]" :focus="(rowIdx === index)" class="subCategoryList" @movefocus="movefocus"/>
            </div>
          </template>
        </div> -->
    </div>
    <!-- <transition name="show"> -->
      <div class="bixby-suggestions" v-if="!isRemoteEnabled && !isBixbyActive">
        <div class="pagination-dots">
          <div class="dots"
            v-for="(i, idx) in grids"
            :key="i.title"
          >
          <div class="selected" :class="{'progress': (index === idx)}"></div>
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
    this.$nextTick(() => {
      this.slideWidth = this.$el.querySelector('.slideshow-wrapper').offsetWidth;
    });
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
      let idx = this.index - this.pageIdx;
      if (this.slideshow) idx = 0;
      return { transform: `translateX(${((idx * this.slideWidth) * 100) / window.innerWidth}vw)` };
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
      const gridPages = this.cat_grid(1);
      return gridPages;
    },
    translateY() {
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
    setLeft(idx) {
      return ((((idx - this.index) * this.slideWidth) * 100) / window.innerWidth);
    },
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
      this.index = this.pageIdx;
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
            this.colIdx = 1;
            // this.index = this.pageIdx;
          }
        } else if (param.dir === 'right') {
          if (this.pageIdx < this.grids.length - 1) {
            this.pageIdx += 1;
            this.colIdx = 0;
            // this.index = this.pageIdx;
          }
        } else if (param.dir === 'up') {
          this.$emit('movefocus', { dir: 'up', from: 'content' });
        } else if (param.dir === 'down') {
          // this.rowIdx = 0;
          // this.scroll('==', this.voffset[this.rowIdx].top * -1);
          // this.$nextTick(() => {
          //   this.focus = 'apps';
          // });
        }
      }
    },
  },
  data() {
    return {
      transitionName: 'slideshow',
      videoTime: null,
      colIdx: 0,
      intervalId: null,
      slideWidth: 1700,
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
       position: relative;
       padding-top:20 * $s;
       padding-bottom: 20 * $s;
       white-space: nowrap;
        &.translateAnim {
          transition: transform 0.3s ease;
        }
        .slideshow-wrapper {
          position: absolute;
          width: 1700 * $s;
          left: 0;
          vertical-align:top;
          display:inline-block;
          height: 100%;
          .grid-wrapper {
            transition: margin 0.3s ease, width 0.3s ease, left 0.3s ease;
          }
          &.slideshow-enter {
            transform: translateX(#{1770 * $s});
          }
          &.slideshow-leave-to {
            transform: translateX(#{-1770 * $s});
          }
          &.slideshow-enter-active{
            transition: transform 0.5s ease, opacity 0s ease 0.5s;
          }
          &.slideshow-leave-active {
            transition: transform 0.5s ease, opacity 0s ease 0.5s;
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
        &.invisble {
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
      overflow: hidden;
      width: 500 * $s;
      .dots {
        position: relative;
        display: inline-block;
        height: 5 * $s;
        margin-right: 10 * $s;
        width: 103 * $s;
        overflow: hidden;
        border-radius: 5 * $s;
        background-color: rgba(0,0,0,0.1);
        .selected {
          position: absolute;
          left: 0;
          transform: scale(0);
          width: 100%;
          height: 100%;
          background-color: rgba(90,90,90,1)
        }
      }
      .progress {
        animation: bounce-in 35s ease 0.4s;
        transform-origin: 0% 50%;
      }
      @keyframes bounce-in {
        0% {
          transform: scaleX(0);
        }
        100% {
          transform: scaleX(1);
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
