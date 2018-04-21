<template>
  <div class="list-grid">
    <div class="list">
      <div class="apps" v-for="(item) in items" :key="item.title" :class="[{'shrink': isRemoteEnabled}]">
        <img class="icon" :src="item.img"/>
        <img class="bg-thumb" :src="item.thumbnail"/>
        <div class="footer-text">
          <template v-for="text in item.bottomText.split('$')">
            <div :key="text">{{text}}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Messages from '../../../services/Messages';

export default {
  props: {
    details: {
      type: Object,
      reuquired: true,
    },
    focus: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    Messages.$on('button_down', this.handleKeyDown);
  },
  destroyed() {
    Messages.$off('button_down', this.handleKeyDown);
  },
  methods:{
    handleKeyDown(type) {
      console.log('LGrid');
      if (!this.focus) return;
      console.log('LGrid11', type);
      switch (type) {
        case 'UP':
          this.$emit('movefocus', { dir: 'up', from: 'lgrid' });
          break;
        case 'DOWN':
          break;
        case 'LEFT':
          break;
        case 'RIGHT':
          break;
        default:
          break;
      }
    },
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    items() {
      const array = [];
      for (let i = 0; i < this.details.content.length; i += 1) {
        const key = this.details.content[i];
        array[i] = this.details[key];
      }
      console.log(array);
      return array;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../mixins/scss/main';

.list-grid {
  position: relative;
  height: 100%;
  width: 100%;
  .list {
    position: absolute;
    white-space: nowrap;
    height: 100%;
    .apps {
      position: relative;
      display: inline-block;
      padding-right: 15 * $s;
      margin-right: 0;
      transition: margin 0.3s ease;
      .bg-thumb {
        height: 100%;
      }
      .icon {
        position: absolute;
        z-index: 2;
        right: 40 * $s;
        bottom: 40 * $s;
      }
      .footer-text {
        position: absolute;
        left: 40 * $s;
        font-size: 40 * $s;
        bottom: 100 * $s;
        color: white;
        text-align: left;
        font-family: Helvetica;
      }
      &.shrink {
        margin-right: 30 * $s;
      }
    }
  }
}
</style>
