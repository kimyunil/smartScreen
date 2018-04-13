// The same as list mixin, but for vertical scrolling

export default {
  methods: {
    scroll(focusedItem, list, container, scrolled) {
      let newScrolled = scrolled;

      if (focusedItem && list && container) {
        const nextItemTop = focusedItem.offsetTop;
        const nextItemHeight = focusedItem.offsetHeight;

        let nextBottom = nextItemTop + nextItemHeight + scrolled;

        const listBottom = list.offsetHeight;
        // Checking if categories in the list, if yes => add category's left
        if (focusedItem.parentNode.parentNode !== list) {
          nextBottom += focusedItem.parentNode.offsetTop;
        }

        if (nextBottom > listBottom) {
          newScrolled += listBottom - nextBottom;
        }

        let nextTop = focusedItem.offsetTop + scrolled;

        const listTop = container.offsetTop;
        // Checking is categories in the list, if yes add category left
        if (focusedItem.parentNode.parentNode !== list) {
          nextTop += focusedItem.parentNode.offsetTop;
        }

        if (nextTop < listTop) {
          newScrolled += listTop - nextTop;
        }
      }
      return newScrolled;
    },
  },
};
