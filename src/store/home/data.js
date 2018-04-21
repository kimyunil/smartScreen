import foryou from './foryou';

import health from './health';

export default {
  navs: {
    items: ['for_you', 'health', 'tvshows', 'apps', 'music', 'movies'],
    selectedIdx: 0,
    details: {
      for_you: {
        title: 'FOR YOU',
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
        template: 'health',
      },
      apps: {
        title: 'APPS',
        template: 'health',
      },
      movies: {
        title: 'MOVIES',
        template: 'health',
      },
      music: {
        title: 'MUSIC',
        template: 'health',
      },
    },
  },
};
