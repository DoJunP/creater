import { configureStore, createSlice } from '@reduxjs/toolkit';

const createdUser = createSlice({
  name: 'createdUser',
  initialState: [],
  reducers: {
    addAccount(state, action) {
      state.push(action.payload);
    },
  },
});
export let { addAccount, addToken } = createdUser.actions;

export default configureStore({
  reducer: {
    createdUser: createdUser.reducer, // slice 만들고 꼭 등록해줘야함, reducer 꼭 달아줘야함
  },
});
