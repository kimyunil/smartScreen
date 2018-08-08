import { mapState, mapActions, mapMutations } from 'vuex';
import Messages from '../../services/Messages';

export default {
  created() {
    Messages.$on('speech-to-text.transcription-complete', this.sttComplete);
    Messages.$on('speech-to-text.transcription-update', this.sttUpdate);
    Messages.$on('audio-input.started', this.initAudioRecording);
    Messages.$on('audio-input.stopped', this.stopAudioRecording);
    Messages.$on('text-to-speech.speech-end', this.stopAudioRecording);
    Messages.$on('text-to-speech.speech-start', this.initAudioRecording);
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
    Messages.$off('text-to-speech.speech-end', this.stopAudioRecording);
    Messages.$off('text-to-speech.speech-start', this.initAudioRecording);
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
    ...mapMutations({
      enableKeybrd: 'UPDATE_REMOTE_MODE',
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
      this.enableKeybrd(false);
      // this was to solve a bug when result is directed but still in listening mode
      if (this.bixbyState === 'wipeoff') {
        return;
      }

      if (this.bixbyState !== 'listen') {
        clearTimeout(this.timeout);
        // this.defaultOptions.loop = true;
        this.updateBixby('listen');
      }
      this.showSpeechText = true;
      console.log(param);
      this.speechText = param;
      this.closeTimer();
    },
    sttComplete(param) {
      this.enableKeybrd(false);
      if (this.bixbyState === 'listen') {
        clearTimeout(this.timeout);
        // give some time to user to update
        this.timeout = setTimeout(() => {
          if (this.bixbyState === 'listen') {
            this.showSpeechText = true;
            this.defaultOptions.loop = true;
            this.updateBixby('think');
          }
        }, 1200);
      }
      this.closeTimer();
      this.speechText = param;
    },
    actionResult(payload) {
      this.updateBixby('initial');
      this.enableKeybrd(false);
      this.closeTimer();
      this.bixbyResult = payload;
      clearTimeout(this.timeout);
      Messages.send('audio-input.stop');
      if (payload.type === 'action') {
        if (this.isBixbyActive) {
          this.showResults(payload.param);
        }
      } else if (payload.type === 'launch') {
        if (this.isBixbyActive) {
          this.closeBixby(false);
        }
        console.log(payload);
        this.launchComponent(payload.param);
      }
    },
    bixbyaction(param) {
      this.enableKeybrd(false);
      clearTimeout(this.timeout);
      console.log('launchBixby', param);
      if (param.action === 'launch') {
        if (this.isBixbyActive) {
          this.closeBixby(true);
        } else {
          this.launchVoice();
        }
        Messages.send('audio-input.start');
      } else if (param.action === 'listen') {
        Messages.send('audio-input.start');
        this.updateBixby('listen');
      } else if (param.action === 'close') {
        if (this.isBixbyActive) {
          this.closeBixby(false);
        } else {
          this.resetBixby();
        }
      }
    },
  },
};
