export default {
  methods: {
    getIndexByLeft(items, listEl, left, translated) {
      const closest = {
        distance: 1000000,
        index: undefined,
      };
      Array.from(items).forEach((Item, i) => {
        const item = {
          width: Item.offsetWidth,
          left: Item.offsetLeft + translated,
          right: Item.offsetWidth + Item.offsetLeft + translated,
        };
        const list = {
          width: listEl.offsetWidth,
          left: listEl.offsetLeft,
          right: listEl.offsetWidth + listEl.offsetLeft,
        };
        const distance = Math.abs(item.left - left);
        let leftFit = false;
        let rightFit = false;

        const listItemLeftClose = Math.abs(Math.abs(item.left) - Math.abs(list.left)) <= 5;

        const RDist = Math.abs(list.left) + list.width - Math.abs(item.left) - item.width;
        const listItemRightClose = Math.abs(RDist) <= 5;

        if (item.left > list.left || listItemLeftClose) leftFit = true;
        if (item.right < list.right || listItemRightClose) rightFit = true;

        if (distance < closest.distance && leftFit === true && rightFit === true) {
          closest.distance = distance;
          closest.index = i;
        }
      });
      return closest.index;
    },
  },
};
