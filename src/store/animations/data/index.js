
import invokeData from './json/01_line_invoke_v02.json';
import listenData from './json/02_line_listening_v02.json';
import thinkData from './json/03_line_thinking_v02.json';
import wipeoffData from './json/04_line_wipe-off_v02.json';
import revealData from './json/05_line_reveal_v02.json';
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
