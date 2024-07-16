import React from 'react'
import "./App.css"
import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './components/core/Dashboard/MyProfile'
import PrivateRoute from './components/core/HomePage/auth/PrivateRoute'
import Error from "./pages/Error"
import Dashboard from './pages/Dashboard'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import { ACCOUNT_TYPE } from './utils/constants'
import AddCourse from './components/core/Dashboard/AddCourse/index'
import { useSelector } from 'react-redux'
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'
import Cart from './components/core/Dashboard/Cart'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor'
import Settings from './components/core/Dashboard/Settings'
import AddCategory from './components/core/Dashboard/AddCategory'
function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter relative">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/catalog/:catalogName' element={<Catalog/>}></Route>
        <Route path='/courses/:courseId' element={<CourseDetails/>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='/update-password/:id' element={<UpdatePassword/>}></Route>
        <Route path='/verify-email' element={<VerifyEmail/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path='/dashboard/my-profile' element={<MyProfile/>}></Route>
          <Route path="dashboard/Settings" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
               <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}></Route>
               <Route path='/dashboard/cart' element={<Cart/>}></Route>
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
               <Route path='/dashboard/add-course' element={<AddCourse/>}></Route>
               <Route path='/dashboard/my-courses' element={<MyCourses/>}></Route>
               <Route path='/dashboard/instructor' element={<Instructor/>}></Route>
               <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}></Route>
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
              <Route path='/dashboard/add-category' element={<AddCategory/>}></Route>
              </>
            )
          }
        </Route>
        <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
        }>
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
            <Route 
              path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
            </>
          )
        }

      </Route>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default App