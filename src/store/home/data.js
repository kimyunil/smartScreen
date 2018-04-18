export default {
  pages: {
    pagination: ['page-1', 'page-2', 'page-3'],
    details: {
      'page-1': {
        title: 'page-1',
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
          type: 'thumbnail-1',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail.png',
        },
        spotify: {
          type: 'thumbnail-2',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail2.png',
        },
      },
      'page-2': {
        title: 'page-2',
        content: ['iot-temp', 'iot-light', 'source', 'spotify'],
        'iot-temp': {
          type: 'thumbnail-1',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail.png',
        },
        'iot-light': {
          type: 'thumbnail-2',
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
          type: 'thumbnail-1',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail.png',
        },
        source: {
          type: 'thumbnail-2',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '/static/Images/home/page1/thumbnail2.png',
        },
      },
    },
  },
};
