import Vue from 'vue';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import store from '../vuex/store';
import Messages from '../services/Messages';

export default new Vue({
  store,
  data() {
    return {
      data: '',
      type: '',
    };
  },
  computed: {
    ...mapState([
      'power',
    ]),
  },
  methods: {
    init() {
      Messages.$on('remote-control.button-up', this.handleRemoteButtonUp);
      Messages.$on('remote-control.button-down', this.handleRemoteButtonDown);
    },
    destroy() {
      Messages.$off('remote-control.button-up', this.handleRemoteButtonUp);
      Messages.$off('remote-control.button-down', this.handleRemoteButtonDown);
    },
    handleRemoteButtonUp(data) {
      // jack into the Mesage parse method so we can also dispatch legacy button messages
      Messages.$emit('button_up', data);
    },
    handleRemoteButtonDown(data) {
      Messages.parseMessage(JSON.stringify({ type: 'button_down', data }));
      console.log('receiving command from WoO!');
    },
  },
});
