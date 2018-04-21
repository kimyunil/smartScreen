<template>
  <div class="poster" :style="{'background-image': `url(${item.details.poster})`}">
   <img class="icon" :src="item.logo"/>
   <div class="bottom-footer">
     <template v-if="item.contentType==='simple'">
        <div class="text simple">
          <template v-for="text in item.details.text1.split('$')">
          <div :key="text">{{text}}</div>
          </template>
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
    margin-bottom: 30 * $s;
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
    right: 6%;
    bottom: 5%;
  }
}
</style>
