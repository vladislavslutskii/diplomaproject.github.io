import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "../../Components/Profile";
import VerifyEmail from "../../Components/VerifyEmail";
import PrivateRoute from "./PrivateRoute";

import PagesWrapper from "../PagesWrapper";
import PostContent from "../PostContent";
import Search from "../Search";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

export enum PathNames {
  Home = `/`,
  SignIn = `/sign-in`,
  SignUp = `/sign-up`,
  // Post = `/posts/:id`,
  PostContent = `/posts/:id`,
  Search = "/search",
  VerifyEmail = "/verify-email",
  Profile = "/profile",
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathNames.Home} element={<PagesWrapper></PagesWrapper>}>
          <Route
            path={PathNames.PostContent}
            element={<PostContent></PostContent>}
          ></Route>
          <Route path={PathNames.SignIn} element={<SignIn></SignIn>}></Route>
          <Route path={PathNames.SignUp} element={<SignUp></SignUp>}></Route>
          <Route path={PathNames.Search} element={<Search></Search>} />
          <Route
            path={PathNames.VerifyEmail}
            element={<VerifyEmail></VerifyEmail>}
          />
          <Route
            path={PathNames.Profile}
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path={`*`}
          element={<Navigate to={PathNames.Home}></Navigate>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
