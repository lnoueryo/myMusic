import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './modules/audio';

export default configureStore({
  reducer: {
    audio: audioReducer,
  }
});