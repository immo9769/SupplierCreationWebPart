import { configureStore } from '@reduxjs/toolkit';
import supplierReducer from './supplierSlice'; // Import supplier slice
import attachmentReducer from './attachmentSlice'; // Import attachment slice

// Configure the store with both reducers
const store = configureStore({
  reducer: {
    supplier: supplierReducer, // Register supplier reducer
    attachments: attachmentReducer, // Register attachment reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
