import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import system from "../theme/theme";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserAttempt from "./pages/UserAttempt";
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz";
import QuizPlay from "./pages/QuizPlay";
import Profile from "./pages/Profile";
import { Protected } from "./component";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "quizoption",
        element: (
          <Protected authentication>
            <Quiz />
          </Protected>
        ),
      },
      {
        path: "quizplay",
        element: (
          <Protected authentication>
            <QuizPlay />
          </Protected>
        ),
      },
      {
        path: "userattempt",
        element: (
          <Protected authentication>
            <UserAttempt />
          </Protected>
        ),
      },
      {
        path: "profile",
        element: (
          <Protected authentication>
            <Profile />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ChakraProvider value={system}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </ChakraProvider>
);
