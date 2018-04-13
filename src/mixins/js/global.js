export default {
  computed: {
    $s() {
      return (window.innerWidth / 1920);
    },
    $uid() {
      return Symbol('uid');
    },
  },
  methods: {
    $clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  },
};
