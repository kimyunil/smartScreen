export default {
  movies: {
    template: 'list',
    data: {
      tom_hanks: {
        template: 'hList',
        heading: ['Here are', 'b-text:movies', 'with', 'b-text:Tom Hanks'],
        result: ['item1', 'item2', 'item3'],
        item1: {
          title: 'Inferno',
          year: '2016',
          rating: 3,
          url: '/static/Images/movies/tom_hank/1.png',
        },
        item2: {
          title: 'Sully',
          year: '2016',
          rating: 3,
          url: '/static/Images/movies/tom_hank/3.png',
        },
        item3: {
          title: 'A Hologram for the King',
          year: '2016',
          rating: 3,
          url: '/static/Images/movies/tom_hank/5.png',
        },
      },
    },
  },
};
