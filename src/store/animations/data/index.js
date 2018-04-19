
import invokeData from './01_line_invoke.json';
import listenData from './02_line_listening.json';
import thinkData from './03_line_thinking.json';
import wipeoffData from './04_line_wipe_off.json';
import revealData from './05_line_reveal.json';
import standby1Data from './06_line_standby_pulse_1.json';
import standby2Data from './07_line_standby_pulse_2.json';

export default {
  invoke: {
    data: {
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: invokeData,
    },
  },
  listen: {
    data: {
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: listenData,
    },
  },
  think: {
    data: {
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: thinkData,
    },
  },
  wipeoff: {
    data: {
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: wipeoffData,
    },
  },
  reveal: {
    data: {
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: revealData,
    },
  },
  standby1: {
    data: {
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: standby1Data,
    },
  },
  standby2: {
    data: {
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: standby2Data,
    },
  },
};
