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
      <template v-if="itemType === 'sqr'">
        <div class="sqr item" :style="{'background-image': `url('${item.thumbnail}')`}" v-for="(item, $index) in items" :key="item.title" :class="[{'shrink': isRemoteEnabled},{'selected': focus && $index === index}]">
        </div>
      </template>
      <template v-if="itemType === 'sqrThumb'">
        <div class="sqrThumb item" v-for="(item, $index) in items" :key="item.title" :class="[{'shrink': isRemoteEnabled},{'selected': focus && $index === index}]">
          <div class="focus-div" v-if="focus && $index === index"></div>
          <div class="thumb-img" :style="{'background-image': `url('${item.thumbnail}')`}">
            <div class = "progress" v-if = "item.progress">
              <div class="elapsed" :style = "{'width': `${item.progress}%`, 'background-color': `${item.progressColor}`}"></div>
            </div>
          </div>
          <div class="meta">
            <div class="thumb-icons">
              <img :src="item.logo"/>
              <template v-for="img in item.extraImg">
                <img :src="img" :key="img"/>
              </template>
            </div>
            <div class="thumb-title">
              <span v-html="item.title"></span>
            </div>
            <div class="thumb-subtitle">
              <span v-html="item.subtitle"></span>
            </div>
          </div>
        </div>
      </template>
      <template v-if="itemType === 'recThumb'">
        <div class="recThumb item" v-for="(item, $index) in items" :key="item.title" :class="[{'shrink': isRemoteEnabled},{'selected': focus && $index === index}]">
          <div class="focus-div" v-if="focus && $index === index"></div>
          <div class="thumb-img" :style="{'background-image': `url('${item.thumbnail}')`}">
          </div>
            <div class="meta">
              <div class="thumb-icons">
                <img :src="item.logo"/>
              </div>
              <div class="thumb-title">
                <span v-html="item.title"></span>
              </div>
              <div class="thumb-subtitle">
                <span v-html="item.subtitle"></span>
              </div>
          </div>
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
    .sqrThumb {
      position: relative;
      display: inline-block;
      height: 100%;
      vertical-align: top;
      width: 529 * $s;
      height: 421 * $s;
      margin-right: 23 * $s;
      // overflow: hidden;
      .focus-div {
        position: absolute;
        left: -20 * $s;
        height: calc(100% + #{40 * $s});
        width: calc(100% + #{40 * $s});
        top: -20 * $s;
        border-radius: 10 * $s;
        box-shadow: 0 20 * $s 40 * $s 0 rgba(0,0,0,0.5);
        background-color: white;
      }
      .thumb-img {
        position: relative;
        width: 100%;
        height: 298 * $s;
        border-radius: 10 * $s;
        background-size: 100% 100%;
        .progress {
          position: absolute;
          width: calc(100% - #{40 * $s});
          background: rgba(255,255,255,0.6);
          bottom: 18 * $s;
          left: 20 * $s;
          height: 5 * $s;
          .elapsed {
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 5 * $s;
            height: 100%;
            background: #FF2624;
          }
        }
      }
      .thumb-icons {
        position: relative;
        height: 30 * $s;
        display: flex;
        justify-content: space-between;
        display: flex;
        img {
          margin-top: 3 * $s;
          margin-bottom: 0;
          height: 100%;
        }
      }
      .thumb-title {
        text-align: left;
        position: relative;
        span {
          font-family: SamsungOneUI400;
          font-size: 30 * $s;
          color: rgba(80,80,80,1);
        }
      }
      .thumb-gist {
        text-align: left;
        position: relative;
        span {
          font-family: SamsungOneUI400;
          font-size: 30 * $s;
          color: rgba(80,80,80,1);
        }
      }
      .thumb-subtitle {
        text-align: left;
        position: relative;
        color: rgba(80,80,80,1);
        span {
        font-family: SamsungOneUI400;
        font-size: 26 * $s;
        color: rgba(80,80,80,1);
        }
      }
      .meta {
        margin-top: 10 * $s;
        div {
          margin: 4 * $s 0;
        }
      }
      &.selected {
        .thumb-img {
          border-radius:0;
          border-top-left-radius: 10 * $s;
          border-top-right-radius: 10 * $s;
         transform: scale(1.08, 1.08);
         transform-origin: bottom center;
        }
         .meta {
           z-index: 99;
         }
      }
    }
    .sqr {
      position: relative;
      height:250 * $s;
      width: 250 * $s;
      display: inline-block;
      vertical-align: top;
      margin-right: 80 * $s;
      background-size: 100% 100%;
      &.selected {
         box-shadow: 0 20 * $s 40 * $s 0 rgba(0,0,0,0.5);
         transform: scale(1.21);
         border-radius: 10 * $s;
         background-color: white;
      }
    }
    .recThumb {
      position: relative;
      display: inline-block;
      height: 100%;
      width: 247 * $s;
      vertical-align: top;
      height: 356 * $s;
      margin-right: 44 * $s;
      .focus-div {
        position: absolute;
        left: -20 * $s;
        height: calc(100% + #{40 * $s});
        width: calc(100% + #{40 * $s});
        top: -20 * $s;
        border-radius: 10 * $s;
        box-shadow: 0 20 * $s 40 * $s 0 rgba(0,0,0,0.5);
        background-color: white;
      }
      .thumb-img {
        position: relative;
        width: 100%;
        border-radius: 10 * $s;
        height: 247 * $s;
        background-size: 100% 100%;
      }
      .thumb-icons {
        position: relative;
        height: 30 * $s;
        display: flex;
        justify-content: space-between;
        img {
          margin-top: 3 * $s;
          margin-bottom: 0;
          height: 100%;
        }
      }
      .thumb-title {
        text-align: left;
        position: relative;
        span {
          font-family: SamsungOneUI400;
          font-size: 28 * $s;
          color: rgba(80,80,80,1);
        }
      }
      .thumb-gist {
        text-align: left;
        position: relative;
        span {
          font-family: SamsungOneUI400;
          font-size: 30 * $s;
          color: rgba(80,80,80,1);
        }
      }
      .thumb-subtitle {
        text-align: left;
        position: relative;
        color: rgba(80,80,80,1);
        span {
        font-family: SamsungOneUI400;
        font-size: 26 * $s;
        color: rgba(80,80,80,1);
        }
      }
      .meta {
        margin-top: 6 * $s;
        div {
          margin: 2 * $s 0;
        }
      }
      background-color: transparent;
      &.selected {
        .thumb-img {
         transform: scale(1.16);
         transform-origin: bottom center;
         border-radius: 0 * $s;
         border-top-left-radius: 10 * $s;
         border-top-right-radius: 10 * $s;
        }
        .meta {
          height: 150 * $s;
        }
      }
    }
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
