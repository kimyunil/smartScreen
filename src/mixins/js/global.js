import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'gConfig',
      'viewStack',
    ]),
    $s() {
      return (window.innerWidth / 1920);
    },
    $uid() {
      return Symbol('uid');
    },
    keyHandler() {
      return this.gConfig.components[this.$options._componentTag].keyHandler;
    },
    active() {
      const name = this.$options._componentTag;
      const topEle = this.viewStack[this.viewStack.length - 1];
      console.log(name, topEle);
      if (topEle === name) {
        return true;
      }
      return false;
    },
  },
  methods: {
    $clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  },
};
