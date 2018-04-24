<template>
  <transition name="show" appear>
    <div class="header">
      <div class="nav_list" :style="{'transform': `translateX(${translate}vw)`}">
          <div class="nav-button" v-for="(item, index) in navItems" :key="item.title" :class="[{'focus': (focus && hIdx === index)}, {'hide': (nav_selected !== index) && !isRemoteEnabled && !focus}, {'idle': nav_selected === index && nav_selected !== 0 && !isRemoteEnabled && !focus},{'selected': selectedIdx === index}]">
          {{item.title}}
          </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import Messages from '../../../services/Messages';

export default {
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.$nextTick(() => {
      this.css.listOffset = this.$el.querySelector('.nav_list').offsetLeft;
      this.css.headerWidth = this.$el.offsetWidth;
    });
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapGetters('home', {
      nav_selected: 'GET_SELECTED_NAV',
    }),
    translate() {
      return ((this.translateX * 100) / window.innerWidth);
    },
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  props: {
    navItems: {
      type: Array,
      required: true,
    },
    focus: {
      type: Boolean,
      required: true,
    },
    selectedIdx: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapMutations('home', {
      selectHeaderItem: 'select_nav',
    }),
    handleKeyDown(type) {
      if (!this.focus) return;
      switch (type) {
        case 'DOWN':
          this.$emit('movefocus', { dir: 'down', from: 'header' });
          break;
        case 'LEFT':
          if (this.hIdx > 0) {
            this.hIdx -= 1;
            const ele = this.$el.querySelectorAll('.nav-button')[this.hIdx];
            this.translateX = ((ele.offsetLeft) * -1);
          }
          this.selectHeaderItem(this.hIdx);
          break;
        case 'SELECT':
          break;
        case 'RIGHT':
          if (this.hIdx < this.navItems.length - 1) {
            this.hIdx += 1;
            const ele = this.$el.querySelectorAll('.nav-button')[this.hIdx];
            this.translateX = ((ele.offsetLeft) * -1);
          }
          this.selectHeaderItem(this.hIdx);
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      hIdx: 0,
      css: {
        offsetLeft: 0,
        headerWidth: 0,
      },
      translateX: 0,
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../../mixins/scss/main';

.header {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 20 * $s 0;
  overflow: hidden;
  .nav_list {
    position: relative;
    width: auto;
    height: auto;
    display: flex;
    height: 80 * $s;
    left: 140 * $s;
    transition: transform 0.3s ease;
    .nav-button {
      position: relative;
      margin-right: 50 * $s;
      height: 82 * $s;
      font-size: 30 * $s;
      padding: 0 70* $s;
      box-sizing: content-box;
      white-space: nowrap;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      background: transparent;
      font-family: SamsungOneUI700;
      transition: transform 0.3s ease;
      &:last-child {
        margin-right: 80 * $s;
      }
      &.selected {
        background: grey;
        color: white;
        box-shadow: 0 0 0;
      }
      &.focus {
        background: white;
        transform: scale(1.05);
        color: black;
        box-shadow: 0 0.52083vw 0.67708vw 0 rgba(122, 122, 122, 0.35);
      }
      &.idle {
         color: black;
         background: transparent;
      }
      &.hide {
        opacity: 0;
      }
    }
  }
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
</style>
