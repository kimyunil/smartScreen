<template>
  <div class="home" style="background-image:url('/static/Images/home/bg.png')" :class="{'remote': isRemoteEnabled}">
    <div class="dashboard" :class="[{ 'voice-enabled': showMore === 'initial' }, moreClass]">
      <div class="upperDeck">
        <div class="left-corner">
            <div class="wrapper">
              <div class="focus_bg" :class="{'focus': (isRemoteEnabled && showMore === 'boot' && navId === 'leftposter')}">
                <div class="highlight" v-if="(isRemoteEnabled && showMore === 'boot' && navId === 'leftposter')"></div>
                <div class="video-feeds">
                  <transition name="fade">
                    <div class="video" v-if="true && (showMore !== 'fullhome')">
                      <video :src="sponsored.videoUrl" @ended="videoEndCB" @loadstart="setVideoparam"/>
                    </div>
                    <!--<div v-else class="poster" :style="{'background-image':`url(${sponsored.poster})`}"></div>-->
                  </transition>
                </div>
                  <div class="metadata">
                      <div class="focus_bg_partial"></div>
                        <div class="source-icon" v-if="sponsored.icon" :style="{'background-image':`url(${sponsored.icon})`}">
                        </div>
                        <div class="icon-text" v-else v-html="sponsored.iconTitle"></div>
                      <div class="text" v-html="sponsored.text">
                    </div>
                  </div>
              </div>
              <div class="up-next">
                <!-- <div class="up-title">
                  COMING UP NEXT
                </div> -->
                <div class="next-video">
                  <span class="sub">UP NEXT</span>
                  <video :src="upnext.videoUrl" @loadedmetadata="loadVidPoster"></video>
                </div>
                <div class="details">
                  <div class="source-icon upnext-icon" v-if="upnext.icon" :style="{'background-image':`url(${upnext.icon})`}"></div>
                  <div class="icon-text" v-else v-html="upnext.iconTitle"></div>
                  <div class="text" v-html="upnext.text">
                  </div>
                 </div>
              </div>
            </div>
            <transition name="fade">
              <div class="metadata-twice" v-if="showMore === 'partial' || showMore === 'fullhome' ">
                <div class="focus_bg_partial"></div>
                  <div class="source-icon" v-if="sponsored.icon" :style="{'background-image':`url(${sponsored.icon})`}">
                  </div>
                  <div class="icon-text" v-else v-html="sponsored.iconTitle"></div>
                <div class="text" v-html="sponsored.text">
              </div>
            </div>
          </transition>
        </div>
        <transition name="slide-r">
          <div class="right-corner" v-if="showMore === 'boot' || showMore === 'initial'">
            <div class="right-wrapper">
                <div class="list">
                    <transition name="fade" v-if="showMore === 'boot'">
                      <gridpage class="grid-wrapper slideshow" :details="currentGrid" :colIdx="0" :focus="false" :key="slideIdx"></gridpage>
                    </transition>
                    <div class="innerlist" :style="translateX" v-else-if="listType === 'autoscroll' && showMore === 'initial'" :key="'inner'">
                      <template v-for="(grid, idx) in dgridArr">
                        <gridpage v-if="(index - 2) <= idx" class="grid-wrapper gridsele" :details="dgridArr[idx]" :style="computedStyle(idx)" :colIdx="0" :rowIdx="rowVal" :focus="false" :key="idx"></gridpage>
                      </template>
                    </div>
                    <div class="remote-list" :style="rmScroll" v-else-if="listType === 'navigable' && showMore === 'initial'" :key="'remote'">
                      <template v-for="(grid, idx) in reoderedGrid">
                        <gridpage  class="grid-wrapper rmGrid" :details="reoderedGrid[idx]" :colIdx="0" :rowIdx="rowVal" :focus="(navId === 'rightgrid' && gridIdx === idx && isRemoteEnabled)" :key="idx" @movefocus="movefocus"></gridpage>
                      </template>
                    </div>
                </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="lowerDeck" v-if="showMore !== 'boot'">
        <div class="deck-wrapper">
          <homescreen :enabled="(showMore === 'partial' || showMore === 'fullhome')" @movefocus="movefocus"></homescreen>
        </div>
      </div>
      <div class="driver" v-else>
        <drivers :theme="'light'" :drivers="currentGrid.suggest" :toggle="!isRemoteEnabled" :loop="true"></drivers>
        <div class="pagination" v-if="!isRemoteEnabled">
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
    // this.dgridArr = this.gridDetails;
    this.toggleInterval(true);
    if (!this.isRemoteEnabled) {
      this.setListType('navigable');
    } else {
      this.setListType('autoscroll');
    }
    this.setpanning(false);
    this.setPanGrid(this.gridDetails);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
    this.toggleInterval(false);
    this.setpanning(false);
    const video = this.$el.querySelector('.video-feeds video');
    if (video) {
      video.muted = true;
      setTimeout(() => {
        video.src = '';
      }, 800);
    }
  },
  computed: {
    ...mapState('source', {
      volume: state => state.player.volume,
      muted: state => state.player.muted,
      playerState: state => state.player.playerState,
    }),
    ...mapState([
      'isRemoteEnabled',
      'vidAutoplay',
      'withAutoScroll',
    ]),
    ...mapState('home', {
      slideIdx: 'slideIdx',
      gridIdx: 'gridIdx',
      listType: 'listType',
      showMore: 'showMore',
      panning: 'panning',
      navId: 'navId',
      sponsorIdx: state => state.data.sponsors.idx,
    }),
    sponsored() {
      return this.sponsors[this.sponsorIdx];
    },
    upnext() {
      const idx = (this.sponsorIdx + 1) % this.sponsors.length;
      return this.sponsors[idx];
    },
    translateX() {
      return { transform: `translateX(${(((this.translate + this.subtrans) * 100) / window.innerWidth)}vw)` };
    },
    rmScroll() {
      return { transform: `translateX(${((this.remoteTrans * 100) / window.innerWidth)}vw)` };
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
      sponsors: 'SPONSOR_DATA',
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
    ...mapActions({
      launch: 'LAUNCH_COMPONENT',
    }),
    ...mapMutations({
      updateMode: 'UPDATE_REMOTE_MODE',
    }),
    ...mapMutations('home', {
      setListType: 'SET_LIST_TYPE',
      setGridIdx: 'SET_GRID_IDX',
      setSlideIdx: 'SET_SLIDE_IDX',
      is_scrolling: 'IS_SCROLLING',
      toggleMoreData: 'TOGGLE_MORE_DATA',
      updateSponsor: 'UPDATE_SPONSOR_IDX',
      setfocus: 'SET_FOCUS',
    }),
    loadVidPoster(evt) {
      const event = evt;
      event.target.currentTime = 5;
    },
    setVideoparam(evt) {
      const event = evt;
      event.target.volume = (this.volume * 1) / 16;
      event.target.play();
    },
    videoEndCB() {
      const idx = (this.sponsorIdx + 1) % this.sponsors.length;
      this.updateSponsor(idx);
    },
    computedStyle(index) {
      const left = (((532 + 50) * index) * 100) / window.innerWidth;
      // console.log(index);
      return { left: `${left}vw` };
    },
    resetPanning() {
      this.setpanning(false);
      this.translate = 0;
      this.subtrans = 0;
      this.index = 0;
    },
    setpanning(start) {
      if (this.isRemoteEnabled) {
        clearInterval(this.transID);
        this.transID = null;
        this.is_scrolling(false);
        return;
      }
      this.gridWidth = this.$el.querySelector('.grid-wrapper');
      if (!this.gridWidth) return;
      this.gridWidth = this.gridWidth.offsetWidth;
      const width = parseInt(this.gridWidth, 10) + 50;
      // console.log(t);
      if (start) {
        clearInterval(this.transID);
        this.is_scrolling(true);
        this.transID = setInterval(() => {
          if (((this.subtrans - 3) * -1) > width) {
            const index = this.index % this.gridDetails.length;
            this.translate += this.subtrans;
            this.subtrans = 0;
            this.index += 1;
            this.$set(this.dgridArr, this.dgridArr.length, this.refGrid[index]);
          } else {
            this.subtrans -= 3;
          }
        }, 100);
      } else {
        clearInterval(this.transID);
        this.transID = null;
        this.is_scrolling(false);
      }
    },
    toggleInterval(bool) {
      if (bool) {
        clearInterval(this.slideshowID);
        if (this.isRemoteEnabled) return;
        this.slideshowID = setInterval(() => {
          if (this.slideIdx + 1 === this.gridDetails.length) {
            const sIdx = (this.slideIdx + 1) % this.gridDetails.length;
            this.setSlideIdx(sIdx);
          } else {
            this.setSlideIdx(this.slideIdx + 1);
          }
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
            this.toggleMoreData('boot');
            setTimeout(() => {
              this.setfocus('leftposter');
            }, 800);
          } else {
            this.setGridIdx(this.gridIdx - 1);
          }
        } else if (param.dir === 'right') {
          if (this.gridIdx < this.gridDetails.length - 1) {
            this.setGridIdx(this.gridIdx + 1);
          }
        } else if (param.dir === 'down') {
          this.setfocus('lowerdeck');
          this.toggleMoreData('partial');
        }
        if (param.rowIdx !== 'undefined') {
          this.rowVal = param.rowIdx;
        }
      } else if (param.from === 'homescreen') {
        this.setListType('navigable');
        if (this.showMore === 'partial') {
          if (param.dir === 'up') {
            this.setfocus('rightgrid');
            this.toggleMoreData('initial');
          }
        } else {
          this.setfocus('rightgrid');
          this.toggleMoreData('initial');
        }
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
          if (!this.isRemoteEnabled) return;
          if (this.navId === 'leftposter') {
            this.setfocus('rightgrid');
            this.toggleMoreData('initial');
          }
          break;
        case 'DOWN':
          if (!this.isRemoteEnabled) return;
          if (this.navId === 'leftposter') {
            this.setfocus('lowerdeck');
            this.toggleMoreData('partial');
          }
          break;
        case 'SELECT': {
          if (!this.isRemoteEnabled) return;
          const video = this.$el.querySelector('video');
          if (this.navId === 'leftposter') {
            if (video) {
              video.pause();
            }
            this.launch({ category: 'homeplayer', subcategory: this.sponsored });
          }
        }
          break;
        case 'ONE':
          this.toggleMoreData('initial');
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
    updatedGrid() {
      const arr = [];
      const len = this.reoderedGrid.length;
      for (let i = 0; i < this.reoderedGrid.length; i += 1) {
        const index = (i + this.gridIdx) % len;
        arr[i] = this.reoderedGrid[index];
      }
      return arr;
    },
    setGridLeft(val) {
      this.$nextTick(() => {
        const ele = this.$el.querySelectorAll('.rmGrid');
        if (ele && ele.length > 0) {
          this.remoteTrans = ele[val].offsetLeft * -1;
        }
      });
    },
    setPanGrid(grid) {
      this.refGrid = [];
      this.dgridArr = [];
      for (let i = 0; i < grid.length; i += 1) {
        this.dgridArr[i] = grid[i];
        this.refGrid[i] = grid[i];
      }
    },
  },
  data() {
    return {
      dgridArr: [],
      subtrans: 0,
      remote: true,
      index: 0,
      transDash: 0,
      colVal: 0,
      rowVal: 0,
      translate: 0,
      remoteTrans: 0,
      slideshowID: null,
      direction: 'left',
      focus: 'content',
    };
  },
  components: {
    gridpage,
    drivers,
    homescreen,
  },
  watch: {
    gridIdx(val) {
      this.setGridLeft(val);
    },
    playerState(val) {
      if (this.active) {
        if (val === 0) {
          const video = this.$el.querySelector('.video-feeds video');
          if (video) {
            video.play();
          }
        } else if (val === 1) {
          const video = this.$el.querySelector('.video-feeds video');
          if (video) {
            video.pause();
          }
        }
      }
    },
    listType(val) {
      if (val === 'autoscroll') {
        this.index = 0;
        const localGrid = this.updatedGrid();
        this.setPanGrid(localGrid);
        this.setpanning(true);
      } else if (val === 'navigable') {
        const idx = (this.index % this.gridDetails.length);
        this.setSlideIdx(idx);
        this.setGridIdx(0);
        this.toggleInterval(false);
        this.resetPanning();
        this.setGridLeft(0);
      }
    },
    volume(val) {
      const video = this.$el.querySelector('.video-feeds video');
      if (!video) return;
      video.volume = (val * 1) / 20;
    },
    muted(val) {
      const video = this.$el.querySelector('.video-feeds video');
      if (!video) return;
      video.muted = val;
    },
    panning() {
      if (this.showMore === 'initial') {
        if (!this.transID) {
          this.setpanning(true);
        } else {
          this.setpanning(false);
        }
      }
    },
    isRemoteEnabled(val) {
      if (!val) {
        if (this.active) {
          if (this.showMore === 'boot') {
            this.toggleInterval(true);
          } else if (this.showMore === 'initial') {
            if (this.withAutoScroll) {
              this.setpanning(true);
            }
            // });
          }
        }
      } else if (this.active) {
        if (this.showMore === 'boot') {
          this.setfocus('leftposter');
        } else if (this.showMore === 'initial') {
          this.setListType('navigable');
          this.setfocus('rightgrid');
        } else if (this.showMore === 'partial') {
          this.setfocus('lowerdeck');
        }
      }
    },
    active(val) {
      const video = this.$el.querySelector('video');
      if (val) {
        if (video) {
          video.muted = false;
          video.play();
        }
        this.toggleInterval(false);
      }
    },
    showMore(val) {
      if (val === 'fullhome') {
        this.resetPanning();
      } else if (val === 'initial') {
        this.resetPanning();
        this.toggleInterval(false);
        this.index = 0;
        const localGrid = this.updatedGrid();
        this.setPanGrid(localGrid);
        if (this.withAutoScroll) {
          this.setpanning(true);
        }
      } else {
        this.resetPanning();
        this.setPanGrid(this.gridDetails);
        if (this.withAutoScroll) {
          this.setpanning(true);
        }
        this.toggleInterval(true);
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
              position: relative;
              width: 1090 * $s;
              height: 615 * $s;
              transition: width 0.3s ease, height 0.3s ease;
              border-radius: 10 * $s;
              transform-origin: 0 0;
              transition: transform 0.8s ease;
              overflow: hidden;
              &.fade-leave-active {
                transition: opacity 0.5s ease;
              }
              &.fade-enter-active{
                transition: opacity 0.4s ease;
              }
              &.fade-leave-to {
                opacity: 0;
              }
              &.fade-enter {
                opacity: 0;
              }
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
              position: relative;
              // top: 630 * $s;
              top: 25 * $s;
              width: 727 * $s;
              height: auto;
              transition: transform 0.3s ease;
              margin-bottom: 50 * $s;
              .source-icon {
                position: relative;
                height: 36 * $s;
                width: 72 * $s;
                background-size: 100% 100%;
              }
              .icon-text {
                position: relative;
                height: 36 * $s;
                text-align: left;
                // width: 72 * $s;
                background-size: 100% 100%;
                font-size: 26 * $s;
                font-family: TTNormsBold;
                color: rgba(80,80,80,1);
              }
              .text {
                position: relative;
                width: 100%;
                margin-bottom: 5 * $s;
                text-align: left;
                font-family: TTNormsBold;
                color: rgba(80,80,80,1);
                font-size: 48 * $s;
              }
            }
            &.focus {
              .video-feeds {
                transform: scale(1.034);
                transform-origin: bottom center;
                transition: none!important;
                border-radius: 0 * $s;
                border-top-left-radius: 10 * $s;
                border-top-right-radius: 10 * $s;
              }
            }
          }
          .up-next {
            position: absolute;
            opacity: 0;
            width: 703 * $s;
            top: 660 * $s;
            height: 170 * $s;
            transition: opacity 0.3s ease;
            .details {
              position: absolute;
              width: 350 * $s;
              left: 350 * $s;
              height: 170 * $s;
              // display: inline-block;
              .up-title {
                font-family: TTNormsBold;
                color: rgba(80,80,80,1);
                font-size: 24 * $s;
                margin-bottom: 30 * $s;
                text-align: left;
              }
              .source-icon {
                position: relative;
                height: 36 * $s;
                width: 72 * $s;
                background-size: 70% 70%;
                background-repeat: no-repeat;
                background-size: left center;
              }
              .icon-text {
                position: relative;
                height: 36 * $s;
                text-align: left;
                // width: 72 * $s;
                background-size: 100% 100%;
                font-size: 22 * $s;
                font-family: TTNormsBold;
                color: rgba(80,80,80,1);
              }
            }

            .next-video {
              position: absolute;
              width: 303 * $s;
              // display: inline-block;
              height: 170 * $s;
              border-radius: 10 * $s;
              background: black;
              overflow: hidden;
              .sub {
                position: absolute;
                font-size: 22 * $s;
                background: black;
                font-family: TTNormsMedium;
                color: white;
                z-index: 2;
                padding: 6 * $s;
                border-radius: 5 * $s;
                top: 10 * $s;
                right: 10 * $s;
              }
              video {
                position: absolute;
                height: 100%;
                width: 100%;
                left: 0;
                top: 0;
              }
            }
            .text {
              font-size: 32 * $s;
              text-align: left;
              width: 100%;
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
          top: 50 * $s;
          left: 600 * $s;
          width: 540 *  $s;
          height: auto;
          .source-icon {
            position: relative;
            height: 36 * $s;
            width: 72 * $s;
            background-size: 100% 100%;
          }
          .icon-text {
            position: relative;
            height: 36 * $s;
            // width: 72 * $s;
            text-align: left;
            background-size: 100% 100%;
            font-size: 26 * $s;
            font-family: TTNormsBold;
            color: rgba(80,80,80,1);
          }
          .text {
            position: relative;
            width: 365 * $s;
            text-align: left;
            font-family: TTNormsBold;
            color: rgba(80,80,80,1);
            font-size: 32 * $s;
          }
          &.fade-leave-active {
            transition: opacity 0.1s ease;
          }
          &.fade-enter-active{
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
          top: 80 * $s;
          padding-top: 20 * $s;
          width: 100%;
          height: 890 * $s;
          overflow-x:hidden;
          .list {
            position: absolute;
            width: auto;
            height: 820 * $s;
            margin-left: 50 * $s;
            display: flex;
            transition: transform 0.8s linear;
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
              &.gridsele {
                position: absolute;
                width: 532 * $s;
                height: 100%;
              }
              &.rmGrid {
                position: relative;
                width: 532 * $s;
                height: 100%;
              }
            }
            &.browse {
              animation-name: example;
              animation-duration: 30s;
              animation-direction: alternate;
              animation-iteration-count: infinite;
            }
            .innerlist {
              position: relative;
              width: auto;
              height: 100%;
              transition: transform 0.2s linear;
            }
            .remote-list {
              position: absolute;
              width: auto;
              display: flex;
              height: 100%;
              transition: transform 0.2s linear;
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
      position: absolute;
      top: 1080 * $s;
      transform: translateY(#{-80 * $s});
      transition: transform 0.8s ease;
      width: 100%;
      height: auto;
      .deck-wrapper {
        position: absolute;
        width: 100%;
        overflow: hidden;
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
            .next-video {
              transform: scale(1.16);
            }
            .sub {
              transform-origin: top center;
              transform: scale(0.84);
            }
            .details {
              transform: translateX(#{ 25 * $s });
            }
          }
        }
        .right-corner {
          width: 48%;
          transform: translateX(#{ -230 * $s });
          background:url('/static/Images/home/homeUI/shadow.png');
          background-repeat: repeat;
        }
      }
      &.show-more {
        .upperDeck {
          // background: rgba(245,245,245,1);
          height: 334 * $s;
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
                transform: scale(0.4);
              }
              .metadata {
                opacity: 0;
              }
            }
            .up-next {
              opacity: 1;
              // transition: transform 0.2s ease 0.4s;
              width: 703 * $s;
              vertical-align: top;
              transform: translate(#{ 980 * $s }, #{-640 * $s });
            }
          }
          .right-corner {
            // flex: 0;
            // display: none;
          }
        }
        .lowerDeck {
          position: absolute;
          width: 100%;
          z-index: 9999;
          transform: translateY(#{-760 * $s});
          height: 100%;
          .deck-wrapper {
            background-color: rgba(216,216,216,0.3);
          }
        }
      }
      &.fullhome {
        .lowerDeck {
          transform: translateY(#{-1080 * $s});
        }
      }

    }
    .driver {
      position: absolute;
      bottom: 0 * $s;
      left: -15* $s;
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

