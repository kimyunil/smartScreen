export default {
  gridlist: ['now', 'upcoming', 'contWatch', 'onnow', 'acclaimed', 'action', 'drama', 'comedy', 'action1', 'drama1', 'comedy1'],
  now: {
    items: ['espn', 'cnn', 'ytube1', 'more'],
    title: 'POPULAR FREE MOVIES',
    name: 'now',
    selIdx: 0,
    itemType: 'sqrtile',
    espn: {
      title: 'Coco',
      gist: '2017  ·  PG  ·  1h 45m',
      subtitle: '6:00 - 8:00PM',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/free/item1.png',
      startTime: 'live',
    },
    cnn: {
      title: 'Wanted',
      gist: '2008  ·  R ·  1h 49m',
      subtitle: '6:00 - 7:00PM',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/free/item2.png',
      startTime: 'live',
    },
    ytube1: {
      title: '24 Hours to Live',
      gist: '2017  ·  R ·  1h 33m ·  Sponsored',
      subtitle: '6:00 - 8:00PM',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/free/item3.png',
      startTime: 'live',
    },
    ytube2: {
      title: 'Dunkirk',
      gist: '2017  ·  R ·  1h 46m',
      next: 'POPULAR FREE MOVIES',
      subtitle: '6:00 - 8:00PM',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/free/item4.png',
      startTime: 'live',
    },
    more: {
      type: 'more',
    },
  },
  upcoming: {
    items: ['twitch', 'ytube1', 'espn', 'amazon', 'more'],
    title: 'NEW RELEASES',
    name: 'upcoming',
    selIdx: 0,
    itemType: 'sqrThumbmovies',
    twitch: {
      title: 'Avengers',
      gist: '2012  ·  PG  ·  2h 23m',
      subtitle: 'Group Stage Day 4',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/new/item1.png',
      startTime: '8:00 PM',
    },
    ytube1: {
      title: 'Black Panther',
      gist: '2012  ·  PG  ·  2h 23m',
      subtitle: '2018 Barclays ATP World Tour',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/new/item2.png',
      startTime: '9:00 PM',
    },
    espn: {
      title: 'Ready Player One',
      gist: '2008  ·  R ·  1h 49m',
      subtitle: 'Warriors vs. Rockets',
      logo: '/static/Images/home/foryou/icons/neflix.png',
      thumbnail: '/static/Images/home/movies/assets/new/item3.png',
      startTime: '8:00 PM',
    },
    amazon: {
      title: 'Deadpool 2',
      gist: '2018  ·  R ·  2h 49m',
      subtitle: 'Season 5',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/new/item4.png',
      startTime: '8:00 PM',
    },
    item5: {
      title: 'Star Trek: Discovery',
      gist: '2008  ·  R ·  1h 49m',
      subtitle: 'Season 5',
      logo: '/static/Images/home/foryou/icons/neflix.png',
      thumbnail: '/static/Images/home/movies/assets/new/item5.png',
      startTime: '8:00 PM',
    },
    more: {
      type: 'more',
    },
  },
  contWatch: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1', 'more'],
    title: 'MOVIE TRAILERS',
    itemType: 'sqrThumbmovies',
    selIdx: 0,
    ytube1: {
      title: 'Book Club',
      gist: '2018  ·  PG  ·  1h 44m',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/hbo.png',
      thumbnail: '/static/Images/home/movies/assets/trailers/item1.png',
    },
    hulu: {
      title: 'Game Night',
      gist: '2016  ·  PG ·  1h 32m',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hbo.png',
      thumbnail: '/static/Images/home/movies/assets/trailers/item2.png',
    },
    amazon: {
      title: 'The Incredibles 2',
      gist: '2018  ·  PG  ·  2h 5m',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/trailers/item3.png',
    },
    hulu1: {
      title: 'Ocean’s 8',
      gist: '2018  ·  PG  ·  1h 51m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/trailers/item4.png',
    },
    item5: {
      title: 'Star Trek:',
      gist: '2018  ·  PG ·  2h 5m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/trailers/item5.png',
    },
    more: {
      type: 'more',
    },
  },
  onnow: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1', 'more'],
    title: 'ON NOW',
    selIdx: 0,
    itemType: 'sqrThumbmovies',
    ytube1: {
      title: 'Ant-Man and the Wasp',
      gist: '2018  ·  PG  ·  2h 5m',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/now/item1.png',
    },
    hulu: {
      title: 'Jurassic World',
      gist: '2014  ·  R  ·  1h 45m',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/now/item2.png',
    },
    amazon: {
      title: 'The First Purge',
      gist: '2016  ·  PG  ·  2h 5m',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/now/item3.png',
    },
    hulu1: {
      title: 'Uncle Drew',
      gist: '2018  ·  R  ·  1h 51m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/now/item4.png',
    },
    item5: {
      title: 'Star Trek:',
      gist: '2 Seasons',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/now/item5.png',
    },
    more: {
      type: 'more',
    },
  },
  acclaimed: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1', 'more'],
    title: 'CRITICALLY ACCLAIMED',
    itemType: 'sqrThumbmovies',
    selIdx: 0,
    ytube1: {
      title: 'Lilo & Stitch',
      gist: '2002  ·  PG  ·  2h 5m',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/acc/item1.png',
    },
    hulu: {
      title: 'Despicable Me: Minion <br> Madness',
      gist: 'Sharks vs. Anaheim Ducks',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/acc/item2.png',
    },
    amazon: {
      title: 'The Dark Knight',
      gist: '2015  ·  PG  ·  1h 55m',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/acc/item3.png',
    },
    hulu1: {
      title: '12 Angry Men',
      gist: '2016  ·  PG  ·  2h 15m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/hbo.png',
      thumbnail: '/static/Images/home/movies/assets/acc/item4.png',
    },
    item5: {
      title: 'Star Trek:',
      gist: '2018  ·  PG  ·  2h 5m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/acc/item5.png',
    },
    more: {
      type: 'more',
    },
  },
  action: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1', 'more'],
    title: 'ACTION',
    itemType: 'sqrThumbmovies',
    selIdx: 0,
    ytube1: {
      title: 'Avengers: Infinite War',
      gist: '2018  ·  PG-13  ·  2h 40m',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/hbo.png',
      thumbnail: '/static/Images/home/movies/assets/action/item1.png',
    },
    hulu: {
      title: 'Thor: Ragnarok',
      gist: '2017  ·  PG-13 ·  2h 10m',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hbo.png',
      thumbnail: '/static/Images/home/movies/assets/action/item2.png',
    },
    amazon: {
      title: 'The Incredibles 2',
      gist: '2018  ·  PG  ·  2h 5m',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/action/item3.png',
    },
    hulu1: {
      title: 'Black Panther',
      gist: '2018  ·  PG  ·  1h 51m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/action/item4.png',
    },
    item5: {
      title: 'Star Trek:',
      gist: '2018  ·  PG ·  2h 5m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/trailers/item5.png',
    },
    more: {
      type: 'more',
    },
  },
  drama: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1', 'more'],
    title: 'DRAMA',
    selIdx: 0,
    itemType: 'sqrThumbmovies',
    ytube1: {
      title: 'Boyhood',
      gist: '2014  ·  PG  ·  2h 5m',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/drama/item1.png',
    },
    hulu: {
      title: 'Jurassic World',
      gist: '2015  ·  R  ·  1h 45m',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/drama/item2.png',
    },
    amazon: {
      title: 'The First Purge',
      gist: '2011  ·  PG  ·  2h 5m',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/drama/item3.png',
    },
    hulu1: {
      title: 'Uncle Drew',
      gist: '2018  ·  R  ·  1h 51m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/drama/item4.png',
    },
    item5: {
      title: 'Star Trek:',
      gist: '2 Seasons',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/now/item5.png',
    },
    more: {
      type: 'more',
    },
  },
  comedy: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1', 'more'],
    title: 'COMEDY',
    itemType: 'sqrThumbmovies',
    selIdx: 0,
    ytube1: {
      title: 'The Big Sick',
      gist: '2017  ·  PG  ·  2h 5m',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/comedy/item1.png',
    },
    hulu: {
      title: 'I Feel Pretty',
      gist: '2018  ·  PG  ·  1h 35m',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/comedy/item2.png',
    },
    amazon: {
      title: 'Superbad',
      gist: '2007  ·  PG  ·  1h 55m',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/comedy/item3.png',
    },
    hulu1: {
      title: 'Blockers',
      gist: '2018  ·  PG  ·  2h 15m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/hbo.png',
      thumbnail: '/static/Images/home/movies/assets/comedy/item4.png',
    },
    item5: {
      title: 'Star Trek:',
      gist: '2018  ·  PG  ·  2h 5m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/acc/item5.png',
    },
    more: {
      type: 'more',
    },
  },
  action1: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1', 'more'],
    title: 'ACTION',
    itemType: 'sqrThumbmovies',
    selIdx: 0,
    ytube1: {
      title: 'Avengers: Infinite War',
      gist: '2018  ·  PG-13  ·  2h 40m',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/hbo.png',
      thumbnail: '/static/Images/home/movies/assets/action/item1.png',
    },
    hulu: {
      title: 'Thor: Ragnarok',
      gist: '2017  ·  PG-13 ·  2h 10m',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hbo.png',
      thumbnail: '/static/Images/home/movies/assets/action/item2.png',
    },
    amazon: {
      title: 'The Incredibles 2',
      gist: '2018  ·  PG  ·  2h 5m',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/action/item3.png',
    },
    hulu1: {
      title: 'Black Panther',
      gist: '2018  ·  PG  ·  1h 51m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/action/item4.png',
    },
    item5: {
      title: 'Star Trek:',
      gist: '2018  ·  PG ·  2h 5m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/trailers/item5.png',
    },
    more: {
      type: 'more',
    },
  },
  drama1: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1', 'more'],
    title: 'DRAMA',
    selIdx: 0,
    itemType: 'sqrThumbmovies',
    ytube1: {
      title: 'Boyhood',
      gist: '2014  ·  PG  ·  2h 5m',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/drama/item1.png',
    },
    hulu: {
      title: 'Jurassic World',
      gist: '2015  ·  R  ·  1h 45m',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/drama/item2.png',
    },
    amazon: {
      title: 'The First Purge',
      gist: '2011  ·  PG  ·  2h 5m',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/drama/item3.png',
    },
    hulu1: {
      title: 'Uncle Drew',
      gist: '2018  ·  R  ·  1h 51m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/drama/item4.png',
    },
    item5: {
      title: 'Star Trek:',
      gist: '2 Seasons',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/now/item5.png',
    },
    more: {
      type: 'more',
    },
  },
  comedy1: {
    name: 'continue',
    items: ['ytube1', 'hulu', 'amazon', 'hulu1', 'more'],
    title: 'COMEDY',
    itemType: 'sqrThumbmovies',
    selIdx: 0,
    ytube1: {
      title: 'The Big Sick',
      gist: '2017  ·  PG  ·  2h 5m',
      subtitle: 'S3 E2',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/comedy/item1.png',
    },
    hulu: {
      title: 'I Feel Pretty',
      gist: '2018  ·  PG  ·  1h 35m',
      subtitle: 'S2 E5',
      logo: '/static/Images/home/foryou/icons/hulu.png',
      thumbnail: '/static/Images/home/movies/assets/comedy/item2.png',
    },
    amazon: {
      title: 'Superbad',
      gist: '2007  ·  PG  ·  1h 55m',
      subtitle: '2018',
      logo: '/static/Images/home/foryou/icons/amazon.png',
      thumbnail: '/static/Images/home/movies/assets/comedy/item3.png',
    },
    hulu1: {
      title: 'Blockers',
      gist: '2018  ·  PG  ·  2h 15m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/hbo.png',
      thumbnail: '/static/Images/home/movies/assets/comedy/item4.png',
    },
    item5: {
      title: 'Star Trek:',
      gist: '2018  ·  PG  ·  2h 5m',
      subtitle: 'S1 E6',
      logo: '/static/Images/home/foryou/icons/netflix.png',
      thumbnail: '/static/Images/home/movies/assets/acc/item5.png',
    },
    more: {
      type: 'more',
    },
  },
};
