export default {
  pages: {
    pagination: ['page-1', 'page-2', 'page-3'],
    focusIdx: 0,

    subCategories: {
      yoga: {
        heading: '7 Min Yoga',
        subheading: 'Yoga with Adrienne',
        thumbnail: 'static/Images/home/health/content/tt1.png',
        icon: 'static/Images/home/health/icon/youtube.png',
      },
      lifting: {
        heading: 'Weightlifting 101',
        subheading: 'PowerUP Fitness',
        thumbnail: 'static/Images/home/health/content/tt2.png',
        icon: 'static/Images/home/health/icon/burn.png',
      },
      running: {
        heading: 'Running techniques...',
        subheading: 'RunRun Videos',
        thumbnail: 'static/Images/home/health/content/tt3.png',
        icon: 'static/Images/home/health/icon/coby.png',
      },
      dailyyoga: {
        heading: 'Daily Yoga - Finesse',
        subheading: 'Yoga with Adrienne',
        thumbnail: 'static/Images/home/health/content/tt4.png',
        icon: 'static/Images/home/health/icon/coby.png',
      },
      dance: {
        heading: '30Min Feel Good Dance',
        subheading: 'POPSUGAR Fitness',
        thumbnail: 'static/Images/home/health/content/tt5.png',
        icon: 'static/Images/home/health/icon/fitbit.png',
      },
      workoutdance: {
        heading: 'Enjoyable Workout Dance',
        subheading: 'Moore Dancing',
        thumbnail: 'static/Images/home/health/content/tt6.png',
        icon: 'static/Images/home/health/icon/fitbit.png',
      },
      cardiodancebasic: {
        heading: 'Cardio Dance Basics 1',
        subheading: 'BR Dance',
        thumbnail: 'static/Images/home/health/content/tt7.png',
        icon: 'static/Images/home/health/icon/fitbit.png',
      },
      cardiodance: {
        heading: 'Daily Cardio Dance',
        subheading: 'Dance with Angela',
        thumbnail: 'static/Images/home/health/content/tt10.png',
        icon: 'static/Images/home/health/icon/fitbit.png',
      },
      gotofit: {
        heading: '',
        subheading: '',
        goto: true,
        thumbnail: 'static/Images/home/health/content/tt_fit.png',
        icon: '',
      },
    },
    details: {
      'page-1': {
        title: 'page-1',
        img: '/static/Images/home/movies/movies2.png',
        template: 'lgrid',
        content: ['content1', 'content2', 'content3'],
        content1: {
          bottomText: '',
          type: 'content',
          thumbnail: 'static/Images/home/health/grid/thumb3.png',
          img: 'static/Images/home/icons/common/big_fitbit.png',
          logoType: 'rect',
          dim: '962*807',
          f_dim: '840*720',
        },
        content2: {
          type: 'content',
          bottomText: '4 Easy Ways To Boost Self-esteem',
          thumbnail: 'static/Images/home/health/grid/thumb2.png',
          img: 'static/Images/home/icons/common/small_cody.png',
          logoType: 'rect',
          dim: '442*807',
          f_dim: '480*720',
        },
        content3: {
          type: 'content',
          bottomText: 'Motivational Workout Videos',
          thumbnail: 'static/Images/home/health/grid/thumb1.png',
          img: 'static/Images/home/icons/common/big_headspace.png',
          logoType: 'rect',
          dim: '442*807',
          f_dim: '480*720',
        },
        sublist: ['workout', 'fitbitcardio'],
        workout: {
          title: 'BODYWEIGHT WORKOUT',
          items: ['yoga', 'lifting', 'running', 'dailyyoga'],
        },
        fitbitcardio: {
          title: 'EASY CARDIO DANCE  FROM FITBIT',
          items: ['dance', 'workoutdance', 'cardiodancebasic', 'cardiodance', 'gotofit'],
        },
        suggestions: ['Hey Bixby, play Wonder Woman'],
      },
      'page-2': {
        title: 'page-2',
        template: 'lgrid',
        img: '/static/Images/home/movies/movies3.png',
        content: ['content2', 'content1', 'content3'],
        content2: {
          bottomText: '',
          type: 'content',
          thumbnail: 'static/Images/home/health/grid/health5.png',
          img: '',
          logoType: '',
          dim: '962*807',
          f_dim: '840*720',
        },
        content1: {
          type: 'content',
          bottomText: '4 Easy Ways To Boost Self-esteem',
          thumbnail: 'static/Images/home/health/grid/health6.png',
          img: 'static/Images/home/icons/common/small_cody.png',
          logoType: 'rect',
          dim: '442*807',
          f_dim: '480*720',
        },
        content3: {
          type: 'content',
          bottomText: 'Motivational Workout Videos',
          thumbnail: 'static/Images/home/health/grid/health7.png',
          img: 'static/Images/home/icons/common/big_headspace.png',
          logoType: 'rect',
          dim: '442*807',
          f_dim: '480*720',
        },
        sublist: ['workout', 'fitbitcardio'],
        workout: {
          title: 'BODYWEIGHT WORKOUT',
          items: ['yoga', 'lifting', 'running', 'dailyyoga'],
        },
        fitbitcardio: {
          title: 'EASY CARDIO DANCE  FROM FITBIT',
          items: ['dance', 'workoutdance', 'cardiodancebasic', 'cardiodance'],
        },
        suggestions: ['Hey Bixby, show me action movies'],
      },
      'page-3': {
        title: 'page-3',
        type: 'grid',
        content: ['fitbit-gym', 'fitbit-yoga', 'sponsor', 'source'],
        img: '/static/Images/home/movies/movies.png',
        nav: [
          ['tile', 'tile', 'poster'],
          ['thumbnail2', 'thumbnail1', 'poster'],
        ],
        'fitbit-gym': {
          type: 'poster',
          contentType: 'simple',
          details: {
            poster: '/static/Images/home/health/grid/health1.png',
            text1: '<b>Cardio Dance Basics 1 </b> </br> BR Dance',
            logo: '/static/Images/home/icons/common/big_fitbit.png',
            logoType: 'rect',
            img: '/static/Images/home/page1/poster.png',
          },
          template: 'poster',
        },
        'fitbit-yoga': {
          type: 'tile',
          template: 'tile',
          contentType: 'sponsored',
          details: {
            bottomText: '<b>Weightlifting 101</b><br>PowerUP Fitness',
            tile: '/static/Images/home/health/grid/health2.png',
            logo: '/static/Images/home/icons/common/big_fitbit.png',
            logoType: 'rect',
            img: '',
          },
        },
        sponsor: {
          type: 'thumbnail1',
          template: 'thumbnail',
          contentType: 'cp',
          details: {
            icon: '',
            bottomText: '<b>Stress Meditation</b><br>Body Scan',
            logo: '/static/Images/home/icons/common/big_headspace.png',
            logoType: 'rect',
            img: '/static/Images/home/health/grid/health3.png',
          },
        },
        source: {
          type: 'thumbnail2',
          template: 'thumbnail',
          contentType: 'cp-type-1',
          details: {
            icon: '',
            bottomText: '<b>Daily yoga</b> - Finese </br>Yoga with Adrienne',
            logo: '/static/Images/home/icons/common/big_headspace.png',
            logoType: 'rect',
            img: '/static/Images/home/health/grid/health4.png',
          },
        },
        sublist: ['workout', 'fitbitcardio'],
        workout: {
          title: 'BODYWEIGHT WORKOUT',
          items: ['yoga', 'lifting', 'running', 'dailyyoga'],
        },
        fitbitcardio: {
          title: 'EASY CARDIO DANCE  FROM FITBIT',
          items: ['dance', 'workoutdance', 'cardiodancebasic', 'cardiodance'],
        },
        suggestions: ['Hey Bixby, go Home'],
      },
    },
  },
};
