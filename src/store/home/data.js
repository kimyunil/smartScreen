import foryou from './foryou';
import movies from './movies';
import health from './health';
import tvshows from './tvshows';

export default {
  navs: {
    items: ['tvshows', 'health', 'movies', 'for_you', 'apps', 'music'],
    selectedIdx: 0,
    details: {
      for_you: {
        title: 'NBA PLAYOFFS',
        template: 'foryou',
        data: foryou,
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
        data: health,
      },
      movies: {
        title: 'MOVIES',
        template: 'movies',
        data: movies,
      },
      music: {
        title: 'MUSIC',
        template: 'health',
        data: health,
      },
    },
  },
  homescreen: {
    grids: ['grid1'],
    grid1 : {
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
    grid2 : {
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
  },
};
