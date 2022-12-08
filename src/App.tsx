import React, { useState } from "react";
import styles from "./app.module.scss";

import ThemeProvider from "./Context/ThemeContext/Provider";
import Router from "./Pages/Router";
import store from "./Redux/store";
import ThemeSelectors from "./Redux/selectors/themeSelectors";
import { Provider, useDispatch, useSelector } from "react-redux";
import { changeTheme } from "./Redux/reducers/themeReducer";

const App = () => {
  const dispatch = useDispatch();

  const onChangeTheme = () => {
    dispatch(changeTheme());
  };

  const theme = useSelector(ThemeSelectors.getTheme);
  return (
    <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
      <Router></Router>
    </ThemeProvider>
  );
};

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithStore;
