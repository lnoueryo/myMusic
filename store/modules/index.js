import { createSlice } from '@reduxjs/toolkit';

const config = createSlice({
  name: 'config',
  initialState: {
    windowSize: {x: 0, y: 0},
    count: 0
  },
  reducers: {
    changeWindowSize(state, { type, payload }) {
      state.windowSize = payload;
      return state;
    },
    countUp(state, { type, payload }) {
      state.count += payload;
      return state;
    }
  }
})

const { changeWindowSize, countUp } = config.actions;
export { changeWindowSize, countUp }
export default config.reducer