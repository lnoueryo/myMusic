import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './modules/audio';
import configReducer from './modules';

export default configureStore({
  reducer: {
    config: configReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});