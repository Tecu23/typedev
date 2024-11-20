import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import "./index.css";

import Home from "./pages/Home";
import Navbar from "./component/sections/Navbar";
import Footer from "./component/sections/Footer";
import About from "./pages/About";
import Profile from "./pages/Profile";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <hr />
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, profileRoute]);

const router = createRouter({ routeTree });

// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
