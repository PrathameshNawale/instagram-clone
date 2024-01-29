import React, { useEffect, createContext,useReducer,useContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css"
import { BrowserRouter as  Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(location.pathname.startsWith('/reset'))
        navigate('/signin')
    }
  },[]) 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowingpost" element={<SubscribedUserPosts />} />
      <Route path="/reset" element={<Reset/>} />
      <Route path="/reset/:token" element={<NewPassword/>} />
    </Routes>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <Router>
      <Navbar />
      <Routing />
    </Router>
    </UserContext.Provider>
  );
}

export default App;
