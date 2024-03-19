import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "../store/reducers";

const renderConnected = (
  ui: React.ReactElement,
  initialState = {},
  {
    store = configureStore({
      reducer: reducers,
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }: React.PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderConnected;
