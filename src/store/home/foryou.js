export default {
  apps: {
    items: ['netflix', 'hulu', 'spotify', 'fitbit', 'masterclass'],
    details: {
      netflix: {
        img: '/static/Images/home/apps/netflix.png',
        title: 'NetFlix',
      },
      hulu: {
        img: '/static/Images/home/apps/hulu.png',
        title: 'Hulu',
      },
      spotify: {
        img: '/static/Images/home/apps/spotify.png',
        title: 'Spotify',
      },
      fitbit: {
        img: '/static/Images/home/apps/fibit.png',
        title: 'Fitbit',
      },
      masterclass: {
        img: '/static/Images/home/apps/masterclass.png',
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
        content: ['news', 'fitness', 'weather', 'npr'],
        news: {
          type: 'poster',
          template: 'poster',
          contentType: 'simple',
          details: {
            poster: '/static/Images/home/posters/morning/news.png',
            text1: 'Trump to Impose New$Sanctions on Russia Over$Support for Syria',
          },
          logo: '/static/Images/home/icons/morning/news.png',
          dim: {
            w: '40',
            h: '50',
          },
          img: '',
        },
        fitness: {
          type: 'tile',
          template: 'tile',
          contentType: 'time',
          details: {
            bottomText: 'Sleep Summary',
            tile: '/static/Images/home/tile/morning/fitbit.png',
          },
          logo: '/static/Images/home/icons/common/fitbit.png',
          dim: {
            w: '121',
            h: '30',
          },
          img: '',
        },
        weather: {
          type: 'thumbnail1',
          contentType: 'iot',
          details: {
            measure: '75 - Sunny',
            icon: '/static/Images/home/thumbnail/morning/sunny.png',
            place: 'Mountain View',
          },
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '',
        },
        npr: {
          type: 'thumbnail2',
          template: 'thumbnail',
          contentType: 'cp',
          details: {
            bottomText: 'Play Morning$Playlist',
            icon: '',
          },
          dim: {
            w: '90',
            h: '30',
          },
          logo: '/static/Images/home/icons/morning/npr.png',
          img: '/static/Images/home/thumbnail/morning/npr_thumbnail.png',
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
          details: {
            icon: '/static/Images/home/thumbnail/morning/temp.png',
            measure: '68',
            place: 'Living Room Temp',
          },
          contentType: 'iot',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '',
        },
        'iot-light': {
          type: 'thumbnail2',
          details: {
            icon: '/static/Images/home/thumbnail/morning/iot-light.png',
            measure: '2 Lights ON',
            place: 'Kitchen',
          },
          contentType: 'iot',
          template: 'thumbnail',
          logo: '/static/Images/home/health/fitbit.png',
          img: '',
        },
        source: {
          type: 'tile',
          template: 'tile',
          contentType: 'sponsored',
          details: {
            bottomText: 'Game of Thrones',
            tile: '/static/Images/home/tile/morning/GOT.png',
          },
          dim: {
            w: '75',
            h: '31',
          },
          logo: '/static/Images/home/icons/morning/hbo.png',
          img: '',
        },
        spotify: {
          type: 'poster',
          contentType: 'simple',
          details: {
            poster: '/static/Images/home/posters/morning/spotify.png',
            text1: 'Today\'s Trending Music',
          },
          dim: {
            w: '150',
            h: '30',
          },
          template: 'poster',
          logo: '/static/Images/home/icons/morning/spotify.png',
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
          contentType: 'details',
          details: {
            poster: '/static/Images/home/posters/morning/exercise.png',
            text1: {
              'Total Sculp:': '2.0',
              'Cardio & Hit': '',
            },
            text2: {
              'Intensity:': '3',
            },
          },
          template: 'poster',
          dim: {
            w: '166',
            h: '37',
          },
          logo: '/static/Images/home/icons/morning/DailyBurn.png',
          img: '/static/Images/home/page1/poster.png',
        },
        'fitbit-yoga': {
          type: 'tile',
          template: 'tile',
          contentType: 'sponsored',
          details: {
            bottomText: 'Yoga Challenge',
            tile: '/static/Images/home/tile/morning/yoga.png',
          },
          dim: {
            w: '60',
            h: '37',
          },
          logo: '/static/Images/home/icons/morning/Daily-Yoga.png',
          img: '',
        },
        sponsor: {
          type: 'thumbnail1',
          template: 'thumbnail',
          contentType: 'cp',
          details: {
            icon: '',
            bottomText: 'Stephen Curry$Shooting Ball-$handling',
          },
          dim: {
            w: '50',
            h: '33',
          },
          logo: '/static/Images/home/icons/common/masterChef.png',
          img: '/static/Images/home/thumbnail/morning/M_thumbnail.png',
        },
        source: {
          type: 'thumbnail2',
          template: 'thumbnail',
          contentType: 'cp-type-1',
          details: {
            icon: '',
            bottomText: 'Concentration 10 Sessions',
          },
          logo: '/static/Images/home/icons/common/heapspace.png',
          img: '/static/Images/home/thumbnail/morning/yogo.png',
          dim: {
            w: '160',
            h: '30',
          },
        },
      },
    },
  },
};
