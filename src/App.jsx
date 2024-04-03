import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Base from './components/Base'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useState } from 'react'
import { isLogged } from './auth/loginHelper'

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

            <BrowserRouter>

                <Base loginStatus = {loginStatus}>
                    <Routes>
                        <Route path='/' element=""></Route>
                        <Route path='/login' element={<Login updateLoginStatus={updateLoginStatus}></Login>}></Route>
                        <Route path='/signup' element={<Signup></Signup>}></Route>
                    </Routes>
                </Base>
            </BrowserRouter>


        </>
    )
}

export default App
