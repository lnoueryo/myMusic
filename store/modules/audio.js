import { createSlice } from '@reduxjs/toolkit';
const music = [
  {id: 1, title: 'Sakura', description: 'Have you felt something??'},
  {id: 2, title: 'Agape', description: 'Have you felt something??'},
  {id: 3, title: 'Drive', description: 'Have you felt something??'},
  {id: 4, title: 'Letter', description: 'Have you felt something??'},
  {id: 5, title: 'Dimension', description: 'Have you felt something??'},
  {id: 6, title: 'With', description: 'Have you felt something??'},
  {id: 7, title: 'Brain-parasite', description: 'Have you felt something??'},
  {id: 8, title: 'TDM', description: 'Have you felt something??'},
  {id: 9, title: 'TDMdisco', description: 'Have you felt something??'},
  {id: 10, title: 'Intro', description: 'Have you felt something??'},
  {id: 11, title: 'New-world', description: 'Have you felt something??'},
  {id: 12, title: 'Look-at-the-red-sky', description: 'Have you felt something??'},
  {id: 13, title: 'Move-forward', description: 'Have you felt something??'},
  {id: 14, title: 'Tell-me-anything', description: 'Have you felt something??'},
]
const audio = createSlice({
  name: 'audio',
  initialState: {
    selectedMusic: '',
    duration: 0,
    currentTime: 0,
    repeatToggle: false,
    music: music
  },
  reducers: {
    selectMusic(state, { type, payload }) {
      state.selectedMusic = payload;
      return state;
    },
    changeDuration(state, { type, payload }) {
      state.duration = payload;
      return state;
    },
    changeCurrentTime(state, { type, payload }) {
      state.currentTime = payload;
      return state;
    },
    changeRepeatToggle(state, { type, payload }) {
      state.repeatToggle = payload;
      return state;
    },
  }
})

const { selectMusic, changeDuration, changeCurrentTime, changeRepeatToggle } = audio.actions;
export { selectMusic, changeDuration, changeCurrentTime, changeRepeatToggle }
export default audio.reducer