<template>
  <div class="home" style="background-image:url('/static/Images/home/bg.png')">
    <div class="dashboard" :class="[{ 'voice-enabled': showMore === 'initial' }, moreClass]">
      <div class="upperDeck">
        <div class="left-corner">
            <div class="wrapper">
              <div class="focus_bg">
                <!-- <div class="highlight"></div> -->
                <div class="video-feeds">
                  <div class="video" v-if="vidAutoplay && (showMore === 'boot' || showMore === 'initial') && active">
                    <video :src="sponsored.videoUrl" autoplay loop/>
                  </div>
                  <div v-else class="poster" :style="{'background-image':`url(${sponsored.poster})`}"></div>
                </div>
                  <div class="metadata">
                      <div class="focus_bg_partial"></div>
                      <div class="source-icon" :style="{'background-image':`url(${sponsored.icon})`}">
                      </div>
                      <div class="text" v-html="sponsored.text">
                    </div>
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
            <transition name="fade">
              <div class="metadata-twice" v-if="showMore === 'partial' || showMore === 'fullhome' ">
                <div class="focus_bg_partial"></div>
                <div class="source-icon" :style="{'background-image':`url(${sponsored.icon})`}">
                </div>
                <div class="text" v-html="sponsored.text">
              </div>
            </div>
          </transition>
        </div>
        <transition name="slide-r">
          <div class="right-corner" v-if="showMore === 'boot' || showMore === 'initial'">
            <div class="right-wrapper">
                <div class="list" :style="translateX" :class="{'browse': (showMore === 'initial' && panning)}">
                    <transition name="fade" v-if="showMore === 'boot'">
                      <gridpage class="grid-wrapper slideshow" :details="currentGrid" :colIdx="0" :focus="false" :key="slideIdx"></gridpage>
                    </transition>
                  <template v-for="(grid, index) in reoderedGrid" v-else>
                    <gridpage class="grid-wrapper gridsele" :details="grid" :colIdx="0" :rowIdx="rowVal" :focus="(navId === 'rightgrid' && gridIdx === index)" :key="index" @movefocus="movefocus"></gridpage>
                  </template>
                </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="lowerDeck" v-if="showMore !== 'boot'">
        <div class="deck-wrapper" :style="{'transform': `translateY(${transDash})`}">
          <homescreen :enabled="(navId === 'lowerdeck')"></homescreen>
        </div>
      </div>
      <div class="driver" v-else>
        <drivers :theme="'light'" :drivers="currentGrid.suggest" :toggle="!isRemoteEnabled" :loop="true"></drivers>
        <div class="pagination">
          <template v-for="(grid, index) in gridDetails">
            <div :key="index" class = "circle" :class="{'selected': slideIdx === index}">
            </div>
          </template>
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
import homescreen from './homeScreen';

