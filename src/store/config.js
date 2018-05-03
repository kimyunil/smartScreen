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
      sayWod: 'Try saying',
      suggestion: true,
      theme: 'light',
      drivers: ["Hey Bixby, let’s do yoga challenge"],
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
      theme: 'light',
      sayWod: 'Try saying',
      drivers: ["Hey Bixby, let’s do yoga challenge"],
      suggestion: true,
    },
    hulu: {
      type: 'source',
      suggestion: false,
    },
  },
};
