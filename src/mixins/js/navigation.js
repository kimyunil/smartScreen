/**
 * navigation mixin
 *
 * This is an implementation to apply the Navigation Basic Rule in 2-Directional Grid
 * The Rule is defined in both vertical and horizontal cases.
 *
 * However, currently, this mixin only supports one of vertical or horizontal case.
 * (This is a limition, it would be improved later)
 *
 * For example, the Apps has rows that contains the same size of items.
 * It means that the width of the next focusable item is always the same,
 * so that it doesn't need to consider what the next one will come in vertical movements.
 * Therefore, you can use this mixin
 * to get the next focusable item's index only for horizontal movements.
 */
const MAX_LENGTH = 5;

export default {
  data() {
    return {
      navDir: null,
      navQueue: [],
    };
  },
  methods: {
    clearNav() {
      this.navQueue = [];
    },
    pushNav(obj, dir) {
      if (this.navDir !== dir) {
        this.navDir = dir;
        this.clearNav();
      }

      if (this.navQueue.length === MAX_LENGTH) {
        this.navQueue.splice(0, 1);
      }
      this.navQueue.push(obj);
    },
    getNavTargetIndex(curr, row, dir) {
      if (this.navDir !== dir) {
        this.navDir = dir;
        this.clearNav();
      }

      let vMin = Number.POSITIVE_INFINITY;
      let index = -1;

      for (let i = 0; i < row.length; i++) {
        const tmp = Array.prototype.concat(curr, row[i], this.navQueue);
        const positions = [];
        for (let j = 0; j < tmp.length; j++) {
          const rect = tmp[j].getBoundingClientRect();
          positions.push(rect.left + rect.width / 2);
        }
        const variance = getVariance(positions);
        if (variance < vMin) {
          vMin = variance;
          index = i;
        }
      }

      return index;
    },
  },
};

function getVariance(list) {
  const size = list.length;

  let sum = 0;
  for (let i = 0; i < size; i++) {
    sum += list[i];
  }
  const avg = sum / size;

  let variance = 0;
  for (let i = 0; i < size; i++) {
    const diff = avg - list[i];
    variance += diff * diff;
  }
  variance = variance / size;

  return variance;
}
