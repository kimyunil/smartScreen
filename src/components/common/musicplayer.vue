<template>
  <div class="audio-player">
    <audio :src="musicplayer.url" @loadstart="musicLoad(-1, $event)" @loadeddata="musicLoad(1, $event)" @timeupdate="updateTime($event)"/>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
 mounted() {
   this.$nextTick(() => {
     this.audioEle = this.$el.querySelector('audio');
   })
 },
 destroyed() {

 },
 data() {
   return {
     audioEle: null,
   };
 },
 computed: {
   ...mapState('source', {
     musicplayer: state => state.musicplayer,
     playstate: state => state.musicplayer.playerState,
   })
 },
 watch: {
   playstate(val, old) {
     if(val === 0) {
       this.play();
     } else if(val === 1) {
       this.pause();
     }
   },
 },
 methods: {
   ...mapMutations('source', {
     totalDuration: 'SET_MUSIC_DURATION',
     elapsedTime: 'SET_MUSIC_ELAPSED',
     updateState: 'MUSIC_STATE_UPDATE',
   }),
   updateTime(event) {
     this.elapsedTime(event.target.currentTime);
   },
  musicLoad(status, event) {
    console.log(status, event);
    if (status === -1) {
      this.updateState(-1);
      this.elapsedTime(event.target.currentTime);
      this.totalDuration(event.target.duration);
    } else {
      // this.updateState(0);
      this.elapsedTime(event.target.currentTime);
      this.totalDuration(event.target.duration);
    }
  },
   play() {
     this.audioEle.play();
   },
   pause() {
     this.audioEle.pause();
   },
 }
}
</script>
<style lang="scss">
</style>