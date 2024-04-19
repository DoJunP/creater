import { configureStore, createSlice } from '@reduxjs/toolkit';

const createdUser = createSlice({
  name: 'createdUser',
  initialState: [],
  reducers: {
    addAccount(state, action) {
      state.push(action.payload);
      console.log('푸시푸시');
    },
    addToken(state, action) {
      console.log(state);
      const { email, token } = action.payload;
      const 찾을계정 = state.find((a) => a.email === email);
      console.log(찾을계정);
      if (찾을계정) {
        찾을계정.token = token;
      }
      console.log(찾을계정);
    },
  },
});
export let { addAccount, addToken } = createdUser.actions;

export default configureStore({
  reducer: {
    createdUser: createdUser.reducer, // slice 만들고 꼭 등록해줘야함, reducer 꼭 달아줘야함
  },
});
