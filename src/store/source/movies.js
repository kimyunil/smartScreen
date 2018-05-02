export default {
  got: {
    default: {
      id: 'Game of Thrones',
      save: {
        rmvApp: 'source',
        index: 0,
        pageIdx: 2,
        elapsedTime: 0,
        total: 0,
        details: {
          action: {
            category: 'hbo',
            subcategory: 'player',
            content: 'got',
          },
          topLeftText: 'Continue Watching',
          bottomText: 'WestWorld<br>S1Ep4Dissonance Theory',
          logo: '/static/Images/home/icons/morning/hbo.png',
          tile: '/static/Images/app/01_Westworld.jpeg',
        },
      },
      url: '/resources/videos/continue01_Westworld.mp4',
    },
  },
  handmaids: {
    default: {
      id: 'HandMaid\'s Tail',
      save: {
        rmvApp: 'source',
        index: 0,
        elapsedTime: 0,
        total: 0,
        pageIdx: 2,
        details: {
          action: {
            category: 'hulu',
            subcategory: 'home',
            content: 'handmaids',
          },
          topLeftText: 'Continue Watching',
          bottomText: 'HandMaid\'s Tail',
          logo: '/static/Images/home/icons/evening/hulu.png',
          tile: '/static/Images/app/02_The_Handmaids_Tale.jpg',
        },
      },
      url: '/resources/videos/continue04_handmaid.mp4',
    },
  },
};
