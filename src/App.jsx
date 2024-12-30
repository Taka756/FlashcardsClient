import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, CssBaseline } from "@mui/material";
import Home from "./pages/home";
import Login from "./pages/login";
import LocationMiddleware from "./LocationMiddleware";
import Navbar from "./components/Navbar";
import ExplorePage from "./pages/ExplorePage";
import TopicPage from "./pages/TopicPage";
import EditTopicPage from "./pages/EditTopicPage";


const Layout = () => {
  return (
    <>
      {/* <CssBaseline enableColorScheme /> */}
      <Navbar />
      <Box sx={{display: "flex", 
        justifyContent: "center", 
        // backgroundColor: "red"
        }}>
        <Box sx={{width: "1536px",
          //  backgroundColor:"green", 
           padding: 3}}>
        <Outlet />
        </Box>
        
      </Box>
      
    </>
  );
};

const AppRouter = () => {
  return (
    <>
      <LocationMiddleware />
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="flashcards" element={<ExplorePage /> }/>
            <Route path="login" element={<Login />} />
            <Route path="flashcards/:topicId" element={<TopicPage />}/>
            <Route path="flashcards/:topicId/edit" element={<EditTopicPage />}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

const AuthRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const isAuth = useSelector((state) => state.auth.isAuth);
  // const isAuth = useSelector(selectIsAuth);

  // useEffect(() => {
  //   console.log(location.pathname);
  // console.log(isAuth)
  // if (!isAuth && !['/auth/login', '/auth/registration', '/auth/reset-password'].includes(location.pathname)) {
  //     navigate('/auth/login', {replace: true});
  // }
  // }, [location]);

  return <Outlet />;
};

const App = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;