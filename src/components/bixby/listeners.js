import { mapState, mapActions } from 'vuex';
import Messages from '../../services/Messages';

export default {
  created() {
    Messages.$on('speech-to-text.transcription-complete', this.sttComplete);
    Messages.$on('speech-to-text.transcription-update', this.sttUpdate);
    Messages.$on('launch.bixby', this.bixbyaction);
    Messages.$on('bixby.result', this.actionResult);
  },
  destroyed() {
    Messages.$off('speech-to-text.transcription-complete', this.sttComplete);
    Messages.$off('speech-to-text.transcription-update', this.sttUpdate);
    Messages.$off('launch.bixby', this.bixbyaction);
    Messages.$off('bixby.result', this.actionResult);
  },
  computed: {
    ...mapState([
      'isRemoteEnabled',
      'viewStack',
      'suggestions',
      'isBixbyActive',
    ]),
  },
  methods: {
    ...mapActions({
      removeComponent: 'REMOVE_COMPONENT',
      switch_comp: 'SWITCH_COMPONENT',
      launchComponent: 'LAUNCH_COMPONENT',
      launchVoice: 'LAUNCH_VOICE',
      closeVoice: 'CLOSE_VOICE',
    }),
    heyBixby() {
      this.launchVoice();
      Messages.send('audio-input.start');
    },
    sttUpdate(param) {
      if (this.bixbyState !== 'listen') {
        clearTimeout(this.timeout);
        this.showSpeechText = true;
        // this.defaultOptions.loop = true;
        this.updateBixby('listen');
      }
      this.speechText = param;
    },
    sttComplete(param) {
      if (this.bixbyState === 'listen') {
        clearTimeout(this.timeout);
        // give some time to user to update
        this.timeout = setTimeout(() => {
          if (this.bixbyState === 'listen') {
            this.showSpeechText = true;
            this.defaultOptions.loop = true;
            this.updateBixby('think');
          }
          Messages.send('audio-input.stop');
        }, 2000);
      }
      this.speechText = param;
    },
    actionResult(payload) {
      if (payload.type === 'action') {
        this.showResults(payload.param);
      } else {
        if (this.isBixbyActive) {
          this.closeBixby(false);
        }
        this.launchComponent(payload.param);
      }
    },
    bixbyaction(param) {
      console.log('launchBixby', param);
      if (param.action === 'launch') {
        if (this.isBixbyActive) {
          this.closeBixby(true);
        } else {
          this.launchVoice();
        }
      } else if (param.action === 'listen') {
        Messages.send('audio-input.start');
        this.updateBixby('listen');
      } else if (param.action === 'close') {
        if (this.isBixbyActive) {
          this.closeBixby(false);
          // this.resetBixby();
          // this.closeVoice();
        }
      }
    },
  },
};
