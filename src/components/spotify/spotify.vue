<template>
  <div class="spotify">
    <div class="wrapper">
      <div class="background" :style="{'background-image': `url(${musicplayer.details.art})`}">
      </div>
      <div class="player">
        <div class="thumbnail-controls">
         <div class="playbck bkwd">
          </div>
          <div class="thumbnail" :style="{'background-image': `url(${musicplayer.details.thumbnail})`}">
            <div class="ctrl">
            </div>
          </div>
           <div class="playbck ffw">
          </div>
        </div>
        <div class="metadata">
          <div class="song">
            {{musicplayer.details.song}}
          </div>
          <div class="artist">
            {{musicplayer.details.artist}}
          </div>
        </div>
        <div class="seekbar">
          <div class="start time">
            {{elapsed}}
          </div>
          <div class="seekbar">
            <div class="progress" :style="{'width': `${progress}%`}">
            </div>
          </div>
          <div class="end time">
            {{total}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex';

export default {
  name: 'spotify',
  mounted() {
    this.initiateTimer();
    this.saveContinue('spotify');
  },
  destroyed() {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  },
  data() {
    return {
      timeoutId: null,
    };
  },
  methods: {
    ...mapActions({
      switch_comp: 'SWITCH_COMPONENT',
      saveContinue: 'SAVE_CONTINUE',
    }),
    // ...mapActions('source', {
    //   saveContinue: 'SAVE_CONTINUE',
    // }),
    initiateTimer() {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.timeoutId = setTimeout(() => {
        this.switch_comp({ replace: true, name: 'home' });
      }, 5000);
    },
  },
  computed: {
    ...mapState('source', {
      musicplayer: 'musicplayer',
      thumbnail: state => state.musicplayer.details.thumbnail,
    }),
    progress() {
      return (this.musicplayer.elapsedTime / this.musicplayer.total) * 100;
    },
    total() {
      let minutes = parseInt(this.musicplayer.total / 60, 10);
      let sec = parseInt((this.musicplayer.total % 60), 10);
      if (minutes < 10) minutes = `0${minutes}`;
      if (sec < 10) sec = `0${sec}`;
      return `${minutes}:${sec}`;
    },
    elapsed() {
      let minutes = parseInt(this.musicplayer.elapsedTime / 60, 10);
      let sec = parseInt((this.musicplayer.elapsedTime % 60), 10);
      if (minutes < 10) minutes = `0${minutes}`;
      if (sec < 10) sec = `0${sec}`;
      return `${minutes}:${sec}`;
    },
  },
  watch: {
    thumbnail() {
      this.initiateTimer();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';
  .spotify {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    // background: url('/static/Images/full.png');
    .wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
        .background {
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
          background-repeat: no-repeat;
       }
        .player {
          position: relative;
          width: 1070 * $s;
          height: 804 * $s;
          top: 140 * $s;
          display: flex;
          flex-direction: column;
          .thumbnail-controls {
            position: relative;
            width: 100%;
            height: 530 * $s;
            display: flex;
            justify-content: center;
            // top: 0;
            .thumbnail {
              position: relative;
              width: 530 * $s;
              height: 100%;
              margin: 0 93 * $s;
              display: flex;
              align-items: center;
              box-shadow: rgb(0,0,0) 0* $s 20* $s 42* $s 0* $s;
              justify-content: center;
              background-size: 100%;
              .ctrl {
                position: relative;
                width: 138 * $s;
                height: 138 * $s;
                background-image: url('/static/Images/spotify/pause.png');
                background-size: 100% 100%;
              }
            }
            .playbck {
              position: relative;
              height: 100%;
              width: 70 * $s;
              display: flex;
              align-items: center;
              background-repeat: no-repeat;
              background-position: center;
              &.ffw {
                background-image: url('/static/Images/spotify/nexticon.png');
                background-size: contain;
              }
              &.bkwd {
                background-image: url('/static/Images/spotify/previousicon.png');
                background-size: contain;
              }
            }
          }
          .metadata {
            position: relative;
            margin-top: 40 * $s;
            width: 100%;
            height: 150 * $s;
            .song {
              position: relative;
              font-family: Helvetica;
              font-size: 60 * $s;
              color: white;
            }
            .artist {
              position: relative;
              top: 10 * $s;
              font-size: 40 * $s;
              color: rgba(255, 255, 255, 0.4);
            }
          }
          .seekbar {
            position: relative;
            height:30 * $s;
            display: flex;
            align-items: center;
            justify-content: center;
            .time {
              position: relative;
              max-width: 75 * $s;
              height: 100%;
              color: rgba(255,255,255,0.4);
              font-family: Helvetica;
              font-size: 25 * $s;
            }
            .seekbar {
              position: relative;
              width: 400 * $s;
              height: 8 * $s;
              margin:0 15 * $s;
              position: relative;
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
          }
        }
    }
  }
</style>
