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
      suggestion: false,
    },
    result: {
      type: 'app',
    },
    spotifyhome: {
      vType: 'screenshot',
      type: 'app',
      suggestion: true,
      sayWod: 'Try saying',
      theme: 'dark',
      drivers: ['Hey Bixby, play Strawberry Swing'],
      img: '/static/Images/screenshot/spotify.png',
    },
    youtube: {
      vType: 'screenshot',
      type: 'app',
      suggestion: false,
      sayWod: 'Try saying',
      theme: 'dark',
      drivers: ['Hey Bixby, play Strawberry Swing'],
      img: '/static/Images/screenshot/youtube.jpg',
    },
    fitbit: {
      vType: 'screenshot',
      type: 'app',
      sayWod: 'Try saying',
      suggestion: true,
      theme: 'light',
      drivers: ['Hey Bixby, let’s do yoga challenge'],
      img: '/static/Images/screenshot/fitbit.png',
    },
    hbo: {
      type: 'app',
      suggestion: false,
    },
    ytplayer: {
      type: 'app',
      suggestion: false,
    },
    vevo: {
      type: 'app',
      suggestion: false,
    },
    hboplayer: {
      type: 'app',
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
      drivers: ['Hey Bixby, let’s do yoga challenge'],
      suggestion: true,
    },
    hulu: {
      type: 'app',
      suggestion: false,
    },
  },
};
