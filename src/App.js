import logo from "./logo.svg";
import "./App.css";
import "./style/style.css";
import "./style/radarstyle.css";
import "./style/nav_foot.css";

import React, { useEffect, useState } from "react";

import { PokeHome } from "./jsx/PokeHome";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { PokeDetail } from "./jsx/PokeDetailCard";

import { NavHeader } from "./jsx/NavHeader";
import { Error404 } from "./jsx/Error404";
import { Footer } from "./jsx/Footer";
import { Quiz } from "./jsx/Quiz";
import { GIF } from "./jsx/GIF";
import {Subscribe} from "./jsx/Subscribe";
const routes = [
  {
    path: "*",
    element: <Root />,
    children: [{ path: "*", element: <Error404 /> }],
  },
  {
    path: "/pokeact-dex/",
    element: <Root />,
    children: [
      { path: "/pokeact-dex/", element: <Home /> },
      { path: "/pokeact-dex/:pokeID", element: <Detail /> },
      { path: "/pokeact-dex/quiz", element: <Quiz /> },
      { path: "/pokeact-dex/subscribe", element: <Subscribe /> },

      { path: "*", element: <Error404 /> },
    ],
  },
];

const router = createBrowserRouter(routes);


function Root() {
  return (
    <>
      <NavHeader />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

function Detail() {
  const { pokeID } = useParams();
  return <PokeDetail pokeID={pokeID} />;
}

function Home() {
  return <PokeHome />;
}

export default App;
