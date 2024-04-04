import PropTypes from 'prop-types'
import Header from './Header'
// eslint-disable-next-line no-unused-vars
export default function Base({ children,title,loginStatus,updateLoginStatus}) {

    return (
        <>
            <Header loginStatus={loginStatus} updateLoginStatus={updateLoginStatus}></Header>
            <div className='content'>
                {children}
            </div>
        </>
    )
}

Base.propTypes = {
    children: PropTypes.node,
    title : PropTypes.string,
    loginStatus: PropTypes.bool,
    updateLoginStatus: PropTypes.func,
}
