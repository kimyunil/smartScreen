import markAlpha from './json/mark_540.json';

export default {
  movies: {
    funny: {
      template: 'hList',
      response: 'Here are some top rated funny movies',
      list: ['funny1', 'funny2', 'funny3', 'funny4', 'funny5', 'funny6'],
      drivers: ['Try saying "Hey Bixby, show me more"', 'Try saying "Hey Bixby, Dismiss"'],
      clipanim: {
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: markAlpha,
      },
    },
    action: {
      template: 'hList',
      response: 'Here are some top rated funny movies',
      list: ['action1', 'action2', 'action3', 'action4', 'action5', 'action6'],
      drivers: ['Try saying "Hey Bixby, show me more"', 'Try saying "Hey Bixby, Dismiss"'],
      clipanim: {
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: markAlpha,
      },
    },
    data: {
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
