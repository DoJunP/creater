import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: 'park',
});

export default configureStore({
  reducer: {
    user: user.reducer, // slice 만들고 꼭 등록해줘야함, reducer 꼭 달아줘야함
  },
});
