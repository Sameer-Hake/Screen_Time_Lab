import { configureStore } from '@reduxjs/toolkit'
import addTaskReducer from '../ReduxStore/ReduxSlice/addTaskSlice'

 const appStore = configureStore({
  reducer: {
    addTask: addTaskReducer,
  },
});

export default appStore;

