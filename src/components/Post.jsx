import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader } from 'reactstrap'
export default function Post({ title, content }) {
    const mystyle = {
    }
    return (
        <>
            <Card className='mb-3' style={mystyle} >
                <CardHeader><h2>{title}</h2></CardHeader>
                <CardBody> <p>{content}</p></CardBody>
            </Card>
        </>
    )
}

Post.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
}