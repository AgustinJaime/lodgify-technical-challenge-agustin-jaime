import { createSlice, current } from "@reduxjs/toolkit";
import { fetchTasks } from "../actions/tasksActions";

export enum LoadingStatus {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  REJECTED = "REJECTED",
}

interface TasksState {
  data: Data;
  loading: string;
}
const initialState: TasksState = {
  data: [],
  loading: LoadingStatus.IDLE,
};
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    updateCheckData: (state, action) => {
      const { value, groupIndex, taskIndex } = action.payload;
      const newData = state.data.map((group, gIndex) => {
        if (gIndex !== groupIndex) return group;
        return {
          ...group,
          tasks: group.tasks.map((task, tIndex) => {
            if (tIndex !== taskIndex) return task;
            return {
              ...task,
              checked: value,
            };
          }),
        };
      });
      return { ...state, data: newData };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = LoadingStatus.PENDING;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      const { payload = [] } = action;
      state.data = payload;
      state.loading = LoadingStatus.SUCCEEDED;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = LoadingStatus.REJECTED;
    });
  },
});

export const { reset, updateCheckData } = tasksSlice.actions;
export default tasksSlice.reducer;
