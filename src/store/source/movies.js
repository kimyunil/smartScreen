export default {
  got: {
    default: {
      id: 'Game of Thrones',
      save: {
        rmvApp: 'source',
        index: 0,
        pageIdx: 1,
        elapsedTime: 0,
        total: 0,
        details: {
          video: '/resources/videos/smartscreen/Westworld_HBO.mp4',
          bottomText: '<span class="bold-text">Westworld</span><br> <span class="light-text">4 Series</span>',
          topLeftText: '',
          action: {
            category: 'hbo',
            subcategory: 'player',
            content: 'got',
          },
          tile: '/static/Images/app/01_Westworld.jpeg',
          logoType: 'big',
          logo: '/static/Images/home/icons/morning/hbo.png',
          img: '',
        },
      },
      url: '/resources/videos/continue01_Westworld.mp4',
    },
  },
  handmaids: {
    default: {
      id: 'HandMaid\'s Tail',
      save: {
        rmvApp: 'hulu',
        index: 0,
        elapsedTime: 0,
        total: 0,
        pageIdx: 0,
        details: {
          action: {
            category: 'hulu',
            subcategory: 'home',
            content: 'handmaids',
          },
          topLeftText: '<span class="bold-top-text">Continue Watching</span>',
          bottomText: '<span class="bold-text">The Handmaid’s Tale</span><br> <span class="light-text">S2 Ep2 Bisrth Day</span>',
          tile: '/static/Images/home/tile/morning/maid.png',
          logo: '/static/Images/home/icons/common/hulu.png',
          logoType: 'rect',
          img: '',
        },
      },
      url: '/resources/videos/continue04_handmaid.mp4',
    },
  },
};
