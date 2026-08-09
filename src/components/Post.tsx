import { Button, Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap'
import { deletePost, myDateFormatter } from '@/services/PostService';
import { Link } from 'react-router-dom';
import { PostReadDTO } from '@/types/dto/PostDTO';
import { useAuth } from '@/hooks/auth';


interface PostProps {
    post: PostReadDTO;
    loadPosts: (num?: number) => void
}

export default function Post({ post, loadPosts }: PostProps) {

    const mystyle = {
    }
    const { loggedUser, loginStatus } = useAuth()

    async function onDelete(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (window.confirm('Are you sure you want to delete this post?')) {
            if (!loggedUser) {
                throw new Error("could not delete. no user logged in")
            }

            const result = await deletePost(loggedUser.id, post.id);
            if (result.ok) {
                const data = result.data;
                console.log(data);
                loadPosts();
            }else{
                console.log(result.error); 
            }
        }
    }


    function renderUpdateAndDeleteButtons() {
        if (loginStatus && post.user.id == loggedUser!.id) {
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