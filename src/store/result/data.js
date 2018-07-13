export default {
  movies: {
    action: {
      list: ['action1', 'action2', 'action3'],
      title: 'ACTION MOVIES',
      details: {
        action1: {
          img: './static/Images/results/action/actionsSc1.png',
          suggestions: ['Hey Bixby, next page'],
          sayWord: 'Try saying',
        },
        action2: {
          sayWord: 'Try saying',
          img: './static/Images/results/action/actionsSc2.png',
          suggestions: ['Hey Bixby, from the last 2 years '],
        },
        action3: {
          sayWord: 'Try saying',
          img: './static/Images/results/action/actionsSc3.png',
          suggestions: ['Hey Bixby, dismiss'],
        },
      },
    },
    topaction: {
      list: ['action1'],
      title: '',
      details: {
        action1: {
          img: './static/Images/results/action/top_actions.jpg',
          suggestions: ['“Hey Bixby, show me more“'],
          sayWord: 'Say',
        },
      },
    },
    youtubetrend: {
      list: ['action1', 'action2'],
      title: '',
      details: {
        action1: {
          img: './static/Images/results/youtub/youtubepag1.png',
          sayWord: 'Say',
          suggestions: ['“Hey Bixby, sort by the newest videos“'],
        },
        action2: {
          sayWord: 'Say',
          img: './static/Images/results/youtub/yotubepage2.png',
          suggestions: ['“Hey Bixby, sort by the newest videos“'],
        },
      },
    },
    ghost: {
      list: ['ghost1'],
      title: 'GHOSTBUSTERS',
      details: {
        ghost1: {
          img: './static/Images/results/ghost/ghost.png',
          suggestions: ['Hey Bixby, dismiss'],
          sayWord: 'Try saying',
        },
      },
    },
    more: {
      list: ['moreresult'],
      title: 'TOP RECOMMENDED MOVIES',
      details: {
        moreresult: {
          img: './static/Images/results/moreresult.png',
          suggestions: ['Hey Bixby, play the first one'],
          sayWord: 'Try saying',
        },
      },
    },
  },
};
