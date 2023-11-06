import { createSlice } from '@reduxjs/toolkit'

 const AddTaskSlice = createSlice({
    name: 'addTask',
    initialState: {
        addTaskItems:[]
    },
    reducers: {
        addNewTask: (state,action) => {
            state.addTaskItems.push(action.payload);
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
})

export const { addNewTask, incrementByAmount } = AddTaskSlice.actions;
export default AddTaskSlice.reducer;