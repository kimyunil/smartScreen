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
    focusIdx: 0,
    details: {
      'page-1': {
        title: 'page-1',
        suggestions: ['Hey Bixby, continue watching the Handmaid’s Tale'],
        nav: [
          ['poster', 'tile', 'tile'],
          ['poster', 'thumbnail1', 'thumbnail2'],
        ],
        content: ['news', 'hulu', 'sponsor', 'npr'],
        news: {
          type: 'poster',
          template: 'poster',
          contentType: 'simple',
          details: {
            video: '/resources/videos/smartscreen/facebook.mp4',
            poster: '/static/Images/home/posters/morning/news.png',
            text1: '<span class="bold-text">Mark Zuckerberg</span><br> <span class="light-text">apologizes, promises reform as senators grill him over Facebook’s failings</span>',
            logo: '/static/Images/home/icons/morning/news.png',
            logoType: 'sqr',
            img: '',
          },
        },
        hulu: {
          type: 'tile',
          template: 'tile',
          contentType: 'simple',
          details: {
            action: {
              category: 'hulu',
              subcategory: 'home',
              content: 'handmaids',
            },
            topLeftText: '<span class="bold-top-text">Continue Watching</span>',
            bottomText: '<span class="bold-text">The Handmaid’s Tale</span><br> <span class="light-text">S1 Ep2 Borth Day</span>',
            tile: '/static/Images/home/tile/morning/maid.png',
            logo: '/static/Images/home/icons/common/hulu.png',
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
            video: '/resources/videos/smartscreen/curry.mp4',
            topLeftText: '<span class="bold-top-text">sponsored</span>',
            bottomText: '<span class="bold-text">Stephen Curry</span><br> <span class="light-text">Shooting, Ball-</br>handling</span>',
            logoType: 'sqr-2',
            logo: '/static/Images/home/icons/common/masterChef.png',
            img: '/static/Images/home/thumbnail/morning/M_thumbnail.png',
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
            bottomText: '<span class="light-text"> Play </span> <span class="bold-text">Morning </br> Playlist</span>',
            icon: '',
            logo: '/static/Images/home/icons/morning/npr.png',
            img: '/static/Images/home/thumbnail/morning/npr_thumbnail.png',
          },
        },
      },
      'page-2': {
        title: 'page-2',
        suggestions: ['Hey Bixby, go to Fitbit'],
        content: ['iot-temp', 'iot-light', 'source', 'fitbit-excercise'],
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
            video: '/resources/videos/smartscreen/Westworld_HBO.mp4',
            bottomText: '<span class="bold-text">Westworld</span><br> <span class="light-text">2 Series</span>',
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
        'fitbit-excercise': {
          type: 'poster',
          contentType: 'details',
          details: {
            video: '/resources/videos/smartscreen/Total_Sculpt_920.mp4',
            poster: '/static/Images/home/posters/morning/exercise.png',
            text1: '<span class="bold-text">Total Sculp: 2.0</span><br> <span class="light-text">Cardio & Hit</br></br>Intensity: 3</span>',
            logo: '/static/Images/home/icons/common/fitbit.png',
            logoType: 'big',
            img: '/static/Images/home/page1/poster.png',
          },
          template: 'poster',
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
      },
      'page-3': {
        title: 'page-3',
        suggestions: ['Hey Bixby, play Classical Playlist'],
        content: ['youtube', 'mac', 'spotify', 'gym'],
        nav: [
          ['poster', 'tile', 'tile'],
          ['poster', 'thumbnail1', 'thumbnail2'],
        ],
        youtube: {
          type: 'poster',
          contentType: 'details',
          details: {
            video: '/resources/videos/smartscreen/game.mp4',
            poster: '/static/Images/home/posters/morning/youtube.png',
            text1: '<span class="bold-text">Kingsone Dragonx</span><span class="light-text"> vs Afreeca Freecs </br>Game4</span>',
            logo: '/static/Images/home/icons/morning/youtube.png',
            extraImg: '/static/Images/home/icons/morning/score.png',
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
        mac: {
          type: 'tile',
          template: 'tile',
          contentType: 'sponsored',
          details: {
            bottomText: '<span class="bold-text">Lady Macbeth</span><br> <span class="light-text">26 | R</span>',
            topLeftText: '',
            video: '/resources/videos/smartscreen/macbeth.mp4',
            tile: '/static/Images/home/tile/morning/macbeth.png',
            logoType: 'big',
            logo: '/static/Images/home/icons/morning/hbo.png',
            img: '',
          },
        },
        spotify: {
          type: 'thumbnail1',
          template: 'thumbnail',
          contentType: 'cp',
          details: {
            icon: '',
            bottomText: '<span class="bold-text">Classical <br> Playlist</span>',
            logoType: 'big',
            logo: '/static/Images/home/icons/morning/spotify.png',
            img: '/static/Images/home/thumbnail/morning/spotify.png',
          },
        },
        gym: {
          type: 'thumbnail2',
          template: 'thumbnail',
          contentType: 'cp-type-1',
          details: {
            icon: '',
            bottomText: '<span class="bold-text">Weighlifting</span><br><span>Concentration</span>',
            logo: 'static/Images/home/icons/morning/cody.png',
            logoType: 'text-big',
            img: '/static/Images/home/thumbnail/morning/gym.png',
          },
        },
      },
      'page-4': {
        title: 'page-4',
        template: 'ignore',
        content: ['map', 'fitness', 'match'],
        map: {
          img: '/static/Images/home/foryou/info1.png',
        },
        fitness: {
          img: '/static/Images/home/foryou/info2.png',
        },
        match: {
          img: '/static/Images/home/foryou/info3.png',
        },
      },
    },
  },
};
