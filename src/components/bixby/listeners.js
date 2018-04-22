// import { mapState, mapMutations, mapActions } from 'vuex';
import Messages from '../../services/Messages';

export default {
  created() {
    Messages.$on('speech-to-text.transcription-complete', this.sttComplete);
    Messages.$on('speech-to-text.transcription-update', this.sttUpdate);
  },
  destroyed() {
    Messages.$off('speech-to-text.transcription-complete', this.sttComplete);
    Messages.$off('speech-to-text.transcription-update', this.sttUpdate);
  },
  methods: {
    sttUpdate(param) {
      if (this.bixbyState !== 'listen') {
        this.showSpeechText = true;
        this.defaultOptions.loop = true;
        this.updateBixby('listen');
      }
      this.text = param;
    },
    sttComplete(param) {
      if (this.bixbyState !== 'think') {
        this.showSpeechText = true;
        this.defaultOptions.loop = true;
        this.updateBixby('think');
      }
      this.text = param;
    },
  },
};
