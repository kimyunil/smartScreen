<template>
  <div class="result">
    <div class="title">
      {{title}}
    </div>
    <div class="slideshow">
      <transition :name="transitionName">
        <div class="slides"  :key="currSlide.img" :style="{'background-image': `url('${currSlide.img}')`}">
        </div>
      </transition>
    </div>
      <div class="slides-dots" v-if="!isRemoteEnabled && slides.length > 1">
        <div class="pagination-dots">
          <div class="dots"
            v-for="(i, idx) in slides"
            :key="i.title"
            :class="{'selected': index === idx}"
          >
          </div>
        </div>
      </div>
    <drivers :theme="'light'" :drivers="currSlide.suggestions" :sayWord="currSlide.sayWord" :toggle="!isRemoteEnabled" ></drivers>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import drivers from '../common/drivers';
import Messages from '../../services/Messages';

export default {
  name: 'result',
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.addSlideShow();
    this.homeTimer = setTimeout(() => {
      // this.switch_comp({ replace: true, name: 'home' });
    }, 6000);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
    clearTimeout(this.homeTimer);
    this.updateIdx(0);
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapState('result', {
      index: state => state.resultData.idx,
      slides: state => state.resultData.slides,
      resultDB: state => state.resultData.data,
      title: state => state.resultData.title,
    }),
    transitionName() {
      if (this.slides.length > 1) return 'slideshow';
      return 'none';
    },
    currSlide() {
      return this.resultDB[this.slides[this.index]];
    },
  },
  data() {
    return {
      intervalId: null,
      timeout: 10000,
      homeTimer: null,
    };
  },
  methods: {
    ...mapMutations('result', {
      updateIdx: 'UPDATE_SLIDE_IDX',
    }),
    ...mapActions({
      switch_comp: 'SWITCH_COMPONENT',
    }),
    startSlideShow() {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.updateIdx(this.index + 1);
      }, this.timeout);
    },
    addSlideShow() {
      this.stopSlideShow();
      if (this.slides.length > 1) {
        this.startSlideShow();
      } else {
        this.stopSlideShow();
      }
    },
    stopSlideShow() {
      clearInterval(this.intervalId);
    },
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'BACK':
          this.$emit('exit', { from: 'result' });
          break;
        default:
          break;
      }
    },
  },
  watch: {
    slides() {
      this.addSlideShow();
    },
  },
  components: {
    drivers,
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';

.result {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('/static/Images/results/bgbg_result.png');
  background-size: 100% 100%;
  .slideshow   {
    position: absolute;
    width: 100%;
    height: 100%;
    .slides {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
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
  }
  .title {
    position: absolute;
    top: 60 * $s;
    left: 60 * $s;
    font-family: Helvetica;
    font-size: 30 * $s;
  }
  .slides-dots  {
    position: absolute;
    bottom: 0 * $s;
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
      // width: 84 * $s;
      justify-content: space-between;
      .dots {
        height: 10* $s;
        margin-right: 30 * $s;
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
