import { createSlice } from '@reduxjs/toolkit';

const audio = createSlice({
  name: 'audio',
  initialState: {
    audioSrc: '',
    duration: 0,
    songs: [
      {id: 1, title: 'sakura', description: 'Have you felt something??'},
      {id: 2, title: 'agape', description: 'Have you felt something??'},
    ]
  },
  reducers: {
    changeAudioSrc(state, { type, payload }) {
      console.log(type, payload)
      state.audioSrc = payload
      return state;
    },
    changeDuration(state, { type, payload }) {
      console.log(type, payload)
      state.duration = payload
      return state;
    },
  }
})

const { changeAudioSrc, changeDuration } = audio.actions;
export { changeAudioSrc, changeDuration }
export default audio.reducer