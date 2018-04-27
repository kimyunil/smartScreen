<template>
<div class="text-container">

  <transition name="slidefadeenter">
    <span class="smallText" v-if="isSpeechEnabled">
      {{response}}
    </span>
  </transition>
  <transition name="slidefadeleave">
    <div class="responseText" v-if="!isSpeechEnabled">
      {{response}}
    </div>
  </transition>
</div>
</template>
<script>

export default {
  name: 'bixby-text',
  props: {
    response: {
      type: String,
    },
    isSpeechEnabled: {
      type: Boolean,
    },
  },
};
</script>
<style scoped lang="scss">
 @import '../../mixins/scss/main';
 .text-container {
   text-align: left;
   position: absolute;
   width: 100%;
   height: 100%;
   .responseText {
     position: absolute;
      color: white;
      font-size: 64 * $s;
      font-family: TTNormsMedium;
    }
    .smallText {
      position: absolute;
      font-family: TTNormsLight;
      font-size: 36 * $s;
      color: rgba(255,255,255,0.8);
      top: -80 * $s;
    }
 }
  .slidefadeleave-leave-active {
    transition: transform 0.6s ease, opacity 0.5s ease;
  }
  .slidefadeleave-leave-to{
    transform: translateY(#{-40 * $s});
    opacity: 0;

  }
  .slidefadeenter-enter-active {
    transition: transform 0.5s ease 0.3s, opacity 0.4s ease 0.4s;
  }
  .slidefadeenter-enter {
    transform: translateY(#{20 * $s});
    opacity: 0;
 }

</style>
