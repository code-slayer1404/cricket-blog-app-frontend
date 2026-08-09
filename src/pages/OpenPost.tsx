import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader, CardBody, CardText, CardFooter } from 'reactstrap';
import { getPost, myDateFormatter } from '../services/PostService';
import CommentBox from '@/components/CommentBox';
import { PostReadDTO } from '@/types/dto/PostDTO';

function OpenPost() {
    const { id } = useParams<string>();
    // const [post, setPost] = useState({
    //     title: "",
    //     content: "",
    //     user: {},
    //     date: ""
    // });
    const [post, setPost] = useState<PostReadDTO | null>(null);

    function loadPost(postId: number) {
        // Fetch the post with the given ID and update post state
        getPost(postId).then(
            data => {
                console.log(data);
                setPost({
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    user: data.user,
                    date: myDateFormatter(data.date)
                })
            }
        );
    }

    useEffect(() => {
        loadPost(Number(id));
        console.log(typeof id);
    }, [id]);

    return (
        <Container style={{ marginTop: "80px" }}>
            <Row>
                <Col md={{ size: 8, offset: 2 }} className="mt-5">
                    {post && (
                        <Card className='mb-3'>
                            <CardHeader>
                                <h2 className='d-flex justify-content-between  align-items-center m-0'><span>{post.title}</span><span className='h5 m-0'>{post.date}</span></h2>
                            </CardHeader>
                            <CardBody>
                                <CardText>
                                    {post.content}
                                </CardText>

                            </CardBody>
                            <CardFooter>
                                <div className='d-flex'><div className='ms-auto'>{post.user.name}</div></div>
                            </CardFooter>
                        </Card>
                    )}
                    <Card>
                        <CardBody>
                            <CommentBox postId={Number(id)}></CommentBox>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default OpenPost;
