import Messages from '../../services/Messages';

export default {
  props: ['focused', 'ishandlingkey'],
  data() {
    return {
      keyMap: [[]], // 2D Array of focusableItems
      focusX: 0, focusY: 0,
    };
  },
  computed: {
    currentFocus() {
      return this.keyMap[this.focusY][this.focusX];
    },
  },
  ready() {
    if (this.ishandlingkey) {
      Messages.$on('button_down', this.handleButton);
    }
  },
  destroyed() {
    Messages.$off('button_down', this.handleButton);
  },
  methods: {
    onSelect() {
      // will be used with overriding
    },
    onButton(/* type */) {
      // console.log(type);
      // will be used with overriding
      return true;
    },
    handleButton(type) {
      if (this.focused && this.onButton(type)) {
        switch (type) {
          case 'SELECT':
            this.onSelect();
            break;
          case 'LEFT':
            if (this.focusX > 0
                && this.keyMap[this.focusY][this.focusX - 1]) {
              this.focusX--;
            }
            break;
          case 'RIGHT':
            if (this.focusX < this.keyMap[this.focusY].length - 1
                && this.keyMap[this.focusY][this.focusX + 1]) {
              this.focusX++;
            }
            break;
          case 'UP':
            if (this.focusY > 0
                && this.keyMap[this.focusY - 1][this.focusX]) {
              this.focusY--;
            }
            break;
          case 'DOWN':
            if (this.focusY < this.keyMap.length - 1
                && this.keyMap[this.focusY + 1][this.focusX]) {
              this.focusY++;
            }
            break;
          default:
            break;
        }
      }
    },
  },
};
