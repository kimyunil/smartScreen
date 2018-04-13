export default {
  filters: {
    toTime(secs) {
      let text;
      const seconds = Math.floor(secs);

      if (seconds < 10) {
        text = `00:0${seconds}`;
      } else if (seconds > 9 && seconds < 60) {
        text = `00:${seconds}`;
      } else if (seconds > 59 && seconds < 600) {
        text = `0${Math.floor(seconds / 60)}:`;
        if (seconds - Math.floor(seconds / 60) * 60 < 10) {
          text += `0${(seconds - Math.floor(seconds / 60) * 60)}`;
        } else if (seconds - Math.floor(seconds / 60) * 60 > 9) {
          text += (seconds - Math.floor(seconds / 60) * 60);
        }
      } else if (seconds > 599) {
        text = `${Math.floor(seconds / 60)}:`;
        if (seconds - Math.floor(seconds / 60) * 60 < 10) {
          text += `0${(seconds - Math.floor(seconds / 60) * 60)}`;
        } else if (seconds - Math.floor(seconds / 60) * 60 > 9) {
          text += (seconds - Math.floor(seconds / 60) * 60);
        }
      }
      return text;
    },
  },
};
export const utils = {
  parseProgrameTime(paramTime) {
    let time = paramTime;
    time = parseInt(time, 10);
    time = time % 1440;
    let abb;
    if (time >= 720) {
      abb = ' pm';
    } else {
      abb = ' am';
    }
    time %= 720;
    let hh = Math.floor(time / 60);
    if (hh === 0) {
      hh = '12';
    } else if (hh.toString().length === 1) {
      hh = `0 ${hh}`;
    }
    let mm = time % 60;
    if (mm === 0) {
      mm = '00';
    } else if (mm.toString().length === 1) {
      mm = `0 ${mm}`;
    }
    return `${hh} : ${mm} ${abb}`;
  },
};

export const deepCopyObject = {
  methods: {
    deepClone(obj) {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
      const copy = obj.constructor();
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        copy[keys[i]] = obj[keys[i]];
      }
      return copy;
    },
  },
};
