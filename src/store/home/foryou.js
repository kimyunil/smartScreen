export default {
  gridlist: ['now', 'upcoming', 'contWatch', 'music', 'apps', 'avengers'],
  now: {
    items: ['espn', 'cnn', 'ytube1', 'ytube2'],
    title: 'On Now',
    name: 'now',
    itemType: 'sqrThumb',
    espn: {
      title: '2018 NHL Playoffs: San Jose',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: '6:00 - 8:00PM',
      logo: '/static/Images/home/foryou/icons/espn.png',
      thumbnail: '/static/Images/home/foryou/onNow/espn1.png',
      startTime: 'live',
    },
    cnn: {
      title: 'CNN Live',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: '6:00 - 7:00PM',
      logo: '/static/Images/home/foryou/icons/cnn.png',
      thumbnail: '/static/Images/home/foryou/onNow/cnn1.png',
      startTime: 'live',
    },
    ytube1: {
      title: 'American Idol 2018',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: '6:00 - 8:00PM',
      logo: '/static/Images/home/foryou/icons/youtube.png',
      thumbnail: '/static/Images/home/foryou/onNow/ytube1.png',
      startTime: 'live',
    },
    ytube2: {
      title: 'Wild India',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: '6:00 - 8:00PM',
      logo: '/static/Images/home/foryou/icons/youtube.png',
      thumbnail: '/static/Images/home/foryou/onNow/ytube2.png',
      startTime: 'live',
    },
  },
  upcoming: {
    items: ['twitch', 'ytube1', 'espn', 'amazon'],
    title: 'Upcoming',
    name: 'upcoming',
    itemType: 'sqrThumb',
    twitch: {
      title: 'Fnatic vs. Flash Wolves',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: 'Group Stage Day 4',
      logo: '/static/Images/home/foryou/icons/twitch.png',
      thumbnail: '/static/Images/home/foryou/upcoming/twitch.png',
      startTime: '8:00 PM',
    },
    ytube1: {
      title: 'CNN Live',
      gist: 'Tennis Channel ATP Final',
      subtitle: '2018 Barclays ATP World Tour',
      logo: '/static/Images/home/foryou/icons/youtube.png',
      thumbnail: '/static/Images/home/foryou/upcoming/ytube1.png',
      startTime: '9:00 PM',
    },
    espn: {
      title: 'American Idol 2018',
      gist: 'NBA Finals',
      subtitle: 'Warriors vs. Rockets',
      logo: '/static/Images/home/foryou/icons/espn.png',
      thumbnail: '/static/Images/home/foryou/upcoming/espn1.png',
      startTime: '8:00 PM',
    },
    amazon: {
      title: 'Wild India',
      gist: 'iZombie',
      subtitle: 'Season 5',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/foryou/upcoming/amazon.png',
      startTime: '8:00 PM',
    },
  },
  contWatch: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1'],
    title: 'Continue Watching',
    itemType: 'sqrThumb',
    ytube1: {
      title: 'Black Mirror',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/youtube.png',
      thumbnail: '/static/Images/home/foryou/continue/ytube1.png',
    },
    hulu: {
      title: 'The Expanse',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/foryou/continue/hulu.png',
    },
    amazon: {
      title: 'Avengers Infinity War',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/foryou/continue/amazon.png',
    },
    hulu1: {
      title: 'Stranger Things',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/foryou/continue/hulu1.png',
    },
  },
  music: {
    items: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'],
    itemType: 'recThumb',
    name: 'music',
    title: 'Recent Music',
    item1: {
      title: 'A Moment',
      subtitle: 'Odesza',
      logo: '/static/Images/home/foryou/icons/spotify.png',
      thumbnail: '/static/Images/home/foryou/music/item1.png',
    },
    item2: {
      title: 'California',
      subtitle: 'Diplo',
      logo: '/static/Images/home/foryou/icons/spotify.png',
      thumbnail: '/static/Images/home/foryou/music/item2.png',
    },
    item3: {
      title: 'No Reason',
      subtitle: 'Giraffage',
      logo: '/static/Images/home/foryou/icons/spotify.png',
      thumbnail: '/static/Images/home/foryou/music/item3.png',
    },
    item4: {
      title: 'Hard to Say No',
      subtitle: 'Chromeo',
      logo: '/static/Images/home/foryou/icons/spotify.png',
      thumbnail: '/static/Images/home/foryou/music/item4.png',
    },
    item5: {
      title: 'Ivory',
      subtitle: 'Tez Candey',
      logo: '/static/Images/home/foryou/icons/spotify.png',
      thumbnail: '/static/Images/home/foryou/music/item5.png',
    },
    item6: {
      title: 'Your Daily Mix',
      subtitle: '',
      logo: '/static/Images/home/foryou/icons/spotify.png',
      thumbnail: '/static/Images/home/foryou/music/item6.png',
    },
    item7: {
      title: 'Seve',
      subtitle: 'Tez Candey',
      logo: '/static/Images/home/foryou/icons/spotify.png',
      thumbnail: '/static/Images/home/foryou/music/item7.png',
    },
  },
  avengers: {
    items: ['item1', 'item2', 'item3', 'item4'],
    title: 'Avengers',
    name: 'avengers',
    itemType: 'sqrThumb',
    item1: {
      title: 'Captain America: Civil War',
      subtitle: '2016',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/foryou/avenger/item1.png',
    },
    item2: {
      title: 'Avengers: Age of Ultron',
      subtitle: '2016',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/foryou/avenger/item2.png',
    },
    item3: {
      title: 'Avengers Infinity War',
      subtitle: '2016',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/foryou/avenger/item3.png',
    },
    item4: {
      title: 'The Avengers',
      subtitle: '2016',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/foryou/avenger/item4.png',
    },
  },
  apps: {
    items: ['netflix', 'hulu', 'amazon', 'spotify', 'youtube', 'espn'],
    itemType: 'sqr',
    name: 'apps',
    title: 'Recent Apps',
    netflix: {
      thumbnail: '/static/Images/home/foryou/apps/netflix.png',
      title: 'NetFlix',
    },
    hulu: {
      thumbnail: '/static/Images/home/foryou/apps/hulu.png',
      title: 'Hulu',
    },
    amazon: {
      thumbnail: '/static/Images/home/foryou/apps/amazon.png',
      title: 'Amazon',
    },
    spotify: {
      thumbnail: '/static/Images/home/foryou/apps/spotify.png',
      title: 'Spotify',
    },
    youtube: {
      thumbnail: '/static/Images/home/foryou/apps/youtube.png',
      title: 'Fitbit',
    },
    espn: {
      thumbnail: '/static/Images/home/foryou/apps/espn.png',
      title: 'MasterClass',
    },
  },
  pages: {
    pagination: ['page-1', 'page-2', 'page-3'],
    focusIdx: 0,
    details: {
      'page-1': {
        title: 'page-1',
        suggestions: ['Hey Bixby, continue watching The Handmaid’s Tale'],
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
            full: true,
            video: '/resources/videos/smartscreen/A_1_Newyork_times.mp4',
            poster: '/static/Images/home/posters/morning/news_n.png',
            text1: '<span>Meghan Markle and the Bicultural <br> Blackness of the <span style="color: rgba(255,97,97,1);">Royal Wedding</span></span>',
            logo: '/static/Images/home/icons/morning/news_n.png',
            logoType: 'sqr',
            img: '',
          },
        },
        hulu: {
          type: 'tile',
          template: 'tile',
          contentType: 'simple',
          details: {
            full: 'partial',
            action: {
              category: 'hulu',
              subcategory: 'home',
              content: 'handmaids',
            },
            topLeftText: '<span class="bold-top-text">Continue Watching</span>',
            bottomText: '<span style="color: rgba(255,97,97,1);">Stranger Things</span>',
            tile: '/static/Images/home/tile/morning/tile1.png',
            logo: '/static/Images/home/foryou/slidesIcons/hulu.png',
            logoType: 'rect',
            img: '',
          },
        },
        sponsor: {
          type: 'thumbnail1',
          template: 'thumbnail',
          contentType: 'cp',
          details: {
            full: 'partial',
            icon: '',
            topLeftText: '<span class="bold-top-text">sponsored</span>',
            bottomText: '<span>Your <span style="color: rgba(255,97,97,1);">Daily Mix</span></span>',
            logoType: 'sqr-2',
            logo: '/static/Images/home/foryou/slidesIcons/spotify.png',
            img: '/static/Images/home/thumbnail/morning/thumbnail2.png',
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
            full: true,
            bottomText: '<span>Rehab <br><span style="color: rgba(255,97,97,1);">10 Sessions</span></span>',
            icon: '',
            logo: '/static/Images/home/foryou/slidesIcons/headspace.png',
            img: '/static/Images/home/thumbnail/morning/thumbnail1.png',
          },
        },
      },
      'page-2': {
        title: 'page-2',
        suggestions: ['Hey Bixby, go to Fitbit'],
        content: ['pandora', 'espn'],
        nav: [
          ['hTile', 'poster', 'poster'],
          ['hTile', 'poster', 'poster'],
        ],
        pandora: {
          type: 'hTile',
          template: 'hTile',
          contentType: 'simple',
          details: {
            full: true,
            hTile: '/static/Images/home/hTile/morning/htile2.png',
            text1: '<span style="color:white">Cake By The Ocean </br> by <span style="color: rgba(255,97,97,1);">DNCE</span></span>',
            logo: '/static/Images/home/foryou/slidesIcons/pandora.png',
            logoType: 'sqr',
            img: '',
          },
        },
        espn: {
          type: 'poster',
          template: 'poster',
          contentType: 'simple',
          details: {
            full: true,
            video: '/resources/videos/smartscreen/A_2_NBA.mp4',
            poster: '/static/Images/home/posters/morning/poster2.png',
            text1: '<span>Warriors at Rockets: </br> <span style="color: rgba(255,97,97,1);">Dubs get their biggest test yet</span></span>',
            logo: '/static/Images/home/foryou/slidesIcons/espn.png',
            logoType: 'sqr',
            img: '',
          },
        },
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
        suggestions: ['Hey Bixby, play my Classical Playlist'],
        content: ['fitbit', 'youtube', 'spotify', 'hulu', 'hbo', 'primeVideo'],
        nav: [
          ['hTile', 'tile', 'tile', 'hTile1'],
          ['hTile', 'thumbnail1', 'thumbnail2', 'hTile1'],
        ],
        fitbit: {
          type: 'hTile',
          template: 'hTile',
          contentType: 'simple',
          details: {
            full: true,
            hTile: '/static/Images/home/hTile/morning/htile3.png',
            text1: '<span style="color:white">Versa</br>Connected</span>',
            logo: '/static/Images/home/foryou/slidesIcons/fitbit.png',
            logoType: 'sqr',
            img: '',
          },
        },
        youtube: {
          type: 'tile',
          template: 'tile',
          contentType: 'simple',
          details: {
            full: true,
            tile: '/static/Images/home/tile/morning/tile3.png',
            bottomText: '<span class="bold-text">Fnatic vs. Flash Wolves</span>',
            logo: '/static/Images/home/foryou/slidesIcons/youtube.png',
            logoType: 'rect-3',
            img: '/static/Images/home/page1/poster.png',
          },
        },
        primeVideo: {
          type: 'hTile1',
          template: 'hTile',
          contentType: 'simple',
          details: {
            full: false,
            video: '/resources/videos/smartscreen/A_3_Snowmantrek.mp4',
            hTile: '/static/Images/home/hTile/morning/htile4.png',
            text1: '<span style="color:black"><span style="color: rgba(255,97,97,1);">The Snowman </span>Trek</span>',
            logo: '/static/Images/home/foryou/slidesIcons/amazon.png',
            logoType: 'sqr',
            img: '',
          },
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
            full: 'full',
            icon: '',
            bottomText: '',
            logoType: 'big',
            logo: '/static/Images/home/foryou/slidesIcons/spotify.png',
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
        hbo: {
          type: 'thumbnail2',
          template: 'thumbnail',
          contentType: 'cp-type-1',
          details: {
            full: 'full',
            icon: '',
            bottomText: '',
            logoType: 'text-big',
            logo: '/static/Images/home/foryou/slidesIcons/hbo.png',
            img: '/static/Images/home/thumbnail/morning/thumbnail4.png',
          },
        },
        hulu: {
          full: true,
          type: 'thumbnail1',
          template: 'thumbnail',
          contentType: 'cp-type-1',
          details: {
            icon: '',
            bottomText: '',
            full: 'full',
            logoType: 'text-big',
            logo: '/static/Images/home/foryou/slidesIcons/hulu.png',
            img: '/static/Images/home/thumbnail/morning/thumbnail3.png',
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
