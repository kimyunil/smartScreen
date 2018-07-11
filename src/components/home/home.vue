<template>
  <div class="home" style="background-image:url('/static/Images/home/bg.png')">
    <div class="dashboard" :class="[{ 'voice-enabled': showMore === 'initial' }, moreClass]" :style="{'transform': `translateY(${transDash})`}">
      <div class="upperDeck">
        <div class="left-corner">
            <div class="wrapper">
              <div class="focus_bg">
                <!-- <div class="highlight"></div> -->
                <div class="video-feeds">
                  <div class="poster" :style="{'background-image':`url(${sponsored.poster})`}"></div>
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
        </div>
        <div class="right-corner">
          <div class="right-wrapper">
              <div class="list" :style="translateX">
                  <transition name="fade" v-if="showMore === 'boot'">
                    <gridpage class="grid-wrapper slideshow" :details="currentGrid" :colIdx="0" :focus="false" :key="slideIdx"></gridpage>
                  </transition>
                <template v-for="(grid, index) in reoderedGrid" v-else>
                  <gridpage class="grid-wrapper gridsele" :details="grid" :colIdx="0" :rowIdx="rowVal" :focus="(navId === 'rightgrid' && gridIdx === index)" :key="index" @movefocus="movefocus"></gridpage>
                </template>
              </div>
          </div>
        </div>
      </div>
      <div class="lowerDeck" v-if="showMore !== 'boot'">
        <div class="deck-wrapper">
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
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    ...mapState('home', [
      'showMore',
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
        return ['show-more', 'voice-enabled'];
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
        }, 3000);
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
    showMore(val) {
      if (val === 'fullhome') {
        const upperDeckEle = this.$el.querySelector('.upperDeck');
        if (upperDeckEle) {
          this.$nextTick(() => {
            this.transDash = `${((upperDeckEle.offsetHeight * -1) * 100) / window.innerWidth}vw`;
            console.log(this.transDash);
          });
        }
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
      height: 1000 * $s;
      display: flex;
      .left-corner {
        position: relative;
        transition: flex 0.3s ease;
        flex: 6.4;
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
            display: flex;
            flex-direction: column;
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
              position: relative;
              width: 1090 * $s;
              height: 615 * $s;
              transition: transform 0.3s ease;
              .poster {
                position: relative;
                width: 100%;
                border-radius: 10 * $s;
                z-index: 999;
                background-size: 100% 100%;
                height: 100%;
              }
            }
            .metadata {
              position: relative;
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
            position: relative;
            opacity: 0;
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
      }
      .right-corner {
        position: relative;
        flex: 3.6;
        transition: flex 0.3s ease;
        height: 100%;
        overflow: hidden;
        .right-wrapper {
          position: relative;
          top: 100 * $s;
          width: 100%;
          height: 820 * $s;
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
          }
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
        height: auto;
        background: rgba(216,216,216,0.3);
      }
    }
    &.voice-enabled {
      .upperDeck {
        .left-corner {
          flex: 5.2;
          .wrapper {
            .video-feeds {
              width: 778 * $s;
              height: 436 * $s;
            }
            .metadata {
              transform: translateY(#{0 * $s})!important;
            }
          }
          .up-next {
            opacity: 1!important;
          }
        }
        .right-corner {
          flex: 4.5;
          background-color: rgba(231,231,231,1);
        }
      }
      &.show-more {
        .upperDeck {
          // background: rgba(245,245,245,1);
          height: 430 * $s;
          .wrapper {
            flex-wrap: nowrap;
            width: 100%;
            top: 35 * $s;
          }
          .left-corner {
            flex: 1;
            .focus_bg {
              width: 1169 * $s;
              flex-direction: row;
              .video-feeds {
                transform: scale(1);
                height: 325 * $s;
                transform-origin: 0 0;
              }
              .metadata {
                // transform: translate(#{30 * $s}, #{0 * $s});
                left: 50 * $s;
              }
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
        .lowerDeck {
          position: relative;
          width: 100%;
          height: 100%;
          .deck-wrapper {
            background: rgba(216,216,216,0.3);
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
}
</style>
