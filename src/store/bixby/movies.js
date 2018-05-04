import markAlpha from './json/mark_540.json';

export default {
  movies: {
    funny: {
      template: 'list',
      contentType: 'movies',
      response: 'Here are some top rated funny movies',
      suggestions: ['Hey Bixby, show me more', 'Hey Bixby, dismiss'],
      list: ['funny1', 'funny2', 'funny3', 'funny4', 'funny5', 'funny6'],
      drivers: ['Hey Bixby, show me more', 'Hey Bixby, Dismiss'],
      clipanim: {
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: markAlpha,
      },
    },
    ghostbuster: {
      template: 'list',
      contentType: 'movies',
      response: 'Here\'s what I found for Ghostbusters',
      suggestions: ['Hey Bixby, show me more', 'Hey Bixby, dismiss'],
      list: ['gbust1', 'gbust2', 'gbust3', 'gbust4', 'gbust5', 'gbust6'],
      drivers: ['Hey Bixby, show me more', 'Hey Bixby, Dismiss'],
      clipanim: {
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: markAlpha,
      },
    },
    starwar: {
      template: 'list',
      contentType: 'movies',
      response: 'Here are the most popular Star Wars movies',
      suggestions: ['Hey Bixby, show me more', 'Hey Bixby, dismiss'],
      list: ['strwr1', 'strwr2', 'strwr3', 'strwr4', 'strwr5', 'strwr6'],
      drivers: ['Hey Bixby, show me more', 'Hey Bixby, Dismiss'],
      clipanim: {
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: markAlpha,
      },
    },
    action: {
      template: 'list',
      contentType: 'movies',
      response: 'Here are some top rated funny movies',
      suggestions: ['Hey Bixby, show me more', 'Hey Bixby, dismiss'],
      list: ['action1', 'action2', 'action3', 'action4', 'action5', 'action6'],
      drivers: ['Hey Bixby, show me more', 'Hey Bixby, Dismiss'],
      clipanim: {
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: markAlpha,
      },
    },
    data: {
      gbust1: {
        url: './static/Images/results/ghost/gs1.png',
        subtitle: '2016',
      },
      gbust2: {
        url: './static/Images/results/ghost/gs2.png',
        subtitle: '1989',
      },
      gbust3: {
        url: './static/Images/results/ghost/gs3.png',
        subtitle: '1984',
      },
      gbust4: {
        url: './static/Images/results/ghost/gs4.png',
        subtitle: '7 seasons',
      },
      gbust5: {
        url: './static/Images/results/ghost/gs5.png',
        subtitle: '1 seasons',
      },
      gbust6: {
        url: './static/Images/results/ghost/gs6.png',
        subtitle: '1 seasons',
      },
      strwr1: {
        url: './static/Images/results/starwar/sw1.png',
        subtitle: '2016',
      },
      strwr2: {
        url: './static/Images/results/starwar/sw2.png',
      },
      strwr3: {
        url: './static/Images/results/starwar/sw3.png',
      },
      strwr4: {
        url: './static/Images/results/starwar/sw4.png',
      },
      strwr5: {
        url: './static/Images/results/starwar/sw5.png',
      },
      strwr6: {
        url: './static/Images/results/starwar/sw6.png',
      },
      action1: {
        url: './static/Images/results/action/action1.png',
      },
      action2: {
        url: './static/Images/results/action/action2.png',
      },
      action3: {
        url: './static/Images/results/action/action3.png',
      },
      action4: {
        url: './static/Images/results/action/action4.png',
      },
      action5: {
        url: './static/Images/results/action/action5.png',
      },
      action6: {
        url: './static/Images/results/action/action6.png',
      },
      funny1: {
        url: './static/Images/results/funny/funny1.png',
      },
      funny2: {
        url: './static/Images/results/funny/funny2.png',
      },
      funny3: {
        url: './static/Images/results/funny/funny3.png',
      },
      funny4: {
        url: './static/Images/results/funny/funny4.png',
      },
      funny5: {
        url: './static/Images/results/funny/funny5.png',
      },
      funny6: {
        url: './static/Images/results/funny/funny6.png',
      },
    },
  },
};
