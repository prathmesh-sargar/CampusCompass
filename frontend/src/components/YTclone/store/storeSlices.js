import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    video: [],
    category: "coding for beginners",
   
  },
  reducers: {
    setHomeVideos: (state, action) => {
      state.video = action.payload;
    },
    setcategory: (state, action) => {
      state.category = action.payload;
    }
  },
});

export const { setHomeVideos, setcategory, setUsername, clearUsername } =
  appSlice.actions;
export default appSlice.reducer;
