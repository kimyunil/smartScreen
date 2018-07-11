<template>
  <div class="wrapper" :style="translateY" :class="{'scrollDown': (!isRemoteEnabled && scrollVert === 1), 'scrollUp': (!isRemoteEnabled && scrollVert === 2)}">
    <div class="headings" :class="[activeClass]">
        <div class="nav-button" v-for="(item, index) in navItems" :key="item.title" :class="{'selected': selectedIdx === index && enabled && !focus}">
        <div class="focus_bg"></div>
        <span>{{item.title}}</span>
        </div>
    </div>
    <div class="content-wrapper">
      <contentlist class="contentlist" :active="enabled && focus === 1" :scroll="scroll" :translate="translate"></contentlist>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
// import drivers from '../common/drivers';
import Messages from '../../services/Messages';
import contentlist from './contentlist';

export default {
  name: 'homescreen',
  props: {
    enabled: {
      type: Boolean,
    },
  },
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  data() {
    return {
      scrollVert: 0,
      translate: 0,
    };
  },
  computed: {
    ...mapGetters('home', {
      navItems: 'GET_NAVS',
      focus: 'HOME_FOCUS',
    }),
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapState('home', [
      'selectedIdx',
    ]),
    activeClass() {
      if (this.enabled) {
        return 'push-down';
      }
      return '';
    },
    translateY() {
      return { transform: `translateY(${((this.translate * 100) / window.innerWidth)}vw)` };
    },
  },
  methods: {
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
    ...mapMutations('home', {
      setnav: 'SET_NAV',
      setfocus: 'SET_HOME_FOCUS',
    }),
    handleKeyDown(type) {
      if (!this.active && !this.enabled) return;
      switch (type) {
        case 'EXTRA':
          break;
        case 'RIGHT':
          if (this.focus === 0) {
            if (this.selectedIdx < this.navItems.length - 1) {
              this.setnav(this.selectedIdx + 1);
            }
          }
          break;
        case 'DOWN':
          this.setfocus(1);
          break;
        case 'LEFT':
          if (this.focus === 0) {
            if (this.selectedIdx > 0) {
              this.setnav(this.selectedIdx - 1);
            }
          }
          break;
        case 'EIGHT':
          if (this.scrollVert === 1) {
            this.scrollVert = 2;
          } else if (this.scrollVert === 2) {
            this.scrollVert = 1;
          } else if (this.scrollVert === 0) {
            this.scrollVert = 1;
          }
          break;
        case 'NINE':
          break;
        default:
          break;
      }
    },
  },
  watch: {
    scrollVert(val) {
      const el = this.$el;
      if (val === 1) {
        console.log(this.translate);
        this.anim = el.animate([
          { transform: `translateY(${this.translate}px)` },
          { transform: 'translateY(-100%)' },
        ], {
          duration: 50000,
          fill: 'forwards',
        });
      } else if (val === 2) {
        this.anim = el.animate([
          { transform: 'translateY(-100%)' },
          { transform: `translateY(${this.translate}px)` },
        ], {
          duration: 50000,
          fill: 'forwards',
        });
      }
    },
  },
  components: {
    contentlist,
  },
};
</script>
<style scoped lang="scss">
  @import '../../mixins/scss/main';
  .wrapper {
    position: relative;
    left: 0;
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
    &.scrollDown {
      animation-name: scrollV Dwn;
      animation-duration: 10s;
      animation-fill-mode: forwards;
    }
    .headings {
      height: 80 * $s;
      display: flex;
      left: 144 * $s;
      position: relative;
      width: 1710 * $s;
      justify-content: space-between;
      .nav-button {
        box-sizing: content-box;
        font-family: TTNormsBold;
        font-size: 24 * $s;
        color: rgba(80,80,80,0.3);
        display: flex;
        position: relative;
        align-items: center;
        .focus_bg {
          position: absolute;
          left: -40 * $s;
          top: 0 * $s;
          width: calc(100% + #{80 * $s});
          height: calc(100%);
          border-radius: 10 * $s;
        }
        span {
          position: relative;
          z-index: 222;
        }
        &.selected {
          .focus_bg {
            background: white;
          }
          span {
            color: rgba(80,80,80,1)!important;
          }
        }
      }
      &.push-down {
        margin-top: 30 * $s;
        .nav-button{
          span {
            color: rgba(80,80,80,0.6);
            font-size: 30 * $s;
          }
        }
      }
    }
    .content-wrapper {
      position: relative;
      width: 100%;
      height: 970 * $s;
      .contentlist {
        position: relative;
        margin-top: 60 * $s;
      }
    }
    @keyframes scrollVDwn {
    to {transform: translateY(-100%);}
    }
  }
</style>
