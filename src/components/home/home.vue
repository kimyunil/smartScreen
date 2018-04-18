<template>
  <div class="home">
    <div class="dashboard">
      <transition name="show">
      <div class="header" v-if="isRemoteEnabled">
        <!-- <basic-button class='watch'
              :focused="true">
              {{ item.text }}
            </basic-button> -->
            <button>Hello</button>
      </div>
      </transition>
      <div class="grid-container" :class="{'shrink':isRemoteEnabled, 'listing': !slideshow}" @transitionend="shrinkTransitionCB">
        <div class="grid-templates" v-for="page in pages" :key="page.title">
          <grid :details="page" />
        </div>
      </div>
    </div>
     <transition name="show">
        <div class="bixby-suggestions" v-if="!isRemoteEnabled">
          <div class="text-suggestion">
            <span class="text"> Say</span>
            <span class="suggestions">" Hey Bixby, show me more..."</span>
          </div>
        </div>
     </transition>
  </div>
</template>
<script>
// import Lumi from '@samsung/lumi';
// const { BasicButton, } = Lumi.Ui;
import grid from './subcomps/grid';
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapGetters('home', {
      pages: 'GET_PAGES',
    }),
  },
  methods: {
    shrinkTransitionCB() {
      if (this.isRemoteEnabled) {
        this.slideshow = false;
      } else {
        this.slideshow = true;
      }
    },
  },
  data() {
    return {
      remote: true,
      slideshow: false,
    };
  },
  components: {
    grid,
  },
};
</script>
<style scoped lang="scss">
@import '../../mixins/scss/main';

.home {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-image: url('/static/bg.png');
  background-color: grey;
  background-size: 100%;
  background-repeat: no-repeat;
  .dashboard {
    position: relative;
    width: 100%;
    height: 945 * $s;
    .header {
      position: relative;
      height: 230 * $s;
      width: 100%;
      &.show-enter {
        height: 0;
        opacity: 0;
      }
      &.show-leave-to {
        height: 0;
        opacity: 0;
      }
      &.show-enter-active{
        transition: height 0.3s ease, opacity 0.1s ease;
      }
      &.show-leave-active {
        transition: height 0.3s ease, opacity 0.1s ease;
      }
    }
    .grid-container {
      position: absolute;
      width: 1900 * $s;
      margin: 10 * $s;
      height: 940 * $s;
      left:0;
      overflow: hidden;
      transition: margin 0.3s ease, width 0.3s ease;
      .grid-templates {
        position: absolute;
        height: 100%;
        width: 100%;
      }
      &.shrink {
        margin: 40 * $s;
        left: 60 * $s;
        height: 880 * $s;
        width: 1720 * $s;
        overflow: visible;
      }
      &.listing {
        .grid-templates {
          position: relative;
        }
      }
    }
  }
  .bixby-suggestions {
    position: relative;
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
