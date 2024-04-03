import PropTypes from 'prop-types'
import Header from './Header'
// eslint-disable-next-line no-unused-vars
export default function Base({ children,title,loginStatus}) {

    return (
        <>
            <Header loginStatus={loginStatus}></Header>
            <div className='content'>
                {children}
            </div>
        </>
    )
}

Base.propTypes = {
    children: PropTypes.node,
    title : PropTypes.string,
    loginStatus: PropTypes.bool
}
