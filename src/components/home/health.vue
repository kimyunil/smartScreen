<template>
  <div class="health_well">
    <div class="grid-container"
      :class="{'shrink':isRemoteEnabled, 'listing': !slideshow, 'squeeze-header': (isRemoteEnabled && !active)}"
      @transitionend="shrinkTransitionCB"
    >
    <template v-if="slideshow">
      <transition :name="transitionName">
        <div class="grid-templates" :key="index">
          <lgrid v-if="pageType === 'lgrid'" :items="content" :itemType="'grid'" :focus="false" @movefocus="movefocus"/>
          <grid :details="grids[index]" :focus="false" v-else/>
        </div>
      </transition>
    </template>
    <div class="grid-list" v-else :style="{'transform': `translateY(${translateY}vw)`}">
      <div class="grid-templates template">
        <lgrid v-if="pageType === 'lgrid'" :items="content" :itemType="'grid'" :focus="(gridFocus && pageIdx === 0)" @movefocus="movefocus"/>
        <grid v-else :details="grids[index]" :focus="(gridFocus && pageIdx === 0)" @movefocus="movefocus"/>
      </div>
      <template v-for="(subCat, index) in subCategories">
      <div class="grid-templates template subcategory-template"  :key="index">
        <div class="title">{{subCat.title}}</div>
        <lgrid :items="subCat.items" :focus="(gridFocus && pageIdx === (1 + index))" :itemType="'thumbnail'" class="subCategoryList" @movefocus="movefocus"/>
      </div>
      </template>
      <div class="recent-apps template">
          <div class="title">Apps</div>
          <div class="apps-list">
              <lgrid :items="appsItems" :focus="(subCategories.length + 1) === pageIdx" :itemType="'apps'" class="subCategoryList" @movefocus="movefocus"/>
            </div>
          </div>
      </div>
    </div>
      <transition name="show">
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
     </transition>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import lgrid from './common/lgrid';
import grid from './common/grid';
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
      'isBixbyActive',
    ]),
    ...mapState('home', [
      'timeout',
    ]),
    ...mapGetters('home', {
      catGrid: 'GET_CAT_GRID',
      pageSubCat: 'PAGE_SUB_CAT_HEALTH',
      appsItems: 'GET_HEALTH_APPS',
    }),
    subCategories() {
      return this.pageSubCat(this.index);
    },
    pageType() {
      return this.grids[this.index].template;
    },
    content() {
      const array = [];
      const details = this.grids[this.index];
      for (let i = 0; i < details.content.length; i += 1) {
        const key = details.content[i];
        array[i] = details[key];
      }
      return array;
    },
    grids() {
      const gridPages = this.catGrid(1);
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
    ...mapMutations('home', {
      updatePageIdx: 'UPDATE_PAGE_IDX',
    }),
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
          break;
        case 'RIGHT':
          break;
        case 'DOWN':
          break;
        case 'LEFT':
          break;
        default:
          break;
      }
    },
    startSlideShow() {
      this.transitionName = 'slideshow';
      this.slideshow = true;
      console.log(this.timeout);
      this.intervalId = setInterval(() => {
        this.index = (((this.index) + 1) % this.grids.length);
      }, this.timeout);
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
      if (param.from === 'lgrid' || param.from === 'grid') {
        if (param.dir === 'up') {
          if (this.pageIdx === 0) {
            this.$emit('movefocus', { dir: 'up', from: 'content' });
          } else {
            console.log(this.pageIdx);
            this.pageIdx -= 1;
            const top = this.$el.querySelectorAll('.grid-list .template')[this.pageIdx].offsetTop;
            if (this.translate * -1 > top) {
              this.translate += ((this.translate * -1) - top);
            }
            console.log(top);
            // this.scroll('up', top);
          }
        } else if (param.dir === 'down') {
          if (this.pageIdx !== (this.subCategories.length + 1)) {
            this.pageIdx += 1;
            const top = this.$el.querySelectorAll('.grid-list .template')[this.pageIdx].offsetTop + this.translate;
            const height = this.$el.querySelectorAll('.grid-list .template')[this.pageIdx].offsetHeight;
            const diff = this.$el.offsetHeight - (top + height);
            console.log(diff, height, top);
            if (diff < 0) {
              this.translate += (diff);
            }
          }
        }
      }
      if (this.pageIdx === 0) {
        this.$emit('showHeader', true);
      } else {
        this.$emit('showHeader', false);
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
    lgrid,
    grid,
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
    index(val) {
      this.updatePageIdx(val);
    },
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
.health_well {
  position: absolute;
  width: 100%;
  height: 100%;
  .grid-container {
    position: absolute;
    width: 100%;
    // margin: 10 * $s;
    height: 940 * $s;
    left:0;
    transition: margin 0.3s ease, width 0.3s ease, left 0.3s ease;
    .grid-list {
      transition: transform 0.4s ease;
      height: 100%;
      .recent-apps {
        position: relative;
        height: 400 * $s;
        padding:50 * $s 15 * $s;
        width: 100%;
        .title {
          text-align: left;
          height: 50 * $s;
          font-family:Helvetica;
          font-size: 30 * $s;
        }
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
    }
    .grid-templates {
      position: absolute;
      height: 827 * $s; /* Height 807 + 40 border */
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
        &.template {
          position: relative;
          &.subcategory-template {
            position: relative;
            // left: 15 * $s;
            width: 100%;
            padding: 50 * $s 15 * $s;
            height: auto;
            .title {
              text-align: left;
              height: 50 * $s;
              font-family:Helvetica;
              font-size: 30 * $s;
            }
            width: 100%;
            .subCategoryList {
              height: 370 * $s;
            }
          }
        }
    }
    &.shrink {
      // width: 1720 * $s;
      width: 100%;
      .grid-templates {
        &:not(.subcategory-template) {
          height: 760 * $s;
        }
      }
    }
    &.squeeze-header {
      // margin-top: 150 * $s;
    }
  }
    .bixby-suggestions {
    position: absolute;
    bottom: -30 * $s;
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
      transition: opacity 0.3s ease;
    }
    &.show-leave-active {
      transition: opacity 0.3s ease;
    }
  }
}
</style>
