import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes/routes'
import Login from '../pages/Login'

function AppRoutes() {
  return (
    <>
      <Routes>
        {
          publicRoutes.map(e =>
            < Route path={e.path} element={<e.element />} />
          )
        }

        {
          privateRoutes.map(e =>
            < Route path={e.path} element={<e.element />} />
          )
        }

        <Route path='*' element={<Login />} />
      </Routes>
    </>
  )
}

export default AppRoutes