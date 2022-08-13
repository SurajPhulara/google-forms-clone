import React from 'react'
import "./App.css"
import Header from './Components/Header/Header'
import Template from './Components/Templates/Template'
import MainBody from './Components/MainBody/MainBody'
import NewForm from './Components/NewForm/NewForm'
import ViewForm from './Components/ViewForm/ViewForm'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Submitted from './Components/Submitted/Submitted'
import { render } from 'react-dom'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter forceRefresh={true} >
        <Routes>
          <Route path='/' element={<> <Header /> <Template /> <MainBody /> </>} />
          <Route path='/form/:form_id/edit' element={<NewForm />} />
          <Route path='/form/:form_id/viewform'  element={<ViewForm />} />
          <Route path='/form/:form_id/formResponse'  element={<Submitted />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
