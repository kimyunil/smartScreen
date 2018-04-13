export default {
  methods: {
    handleNumpad(type) {
      if (type === 'ONE') {
        return 1;
      } else if (type === 'TWO') {
        return 2;
      } else if (type === 'THREE') {
        return 3;
      } else if (type === 'FOUR') {
        return 4;
      } else if (type === 'FIVE') {
        return 5;
      } else if (type === 'SIX') {
        return 6;
      } else if (type === 'SEVEN') {
        return 7;
      } else if (type === 'EIGHT') {
        return 8;
      } else if (type === 'NINE') {
        return 9;
      } else if (type === 'ZERO') {
        return 0;
      }

      // shrug
      return -1;
    },
  },
};
