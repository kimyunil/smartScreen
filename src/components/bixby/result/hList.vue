<template>
  <transition name="slide">
    <div class="h-list">
      <div class="head">
        <span>
          Here are movies with Tom Hanks
        </span>
      </div>
     
      <div class="list">
        <div v-for="item in 4" class="item" :key="item">
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {

};
</script>
<style scoped lang="scss">
 @import '../../../mixins/scss/main';
  .h-list {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 670 * $s;
    overflow: hidden;
    background-color: grey;
    .list {
      display: flex;
      height: auto;
      position: absolute;
      top: 0 * $s;
      background: purple;
   
      .item {
        position: relative;
        width: 400 * $s;
        height:350 * $s;
        margin: 10 * $s;
        background: blue;
      }
    }    
    &.slide-enter-active, &.slide-leave-active {
      transition: bottom 0.35s;
    }
    &.slide-enter {
      bottom: -670 * $s;
    }
    &.slide-leave-to {
      bottom: -670 * $s;
    }
  }

</style>
