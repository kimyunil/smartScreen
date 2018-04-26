import mark_540 from './json/mark_540.json';

export default {
  movies: {
    template: 'list',
    data: {
      tom_hanks: {
        template: 'hList',
        clipanim: {
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: mark_540,
        },
        heading: ['Here are', 'b-text:movies', 'with', 'b-text:Tom Hanks'],
        result: ['item1', 'item2', 'item3'],
        item1: {
          title: 'Inferno',
          year: '2016',
          rating: 3,
          url: './static/Images/results/1.png',
        },
        item2: {
          title: 'Sully',
          year: '2016',
          rating: 3,
          url: './static/Images/results/2.png',
        },
        item3: {
          title: 'A Hologram for the King',
          year: '2016',
          rating: 3,
          url: './static/Images/results/3.png',
        },
      },
    },
  },
};
