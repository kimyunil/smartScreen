<template>
  <div class="text-container">
    <span class="sText">
        {{sText}}
    </span>
  </div>
</template>
<script>

export default {
  name: 'bixby-text',
  props: ['sText'],
  methods: {
    beforeEnter(ele) {
      const el = ele;
      el.style.opacity = 0;
      el.style.height = 0;
      el.style.transition = 'opacity 0.3s ease-out';
    },
    enter(ele, done) {
      const el = ele;
      const delay = el.dataset.index * 150;
      el.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        el.style.opacity = 1;
        done();
      }, delay);
    },
    afterEnter(ele) {
      const el = ele;
      el.style.transition = '';
    },
  },
};
</script>
<style scoped lang="scss">
 @import '../../mixins/scss/main';
 .text-container {
   text-align: left;
   .sText {
      color: white;
      text-align: left;
      font-size: 64 * $s;
      font-family: TTNormsMedium;
    }
 }

</style>
