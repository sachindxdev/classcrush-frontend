import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: (state, action) => null,
  },
});

export const { addConnections, removeConnections0 } = connectionSlice.actions;
export default connectionSlice.reducer;
