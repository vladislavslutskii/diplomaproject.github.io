import React, { useEffect, useState } from "react";
import styles from "./app.module.scss";

import ThemeProvider from "./Context/ThemeContext/Provider";
import Router from "./Pages/Router";
import store from "./Redux/store";
import AuthProvider from "./Context/AuthContext/Context";
import ThemeSelectors from "./Redux/selectors/themeSelectors";
import { Provider, useDispatch, useSelector } from "react-redux";
import { changeTheme } from "./Redux/reducers/themeReducer";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const dispatch = useDispatch();

  const onChangeTheme = () => {
    dispatch(changeTheme());
  };

  const [currentUser, setCurrentUser] = useState();
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // @ts-ignore
      setCurrentUser(user);
    });
  }, []);

  const theme = useSelector(ThemeSelectors.getTheme);
  return (
    <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
      <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
        <Router></Router>
      </ThemeProvider>
    </AuthProvider>
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
