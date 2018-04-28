import markAlpha from './json/mark_540.json';

export default {
  music: {
    playlist: {
      template: 'list',
      contentType: 'music',
      response: 'Here is your spotify playlist',
      list: ['plys1', 'plys2', 'plys3', 'plys4', 'plys5'],
      drivers: ['Try saying "Hey Bixby, show me more"', 'Try saying "Hey Bixby, Dismiss"'],
      clipanim: {
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: markAlpha,
      },
    },
    coldplay: {
      template: 'list',
      contentType: 'music',
      response: 'Here is your spotify playlist',
      list: ['cp1', 'cp2', 'cp3', 'cp4', 'cp5'],
      drivers: ['Try saying "Hey Bixby, show me more"', 'Try saying "Hey Bixby, Dismiss"'],
      clipanim: {
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: markAlpha,
      },
    },
    data: {
      cp1: {
        url: './static/Images/results/music/cp1.png',
        title: 'A Head full of…',
        subtitle: '2015',
      },
      cp2: {
        url: './static/Images/results/music/cp2.png',
        title: 'Ghost Stories',
        subtitle: '2014',
      },
      cp3: {
        url: './static/Images/results/music/cp3.png',
        title: 'Mylo Xyloto',
        subtitle: '2011…',
      },
      cp4: {
        url: './static/Images/results/music/cp4.png',
        title: 'Viva la Vida',
        subtitle: '2008',
      },
      cp5: {
        url: './static/Images/results/music/cp5.png',
        title: 'X&Y',
        subtitle: '2005',
      },
      plys1: {
        url: './static/Images/results/music/sp1.png',
        title: 'No Tears left to',
        subtitle: 'Ariana Grande',
      },
      plys2: {
        url: './static/Images/results/music/sp2.png',
        title: 'Strawberry Swing',
        subtitle: 'Coldplay',
      },
      plys3: {
        url: './static/Images/results/music/sp3.png',
        title: 'OTW',
        subtitle: 'Khalid, 6LACK, Ty Dol…',
      },
      plys4: {
        url: './static/Images/results/music/sp4.png',
        title: 'The Middle',
        subtitle: 'Zedd,Marren Morris,Grey',
      },
      plys5: {
        url: './static/Images/results/music/sp5.png',
        title: 'Game Over',
        subtitle: 'Martin Garrix, LOOPERS',
      },
    },
  },
};
