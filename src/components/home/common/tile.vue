<template>
  <div class="tile" :style="{'background-image': `url(${item.details.tile})`}">
    <div class="icon" :style="[{'background-image': `url(${item.details.logo})`},dim(item.details.dim)]">
    </div>
    <div class="header-text" >
      <div class="sponsor" v-if="item.contentType === 'sponsored'">
        Sponsored
      </div>
      <div class="time" v-if="item.contentType === 'time'">
        <span>06hr</span>
        <span>35m</span>
      </div>
    </div>
    <div class="bottom-footer">
      <div class="sponsored" v-if="item.contentType === 'sponsored' || item.contentType === 'time'">
        {{item.details.bottomText}}
      </div>
    </div>
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
    .sponsored {
      font-family: Helvetica;
      font-size: 40 * $s;
      text-align: left;
      color: white;
    }

  }
  .icon {
    position: absolute;
    right: 5%;
    bottom: 30 * $s;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
