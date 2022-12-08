import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PagesWrapper from "../PagesWrapper";
import PostContent from "../PostContent";
import Search from "../Search";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

export enum PathNames {
  Home = `/`,
  SignIn = `/sign-in`,
  SignUp = `/sign-up`,
  Post = `/posts/:id`,
  PostContent = `/content/:id`,
  Search = "/search",
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
