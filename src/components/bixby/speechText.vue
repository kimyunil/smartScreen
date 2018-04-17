<template>
  <transition-group
    name="staggered-fade"
    tag="div"
    class="text-container"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
     v-on:after-enter="afterEnter"
    v-on:enter="enter"
  >
    <span v-for="(word, index) in sText" :key="word" v-bind:data-index="index" class="sText">
        {{word}}
    </span>
  </transition-group>
</template>
<script>

export default {
  name: 'bixby-text',
  props: ['sText'],
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
      el.style.transition = 'opacity 0.3s ease-out';
    },
    enter(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(() => {
        el.style.opacity = 1;
      }, delay);
    },
    afterEnter(el) {
      el.style.transition = '';
    },
  },
};
</script>
<style scoped lang="scss">
 @import '../../mixins/scss/main';
.sText {
  color: white;
  font-size: 64 * $s;
  font-family: SamsungOneUI200;
}
</style>
