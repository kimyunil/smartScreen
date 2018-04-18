<template>
    <div class="grid" :class="[details.title]">
      <div class="grid-items" v-for="gridItem in grids" :class="[{'shrink': isRemoteEnabled}, gridItem.type]" :key="gridItem.key">
        <component :is="gridItem.template" :item="gridItem"></component>
      </div>
    </div>
</template>
<script>
import tile from './tile';
import thumbnail from './thumbnail';
import poster from './poster';
import { mapState } from 'vuex';

export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
    ]),
    grids() {
      const gridItems = [];
      for (let i = 0; i < this.details.content.length; i++) {
        const key = this.details.content[i];
        gridItems[i] = this.details[key];
        console.log(gridItems[i]);
        gridItems[i].key = key;
      }
      return gridItems;
    },
  },
  components: {
    tile,
    thumbnail,
    poster,
  },
  mounted() {
    console.log(this.details);
  },
};
</script>
<style scoped lang="scss">
@import '../../../mixins/scss/main';
  .grid {
    position: relative;
    height: 100%;
    width: 100%;
    display: grid;
    height: 100%;
    .grid-items {
      position: relative;
      border: 10 * $s solid transparent;
      margin: 0;
      transition: border 0.3s ease, margin 0.3s ease;
      &.shrink {
       border: 20 * $s solid white;
       margin: 20 * $s;
      }
      &.thumbnail-1 {
        grid-area: thumbnail1;
      }
      &.thumbnail-2 {
        grid-area: thumbnail2;
      }
      &.tile {
        grid-area: tile;
      }
      &.poster {
        grid-area: poster;
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
       grid-template-columns: 57% 21.8% 21.2%; //total is 100%
      grid-template-rows: 50% 50%;
      grid-template-areas:
      "poster tile tile"
      "poster thumbnail1 thumbnail2";
    }
  }

</style>
