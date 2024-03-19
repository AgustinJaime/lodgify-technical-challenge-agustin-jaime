import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async ({} = {}, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress"
      );
      return (await response.json()) as Data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
