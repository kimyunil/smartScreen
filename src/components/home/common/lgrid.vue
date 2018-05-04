<template>
  <div class="list-grid">
    <div class="list" :style="{'transform': `translateX(${this.translateX}px)`}">
      <template v-if="itemType === 'grid'">
        <div class="grid-item item" v-for="(item, $index) in items" :key="item.title" :class="[{'shrink': isRemoteEnabled},{'selected': focus && $index === index}]">
          <div class="icon" :class="[item.logoType]" :style="[{'background-image': `url(${item.img})`}]"></div>
          <div class="bg-thumb" :src="item.thumbnail" :style="[{'background-image': `url(${item.thumbnail})`}, setWidth(item)]">
          </div>
          <div class="footer-text">
            <template v-for="text in item.bottomText.split('$')">
              <div :key="text">{{text}}</div>
            </template>
          </div>
        </div>
      </template>
      <template v-if="itemType === 'thumbnail'">
        <div class="thumbnail item" :style="[{'left': `${ (($index * 500) * 100) / 1920}vw`}]" v-for="(item, $index) in items" :key="item.title" :class="[{'shrink': isRemoteEnabled},{'goto': item.goto},{'selected': focus && $index === index}]">
          <div class="bg-thumb-cont" :style="[{'background-image': `url(${item.thumbnail})`}]">
            <!-- <img class="bg-thumb" :src="item.thumbnail"/> -->
          </div>
          <div class="footer-text" v-if="!item.goto">
             <div class="text">
               <div class="heading">
                 {{item.heading}}
               </div>
               <div class="sub-heading">
                  {{item.subheading}}
                </div>
              </div>
              <div class="icon" :style="{'background-image': `url(${item.icon})`}"/>
          </div>
        </div>
      </template>
      <template v-if="itemType === 'apps'">
        <div class="apps item" v-for="(item, $index) in items" :key="item.title" :class="[{'shrink': isRemoteEnabled},{'selected': focus && $index === index}]">
          <img class="bg-thumb" :src="item.img"/>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Messages from '../../../services/Messages';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
    focus: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  methods: {
    setWidth(item) {
      let width = item.dim.split('*')[0];
      if (this.isRemoteEnabled) {
        width = item.f_dim.split('*')[0];
      }
      return { width: `${(width * 100) / 1920}vw` };
    },
    handleKeyDown(type) {
      if (!this.focus) return;
      switch (type) {
        case 'UP':
          this.$emit('movefocus', { dir: 'up', from: 'lgrid' });
          break;
        case 'DOWN':
          this.$emit('movefocus', { dir: 'down', from: 'lgrid' });
          break;
        case 'LEFT':
          if (this.index !== 0) {
            this.index -= 1;
            this.scroll('left');
          }
          break;
        case 'RIGHT':
          if (this.index !== this.items.length - 1) {
            this.index += 1;
            this.scroll('right');
          }
          break;
        default:
          break;
      }
    },
    scroll(dir) {
      const ele = this.$el.querySelectorAll('.list .item')[this.index];
      if (dir === 'left') {
        const eleDim = ele.offsetLeft + this.translateX;
        if (eleDim < 0) {
          this.translateX = ele.offsetLeft * -1;
        }
      } else {
        // const ele = this.$el.querySelectorAll('.list .apps')[this.index];
        const parentWidth = this.$el.offsetWidth;
        const eleDim = ele.offsetWidth + ele.offsetLeft + parseInt(window.getComputedStyle(ele).marginRight, 10) + this.translateX;
        if (eleDim > this.$el.offsetWidth) {
          this.translateX -= (eleDim - parentWidth);
        }
      }
    },
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
  },
  data() {
    return {
      index: 0,
      translateX: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
@import '../../../mixins/scss/main';

.list-grid {
  position: relative;
  height: 100%;
  width: 100%;
  .list {
    position: absolute;
    white-space: nowrap;
    height: 100%;
    transition: transform 0.3s ease;
    .grid-item {
      position: relative;
      display: inline-block;
      height: 100%;
      margin-right: 15 * $s;
      border: 8 * $s solid transparent;
      margin-right: 0;
      transition: margin 0.3s ease;
      .bg-thumb {
        height: 100%;
        background-size: 100% 100%;
        background-position: center;
        transition: all 0.3s ease;
      }
      .icon {
        position: absolute;
        z-index: 2;
        right:20 * $s;
        width: 120 * $s;
        height: 120 * $s;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        bottom: 0 * $s;
        &.big {
          width: 200 * $s;
          height: 120 * $s;
        }
      }
      .footer-text {
        position: absolute;
        left: 40 * $s;
        width: calc(90% - #{ 40 * $s });
        font-size: 40 * $s;
        bottom: 100 * $s;
        color: white;
        white-space: initial;
        overflow: hidden;
        text-align: left;
        font-family: Helvetica;
      }
      &.shrink {
        margin-right: 30 * $s;
        border: 20 * $s solid transparent;
      }
      &.selected {
        border-image: url("/static/Images/home/border.png") 30 round;
        border-width: 20 * $s;
      }
    }
    .thumbnail {
      width: 520 * $s;
      height: 370 * $s;
      display: inline-block;
      // margin-right: 20 * $s;
      border: 20 * $s solid transparent;
      position: absolute;
      &.selected {
        border-image: url("/static/Images/home/border.png") 30 round;
        border-width: 20 * $s;
      }
      &.goto {
        width: 262 * $s;
        height: 100%;
         .bg-thumb-cont {
            width: 100%;
            height: 100%;
            background-size: 100% 102%;
         }
      }
      .bg-thumb-cont {
        position: relative;
        width: 100%;
        height: 270 * $s;
        background-size: 105% 100%;
        background-position: center -5 * $s;
        background-repeat: no-repeat;
        overflow: hidden;
        .bg-thumb{
          position: relative;
        }
      }
      .footer-text {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 15 * $s;
        height:100 *$s;
        background: white;
        justify-content: space-around;
        display: flex;
        .text {
        display: flex;
        flex-direction: column;
        width: 70%;
        justify-content: space-around;
         text-align: left;
        .heading {
          font-size: 24 * $s;
          font-family: Helvetica;
        }
        .subheading {
          position: relative;
          font-family: Helvetica;
          font-size: 18 * $s;
        }
        }
        .icon {
          width: 20%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
   .apps {
      width: 260 * $s;
      height: 260 * $s;
      border: 20 * $s solid transparent;
      display: inline-block;
      margin-right: 84 * $s;
      position: relative;
      .bg-thumb {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      &.selected {
        border-image: url("/static/Images/home/border.png") 30 round;
        border-width: 20 * $s;
        // border: 20 * $s solid transparent;
      }
    }
  }
}
</style>
