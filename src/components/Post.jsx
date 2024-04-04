import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap'
import { getUserDetails, isLogged } from '../auth/loginHelper'
import { deletePost } from '../services/PostService';
export default function Post({ post,updatePostContainer }) {
    
    const mystyle = {
    }

    function onDelete(event){
        event.preventDefault();
        deletePost(post.id).then(r=>{console.log(r.data); updatePostContainer(); });
    }


    return (
        <>
            <Card className='mb-3' style={mystyle} >
                <CardHeader><h2>{post.title}</h2></CardHeader>
                <CardBody> 
                    <CardText>
                        {post.content}
                    </CardText>
                </CardBody>
                <CardFooter>
                    <div className='text-center'>
                        {isLogged() && post.user.id == getUserDetails().id ? <Button color='secondary' className='me-3'>Update</Button>:""}
                        {isLogged() && post.user.id == getUserDetails().id ? <Button color='danger' onClick={onDelete}>Delete</Button>:""}
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

Post.propTypes = {
    post : PropTypes.shape({
        id : PropTypes.number,
        title : PropTypes.string,
        content : PropTypes.string,
        user : PropTypes.shape({
            id : PropTypes.number
        })
    }),
    updatePostContainer: PropTypes.func
}