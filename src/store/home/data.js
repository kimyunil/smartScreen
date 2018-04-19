export default {
  navs: {
    items: ['for_you', 'health', 'tvshows', 'apps', 'music', 'movies'],
    selectedIdx: 0,
    details: {
      for_you: {
        title: 'FOR YOU',
      },
      health: {
        title: 'HEALTH & WELLNESS',
      },
      tvshows: {
        title: 'TV SHOWS',
      },
      apps: {
        title: 'APPS',
      },
      movies: {
        title: 'MOVIES',
      },
      music: {
        title: 'MUSIC',
      },
    },
  },
  apps: {
    items: ['netflix', 'hulu', 'spotify', 'fitbit', 'masterclass'],
    details: {
      netflix: {
        img: '',
        title: 'NetFlix',
      },
      hulu: {
        img: '',
        title: 'Hulu',
      },
      spotify: {
        img: '',
        title: 'Spotify',
      },
      fitbit: {
        img: '',
        title: 'Fitbit',
      },
      masterclass: {
        img: '',
        title: 'MasterClass',
      },
    },
  },
  pages: {
    pagination: ['page-1', 'page-2', 'page-3'],
    details: {
      'page-1': {
        title: 'page-1',
        nav: [
          ['poster', 'tile', 'tile'],
          ['poster', 'thumbnail1', 'thumbnail2'],
        ],
        content: ['news', 'fitness', 'weather', 'spotify'],
        news: {
          type: 'poster',
          template: 'poster',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/poster.png',
        },
        fitness: {
          type: 'tile',
          template: 'tile',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/tile.png',
        },
        weather: {
          type: 'thumbnail1',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail.png',
        },
        spotify: {
          type: 'thumbnail2',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail2.png',
        },
      },
      'page-2': {
        title: 'page-2',
        content: ['iot-temp', 'iot-light', 'source', 'spotify'],
        nav: [
          ['thumbnail1', 'thumbnail2', 'poster'],
          ['tile', 'tile', 'poster'],
        ],
        'iot-temp': {
          type: 'thumbnail1',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail.png',
        },
        'iot-light': {
          type: 'thumbnail2',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail2.png',
        },
        source: {
          type: 'tile',
          template: 'tile',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/tile.png',
        },
        spotify: {
          type: 'poster',
          template: 'poster',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/poster.png',
        },
      },
      'page-3': {
        title: 'page-3',
        content: ['fitbit-gym', 'fitbit-yoga', 'sponsor', 'source'],
        nav: [
          ['tile', 'tile', 'poster'],
          ['thumbnail2', 'thumbnail1', 'poster'],
        ],
        'fitbit-gym': {
          type: 'poster',
          template: 'poster',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/poster.png',
        },
        'fitbit-yoga': {
          type: 'tile',
          template: 'tile',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/tile.png',
        },
        sponsor: {
          type: 'thumbnail1',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail.png',
        },
        source: {
          type: 'thumbnail2',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail2.png',
        },
      },
    },
  },
};
