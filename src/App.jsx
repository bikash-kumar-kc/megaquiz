import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { Header, Footer } from "./component/index";
import { useMutation } from "@tanstack/react-query";
import authService from "./appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import { ToastContainer } from "react-toastify";
import { updateUserRecord } from "./store/userAttemptSlice";
import databaseservices from "./appwrite/database";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((store) => store.userAuth.status);
  const user = useSelector((store) => store.userAuth.user);
  const location = useLocation();

  const { mutate: userRecord } = useMutation({
    mutationKey: ["user-Data"],
    mutationFn:(id)=> databaseservices.gettingaRecord(id),
    onSuccess: (userData) => {
      if (userData) {
        dispatch(updateUserRecord(userData));
      }
      toast("getting a user record");
    },
    onError: (error) => {
      toast("error in getting record");
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["current-user"],
    mutationFn: authService.getCurrentUser,
    onSuccess: (userData) => {
      if (userData && !user) {
        dispatch(login(userData));
        userRecord(userData.$id);
      }
    },
  });

  useEffect(() => {
    if (!user) {
      mutate();
    }
  }, [user, location.pathname]);

  return (
    <>
      <Header authStatus={authStatus} />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
