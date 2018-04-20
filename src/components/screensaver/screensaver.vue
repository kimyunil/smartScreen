<template>
  <div class="screensaver">
    <div class="backdrop" :class="{'enabled': powerEnabled}">
    </div>
      <div class="time">
          {{time}}
      </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import Messages from '../../services/Messages';

export default {
  name: 'screensaver',
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
    this.interval = setInterval(() => {
      this.time = moment().format('LT');
    }, 1000);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
    clearTimeout(this.interval);
    clearTimeout(this.timeOut);
  },
  methods: {
    ...mapActions({
      switch_comp: 'SWITCH_COMPONENT',
    }),
    handleKeyDown(type) {
      console.log('Handle Key Down', type);
      if (!this.active) return;
      switch (type) {
        case 'POWER':
          if (!this.powerEnabled) {
            this.powerEnabled = true;
            this.timeOut = setTimeout(() => {
              this.powerEnabled = false;
            }, 10000)
          } else if(this.powerEnabled){
            //switch Component
            this.switch_comp({ name: 'home'});
          }
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      interval: null,
      timeOut: null,
      powerEnabled: false,
      time: '',
    };
  },
  watch: {
  },
  components: {
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/scss/main';
.screensaver {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background-image: url('/static/bgbg.png');
  .backdrop {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.4s ease;
    background: rgba(0,0,0,1);
    &.enabled {
      opacity: 0.4;
    }
  }
  .time {
    position: absolute;
    top: 0;
    width: auto;
    height:auto;
    padding: 50 * $s;
    font-size: 120 * $s;
    color:white;
    font-family: SamsungOneUI600;
  }
}
</style>
