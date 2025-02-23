const { createSlice } = require("@reduxjs/toolkit");

export const globalMessageSlice = createSlice({
  name: "apiData",
  initialState: {
    value: [],
  },
  reducers: {
    setGlobalMessage: (state, { payload }) => {
      state.value = payload;
    },
    deleteGlobalMessage: (state) => {
      state.value = [];
    },
  },
})
export const { setGlobalMessage, deleteGlobalMessage } = globalMessageSlice.actions

export default globalMessageSlice.reducer;