import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap'
import { getUserDetails, isLogged } from '../auth/loginHelper'
import { deletePost, myDateFormatter } from '../services/PostService';
import { Link } from 'react-router-dom';
export default function Post({ post, loadPosts }) {


    const mystyle = {
    }

    function onDelete(event) {
        event.preventDefault();
        if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost(getUserDetails().id,post.id).then(r => {
                console.log(r.data);
                loadPosts();
            });
        }
    }


    function renderUpdateAndDeleteButtons() {
        if (isLogged() && post.user.id == getUserDetails().id) {
            return (
                <>
                    <Link to={`/user/update-post/${post.id}`}>
                        <Button color='primary' className='me-3'>Update</Button>
                    </Link>
                    <Button color='danger' onClick={onDelete}>Delete</Button>
                </>
            )
        }
    }



    return (
        <>
            <Card className='mb-3' style={mystyle} >
                <CardHeader>
                    <h2 className='d-flex justify-content-between  align-items-center m-0'><span>{post.title}</span><span className='h5 m-0'>{myDateFormatter(post.date)}</span></h2>
                </CardHeader>
                <CardBody>
                    <CardText>
                        {post.content.length > 300 ? post.content.substring(0, 300) + "..." : post.content}
                    </CardText>
                </CardBody>

                <CardFooter>
                    <div className='d-flex'>
                        <Link to={`/open-post/${post.id}`}>
                            <Button color='success' className='me-3'>Open</Button>
                        </Link>
                        {renderUpdateAndDeleteButtons()}
                        <div className='ms-auto mt-2'>{post.user.name}</div>

                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
        date: PropTypes.string,
        user: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })
    }),
    loadPosts: PropTypes.func
}