<template>
  <div class="poster" :style="{'background-image': `url(${item.details.poster})`}">
   <div class="icon" :style="[{'background-image': `url(${item.details.logo})`}]" :class="[item.details.logoType]"></div>
   <div class="bottom-footer">
     <template v-if="item.contentType==='simple'">
        <div class="text simple">
          <span v-html="item.details.text1"></span>
        </div>
      </template>
       <template v-if="item.contentType==='details'">
         <div class="details">
         <div class="text">
          <template v-for="(text, val) in item.details.text1">
            <div :key="text">
              <span>{{val}}</span>
              <span>{{text}}</span>
            </div>
          </template>
        </div>
        <div class="text text2">
          <template v-for="(text, val) in item.details.text2">
            <div :key="text">
              <span>{{val}}</span>
              <span>{{text}}</span>
            </div>
          </template>
        </div>
        </div>
       </template>
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
        width: `${(d.w * 100) / window.innerWidth}vw`,
        height: `${(d.h * 100) / window.innerWidth}vw`,
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
.poster {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  .bottom-footer {
    position: absolute;
    bottom: 0px;
    left: 80 * $s;
    width: calc(60% - #{ 80 * $s });
    margin-bottom: 40 * $s;
    .text {
      font-family: Helvetica;
      font-size: 36 * $s;
      text-align: left;
      color: white;
    }
    .details {
      .text2 {
        font-family: Helvetica;
        margin-top: 30 * $s;
        font-size: 32 * $s;
      }
    }

  }
  .icon {
    position: absolute;
    right: 0;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    bottom: 0;
    &.sqr {
      width: 50 * $s;
      height: 70 * $s;
      right: 5%;
      bottom: 30 * $s;
    }
    &.rect {
      width: 120 * $s;
      height: 100 * $s;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    &.rect-3 {
      width: 120 * $s;
      height: 100 * $s;
      right: 5%;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
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
