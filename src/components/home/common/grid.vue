<template>
    <div class="grid" :class="[details.title]">
      <div class="grid-items"
        :style="{'grid-area': gridItem.type}"
        v-for="gridItem in grids"
        :class="[{'shrink': isRemoteEnabled}, gridItem.type, {'selected': focus && gridItem.type === currType}]"
        :key="gridItem.key"
      >
        <component :is="gridItem.template" :item="gridItem"></component>
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import tile from './tile';
import thumbnail from './thumbnail';
import poster from './poster';
import Messages from '../../../services/Messages';

export default {
  props: {
    details: {
      type: Object,
      required: true,
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
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    grids() {
      const gridItems = [];
      for (let i = 0; i < this.details.content.length; i += 1) {
        const key = this.details.content[i];
        gridItems[i] = this.details[key];
        gridItems[i].key = key;
      }
      return gridItems;
    },
    currType() {
      return this.details.nav[this.row][this.col];
    },
  },
  data() {
    return {
      row: 0,
      col: 0,
    };
  },
  methods: {
    checkLeft(column) {
      let col = column;
      const currType = this.details.nav[this.row][this.col];
      while (col > -1) {
        const next = this.details.nav[this.row][col];
        if (currType !== next) {
          return col;
        }
        col -= 1;
      }
      return -1;
    },
    checkRight(column) {
      let col = column;
      const currType = this.details.nav[this.row][this.col];
      while (col < this.details.nav[this.row].length) {
        const next = this.details.nav[this.row][col];
        console.log(currType, next);
        if (currType !== next) {
          return col;
        }
        col += 1;
      }
      return -1;
    },
    checkUp(r) {
      let row = r;
      const currType = this.details.nav[this.row][this.col];
      while (row > -1) {
        const next = this.details.nav[row][this.col];
        console.log(currType, next);
        if (currType !== next) {
          return row;
        }
        row -= 1;
      }
      return -1;
    },
    checkDown(r) {
      let row = r;
      const currType = this.details.nav[this.row][this.col];
      while (row < this.details.nav.length) {
        const next = this.details.nav[row][this.col];
        console.log(currType, next);
        if (currType !== next) {
          return row;
        }
        row += 1;
      }
      return -1;
    },
    handleKeyDown(type) {
      if (!this.focus) return;
      switch (type) {
        case 'UP':
          if (this.row >= 0) {
            const val = this.checkUp(this.row);
            if (val === -1) {
              // emit change
              this.$emit('movefocus', { dir: 'up', from: 'grid' });
            } else {
              this.row = val;
            }
          }
          break;
        case 'DOWN':
          if (this.row < this.details.nav.length) {
            const val = this.checkDown(this.row);
            if (val === -1) {
              // emit change
              this.$emit('movefocus', { dir: 'down', from: 'grid' });
            } else {
              this.row = val;
            }
          }
          break;
        case 'LEFT':
          if (this.col > 0) {
            const val = this.checkLeft(this.col);
            if (val === -1) {
              // emit change
            } else {
              this.col = val;
            }
          }
          break;
        case 'RIGHT':
          if (this.col < this.details.nav[this.row].length - 1) {
            const val = this.checkRight(this.col);
            if (val === -1) {
              // emit change
            } else {
              this.col = val;
            }
          }
          break;
        default:
          break;
      }
    },
  },
  components: {
    tile,
    thumbnail,
    poster,
  },
};
</script>
<style scoped lang="scss">
@import '../../../mixins/scss/main';
  .grid {
    position: relative;
    height: 100%;
    width: 100%;
    height: 807 * $s;
    display: grid;
    height: 100%;
    .grid-items {
      position: relative;
      border: 20 * $s solid transparent;
      margin: 0;
      transition: margin 0.3s ease;
      &.shrink {
       margin: 20 * $s;
      }
      &.selected {
        border-image: url(https://www.w3schools.com/cssref/border.png) 30 round;
        border-width: 20 * $s;
      }
    }
    &.page-1 {
      grid-template-columns: 57% 21.8% 21.2%; //total is 100%
      grid-template-rows: 50% 50%;
      grid-template-areas:
      "poster tile tile"
      "poster thumbnail1 thumbnail2";
    }
    &.page-2 {
      grid-template-columns:21.8% 21.2% 57%; //total is 100%
      grid-template-rows: 50% 50%;
      grid-template-areas:
      "thumbnail1 thumbnail2 poster"
      "tile tile poster";
    }
    &.page-3 {
       grid-template-columns:21.8% 21.2% 57%; //total is 100%
      grid-template-rows: 50% 50%;
      grid-template-areas:
      "tile tile poster"
      "thumbnail2 thumbnail1 poster";
    }
  }

</style>
