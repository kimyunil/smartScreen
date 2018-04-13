export default {
  movies: {
    template: 'list',
    data: {
      tom_hanks: {
        template: 'hList',
        result: ['item1', 'item2', 'item3'],
        item1: {
          title: 'Inferno',
          year: '2016',
          rating: 3,
        },
        items2: {
          title: 'Sully',
          year: '2016',
          rating: 3,
        },
        items3: {
          title: 'A Hologram for the King',
          year: '2016',
          rating: 3,
        },
      },
    },   
  },
};