import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/homePage/Home'
import NavbarWrapper from '../layout/navbarWrapper/NavbarWrapper'
import Weather from '../pages/weatherPage/Weather'
import PageNotFound from '../pages/pageNotFound/PageNotFound'
import LoginPage from '../pages/loginRegisterPage/LoginPage'
import RegisterPage from '../pages/loginRegisterPage/RegisterPage'
import ProfilePage from '../pages/profilePage/ProfilePage'

const router = createBrowserRouter([{
  path: "/",
  element: <NavbarWrapper />,
  children: [
    {path: "", element: <Home />},
    {path: "weather", element: <Weather  />},
    {path: "profile", element: <ProfilePage />},
    {path: "login", element: <LoginPage />},
    {path: "register", element: <RegisterPage />},
    {path: "*", element:<PageNotFound />}
  ]
}])



export default router