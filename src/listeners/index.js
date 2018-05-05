import GlobalListener from './GlobalListener';
// import VoiceListener from './VoiceListener';

export default {
  modules: [GlobalListener],
  init() {
    console.log('++++++++++++++++++++');
    this.modules.forEach((listener) => {
      listener.init();
    });
  },
  destroy() {
    this.modules.forEach((listener) => {
      listener.destroy();
    });
  },
};
