import { configureStore } from '@reduxjs/toolkit';
import campusAmbassadorSlice from './slices/campusAmbassadorSlice';
import GlobalDialogWrapperSlice from './slices/GlobalDialogWrapperSlice';

export const store = configureStore({
  reducer: {
    campusAmbassador:campusAmbassadorSlice,
    GlobalDialog:GlobalDialogWrapperSlice
  },
});
