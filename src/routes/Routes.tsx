import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// layout constants
import { LayoutTypes } from "../constants/layout";

// strore
import { RootState } from "../redux/store";

// All layouts containers
import DefaultLayout from "../layouts/Default";
import VerticalLayout from "../layouts/Vertical";
import DetachedLayout from "../layouts/Detached";
import HorizontalLayout from "../layouts/Horizontal/";
import TwoColumnLayout from "../layouts/TwoColumn/";

import { authProtectedFlattenRoutes, publicProtectedFlattenRoutes } from "./index";

import { APICore } from "../helpers/api/apiCore";

interface RoutesProps { }

const AllRoutes = (props: RoutesProps) => {
  const { layout } = useSelector((state: RootState) => ({
    layout: state.Layout,
  }));



  const getLayout = () => {
    let layoutCls = TwoColumnLayout;

    switch (layout.layoutType) {
      case LayoutTypes.LAYOUT_HORIZONTAL:
        layoutCls = HorizontalLayout;
        break;
      case LayoutTypes.LAYOUT_DETACHED:
        layoutCls = DetachedLayout;
        break;
      case LayoutTypes.LAYOUT_VERTICAL:
        layoutCls = VerticalLayout;
        break;
      default:
        layoutCls = TwoColumnLayout;
        break;
    }
    return layoutCls;
  };

  let Layout = getLayout();
  const api = new APICore();


  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicProtectedFlattenRoutes.map((route, idx) => (
            <Route
              path={route.path} // /auth/login, /auth/register
              element={
                <DefaultLayout {...props} layout={layout}>
                  {route.element}
                </DefaultLayout>
              }
              key={idx}
            />
          ))}
        </Route>

        <Route>
          {authProtectedFlattenRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                api.isUserAuthenticated() === false ? (
                  <Navigate
                    to={{
                      pathname: "auth/login",
                      search: "next=" + route.path
                    }}
                  />
                ) : (
                  <Layout {...props}>{route.element}</Layout>
                )
              }
              key={idx}

            />
          ))}
        </Route>
   {/* Add the catch-all route to redirect to the home page */}
   <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
};

export default AllRoutes;