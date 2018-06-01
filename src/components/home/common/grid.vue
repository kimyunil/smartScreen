<template>
    <div class="grid" :class="[details.title]">
      <div class="grid-items"
        :style="{'grid-area': gridItem.type}"
        v-for="gridItem in grids"
        :class="[{'shrink': isRemoteEnabled}, gridItem.type, {'selected': focus && gridItem.type === currType}]"
        :key="gridItem.key"
      >
        <div class="item-wrapper">
          <component :videoActive="videoActive" :is="gridItem.template" :item="gridItem"></component>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import tile from './tile';
import thumbnail from './thumbnail';
import poster from './poster';
import hTile from './hTile';
import Messages from '../../../services/Messages';

export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
    videoActive: {
      type: Boolean,
      default: false,
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
        case 'SELECT':
          console.log(this.grids);
          for (let i = 0; i < this.grids.length; i += 1) {
            if (this.grids[i].type === this.currType) {
              console.log(this.grids[i]);
              this.$emit('select', this.grids[i]);
              break;
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
    hTile,
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
      margin: 0;
      .item-wrapper {
        position: absolute;
        width: 100%;
        border: 20 * $s solid transparent;
        height: 100%;
        transition: transform 0.3s ease;
      }
      &.shrink {
        .item-wrapper {
          transform: scale(0.98);
        }
      }
      &.selected {
         .item-wrapper {
          border-image: url("/static/Images/home/border.png") 30 round;
          border-width: 20 * $s;
         }
      }
    }
    &.page-1 {
      grid-template-columns: 68% 16% 16%; //total is 100%
      grid-template-rows: 50% 50%;
      grid-template-areas:
      "poster tile tile"
      "poster thumbnail1 thumbnail2";
    }
    &.page-2 {
      grid-template-columns: 32% 34% 34%; //total is 100%
      grid-template-rows: 50% 50%;
      grid-template-areas:
      "hTile poster poster"
      "hTile poster poster";
    }
    &.page-3 {
      grid-template-columns: 32% 18% 18% 32%; //total is 100%
      grid-template-rows: 50% 50%;
      grid-template-areas:
      "hTile tile tile hTile1"
      "hTile thumbnail1 thumbnail2 hTile1";
    }
  }

</style>
