import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { POST_MOCK } from "../../App";
import Post from "../../Components/Post";
import PagesWrapper from "../PagesWrapper";
import PostContent from "../PostContent";

export enum PathNames {
  Home = `/`,
  SignIn = `/sign-in`,
  SignUp = `/sign-up`,
  Post = `/posts/:id`,
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathNames.Home} element={<PagesWrapper></PagesWrapper>}>
          <Route
            path={PathNames.Post}
            element={<PostContent></PostContent>}
          ></Route>
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
