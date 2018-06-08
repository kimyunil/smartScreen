export default {
  got: {
    default: {
      id: 'Game of Thrones',
      save: {
        rmvApp: 'westworld',
        index: 2,
        pageIdx: 0,
        elapsedTime: 0,
        total: 0,
        details: {
          full: true,
          video: '/resources/videos/smartscreen/TV_Shows_1_Westworld.mp4',
          poster: '/static/Images/home/posters/morning/westw.png',
          text1: '<span><span style="color: rgba(255,97,97,1);">Westworld</span> <br> <span>2 Seasons | 20 Episodes</span></span>',
          logo: '/static/Images/home/foryou/slidesIcons/amazon.png',
          logoType: 'sqr',
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
          full: 'partial',
          action: {
            category: 'hulu',
            subcategory: 'home',
            content: 'handmaids',
          },
          topLeftText: '<span class="bold-top-text">Continue Watching</span>',
          bottomText: '<span class="bold-text">The Handmaid’s Tale</span><br>',
          tile: '/static/Images/home/tile/morning/maid.png',
          logo: '/static/Images/home/foryou/slidesIcons/hulu.png',
          logoType: 'rect',
          img: '',
        },
      },
      url: '/resources/videos/continue04_handmaid.mp4',
    },
  },
};
