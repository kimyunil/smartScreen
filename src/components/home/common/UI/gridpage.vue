<template>
    <div class="grid" :class="[details.title]">
      <div class="grid-items"
        :style="{'grid-area': gridItem.type}"
        v-for="gridItem in grids"
        :class="[{'shrink': isRemoteEnabled}, gridItem.type, {'selected': focus && gridItem.type === currType}]"
        :key="gridItem.key"
      >
        <div class="item-wrapper">
          <div class="container">
            <component :videoActive="videoActive" :is="gridItem.template" :item="gridItem" :selected="(focus && gridItem.type === currType)"></component>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import tile from './tile';
import thumbnail from './thumbnail';
import Messages from '../../../../services/Messages';

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
    colIdx: {
      type: Number,
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
    setCol(idx) {
      this.col = idx;
    },
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
              this.$emit('movefocus', { dir: 'left', from: 'grid' });
              // emit change
            } else {
              this.col = val;
            }
          } else {
            this.$emit('movefocus', { dir: 'left', from: 'grid' });
          }
          break;
        case 'RIGHT':
          if (this.col < this.details.nav[this.row].length - 1) {
            const val = this.checkRight(this.col);
            if (val === -1) {
              // emit change
              this.$emit('movefocus', { dir: 'right', from: 'grid' });
            } else {
              this.col = val;
            }
          } else {
            this.$emit('movefocus', { dir: 'right', from: 'grid' });
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
  watch: {
    colIdx(val) {
      if (this.focus) {
        this.col = val;
      }
    },
  },
  components: {
    tile,
    thumbnail,
  },
};
</script>
<style scoped lang="scss">
@import '../../../../mixins/scss/main';
  .grid {
    position: relative;
    width: 100%;
    display: grid;
    height: 100%;
    &.grid-1 {
      grid-template-rows: 55% 45%; //total is 100%
      // grid-template-rows: 50% 50%;
      grid-column-gap: 50 * $s;
      grid-template-areas:
      "tile tile"
      "thumbnail1 thumbnail2";
    }
    .item-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      .container {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