export default {
  name: 'home',
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.resetVoiceTimer();
    this.toggleInterval(true);
    if (this.showMore === 'fullhome') {
      this.slidehome();
    }
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
    this.toggleInterval(false);
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
      'vidAutoplay',
    ]),
    ...mapState('home', [
      'showMore',
      'panning',
      'navId',
    ]),
    translateX() {
      return { transform: `translateX(${((this.translate * 100) / window.innerWidth)}vw)` };
    },
    moreClass() {
      if (this.showMore === 'initial') {
        return ['voice-enabled'];
      } else if (this.showMore === 'partial') {
        return ['show-more', 'voice-enabled'];
      } else if (this.showMore === 'fullhome') {
        return ['show-more', 'voice-enabled', 'fullhome'];
      }
      return [];
    },
    ...mapGetters('home', {
      gridDetails: 'GET_HOME_GRIDS',
      navItems: 'GET_NAVS',
    }),
    reoderedGrid() {
      const arr = [];
      const len = this.gridDetails.length;
      for (let i = 0; i < this.gridDetails.length; i += 1) {
        const index = (i + this.slideIdx) % len;
        arr[i] = this.gridDetails[index];
      }
      return arr;
    },
    currentGrid() {
      return this.gridDetails[this.slideIdx];
    },
  },
  methods: {
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
    }),
    ...mapMutations('home', {
      toggleMoreData: 'TOGGLE_MORE_DATA',
      setfocus: 'SET_FOCUS',
    }),
    toggleInterval(bool) {
      if (bool) {
        clearInterval(this.slideshowID);
        this.slideshowID = setInterval(() => {
          if (this.slideIdx + 1 === this.gridDetails.length) {
            this.slideIdx = (this.slideIdx + 1) % this.gridDetails.length;
          } else {
            this.slideIdx += 1;
          }
          console.log(this.slideIdx);
        }, 10000);
      } else {
        clearInterval(this.slideshowID);
      }
    },
    ...mapActions({
      resetVoiceTimer: 'RESET_VOICE_TIMER',
    }),
    movefocus(param) {
      if (param.from === 'grid') {
        if (param.dir === 'left') {
          if (this.gridIdx === 0) {
            this.setfocus('leftposter');
          } else {
            this.gridIdx -= 1;
          }
        } else if (param.dir === 'right') {
          if (this.gridIdx < this.gridDetails.length - 1) {
            this.gridIdx += 1;
          }
        } else if (param.dir === 'down') {
          this.setfocus('lowerdeck');
        }
        if (param.rowIdx !== 'undefined') {
          this.rowVal = param.rowIdx;
        }
        this.translate = this.$el.querySelectorAll('.gridsele')[this.gridIdx].offsetLeft * -1;
      }
    },
    headerVisible(bool) {
      this.showHeader = bool;
    },
    slidehome() {
      setTimeout(() => {
        const upperDeckEle = this.$el.querySelector('.upperDeck');
        if (upperDeckEle) {
          this.transDash = `${((upperDeckEle.offsetHeight * -1) * 100) / window.innerWidth}vw`;
          console.log(this.transDash);
        }
      }, 2000);
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
          if (this.navId === 'leftposter') {
            this.setfocus('rightgrid');
          } else if (this.navId === 'leftposter') {
            if (this.gridIdx < this.gridDetails.length - 1) {
              this.gridIdx += 1;
            }
          }
          break;
        case 'DOWN':
          if (this.navId === 'leftposter') {
            this.setfocus('lowerdeck');
          }
          break;
        case 'LEFT':
          break;
        case 'EIGHT':
          this.toggleMoreData('fullhome');
          break;
        case 'NINE':
          this.toggleMoreData('partial');
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      remote: true,
      transDash: 0,
      slideIdx: 0,
      colVal: 0,
      rowVal: 0,
      translate: 0,
      gridIdx: 0,
      slideshowID: null,
      sponsored: {
        videoUrl: '/resources/videos/smartscreen/poster-video.mp4',
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
    drivers,
    homescreen,
  },
  watch: {
    isRemoteEnabled(val) {
      if (!val) {
        if (this.active) {
          this.toggleInterval(true);
        }
      } else {
        this.toggleInterval(false);
      }
    },
    active(val) {
      if (val) {
        this.toggleInterval(false);
      }
    },
    showMore(val) {
      if (val === 'fullhome') {
        this.slidehome();
      } else if (val === 'initial') {
        this.toggleInterval(false);
      } else {
        this.transDash = 0;
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
    // background: rgb(242,242,242);
    .upperDeck {
      position: relative;
      width: 100%;
      transition: height 0.8s ease;
      height: 1000 * $s;
      .left-corner {
        position: absolute;
        width: 64%;
        transition: width 0.8s ease;
        height: 100%;
        .wrapper {
          position: relative;
          width: 1090 * $s;
          top: 100 * $s;
          left: 115 * $s;
          flex-wrap: wrap;
          height: auto;
          display: flex;
          .focus_bg {
            position: relative;
            left: 0;
            top: 0;
            width: auto;
            height: auto;
            // display: flex;
            // flex-direction: column;
            .highlight {
              position: absolute;
              left: -20 * $s;
              top: -20 * $s;
              border-radius: 10 * $s;
              width: calc(100% + #{40 * $s});
              height: calc(100% + #{40 * $s});
              background: white;
              box-shadow: 0 20 * $s 40 * $s 0 rgba(0,0,0,0.5);
            }
            .video-feeds {
              position: absolute;
              width: 1090 * $s;
              height: 615 * $s;
              transition: width 0.3s ease, height 0.3s ease;
              border-radius: 10 * $s;
              transform-origin: 0 0;
              transition: transform 0.8s ease;
              overflow: hidden;
              .poster {
                position: relative;
                width: 100%;
                z-index: 999;
                background-size: 100% 100%;
                height: 100%;
              }
              .video {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                video {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                }
              }
            }
            .metadata {
              position: absolute;
              top: 630 * $s;
              width: 767 * $s;
              height: auto;
              transition: transform 0.3s ease;
              margin-bottom: 50 * $s;
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
          }
          .up-next {
            position: absolute;
            opacity: 0;
            top: 680 * $s;
            transition: opacity 0.3s ease;
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
        &.selected {
          .focus_bg {
            border-radius: 10 * $s;
            .poster {
              transform: scale(1.04);
              transform-origin: bottom;
              border-radius: 0 * $s!important;
              // box-shadow: 0 20 * $s 40 * $s 0 rgba(0,0,0,0.5);
            }
          }
        }
      .metadata-twice {
          position: absolute;
          top: 30 * $s;
          left: 740 * $s;
          width: 530 * $s;
          height: auto;
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
          &.fade-enter-active, &.fade-leave-active {
            transition: transform 0.3s ease 0.4s, opacity 0.4s ease 0.4s;
          }
          &.fade-leave-to {
            opacity: 0;
          }
          &.fade-enter {
            transform: translateY(#{-20 * $s});
            opacity: 0;
          }
        }
      }
      .right-corner {
        position: absolute;
        width: 36%;
        left: 64%;
        top: 0;
        height: 100%;
        transition: transform 0.8s ease;
        .right-wrapper {
          position: relative;
          top: 100 * $s;
          width: 100%;
          height: 820 * $s;
          overflow:hidden;
          .list {
            position: absolute;
            width: auto;
            height: 100%;
            margin-left: 50 * $s;
            display: flex;
            transition: transform 0.3s ease;
            .grid-wrapper {
              position: relative;
              width: 532 * $s;
              height: 100%;
              margin-right: 50 * $s;
              &.slideshow {
                position: absolute;
              }
              &.fade-enter-active, &.fade-leave-active {
                transition: transform 1.2s ease, opacity 0.4s ease;
              }
              &.fade-leave-to {
                opacity: 0;
              }
              &.fade-enter {
                transform: translateX(#{50 * $s});
                opacity: 0;
              }
            }
            &.browse {
              animation-name: example;
              animation-duration: 30s;
              animation-direction: alternate;
              animation-iteration-count: infinite;
            }
          }
        }
        @keyframes example {
            from {transform: translateX(#{0%});}
            to {transform: translateX(#{-55%});}
        }
      }
    }
    .lowerDeck {
      position: relative;
      top: 0;
      width: 100%;
      height: auto;
      .deck-wrapper {
        position: absolute;
        width: 100%;
        background-image:url('/static/Images/lowebg.png');
        height: auto;
        transition: transform 0.3s ease;
        background-color: rgba(216,216,216,0.3);
      }
    }
    &.voice-enabled {
      .upperDeck {
        .left-corner {
          width: 52%;
          .wrapper {
            .video-feeds {
              transition: transform 0.8s ease;
              transform: scale(0.69)
            }
            .metadata {
              transition: transform 0.8s ease;
              transform: translateY(#{-179 * $s});
            }
          }
          .up-next {
            transition: opacity 0.8s ease;
            opacity: 1!important;
          }
        }
        .right-corner {
          width: 48%;
          transform: translateX(#{ -230 * $s });
          background:url('/static/Images/lowebg.png');
          background-repeat: repeat;
        }
      }
      &.show-more {
        .upperDeck {
          // background: rgba(245,245,245,1);
          height: 430 * $s;
          .wrapper {
            transition: top 0.8s ease;
            width: 100%;
            top: 35 * $s;
          }
          .left-corner {
            width: 100%;
            .focus_bg {
              width: 1169 * $s;
              .video-feeds {
                // transition: width 0.8s ease 0.8s, height 0.8s ease 0.8s;
                // width: 580 * $s;
                // height: 325 * $s;
                transform: scale(0.52);
              }
              .metadata {
                opacity: 0;
              }
            }
            .up-next {
              opacity: 1;
              // transition: transform 0.2s ease 0.4s;
              transform: translate(#{ 1263 * $s }, #{-660 * $s });
            }
          }
          .right-corner {
            // flex: 0;
            // display: none;
          }
        }
        .lowerDeck {
          position: relative;
          width: 100%;
          z-index: 9999;
          height: 100%;
          .deck-wrapper {
            background-color: rgba(216,216,216,0.3);
          }
        }
      }

    }
    .driver {
      position: absolute;
      bottom: 0 * $s;

      height: 100 * $s;
      width: 100%;
      .pagination {
        position: absolute;
        right: 120  * $s;
        height: 100%;
        top: -30%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        .circle {
          position: relative;
          margin-left: 20 * $s;
          width: 12 * $s;
          border-radius: 50%;
          height: 12 * $s;
          background-color:rgba(80,80,80, 0.2);
          transition: background-color 0.3s ease;
          &.selected {
            background-color:rgba(80,80,80, 1);
          }
        }
      }
    }
  }
  .slide-r-enter-active, .slide-r-leave-active {
    transition: transform 0.5s ease!important;
  }
  .slide-r-leave-to {
    transform: translateX(#{1000 * $s})!important;
  }
  .slide-r-enter {
    transform: translateX(#{200 * $s})!important;
  }
}
</style>
