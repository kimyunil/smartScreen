export default {
  suggestions: ['Tell me more About Fitness', 'Go to Weather', 'Show me npr...', 'Go to Health'],
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
            text1: 'Mark Zuckerberg apologizes, promises reform as senators grill him over Facebook’s failings',
            logo: '/static/Images/home/icons/morning/news.png',
            logoType: 'sqr',
            img: '',
          },
        },
        fitness: {
          type: 'tile',
          template: 'tile',
          contentType: 'simple',
          details: {
            bottomText: 'Sleep Summary',
            tile: '/static/Images/home/tile/morning/fitbit.png',
            logo: '/static/Images/home/icons/common/big_fitbit.png',
            logoType: 'rect',
            img: '',
          },
        },
        weather: {
          type: 'thumbnail1',
          contentType: 'iot-weather',
          details: {
            measure: '75 - Sunny',
            icon: '/static/Images/home/thumbnail/morning/sunny.png',
            place: 'Mountain View, CA',
            logo: '/static/Images/home/health/big_fitbit.png',
            img: '',
          },
          template: 'thumbnail',

        },
        npr: {
          type: 'thumbnail2',
          template: 'thumbnail',
          contentType: 'cp',
          details: {
            bottomText: 'Play Morning Playlist',
            icon: '',
            logo: '/static/Images/home/icons/morning/big_npr.png',
            logoType: 'rect',
            img: '/static/Images/home/thumbnail/morning/npr_thumbnail.png',
          },
        },
        suggestions: ['Tell me more About Fitness', 'Go to Weather', 'Show me npr...', 'Go to Health'],
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
            logo: '/static/Images/home/health/big_fitbit.png',
            logoType: 'rect',
            img: '',
          },
          contentType: 'iot-temp',
          template: 'thumbnail',
        },
        'iot-light': {
          type: 'thumbnail2',
          details: {
            icon: '/static/Images/home/thumbnail/morning/iot-light.png',
            measure: '2 Lights ON',
            place: 'Kitchen',
            logo: '/static/Images/home/health/big_fitbit.png',
            logoType: 'rect',
            img: '',
          },
          contentType: 'iot',
          template: 'thumbnail',
        },
        source: {
          type: 'tile',
          template: 'tile',
          contentType: 'sponsored',
          details: {
            bottomText: 'WestWorld<br>S1Ep4Dissonance Theory',
            topLeftText: 'Continue Watching',
            action: {
              category: 'hbo',
              subcategory: 'player',
              content: 'got',
            },
            tile: '/static/Images/home/tile/morning/GOT.png',
            logoType: 'rect-2',
            logo: '/static/Images/home/icons/morning/hbo.png',
            img: '',
          },
        },
        spotify: {
          type: 'poster',
          template: 'poster',
          contentType: 'simple',
          details: {
            poster: '/static/Images/home/posters/morning/spotify.png',
            text1: 'Today\'s Trending Music',
            logo: '/static/Images/home/icons/morning/spotify.png',
            img: '/static/Images/home/page1/poster.png',
            logoType: 'rect-3',
          },
        },
        suggestions: ['Tell me more About Fitness', 'Go to Weather', 'Show me npr...', 'Go to Health'],
      },
      'page-3': {
        title: 'page-3',
        content: ['fitbit-excercise', 'fitbit-gym', 'sponsor', 'source'],
        nav: [
          ['tile', 'tile', 'poster'],
          ['thumbnail2', 'thumbnail1', 'poster'],
        ],
        'fitbit-excercise': {
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
            logo: '/static/Images/home/icons/morning/DailyBurn.png',
            logoType: 'rect-3',
            img: '/static/Images/home/page1/poster.png',
          },
          template: 'poster',
        },
        'fitbit-yoga': {
          type: 'tile',
          template: 'tile',
          contentType: 'sponsored',
          details: {
            bottomText: 'Yoga Challenge',
            tile: '/static/Images/home/tile/morning/yoga.png',
            dim: {
              w: '60',
              h: '37',
            },
            logo: '/static/Images/home/icons/morning/Daily-Yoga.png',
            img: '',
          },
        },
        'fitbit-gym': {
          type: 'tile',
          template: 'tile',
          contentType: 'sponsored',
          details: {
            bottomText: 'Weightlifting 101 </br> Concetration',
            tile: '/static/Images/home/tile/morning/gym.png',
            logo: 'static/Images/home/icons/common/small_cody.png',
            logoType: 'rect',
            img: '',
          },
        },
        sponsor: {
          type: 'thumbnail1',
          template: 'thumbnail',
          contentType: 'cp',
          details: {
            icon: '',
            bottomText: 'Stephen Curry Shooting Ball- handling',
            logoType: 'sqr-2',
            logo: '/static/Images/home/icons/common/masterChef.png',
            img: '/static/Images/home/thumbnail/morning/M_thumbnail.png',
          },
        },
        source: {
          type: 'thumbnail2',
          template: 'thumbnail',
          contentType: 'cp-type-1',
          details: {
            icon: '',
            bottomText: 'Concentration 10 Sessions',
            logo: 'static/Images/home/icons/common/big_headspace.png',
            logoType: 'rect',
            img: '/static/Images/home/thumbnail/morning/yogo.png',
          },
        },
        suggestions: ['Tell me more About Fitness', 'Go to Weather', 'Show me npr...', 'Go to Health'],
      },
    },
  },
};
