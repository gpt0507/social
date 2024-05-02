import AddPost from "../pages/AddPost"
import Home from "../pages/Home"
import Login from "../pages/Login"
import MyPosts from "../pages/MyPosts"
import Signup from "../pages/Signup"

export const publicRoutes = [
  {
    path: '/login',
    element: Login
  },
  {
    path: '/signup',
    element: Signup
  }
]

export const privateRoutes = [
  {
    path: '/',
    element: Home
  },
  {
    path: '/myPosts',
    element: MyPosts
  },
  {
    path: '/addPost',
    element: AddPost
  },

]