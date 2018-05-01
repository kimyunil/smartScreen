<template>
  <div class="tile" :style="{'background-image': `url(${item.details.tile})`}">
    <div class="icon" :style="[{'background-image': `url(${item.details.logo})`}]" :class="[item.details.logoType]">
    </div>
    <div class="header-text" >
      <div class="sponsor" v-if="item.details.topLeftText !== null">
        <span v-html="item.details.topLeftText"></span>
      </div>
    </div>
    <div class="bottom-footer">
      <div class="sponsored" v-if="item.contentType === 'sponsored' || item.contentType === 'time'">
        <span v-html="item.details.bottomText"></span>
      </div>
    </div>
    <template v-if="item.key === 'hbo' || item.key === 'hulu'">
      <div class="seekbar">
        <div class="progress" :style="{'width': `${item.elapsedTime/item.total * 100}%`}">
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dim(d) {
      return {
        width: `${(d.w * 100) / 1920}vw`,
        height: `${(d.h * 100) / 1920}vw`,
      };
    },
  },
  mounted() {
  },
  destroyed() {
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../../mixins/scss/main';
.tile {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  .header-text {
    position: absolute;
    left: 30 * $s;
    top: 20 * $s;
    .sponsor {
      font-family: Helvetica;
      font-size: 30 * $s;
      color: white;
    }
    .time {
     font-family: Helvetica;
      font-size: 50 * $s;
      color: white;
    }
  }
  .bottom-footer {
    position: absolute;
    bottom: 0px;
    left: 30 * $s;
    margin-bottom: 30 * $s;
    width: calc(90% - #{ 30 * $s });
    .sponsored {
      font-family: Helvetica;
      font-size: 40 * $s;
      text-align: left;
      color: white;
    }

  }
  .seekbar {
    background: red;
    width: 87%;
    height: 8 * $s;
    margin:0 15 * $s;
    position: absolute;
    bottom: 10 * $s;
    border-radius:20 * $s;
    overflow: hidden;
    background: rgba(255,255,255,0.1);
    .progress {
      position: absolute;
      left: 0;
      width: 20%;
      height: 100%;
      background: white;
    }
  }
  .icon {
    position: absolute;
    right: 0;
    bottom: 0 * $s;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    &.sqr {
      width: 50 * $s;
      height: 70 * $s;
    }
    &.rect {
      width: 120 * $s;
      height: 100 * $s;
    }
    &.rect-2 {
      right: 5%;
      bottom: 30 * $s;
      width: 75 * $s;
      height: 30 * $s;
    }
  }
}
</style>
