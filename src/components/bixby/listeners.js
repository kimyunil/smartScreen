import { mapState, mapActions, mapMutations } from 'vuex';
import Messages from '../../services/Messages';

export default {
  created() {
    Messages.$on('speech-to-text.transcription-complete', this.sttComplete);
    Messages.$on('speech-to-text.transcription-update', this.sttUpdate);
    Messages.$on('audio-input.started', this.initAudioRecording);
    Messages.$on('audio-input.stopped', this.stopAudioRecording);
    Messages.$on('launch.bixby', this.bixbyaction);
    Messages.$on('bixby.result', this.actionResult);
  },
  destroyed() {
    Messages.$off('speech-to-text.transcription-complete', this.sttComplete);
    Messages.$off('speech-to-text.transcription-update', this.sttUpdate);
    Messages.$off('audio-input.started', this.initAudioRecording);
    Messages.$off('audio-input.stopped', this.stopAudioRecording);
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
    ...mapMutations('source', {
      setVolumeDim: 'SET_VOlUME_DIM',
    }),
    initAudioRecording() {
      this.setVolumeDim(true);
    },
    stopAudioRecording() {
      this.setVolumeDim(false);
    },
    sttUpdate(param) {
      if (this.bixbyState !== 'listen') {
        clearTimeout(this.timeout);
        // this.defaultOptions.loop = true;
        this.updateBixby('listen');
      }
      this.showSpeechText = true;
      console.log(param);
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
        if (this.isBixbyActive) {
          this.showResults(payload.param);
        }
      } else if (payload.type === 'launch') {
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
        }
      }
    },
  },
};
