import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap'
import { getUserDetails, isLogged } from '../auth/loginHelper'
import { deletePost } from '../services/PostService';
import { Link } from 'react-router-dom';
export default function Post({ post,loadPosts }) {

    
    const mystyle = {
    }

    function onDelete(event) {
        event.preventDefault();
        if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost(post.id).then(r => {
                console.log(r.data);
                loadPosts();
            });
        }
    }



    return (
        <>
            <Card className='mb-3' style={mystyle} >
                <CardHeader><h2>{post.title}</h2></CardHeader>
                <CardBody>
                    <CardText>
                        {post.content.length > 300 ? post.content.substring(0, 300) + "..." : post.content}
                    </CardText>
                </CardBody>

                <CardFooter>
                    <div className='text-center'>
                        <Link to={`/user/open-post/${post.id}`}>
                            <Button color='success' className='me-3'>Open</Button>
                        </Link>
                        {isLogged() && post.user.id == getUserDetails().id && (
                            <>
                                <Link to={`/user/update-post/${post.id}`}>
                                    <Button color='primary' className='me-3'>Update</Button>
                                </Link>
                                <Button color='danger' onClick={onDelete}>Delete</Button>
                            </>
                        )}
                        
                    </div>
                    <div className='d-flex'><div className='ms-auto'>{post.user.name}</div></div>
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
            id : PropTypes.number,
            name : PropTypes.string
        })
    }),
    loadPosts: PropTypes.func
}