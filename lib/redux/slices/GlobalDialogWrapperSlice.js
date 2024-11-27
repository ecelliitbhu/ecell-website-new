import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDialogOpen: false,
  dialogType: null,
};

const GlobalDialogWrapperSlice = createSlice({
  name: 'GlobalDialog',
  initialState,
  reducers: {
    openDialog(state, action) {
      state.isDialogOpen = true;
      state.dialogType = action.payload;
    },
    closeDialog(state) {
      state.isDialogOpen = false;
      state.dialogType = null;
    },
  },
});

export const { openDialog, closeDialog } = GlobalDialogWrapperSlice.actions;
export default GlobalDialogWrapperSlice.reducer;
