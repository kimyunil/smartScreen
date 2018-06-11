import foryou from './foryou';
import movies from './movies';
import health from './health';
import tvshows from './tvshows';

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
};
