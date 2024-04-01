import PropType from 'prop-types'
import Header from './Header'
// eslint-disable-next-line no-unused-vars
export default function Base({ children,title }) {

    // function home() {
    //     window.location.href = "home"
    // }
    // function login() {
    //     window.location.href = "login"
    // }
    return (
        <>
            <Header></Header>
            <div className='content'>
                {children}
            </div>
            


            {/* <div className='mt-5'>
                <button onClick={home}>Home</button>
                <button onClick={login}>Login</button>
            </div> */}
        </>
    )
}

Base.propTypes = {
    children: PropType.node,
    title : PropType.string
}
