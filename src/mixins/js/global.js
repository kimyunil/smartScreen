import { mapState } from 'vuex';

export default {
  props: {
    active: {
      required: false,
      type: Boolean,
    },
  },
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
