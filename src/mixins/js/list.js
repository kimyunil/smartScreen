export default {
  methods: {
    scroll(focusedItem, list, container, scrolled, marginLeft = 0, marginRight = 0) {
      let newScrolled = scrolled;

      if (focusedItem && list && container) {
        const nextItemLeft = focusedItem.offsetLeft;
        const nextItemWidth = focusedItem.offsetWidth;

        let nextRight = nextItemLeft + nextItemWidth + scrolled + marginRight;

        const listRight = list.offsetWidth;
        // Checking if categories in the list, if yes => add category's left
        if (focusedItem.parentNode.parentNode !== list) {
          nextRight += focusedItem.parentNode.offsetLeft;
        }

        if (nextRight > listRight) {
          newScrolled += listRight - nextRight;
        }

        let nextLeft = focusedItem.offsetLeft + scrolled - marginLeft;

        const listLeft = container.offsetLeft;
        // Checking is categories in the list, if yes add category left
        if (focusedItem.parentNode.parentNode !== list) {
          nextLeft += focusedItem.parentNode.offsetLeft;
        }

        if (nextLeft < listLeft) {
          newScrolled += listLeft - nextLeft;
          if (newScrolled > 0) newScrolled = 0;
        }
      }
      return newScrolled;
    },
  },
};
