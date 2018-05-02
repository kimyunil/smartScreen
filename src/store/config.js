export default {
  components: {
    home: {
      type: 'source',
      suggestion: true,
    },
    bixby: {
      type: 'system',
      suggestion: false,
    },
    screenshot: {
      type: 'app',
      suggestion: false,
    },
    spotifyhome: {
      type: 'screenshot',
      img: '/static/Images/screenshot/spotify.png',
    },
    fitbit: {
      type: 'screenshot',
      img: '/static/Images/screenshot/fitbit.png',
    },
    hbo: {
      type: 'source',
      suggestion: false,
    },
    volume: {
      type: 'system',
      suggestion: false,
    },
    screensaver: {
      type: 'boot',
      suggestion: true,
    },
    spotify: {
      type: 'source',
      suggestion: true,
    },
    hulu: {
      type: 'source',
      suggestion: false,
    },
  },
};
