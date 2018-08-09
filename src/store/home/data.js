import nba from './gridlistData/nba';
import apps from './gridlistData/apps';
import movies from './gridlistData/movies';
import music from './gridlistData/music';
import health from './gridlistData/health';
import tvshows from './gridlistData/tvshows';

export default {
  navs: {
    items: ['tvshows', 'health', 'movies', 'nba', 'apps', 'music'],
    focus: 0, // 0 heading, 1 gridlist
    details: {
      nba: {
        title: 'NBA PLAYOFFS',
        template: 'foryou',
        data: nba,
      },
      health: {
        title: 'HEALTH & WELLNESS',
        template: 'health',
        data: health,
      },
      tvshows: {
        title: 'TV SHOWS',
        template: 'tvshows',
        data: tvshows,
      },
      apps: {
        title: 'APPS',
        template: 'health',
        data: apps,
      },
      movies: {
        title: 'MOVIES',
        template: 'movies',
        data: movies,
      },
      music: {
        title: 'MUSIC',
        template: 'health',
        data: music,
      },
    },
  },
  sponsors: {
    idx: 0,
    items: ['sp1', 'sp2', 'sp3'],
    sp1: {
      videoUrl: '/resources/videos/smartscreen/new/cook.mp4',
      poster: '/static/Images/home/homeUI/poster.png',
      icon: '/static/Images/home/homeUI/icons/food.png',
      text: '<span>How To Cook<span style="color:rgb(255,96,93)"> Perfect Eggs</span> <span>Every Time</span></span>',
    },
    sp2: {
      videoUrl: '/resources/videos/smartscreen/new/yoga.mp4',
      poster: '/static/Images/home/homeUI/poster.png',
      icon: '/static/Images/home/homeUI/icons/gia.png',
      text: '<span>30 Minutes Daily Workout - <span style="color:rgb(255,96,93)">Chaturanga</span> by School of <span style="color:rgb(255,96,93)">Yoga</span></span>',
    },
    sp3: {
      videoUrl: '/resources/videos/smartscreen/new/music.mp4',
      poster: '/static/Images/home/homeUI/poster.png',
      iconTitle: 'MUSIC VIDEO',
      text: '<span><span style="color:rgb(255,96,93)">CAN’T STOP THE FEELING!</span> <span>Justin Timberlake</span></span>',
    },
  },
  homescreen: {
    grids: ['grid3', 'grid1', 'grid2'],
    grid1: {
      suggest: ['Hey Bixby, play my Daily Mix'],
      title: 'grid-1',
      content: ['hulu', 'sponsor', 'npr'],
      nav: [
        ['tile', 'tile'],
        ['thumbnail1', 'thumbnail2'],
      ],
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
          topLeftText: '',
          bottomText: '<span><span style="color: rgba(255,97,97,1);">Sasha Sloan</span> - <span>Normal</span></span></span>',
          tile: '/static/Images/home/homeUI/tile/tile.png',
          logo: '/static/Images/home/homeUI/icons/vevo.png',
          logoType: 'rect',
          img: '',
        },
      },
      npr: {
        type: 'thumbnail1',
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
      sponsor: {
        type: 'thumbnail2',
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
    },
    grid2: {
      title: 'grid-1',
      suggest: ['Hey Bixby, show me more'],
      content: ['body', 'hulu', 'hbo'],
      nav: [
        ['tile', 'tile'],
        ['thumbnail1', 'thumbnail2'],
      ],
      body: {
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
          video: '/resources/videos/smartscreen/Health_1_Daily_Burn.mp4',
          bottomText: '<span>Daily 5-min <span style="color: rgba(42,109,156,1);">Body Tone</span></span>',
          tile: '/static/Images/home/tile/morning/body.png',
          logo: '/static/Images/home/foryou/slidesIcons/daily.png',
          logoType: 'rect',
          img: '',
        },
      },
      hbo: {
        type: 'thumbnail1',
        template: 'thumbnail',
        contentType: 'cp',
        details: {
          full: 'partial',
          icon: '',
          topLeftText: '<span class="bold-top-text">sponsored</span>',
          bottomText: '<span>Tennis Channel <br> ATP Final </span>',
          logoType: 'sqr-2',
          logo: '/static/Images/home/homeUI/icons/gia-2.png',
          img: '/static/Images/home/homeUI/thumb/thumb4.png',
        },
      },
      hulu: {
        full: true,
        type: 'thumbnail2',
        template: 'thumbnail',
        contentType: 'cp-type-1',
        details: {
          icon: '',
          bottomText: '',
          full: 'full',
          logoType: 'text-big',
          logo: '/static/Images/home/homeUI/icons/showtime.png',
          img: '/static/Images/home/homeUI/thumb/thumb3.png',
        },
      },
    },
    grid3: {
      title: 'grid-1',
      suggest: ['Hey Bixby, tell me more about today’s weather'],
      content: ['hulu', 'traffic', 'weather'],
      nav: [
        ['tile', 'tile'],
        ['thumbnail1', 'thumbnail2'],
      ],
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
          continueWatch: {
            progress: '30',
          },
          video: '/resources/videos/smartscreen/Health_1_Daily_Burn.mp4',
          bottomText: '<span>The Handmaid\'s Tale</span>',
          tile: '/static/Images/home/homeUI/tile/tile4.png',
          logo: '/static/Images/home/homeUI/icons/hulu.png',
          logoType: 'rect',
          img: '',
        },
      },
      body: {
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
          video: '/resources/videos/smartscreen/Health_1_Daily_Burn.mp4',
          bottomText: '<span><span style="color: rgba(255,97,97,1);">3 Running Intervals</span>To Train For Your First 5K</span>',
          tile: '/static/Images/home/homeUI/tile/tile3.png',
          logo: '/static/Images/home/homeUI/icons/vimeo.png',
          logoType: 'rect',
          img: '',
        },
      },
      traffic: {
        type: 'thumbnail1',
        template: 'thumbnail',
        contentType: 'cp',
        details: {
          full: 'full',
          icon: '',
          topLeftText: '',
          bottomText: '',
          logoType: 'sqr-2',
          logo: '',
          img: '/static/Images/home/homeUI/thumb/traffic.png',
        },
      },
      weather: {
        full: true,
        type: 'thumbnail2',
        template: 'thumbnail',
        contentType: 'cp-type-1',
        details: {
          icon: '',
          bottomText: '',
          full: 'full',
          logoType: 'text-big',
          logo: '',
          img: '/static/Images/home/homeUI/thumb/weather.png',
        },
      },
    },
  },
};
