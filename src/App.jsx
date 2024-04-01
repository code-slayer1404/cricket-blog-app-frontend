import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Base from './components/Base'
import Signup from './pages/Signup'
import Login from './pages/Login'

// import Button from 'react-bootstrap/Button';
// or less ideally
// import { Button } from 'react-bootstrap';
function App() {

    return (
        <>

            <BrowserRouter>


                <Base>
                    <Routes>
                        <Route path='/' element=""></Route>
                        <Route path='/login' element={<Login></Login>}></Route>
                        <Route path='/signup' element={<Signup></Signup>}></Route>
                    </Routes>
                </Base>
            </BrowserRouter>


        </>
    )
}

export default App
