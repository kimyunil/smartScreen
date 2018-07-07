<template>
  <div class="home" style="background-image:url('/static/Images/home/homeUI/screen2.jpg')">
    <div class="dashboard" :class="{'voice-enabled':isRemoteEnabled}">
      <div class="upperDeck">
        <div class="left-corner">
            <div class="wrapper">
              <div class="video-feeds">
                <div class="poster" :style="{'background-image':`url(${sponsored.poster})`}"></div>
              </div>
              <div class="metadata">
                  <div class="source-icon" :style="{'background-image':`url(${sponsored.icon})`}">
                  </div>
                  <div class="text" v-html="sponsored.text">
                 </div>
              </div>
              <div class="up-next">
                <div class="up-title">
                  {{upnext.title}}
                </div>
                <div class="upnext-icon" :style="{'background-image':`url(${upnext.icon})`}">
                </div>
                <div class="text" v-html="upnext.text">
                 </div>
              </div>
            </div>
        </div>
        <div class="right-corner">
          <div class="right-wrapper">
              <div class="list">
                <template v-for="(grid, index) in gridDetails">
                  <gridpage class="grid-wrapper" :details="grid" :colIdx="0" :focus="false" :key="index"></gridpage>
                </template>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import drivers from '../common/drivers';
import Messages from '../../services/Messages';
import gridpage from './common/UI/gridpage';

export default {
  name: 'home',
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.resetVoiceTimer();
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapGetters('home', {
        gridDetails: 'GET_HOME_GRIDS',
    }),
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
    }),
    ...mapActions({
      resetVoiceTimer: 'RESET_VOICE_TIMER',
    }),
    movefocus(param) {
      if (param.from === 'header') {
        this.focus = 'content';
      } else if (param.from === 'content') {
        this.focus = 'header';
      }
    },
    headerVisible(bool) {
      this.showHeader = bool;
    },
    handleKeyDown(type) {
      if (!this.active) return;
      switch (type) {
        case 'EXTRA':
          this.updateMode(!this.isRemoteEnabled);
          break;
        case 'UP':
          break;
        case 'RIGHT':
          break;
        case 'DOWN':
          break;
        case 'LEFT':
          break;
        case 'BACK':
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      remote: true,
      sponsored: {
        poster: '/static/Images/home/homeUI/poster.png',
        icon: '/static/Images/home/homeUI/source.png',
        text: '<span>30 Minutes Daily Workout - <span style="color:rgb(255,96,93)">Chaturanga</span> by School of <span style="color:rgb(255,96,93)">Yoga</span><span>',
      },
      upnext: {
        title: 'COMING UP NEXT',
        icon: '/static/Images/home/homeUI/upnext-icon.png',
        text: '<span>The Bicultural Blackness of <br> the <span style="color:rgb(255,96,93)">Royal Wedding</span><span>',
      },
      direction: 'left',
      index: 0,
      focus: 'content',
    };
  },
  components: {
    gridpage,
  },
  watch: {
    nav_selected(old, nw) {
      if (!this.isRemoteEnabled) {
        this.direction = '';
      } else if (old > nw) {
        this.direction = 'left';
      } else {
        this.direction = 'right';
      }
    },
  },
};
</script>
<style scoped lang="scss">
  @import '../../mixins/scss/main';

.home {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .dashboard {
    position: relative;
    width: 100%;
    height: 100%;
    // background: rgb(248,248,248);
    .upperDeck {
      position: absolute;
      width: 100%;
      height: 1000 * $s;
      display: flex;
      .left-corner {
        position: relative;
        transition: flex 0.3s ease;
        flex: 6.4;
        height: 100%;
        .wrapper {
          position: relative;
          width: 778 * $s;
          top: 100 * $s;
          left: 125 * $s;
          flex-wrap: wrap;
          height: auto;
          display: flex;
          .video-feeds {
            position: relative;
            width: 778 * $s;
            height: 436 * $s;
            transition: transform 0.3s ease;
            transform: scale(1.4);
            transform-origin: 0 0;
            .poster {
              position: relative;
              width: 100%;
              background-size: 100% 100%;
              height: 100%;
            }
          }
          .metadata {
            position: relative;
            width: 778 * $s;
            height: auto;
            transition: transform 0.3s ease;
            margin-bottom: 50 * $s;
            transform: translateY(#{190 * $s});
            .source-icon {
              position: relative;
              height: 60 * $s;
              width: 60 * $s;
              background-size: 100% 100%;
            }
            .text {
              position: relative;
              width: 100%;
              text-align: left;
              font-family: TTNormsBold;
              color: rgba(80,80,80,1);
              font-size: 48 * $s;
            }
          }
          .up-next {
            position: relative;
            opacity: 0;
            .up-title {
              font-family: TTNormsBold;
              color: rgba(80,80,80,1);
              font-size: 24 * $s;
              text-align: left;
            }
            .upnext-icon {
              position: relative;
              height: 60 * $s;
              width: 200 * $s;
            }
            .text {
              font-size: 32 * $s;
              text-align: left;
              color: rgba(80,80,80,1);
              font-family: TTNormsBold;
            }
          }
        }
      }
      .right-corner {
        position: relative;
        flex: 3.6;
        transition: flex 0.3s ease;
        height: 100%;
        .right-wrapper {
          position: relative;
          top: 100 * $s;
          width: 100%;
          height: 820 * $s; 
          .list {
            position: absolute;
            width: auto;
            height: 100%; 
            display: flex;
            .grid-wrapper {
              width: 532 * $s;
              height: 100%;
              margin-left: 50 * $s;          
            }
          }
        }
      }
    }
    &.voice-enabled {
      .left-corner {
        flex: 5.2;
        .video-feeds {
          transform: scale(1)!important;
          transform-origin: 0 0;
        }
        .metadata {
          transform: translateY(#{0 * $s})!important;
        }
        .up-next {
          opacity: 1!important;
        }
      }
      .right-corner {
        flex: 4.5;
      }
      &.full {
        .upperDeck {
          height: 430 * $s;
        }
        .wrapper {
          flex-wrap: nowrap;
          width: 100%;
          top: 35 * $s;
        }
        .left-corner {
          flex: 1;
          .video-feeds {
            transform: scale(1);
            height: 325 * $s;
            transform-origin: 0 0;
            flex: 0.7;
          }
          .metadata {
            transform: translate(#{30 * $s}, #{0 * $s});
            left: 50 * $s;
            flex: 0.7;
          }
          .up-next {
            opacity: 1;
            transform: translate(#{150 * $s}, #{20 * $s});
            flex: 1;
          }
        }
         .right-corner {
           flex: 0;
           display: none;
         }
      }
    }
  }

}
</style>
