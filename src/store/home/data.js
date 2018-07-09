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
  homescreen: {
    grids: ['grid1', 'grid2'],
    grid1: {
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
          topLeftText: '<span class="bold-top-text">Continue Watching</span>',
          bottomText: '<span style="color: rgba(255,97,97,1);">Stranger Things</span>',
          tile: '/static/Images/home/tile/morning/tile1.png',
          logo: '/static/Images/home/foryou/slidesIcons/netflix.png',
          logoType: 'rect',
          img: '',
        },
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
    },
    grid2: {
      title: 'grid-1',
      content: ['youtube', 'hbo', 'hulu'],
      nav: [
        ['tile', 'tile'],
        ['thumbnail1', 'thumbnail2'],
      ],
      youtube: {
        type: 'tile',
        template: 'tile',
        contentType: 'simple',
        details: {
          full: true,
          tile: '/static/Images/home/tile/morning/tile3.png',
          bottomText: '<span class="bold-text">Fnatic vs. Flash Wolves</span>',
          logo: '/static/Images/home/foryou/slidesIcons/youtube.png',
          extraImg: ['/static/Images/home/foryou/slidesIcons/6pm.png'],
          logoType: 'rect-3',
          img: '/static/Images/home/page1/poster.png',
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
  },
};
