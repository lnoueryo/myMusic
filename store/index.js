import { Audio } from "~/modules/audio";
export const state = () => stateInitial

export const getters = {
  settingDialog:(state) => state.settingDialog,
  audio:(state) => state.audio,
}

export const mutations = {
  changeSettingDialog(state, dialogSwitch) {
    console.log(dialogSwitch)
    state.settingDialog = dialogSwitch;
  },
  setAudio(state, audio) {
    state.audio = audio;
  },
  changePanner(state, value) {
    state.audio.changePanner(value)
  },
  changeVolume(state, value) {
    state.audio.changeVolume(value)
  },
  changePeaking(state, value) {
    state.audio.setPeakingValue(value)
  },
  play(state) {
    state.audio.play()
  },
  stop(state) {
    state.audio.stop()
  },
  changePaused(state, paused) {
    state.audio.changePaused(paused);
  },
  nextMusic(state) {
    state.audio.nextMusic();
  },
  backMusic(state) {
    state.audio.backMusic();
  },
  setDuration(state, duration) {
    state.audio.setDuration(duration);
  },
  setCurrentTime(state, currentTime) {
    state.audio.setCurrentTime(currentTime);
  },
  _setCurrentTime(state, currentTime) {
    state.audio._setCurrentTime(currentTime);
  },
  fastForwardOrRewind(state, time) {
    state.audio.fastForwardOrRewind(time);
  },
  changeMusic(state, music) {
    state.audio.changeMusic(music);
  },
}

export const actions = {
  setAudio({commit, getters}, audioEl) {
    audioEl.addEventListener('play', (e) => {
      commit('changePaused', e.target.paused);
    });
    audioEl.addEventListener('pause', (e) => {
      commit('changePaused', e.target.paused);
    });
    audioEl.addEventListener('ended', (e) => {
      commit('nextMusic');
    });
    audioEl.addEventListener('durationchange', (e) => {
      commit('setDuration', e.target.duration);
    });
    audioEl.addEventListener('timeupdate', (e) => {
      commit('setCurrentTime', e.target.currentTime);
    });
    const audio = new Audio(audioEl);
    commit('setAudio', audio);
  }
}

const stateInitial = {
  settingDialog: false,
  audio: '',
}