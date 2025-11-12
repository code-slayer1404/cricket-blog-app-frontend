import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Base from './components/Base'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useState } from 'react'
import { isLogged } from './auth/loginHelper'

import PrivatePage from './pages/UserPages/PrivatePage'
import DashBoard from './pages/UserPages/DashBoard'
import UpdatePost from './pages/UserPages/UpdatePost'

import Home from './pages/Home'
import OpenPost from './pages/OpenPost'

// import Button from 'react-bootstrap/Button';
// or less ideally
// import { Button } from 'react-bootstrap';
function App() {

    const [loginStatus,setLoginStatus] = useState(isLogged());

    function updateLoginStatus(){
        setLoginStatus(isLogged())
    }

    return (
        <>

            <BrowserRouter basename='/cricket-blog-app-frontend'>

                <Base loginStatus={loginStatus} updateLoginStatus={updateLoginStatus}>

                </Base>
                <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path='/login' element={<Login updateLoginStatus={updateLoginStatus}></Login>}></Route>
                    <Route path='/signup' element={<Signup></Signup>}></Route>
                    <Route path='/open-post/:id' element={<OpenPost />} />

                    <Route path="/user" element={<PrivatePage loginStatus={loginStatus}></PrivatePage>}>
                        <Route path='dashboard' element={<DashBoard></DashBoard>}></Route>
                        <Route path="update-post/:id" element={<UpdatePost></UpdatePost>} />
                    </Route>
                    
                </Routes>
                
            </BrowserRouter>


        </>
    )
}

export default App
